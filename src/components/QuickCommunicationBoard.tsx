import { useState } from "react";
import { requestAiResponse } from "../ai";
import { copyText } from "../clipboard";
import { AccessibleButton } from "./AccessibleButton";
import { ReadAloudButton } from "./ReadAloudButton";

const communicationPrompts = [
  "I need help",
  "Please explain again",
  "I need more time",
  "Please use simpler words",
  "I need this in writing",
  "I use assistive technology",
  "I cannot access this form",
];

export function QuickCommunicationBoard() {
  const [message, setMessage] = useState("");
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [notice, setNotice] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePromptSelection(prompt: string) {
    setActivePrompt(prompt);
    setStatusMessage("");
    setIsLoading(true);

    try {
      const response = await requestAiResponse({
        task: "communication_message",
        input: prompt,
      });

      setMessage(response.text);
      setSource(response.source);
      setNotice(response.notice ?? "");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyMessage() {
    if (!message) {
      return;
    }

    try {
      await copyText(message);
      setStatusMessage("Message copied.");
    } catch {
      setStatusMessage("Copy was not available on this device.");
    }
  }

  return (
    <section
      aria-busy={isLoading}
      className="surface stack-md"
      aria-labelledby="communication-board-title"
    >
      <div>
        <h2 id="communication-board-title">Common communication needs</h2>
        <p className="supporting-text">
          Select a large button to create a message you can read, copy, or play
          aloud.
        </p>
      </div>

      <div className="feature-grid">
        {communicationPrompts.map((prompt) => (
          <AccessibleButton
            className={activePrompt === prompt ? "is-selected" : ""}
            fullWidth
            key={prompt}
            onClick={() => handlePromptSelection(prompt)}
            variant="secondary"
          >
            {prompt}
          </AccessibleButton>
        ))}
      </div>

      {isLoading && <p className="status-note">Preparing your message...</p>}

      {message && (
        <article className="result-card" aria-live="polite">
          <div className="message-header">
            <h3>Generated message</h3>
            <div className="action-row">
              <ReadAloudButton text={message} />
              <AccessibleButton onClick={copyMessage} variant="secondary">
                Copy
              </AccessibleButton>
            </div>
          </div>
          <p className="message-text">{message}</p>
          {notice && <p className="status-note">{notice}</p>}
          {source === "mock" && !notice && (
            <p className="status-note">
              A local practice response is being shown instead of a live AI response.
            </p>
          )}
          {statusMessage && <p className="status-note">{statusMessage}</p>}
        </article>
      )}
    </section>
  );
}
