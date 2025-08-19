import { NextRequest, NextResponse } from "next/server";
import { AI_SYSTEM_PROMPT } from "@/lib/ai";
import { ListingAIResponseSchema } from "@/lib/validation";

export const runtime = "nodejs";

type Payload = {
  text?: string;
  imageUrls?: string[];
  currency?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { text, imageUrls = [], currency = "GBP" } = (await req.json()) as Payload;
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    // Build a messages array for Chat Completions
    const userContent = [
      text ?? "",
      imageUrls.length ? `Image URLs: ${imageUrls.join(", ")}` : ""
    ].filter(Boolean).join("\n\n");

    const body = {
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        { role: "user", content: userContent }
      ],
      response_format: { type: "json_object" }
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: "OpenAI error", details: errText }, { status: 500 });
    }

    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    const parsed = ListingAIResponseSchema.safeParse(JSON.parse(raw));

    if (!parsed.success) {
      return NextResponse.json({ error: "AI output validation failed", issues: parsed.error.format() }, { status: 422 });
    }

    // enforce currency override if user provided
    parsed.data.currency = currency || "GBP";
    return NextResponse.json(parsed.data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
