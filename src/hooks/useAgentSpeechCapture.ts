"use client";

import { useCallback, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export function useAgentSpeechCapture() {
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [capturedTranscript, setCapturedTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resolveRef = useRef<(value: string) => void>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef("");

  const isSupported =
    typeof window !== "undefined" &&
    (window.SpeechRecognition != null || window.webkitSpeechRecognition != null);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition not supported in this browser.");
      return;
    }
    setError(null);
    transcriptRef.current = "";
    setCapturedTranscript("");

    const SpeechRecognitionClass =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setError("Speech recognition not available.");
      return;
    }
    const recognition = new SpeechRecognitionClass() as SpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript;
      }
      transcriptRef.current = full;
      setCapturedTranscript(full);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== "aborted") {
        setError(event.error);
      }
      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start microphone");
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    const finalText = transcriptRef.current.trim();
    resolveRef.current?.(finalText || "(No speech detected)");
    resolveRef.current = null;
    setIsWaitingForAgent(false);
    setIsListening(false);
    setCapturedTranscript("");
  }, []);

  const waitForAgentResponse = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      transcriptRef.current = "";
      setCapturedTranscript("");
      setError(null);
      setIsWaitingForAgent(true);
    });
  }, []);

  const cancelWaiting = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    resolveRef.current?.("");
    resolveRef.current = null;
    setIsWaitingForAgent(false);
    setIsListening(false);
    setCapturedTranscript("");
  }, []);

  const submitTypedResponse = useCallback((text: string) => {
    const trimmed = (text || "").trim();
    resolveRef.current?.(trimmed || "(No response)");
    resolveRef.current = null;
    setIsWaitingForAgent(false);
    setIsListening(false);
    setCapturedTranscript("");
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
  }, []);

  return {
    isSupported,
    isWaitingForAgent,
    isListening,
    capturedTranscript,
    error,
    waitForAgentResponse,
    startListening,
    stopListening,
    cancelWaiting,
    submitTypedResponse,
  };
}
