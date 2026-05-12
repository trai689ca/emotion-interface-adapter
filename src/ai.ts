export type AiTask =
  | "chat"
  | "simplify_text"
  | "accommodation_message"
  | "communication_message";

type AiRequest = {
  task: AiTask;
  input: string;
  options?: Record<string, unknown>;
};

export type AiResponse = {
  text: string;
  source: "live" | "mock";
  notice?: string;
};

const requestTimeoutMs = 20000;

export async function requestAiResponse({
  task,
  input,
  options = {},
}: AiRequest): Promise<AiResponse> {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    throw new Error("Please enter some text before asking AccessEase AI for help.");
  }

  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, input: trimmedInput, options }),
      signal: controller.signal,
    });

    window.clearTimeout(timeoutId);

    if (!response.ok) {
      const errorPayload = (await safeParseJson(response)) as { error?: string } | null;
      throw new Error(errorPayload?.error || "The AI service is unavailable right now.");
    }

    const data = (await response.json()) as { text?: string };

    if (!data.text?.trim()) {
      throw new Error("The AI service returned an empty response.");
    }

    return { text: data.text.trim(), source: "live" };
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The live AI service took too long to respond, so a local practice response is shown instead."
        : "The live AI service is not available right now, so a local practice response is shown instead.";

    return {
      text: createMockResponse(task, trimmedInput, options),
      source: "mock",
      notice: message,
    };
  }
}

async function safeParseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function createMockResponse(
  task: AiTask,
  input: string,
  options: Record<string, unknown>,
) {
  if (task === "chat") {
    const answerStyle = options.shortAnswer ? "Short answer" : "Detailed support";
    const stepPrompt = options.stepByStep ? "\n\nSuggested steps\n1. Find the main task or question.\n2. Focus on one next step.\n3. Ask for clarification if any part is confusing." : "";

    return `${answerStyle}\n\nHere is a plain-language response based on your question:\n${input}${stepPrompt}\n\nThis is a local practice response for development while the live AI service is unavailable.`;
  }

  if (task === "simplify_text") {
    return `Short summary\nThis text appears to explain an important task, rule, or requirement.\n\nPlain-language explanation\nThe message is trying to tell the reader what is happening, what to pay attention to, and what action may be needed.\n\nAction checklist\n- Find any deadline or important date.\n- Write down any forms, names, or documents mentioned.\n- Ask for a simpler explanation if part of the text is unclear.\n\nDifficult words explained\n- Requirement: something you must do.\n- Documentation: records or papers that prove information.\n\nQuestions to ask\n- What do I need to do first?\n- What is the deadline?\n- Can you explain this in simpler words?`;
  }

  if (task === "accommodation_message") {
    return `Hello,\n\nI am reaching out to request an accessibility accommodation.\n\n${input}\n\nPlease let me know what options are available and what the next step should be. Thank you for your time and support.\n\nSincerely,\n[Your name]`;
  }

  return `Suggested message\n\n${input}\n\nPlease support me in a way that is accessible for me. Thank you.`;
}
