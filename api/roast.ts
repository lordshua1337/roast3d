import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", response.status, errorData);
      return res.status(500).json({
        error: (errorData as Record<string, unknown>).error
          ? String((errorData as Record<string, unknown>).error)
          : `API error ${response.status}`,
      });
    }

    const data = await response.json();
    const content = (data as { content?: Array<{ type: string; text?: string }> }).content || [];
    const text = content
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { text?: string }) => block.text || "")
      .join("");

    if (!text) {
      return res.status(500).json({ error: "Empty response from AI" });
    }

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Roast API error:", message);
    return res.status(500).json({ error: message });
  }
}
