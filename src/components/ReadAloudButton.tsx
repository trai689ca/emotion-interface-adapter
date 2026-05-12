import { useEffect, useState } from "react";
import { AccessibleButton } from "./AccessibleButton";

type ReadAloudButtonProps = {
  text: string;
};

export function ReadAloudButton({ text }: ReadAloudButtonProps) {
  const [isReading, setIsReading] = useState(false);
  const canRead = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speak() {
    if (!canRead || !text.trim()) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (!canRead) {
      return;
    }

    window.speechSynthesis.cancel();
    setIsReading(false);
  }

  if (!canRead) {
    return null;
  }

  return isReading ? (
    <AccessibleButton onClick={stop} variant="secondary">
      Stop reading
    </AccessibleButton>
  ) : (
    <AccessibleButton onClick={speak} variant="secondary">
      Read aloud
    </AccessibleButton>
  );
}
