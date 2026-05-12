type Payload = {
  task?: string;
  input?: string;
  options?: Record<string, unknown>;
};

function buildPrompt(payload: Payload) {
  const baseInstruction =
    "You are AccessEase AI, an accessibility-first assistant. Use respectful, disability-centered, plain language. Never claim to provide legal, medical, financial, or emergency advice. When helpful, offer short steps and practical next actions.";

  if (payload.task === "simplify_text") {
    return `${baseInstruction}

Return these sections with short headings:
- Short summary
- Plain-language explanation
- Action checklist
- Difficult words explained
- Questions to ask

Text to simplify:
${payload.input ?? ""}`;
  }

  if (payload.task === "accommodation_message") {
    return `${baseInstruction}

Write a respectful accessibility accommodation request message that is clear, calm, and professional.

Details:
${payload.input ?? ""}`;
  }

  if (payload.task === "communication_message") {
    return `${baseInstruction}

Turn the request into a short first-person message that the user can say, copy, or show to someone else.

Request:
${payload.input ?? ""}`;
  }

  return `${baseInstruction}

User request:
${payload.input ?? ""}

Response preferences:
${JSON.stringify(payload.options ?? {})}`;
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }

  const apiKey =
    process.env.OPENAI_API_KEY ?? process.env.VITE_OPENAI_API_KEY ?? "";

  if (!apiKey) {
    return Response.json(
      { error: "Missing OPENAI_API_KEY on the server." },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as Payload;
  const prompt = buildPrompt(payload);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: prompt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return Response.json({ error: errorText }, { status: 500 });
  }

  const data = (await response.json()) as {
    output_text?: string;
  };

  return Response.json({ text: data.output_text ?? "" });
}
