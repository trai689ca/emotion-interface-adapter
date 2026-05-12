import { useState, type FormEvent } from "react";
import { AccessibleButton } from "./AccessibleButton";
import { DisclaimerBox } from "./DisclaimerBox";
import { ReadAloudButton } from "./ReadAloudButton";
import { requestAiResponse } from "../ai";

type Message = {
  role: "user" | "assistant";
  text: string;
  source?: "live" | "mock";
  notice?: string;
};

type ChatInterfaceProps = {
  simpleLanguageMode: boolean;
};

export function ChatInterface({ simpleLanguageMode }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello. I can help explain difficult information, break tasks into steps, and suggest questions you can ask.",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortAnswer, setShortAnswer] = useState(false);
  const [stepByStep, setStepByStep] = useState(true);
  const [plainLanguage, setPlainLanguage] = useState(simpleLanguageMode);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!prompt.trim()) {
      setErrorMessage("Please enter a question before sending.");
      return;
    }

    const nextPrompt = prompt.trim();
    setErrorMessage("");
    setMessages((current) => [...current, { role: "user", text: nextPrompt }]);
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await requestAiResponse({
        task: "chat",
        input: nextPrompt,
        options: {
          shortAnswer,
          stepByStep,
          plainLanguage,
        },
      });

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: response.text,
          source: response.source,
          notice: response.notice,
        },
      ]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      aria-busy={isLoading}
      className="surface stack-md"
      aria-labelledby="chat-panel-title"
    >
      <div>
        <h2 id="chat-panel-title">Conversation</h2>
        <p className="supporting-text">
          You can ask questions like: "Explain this bill", "Help me prepare for
          a form", or "Give me a step-by-step plan".
        </p>
      </div>

      <div className="toggle-grid">
        <label className="toggle-row">
          <input
            checked={shortAnswer}
            onChange={(event) => setShortAnswer(event.currentTarget.checked)}
            type="checkbox"
          />
          <span>Short answer</span>
        </label>
        <label className="toggle-row">
          <input
            checked={stepByStep}
            onChange={(event) => setStepByStep(event.currentTarget.checked)}
            type="checkbox"
          />
          <span>Step-by-step</span>
        </label>
        <label className="toggle-row">
          <input
            checked={plainLanguage}
            onChange={(event) => setPlainLanguage(event.currentTarget.checked)}
            type="checkbox"
          />
          <span>Plain language</span>
        </label>
      </div>

      {errorMessage && (
        <p className="error-text" role="alert">
          {errorMessage}
        </p>
      )}

      <div aria-live="polite" className="chat-log">
        {messages.map((message, index) => (
          <article
            className={`message message-${message.role}`}
            key={`${message.role}-${index}`}
          >
            <div className="message-header">
              <h3>{message.role === "user" ? "You" : "AccessEase AI"}</h3>
              {message.role === "assistant" && <ReadAloudButton text={message.text} />}
            </div>
            <p className="message-text">{message.text}</p>
            {message.notice && <p className="status-note">{message.notice}</p>}
          </article>
        ))}

        {isLoading && <p className="status-note">Preparing a response...</p>}
      </div>

      <form className="stack-sm" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="assistant-prompt">
          Ask a question
        </label>
        <textarea
          id="assistant-prompt"
          onChange={(event) => setPrompt(event.currentTarget.value)}
          placeholder="Describe what you need help with."
          rows={5}
          value={prompt}
        />
        <div className="action-row">
          <AccessibleButton disabled={isLoading} type="submit">
            {isLoading ? "Working..." : "Send"}
          </AccessibleButton>
          <AccessibleButton
            disabled={isLoading || messages.length === 1}
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  text: "Hello. I can help explain difficult information, break tasks into steps, and suggest questions you can ask.",
                },
              ])
            }
            type="button"
            variant="secondary"
          >
            Clear conversation
          </AccessibleButton>
        </div>
      </form>

      <DisclaimerBox title="Assistant disclaimer">
        This tool is for general support only. It is not legal, medical,
        financial, or emergency advice.
      </DisclaimerBox>
    </section>
  );
}
