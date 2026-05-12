import { useState } from "react";
import { requestAiResponse } from "../ai";
import { copyText } from "../clipboard";
import { AccessibleButton } from "./AccessibleButton";
import { ReadAloudButton } from "./ReadAloudButton";

const contexts = [
  "Work",
  "School",
  "Healthcare",
  "Government service",
  "Housing",
  "Appointment",
  "Online form",
];

export function AccommodationBuilder() {
  const [context, setContext] = useState(contexts[0]);
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [notice, setNotice] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    if (!need.trim()) {
      setErrorMessage("Please describe your accessibility need before generating a message.");
      return;
    }

    setErrorMessage("");
    setStatusMessage("");
    setIsLoading(true);

    try {
      const response = await requestAiResponse({
        task: "accommodation_message",
        input: `Context: ${context}. Need: ${need.trim()}`,
      });

      setMessage(response.text);
      setSource(response.source);
      setNotice(response.notice ?? "");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
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
      aria-labelledby="builder-panel-title"
    >
      <div>
        <h2 id="builder-panel-title">Create a respectful request message</h2>
        <p className="supporting-text">
          Describe what would help you access the service, information, or task.
        </p>
      </div>

      <label className="field-label" htmlFor="context-select">
        Context
      </label>
      <select
        id="context-select"
        onChange={(event) => setContext(event.currentTarget.value)}
        value={context}
      >
        {contexts.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label className="field-label" htmlFor="need-description">
        Describe your accessibility need
      </label>
      <textarea
        id="need-description"
        onChange={(event) => setNeed(event.currentTarget.value)}
        placeholder="Example: I need written instructions and more time to complete the form."
        rows={6}
        value={need}
      />

      {errorMessage && (
        <p className="error-text" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="action-row">
        <AccessibleButton disabled={isLoading} onClick={handleGenerate}>
          {isLoading ? "Working..." : "Generate message"}
        </AccessibleButton>
        <AccessibleButton
          disabled={isLoading || (!need && !message)}
          onClick={() => {
            setNeed("");
            setMessage("");
            setSource(null);
            setNotice("");
            setStatusMessage("");
            setErrorMessage("");
          }}
          variant="secondary"
        >
          Clear
        </AccessibleButton>
      </div>

      {message && (
        <article className="result-card" aria-live="polite">
          <div className="message-header">
            <h3>Suggested message</h3>
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
