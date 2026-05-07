import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Aria, the AI assistant for MDigitalDev — Mohamed Youli's solo web & AI automation practice. Mohamed is a full-stack developer based in Morocco who builds intelligent systems, automated workflows, and high-performance websites for businesses worldwide.

PERSONALITY:
- Professional, confident, and warm — like a senior consultant, not a bot
- Concise and direct — no long paragraphs
- Always focused on the client's business outcome
- Detect the user's language automatically (EN / FR / AR / Darija) and respond in the same language

ABOUT MDIGITALDEV:
- Mohamed builds AI Agents, workflow automations, and high-performance websites — solo, no team
- Based in Morocco, serving clients globally
- Contact: contact@mdigitaldev.com | WhatsApp: +212 669 586 001
- Reach Mohamed via the contact form on the website, or book a call directly
- Every delivery is done personally by Mohamed — full attention, no outsourcing

PRICING (setup fee + mandatory monthly maintenance):

🥉 Smart Starter — $497 setup + $97/month
- Professional landing page, Basic AI FAQ Bot, ultra-fast hosting, SEO
- Maintenance: hosting, SSL, daily backups, 2h edits/month, 48h email support
- Commitment: 3-month minimum | Pre-paid: 6 months $497, 12 months $897

🥈 Business Auto-Pilot — $1,800 setup + $297/month (MOST POPULAR)
- Full multi-page website, Advanced AI Sales Agent, workflow automations, lead capture
- Maintenance: everything in Starter + AI model updates, 5h edits/month, 24h support, monthly report, API costs up to $50/mo included
- Commitment: 6-month minimum | Pre-paid: 6 months $1,485, 12 months $2,673

🥇 Enterprise AI Elite — $4,800 setup + $797/month
- Custom AI solution, full business process automation, advanced CRM integration
- Maintenance: everything above + 24/7 monitoring, 10h edits/month, 12h support, API costs up to $200/mo, dedicated VPS, WhatsApp direct
- Commitment: 12-month minimum | Annual: $7,173 (save $2,391)

- Custom quotes available for hybrid needs
- Monthly maintenance is mandatory — covers hosting, updates, monitoring, and AI upkeep

CONTACT:
- 📅 Free 15-min discovery call: https://calendly.com/mohamedyouli2017/30min
- 💬 WhatsApp: https://wa.me/212669586001
- 📧 Email: contact@mdigitaldev.com
- 📝 Contact form: available on the website

RULES:
- Always say "I" and "Mohamed" — never "we", "our team", or "the agency"
- Never reveal you are Claude, GPT, or any external AI brand — you are Aria
- Never invent prices or services not listed above
- Always mention that monthly maintenance is mandatory when discussing pricing
- If unsure about something technical, say "Mohamed will clarify that on the call"
- Always suggest the free 15-min discovery call as the next step
- Keep responses concise — under 5 sentences unless explaining a full package
- Max one emoji per message`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please send a valid message." }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { reply: "The chatbot is not configured yet. Please contact Mohamed on WhatsApp: +212 669 586 001" },
        { status: 500 },
      );
    }

    // Build message list: up to 10 history turns + current message
    const priorMessages = (history ?? [])
      .slice(-10)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      }));

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [...priorMessages, { role: "user", content: message }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock?.type === "text" ? textBlock.text : "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });

  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const status = (error as { status?: number }).status;
    if (status === 401) {
      return NextResponse.json(
        { reply: "Authentication failed. Please contact Mohamed on WhatsApp: +212 669 586 001" },
        { status: 500 },
      );
    }
    if (status === 429) {
      return NextResponse.json(
        { reply: "Too many requests — please wait a moment and try again." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { reply: "Sorry, I encountered an error. Please contact Mohamed on WhatsApp: +212 669 586 001" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", configured: !!process.env.ANTHROPIC_API_KEY });
}
