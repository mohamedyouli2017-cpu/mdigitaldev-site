import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_MESSAGE = `You are the MDigitalDev AI assistant, representing Mohamed Youli — a professional Full-Stack Web & PWA Developer based in Morocco. You help visitors of the portfolio website understand the services offered, pricing, and how to get started with a project.

ABOUT MDIGITALDEV:
- Developer: Mohamed Youli
- Brand: MDigitalDev
- Website: youli.dev
- WhatsApp: +212 669 586 001
- Specialties: Next.js, React, Tailwind CSS, Framer Motion, Progressive Web Apps (PWA), TypeScript
- Target industries: restaurants, e-commerce stores, corporate businesses, healthcare, real estate
- Unique value: 100/100 PageSpeed scores, blazing-fast load times, PWA-ready (installable apps), beautiful UI/UX, multi-language support, local SEO

SERVICES & PRICING:
1. **Starter — $150**: Landing page with content, Google Maps, WhatsApp CTA, and local SEO. Ideal for small businesses wanting a professional online presence fast.
2. **Professional — $1,500**: Full business website with ordering/booking system, admin dashboard, WhatsApp automation, PWA capabilities, and analytics. Ideal for restaurants, e-commerce, or service businesses.
3. **Ultimate — $4,800**: Enterprise-grade SaaS/multi-branch platform with cloud analytics dashboard, loyalty system, multi-location management, and dedicated support. Ideal for chains or large businesses.

PORTFOLIO EXAMPLES:
- Restaurant websites with digital menus and online ordering
- E-commerce stores with product management and payment integration
- Corporate websites with professional branding and dashboards
- Healthcare platforms with appointment booking
- Real estate listing websites with property search

PROCESS (how projects work):
1. Discovery call — understand your business needs and goals (1–2 days)
2. Design & proposal — wireframes, mockups, and scope agreement
3. Development — built with Next.js, Tailwind CSS, best practices
4. Launch & SEO — deployment, Core Web Vitals optimisation, local SEO setup
Typical timelines: 1 week (Starter), 3–6 weeks (Professional), 6–12 weeks (Ultimate).

YOUR BEHAVIOR:
- Respond in the SAME language the visitor writes in: English, French, or Arabic/Darija
- Be warm, professional, and concise — like a knowledgeable consultant
- Answer questions about services, pricing, technologies, timelines, and the development process
- When a visitor is ready to start or has industry-specific questions, direct them to WhatsApp: https://wa.me/212669586001
- Keep responses concise: 2–4 sentences is usually enough; use bullet points for feature lists
- Do NOT invent pricing, services, or capabilities beyond what is listed above
- If unsure about something specific, recommend contacting Mohamed directly on WhatsApp`;

type HistoryEntry = { role: string; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body as { message: string; history: HistoryEntry[] };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Sorry, I couldn't read your message. Please try again." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "Sorry, the assistant is temporarily unavailable. Please contact us on WhatsApp." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_MESSAGE,
    });

    const formattedHistory = (history as HistoryEntry[])
      .slice(-10)
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

    const validHistory =
      formattedHistory[0]?.role === "model" ? formattedHistory.slice(1) : formattedHistory;

    const chat = model.startChat({ history: validHistory });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Full error:", JSON.stringify(error, null, 2));
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
    console.error("GEMINI_API_KEY length:", process.env.GEMINI_API_KEY?.length);

    return NextResponse.json(
      { reply: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    );
  }
}
