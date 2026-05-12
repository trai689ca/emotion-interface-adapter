import { useState } from "react";
import { requestAiResponse } from "../ai";
import { copyText } from "../clipboard";
import { AccessibleButton } from "./AccessibleButton";
import { ReadAloudButton } from "./ReadAloudButton";

type TextSimplifierProps = {
  simpleLanguageMode: boolean;
};

export function TextSimplifier({ simpleLanguageMode }: TextSimplifierProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSimplify() {
    if (!input.trim()) {
      setErrorMessage("Please paste text before asking for a simpler explanation.");
      return;
    }

    setErrorMessage("");
    setCopyMessage("");
    setIsLoading(true);

    try {
      const response = await requestAiResponse({
        task: "simplify_text",
        input: input.trim(),
        options: {
          plainLanguage: simpleLanguageMode,
        },
      });

      setResult(response.text);
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

  async function handleCopy() {
    try {
      await copyText(result);
      setCopyMessage("Simplified text copied.");
    } catch {
      setCopyMessage("Copy was not available on this device.");
    }
  }

  return (
    <section
      aria-busy={isLoading}
      className="surface stack-md"
      aria-labelledby="simplifier-panel-title"
    >
      <div>
        <h2 id="simplifier-panel-title">Paste text to simplify</h2>
        <p className="supporting-text">
          The output is designed to highlight the main point, required actions,
          and useful follow-up questions.
        </p>
      </div>

      <label className="field-label" htmlFor="text-to-simplify">
        Difficult text
      </label>
      <textarea
        id="text-to-simplify"
        onChange={(event) => setInput(event.currentTarget.value)}
        placeholder="Paste difficult text here."
        rows={10}
        value={input}
      />

      {errorMessage && (
        <p className="error-text" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="action-row">
        <AccessibleButton disabled={isLoading} onClick={handleSimplify}>
          {isLoading ? "Working..." : "Make this easier to understand"}
        </AccessibleButton>
        <AccessibleButton
          disabled={isLoading || !input}
          onClick={() => {
            setInput("");
            setResult("");
            setSource(null);
            setNotice("");
            setErrorMessage("");
            setCopyMessage("");
          }}
          variant="secondary"
        >
          Clear
        </AccessibleButton>
      </div>

      {result && (
        <article className="result-card" aria-live="polite">
          <div className="message-header">
            <h3>Simplified result</h3>
            <div className="action-row">
              <ReadAloudButton text={result} />
              <AccessibleButton onClick={handleCopy} variant="secondary">
                Copy
              </AccessibleButton>
            </div>
          </div>
          <pre className="result-text">{result}</pre>
          {notice && <p className="status-note">{notice}</p>}
          {source === "mock" && !notice && (
            <p className="status-note">
              A local practice response is being shown instead of a live AI response.
            </p>
          )}
          {copyMessage && <p className="status-note">{copyMessage}</p>}
        </article>
      )}
    </section>
  );
}
