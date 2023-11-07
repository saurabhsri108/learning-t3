export function speak(text: string | null) {
  if (
    typeof window !== "undefined" &&
    "SpeechSynthesisUtterance" in window &&
    "speechSynthesis" in window &&
    !!text &&
    GLOBAL_SPEAK_MODE === "on"
  ) {
    const utterance = new SpeechSynthesisUtterance(text);
    const synthesis = window.speechSynthesis;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setTimeout(() => {
      const voices = synthesis.getVoices();
      utterance.voice =
        voices.filter((voice) => voice.lang === "en-IN")[0] ?? null;
      speechSynthesis.speak(utterance);
    }, 500);
  }
}

let GLOBAL_SPEAK_MODE: "on" | "off" = "off";

export function changeGlobalSpeakMode(value: "on" | "off") {
  if (value === "off") {
    speak("Voice reading turned off");
  }
  if (value === "on") {
    speak("Voice reading turned on");
  }
  GLOBAL_SPEAK_MODE = value;
}
