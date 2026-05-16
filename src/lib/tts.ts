/**
 * Browser TTS for spoof demo: play customer and ISR lines so the call is "heard".
 */

export function speakWithTTS(
  text: string,
  options?: { rate?: number; pitch?: number; volume?: number }
): Promise<void> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.resolve();
  }

  const clean = text
    .replace(/\s*\[CALL_END\]\s*/gi, "")
    .replace(/\s*\[Persona:.*?\]\s*/gi, "")
    .trim();
  if (!clean) return Promise.resolve();

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = options?.rate ?? 1;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;
    utterance.lang = "en-US";
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export function cancelTTS(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function isTTSSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
