"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export interface VoiceChatTranscript {
  type: "transcript"
  text: string
  role: "user" | "assistant"
}

export type VoiceChatStatus = "idle" | "connecting" | "connected" | "error"

export interface UseVoiceChatReturn {
  connect: () => Promise<void>
  disconnect: () => void
  status: VoiceChatStatus
  transcripts: VoiceChatTranscript[]
  error?: string
  isMuted: boolean
  toggleMute: () => void
  isThinking: boolean
  isSupported: boolean
}

const VOICE_API_URL = "https://voice-sip.studio.lyzr.ai"

export const useVoiceChat = (agentId: string): UseVoiceChatReturn => {
  const [status, setStatus] = useState<VoiceChatStatus>("idle")
  const [error, setError] = useState<string | undefined>(undefined)
  const [transcripts, setTranscripts] = useState<VoiceChatTranscript[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  
  const isMutedRef = useRef(isMuted)
  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const nextPlayTimeRef = useRef<number>(0)
  const thinkingSoundSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set())
  const audioConfigRef = useRef<{ sampleRate: number }>({ sampleRate: 16000 })

  // Keep isMutedRef in sync
  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  const stopAllAudioSources = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop()
      } catch {
        // Ignore stop errors
      }
      source.disconnect()
    })
    activeSourcesRef.current.clear()

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      nextPlayTimeRef.current = audioContextRef.current.currentTime
    } else {
      nextPlayTimeRef.current = 0
    }
  }, [])

  const playAudio = useCallback((base64: string, sampleRate: number) => {
    if (!audioContextRef.current) return

    try {
      const binary = atob(base64)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }

      const pcm16 = new Int16Array(bytes.buffer)
      const float32 = new Float32Array(pcm16.length)
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / (pcm16[i] < 0 ? 32768 : 32767)
      }

      const buffer = audioContextRef.current.createBuffer(
        1,
        float32.length,
        sampleRate
      )
      buffer.getChannelData(0).set(float32)

      const source = audioContextRef.current.createBufferSource()
      source.buffer = buffer
      source.connect(audioContextRef.current.destination)

      activeSourcesRef.current.add(source)
      source.onended = () => {
        activeSourcesRef.current.delete(source)
      }

      const currentTime = audioContextRef.current.currentTime
      const startTime = Math.max(currentTime, nextPlayTimeRef.current)

      source.start(startTime)
      nextPlayTimeRef.current = startTime + buffer.duration
    } catch (err) {
      console.error("Error playing audio:", err)
    }
  }, [])

  const stopThinkingSound = useCallback(() => {
    try {
      if (thinkingSoundSourceRef.current) {
        thinkingSoundSourceRef.current.stop()
        thinkingSoundSourceRef.current.disconnect()
        thinkingSoundSourceRef.current = null
      }
    } catch {
      thinkingSoundSourceRef.current = null
    }
  }, [])

  const playThinkingSound = useCallback((base64Audio: string, sampleRate: number) => {
    if (!audioContextRef.current) return

    try {
      stopThinkingSound()

      const binary = atob(base64Audio)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }

      const pcm16 = new Int16Array(bytes.buffer)
      const float32 = new Float32Array(pcm16.length)
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / (pcm16[i] < 0 ? 32768 : 32767)
      }

      const buffer = audioContextRef.current.createBuffer(
        1,
        float32.length,
        sampleRate
      )
      buffer.getChannelData(0).set(float32)

      const source = audioContextRef.current.createBufferSource()
      source.buffer = buffer

      const gainNode = audioContextRef.current.createGain()
      gainNode.gain.value = 0.3

      source.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      thinkingSoundSourceRef.current = source

      source.onended = () => {
        if (thinkingSoundSourceRef.current === source) {
          thinkingSoundSourceRef.current = null
        }
      }

      source.start(0)
    } catch (err) {
      console.error("Error playing thinking sound:", err)
    }
  }, [stopThinkingSound])

  const connect = useCallback(async () => {
    try {
      setStatus("connecting")
      setError(undefined)
      setTranscripts([])

      // 1. Get session from voice API
      console.log("Starting voice session with agent:", agentId)
      const res = await fetch(`${VOICE_API_URL}/session/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Session start failed:", res.status, errorText)
        
        // Check if this is a "not found" or unsupported agent error
        if (res.status === 404 || errorText.includes("not found")) {
          setIsSupported(false)
          throw new Error("WebSocket voice not available for this agent. Using browser voice instead.")
        }
        throw new Error(`Failed to start session: ${res.status} ${errorText}`)
      }

      const contentType = res.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        // Probably TwiML response - WebSocket not supported
        console.warn("Received non-JSON response, WebSocket voice not supported")
        setIsSupported(false)
        throw new Error("WebSocket voice not available. Using browser voice instead.")
      }

      const data = await res.json()
      const { wsUrl, audioConfig } = data

      if (!wsUrl) {
        setIsSupported(false)
        throw new Error("No WebSocket URL returned. Using browser voice instead.")
      }

      audioConfigRef.current = audioConfig || { sampleRate: 16000 }

      // 2. Setup audio context
      audioContextRef.current = new AudioContext({
        sampleRate: audioConfigRef.current.sampleRate,
      })
      nextPlayTimeRef.current = audioContextRef.current.currentTime

      // 3. Get microphone access
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: audioConfigRef.current.sampleRate,
        },
      })

      // 4. Process microphone input
      const source = audioContextRef.current.createMediaStreamSource(streamRef.current)
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1)

      processorRef.current.onaudioprocess = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN && !isMutedRef.current) {
          const float32 = e.inputBuffer.getChannelData(0)
          const pcm16 = new Int16Array(float32.length)
          for (let i = 0; i < float32.length; i++) {
            pcm16[i] = Math.max(-32768, Math.min(32767, float32[i] * 32768))
          }
          const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)))
          wsRef.current.send(
            JSON.stringify({
              type: "audio",
              audio: base64,
              sampleRate: audioConfigRef.current.sampleRate,
            })
          )
        }
      }

      source.connect(processorRef.current)
      processorRef.current.connect(audioContextRef.current.destination)

      // 5. Connect WebSocket
      console.log("Connecting to WebSocket:", wsUrl)
      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        console.log("WebSocket connected")
        setStatus("connected")
      }

      wsRef.current.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)

          if (msg.type === "audio") {
            playAudio(msg.audio, audioConfigRef.current.sampleRate)
          } else if (msg.type === "transcript") {
            setTranscripts((prev) => [...prev, msg])
          } else if (msg.type === "thinking") {
            if (msg.status === "started") {
              setIsThinking(true)
            } else if (msg.status === "stopped") {
              setIsThinking(false)
              stopThinkingSound()
            }
          } else if (msg.type === "thinking_audio") {
            playThinkingSound(msg.audio, msg.sampleRate)
          } else if (msg.type === "session_started") {
            console.log("Session started:", msg.sessionId)
          } else if (msg.type === "clear") {
            // Server-driven interruption - stop all audio
            stopAllAudioSources()
            stopThinkingSound()
            setIsThinking(false)
          } else if (msg.type === "error") {
            console.error("WebSocket error message:", msg.message)
            setError(msg.message)
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err)
        }
      }

      wsRef.current.onerror = (event) => {
        console.error("WebSocket error:", event)
        setStatus("error")
        setError("WebSocket connection error")
      }

      wsRef.current.onclose = () => {
        console.log("WebSocket closed")
        setStatus("idle")
      }
    } catch (err) {
      console.error("Error connecting to voice chat:", err)
      setStatus("error")
      setError(err instanceof Error ? err.message : "Failed to connect")
    }
  }, [agentId, playAudio, playThinkingSound, stopAllAudioSources, stopThinkingSound])

  const disconnect = useCallback(() => {
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "stop" }))
      }
      wsRef.current?.close()
      processorRef.current?.disconnect()
      streamRef.current?.getTracks().forEach((t) => t.stop())
      stopAllAudioSources()
      stopThinkingSound()
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {})
      }
      nextPlayTimeRef.current = 0
      setStatus("idle")
      setTranscripts([])
      setIsThinking(false)
    } catch (err) {
      console.error("Error disconnecting:", err)
    }
  }, [stopAllAudioSources, stopThinkingSound])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    connect,
    disconnect,
    status,
    transcripts,
    error,
    isMuted,
    toggleMute,
    isThinking,
    isSupported,
  }
}
