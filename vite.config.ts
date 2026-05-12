import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

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

function localAiRoutePlugin(apiKey: string): Plugin {
  return {
    name: "local-ai-route",
    configureServer(server) {
      server.middlewares.use("/api/ai", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing OPENAI_API_KEY in your local .env file." }));
          return;
        }

        try {
          const body = await readRequestBody(req);
          const payload = JSON.parse(body) as Payload;
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

          const data = (await response.json()) as {
            error?: { message?: string };
            output_text?: string;
          };

          res.setHeader("Content-Type", "application/json");

          if (!response.ok) {
            res.statusCode = 500;
            res.end(
              JSON.stringify({
                error: data.error?.message ?? "The OpenAI request failed.",
              }),
            );
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ text: data.output_text ?? "" }));
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: "The local AI route could not process the request.",
            }),
          );
        }
      });
    },
  };
}

function readRequestBody(req: NodeJS.ReadableStream) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", reject);
  });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), localAiRoutePlugin(env.OPENAI_API_KEY ?? "")],
  };
});
