import { NextResponse } from "next/server";
import { site } from "@/content/site";

/**
 * Endpoint do formulário de contacto.
 * Define RESEND_API_KEY (e opcionalmente CONTACT_TO) em .env.local para entregar por email.
 * Sem chave, o pedido é validado e registado sem conteúdo, para o formulário continuar
 * a funcionar em desenvolvimento.
 */

const MAX_BODY_BYTES = 12_000;
const LIMITS = { name: 120, email: 160, phone: 40, service: 80, message: 4000 } as const;

// Janela simples por IP. Em serverless cada instância tem a sua janela, por isso isto
// trava bots simples, não substitui um WAF à frente do site.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      hits.forEach((value, key) => {
        if (now > value.resetAt) hits.delete(key);
      });
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "desconhecido";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too-many-requests" }, { status: 429 });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload-too-large" }, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload-too-large" }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  // Campo escondido: só um robô o preenche. Responde-se com sucesso para não dar pistas.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const message = clean(payload.message, LIMITS.message);

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid-fields" }, { status: 422 });
  }

  const body = [
    `Nome: ${name}`,
    `Email: ${email}`,
    `Telemóvel: ${clean(payload.phone, LIMITS.phone) || "-"}`,
    `Serviço: ${clean(payload.service, LIMITS.service) || "-"}`,
    `Idioma: ${clean(payload.locale, 5) || "-"}`,
    "",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Sem chave não há para onde enviar. Regista-se o acontecimento, nunca o conteúdo.
    console.info("[contact] mensagem recebida sem RESEND_API_KEY configurada");
    if (process.env.NODE_ENV !== "production") console.info(body);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: email,
      subject: `Novo contacto de ${name}`,
      text: body,
    }),
  });

  if (!response.ok) {
    console.error("[contact] falha na entrega", response.status);
    return NextResponse.json({ ok: false, error: "delivery-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
