"use client";
import React from "react";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

import { Link } from "next-view-transitions";

import { Select } from "@/components/ui/select";
import { getDictionary } from "@/content/dictionaries";
import { pathFor, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "message";

const fieldBase =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-[15px] text-white " +
  "placeholder-white/30 outline-none transition-all duration-300 " +
  "focus:bg-white/[0.07] focus:ring-4 focus:ring-brand-500/15";

const Label = ({
  htmlFor,
  children,
  required,
  id,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  id?: string;
}) => (
  <label
    id={id}
    htmlFor={htmlFor}
    className="mb-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55"
  >
    {children}
    {required ? <span className="text-brand-400">*</span> : null}
  </label>
);

export const ContactForm = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const page = dict.pages.contact;
  const form = page.form;

  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Partial<Record<Field, string>>>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  const fieldClass = (field: Field) =>
    cn(fieldBase, errors[field] ? "border-red-400/70" : "border-white/10 hover:border-white/20 focus:border-brand-400");

  const errorFor = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} role="alert" className="mt-2 text-xs text-red-300">
        {errors[field]}
      </p>
    ) : null;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const data = Object.fromEntries(new FormData(element).entries()) as Record<string, string>;

    // Validação nossa: o formulário tem noValidate, por isso o browser não abre
    // as bolhas de aviso dele, que não têm nada a ver com o desenho do site.
    const found: Partial<Record<Field, string>> = {};
    if (!data.name?.trim()) found.name = form.errors.name;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email?.trim() ?? "")) found.email = form.errors.email;
    if (!data.message?.trim()) found.message = form.errors.message;

    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setMessage(form.required);
      const first = Object.keys(found)[0];
      (element.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (response.status === 429) {
        setStatus("error");
        setMessage(form.tooMany);
        return;
      }
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      setMessage(form.success);
      element.reset();
    } catch {
      setStatus("error");
      setMessage(form.error);
    }
  }

  return (
    <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 backdrop-blur-sm md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-brand-500/25 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      <div className="relative z-10 mb-9 flex items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <h2 className="font-display text-2xl leading-tight text-white md:text-3xl">
          {page.formTitle}
        </h2>
        <span className="hidden shrink-0 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-200 sm:block">
          24h
        </span>
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="relative z-10">
        {/* armadilha para robôs: invisível e fora da ordem de tabulação */}
        <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" required>
              {form.name}
            </Label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              aria-required="true"
              placeholder={form.namePlaceholder}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={fieldClass("name")}
            />
            {errorFor("name")}
          </div>
          <div>
            <Label htmlFor="email" required>
              {form.email}
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-required="true"
              placeholder={form.emailPlaceholder}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={fieldClass("email")}
            />
            {errorFor("email")}
          </div>
          <div>
            <Label htmlFor="phone">{form.phone}</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={form.phonePlaceholder}
              className={cn(fieldBase, "border-white/10 hover:border-white/20 focus:border-brand-400")}
            />
          </div>
          <div>
            <Label htmlFor="service" id="service-label">
              {form.service}
            </Label>
            <Select
              id="service"
              name="service"
              options={form.serviceOptions}
              labelledBy="service-label"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message" required>
              {form.message}
            </Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              aria-required="true"
              placeholder={form.messagePlaceholder}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(fieldClass("message"), "resize-none")}
            />
            {errorFor("message")}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className={cn(
              "group inline-flex items-center gap-3 rounded-full bg-brand-500 py-3.5 pl-7 pr-3.5",
              "font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-white",
              "border border-brand-400/60 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_18px_40px_-18px_rgba(124,58,237,0.9)]",
              "transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400 active:scale-[0.99]",
              "disabled:pointer-events-none disabled:opacity-60"
            )}
          >
            {status === "submitting" ? form.submitting : form.submit}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
              {status === "success" ? (
                <IconCheck className="h-4 w-4" />
              ) : (
                <IconArrowRight className="h-4 w-4" />
              )}
            </span>
          </button>

          {message ? (
            <p
              role="status"
              className={cn("text-sm", status === "success" ? "text-brand-200" : "text-red-300")}
            >
              {message}
            </p>
          ) : null}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/55">
          {form.consent}{" "}
          <Link
            href={pathFor(locale, "privacy")}
            className="text-white/75 underline-offset-4 transition-colors hover:text-brand-300 hover:underline"
          >
            {form.consentLink}
          </Link>
          .
        </p>
      </form>
    </div>
  );
};
