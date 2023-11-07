import { useEffect } from "react";
import { changeGlobalSpeakMode } from "~/utils/speak";

export default function KShorts() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "m") {
          e.preventDefault();
          changeGlobalSpeakMode("on");
        }
        if (e.ctrlKey && e.key === "M") {
          e.preventDefault();
          changeGlobalSpeakMode("off");
        }
      });
    }
  }, []);
  return null;
}
