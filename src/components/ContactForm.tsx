"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-4 rounded-2xl border border-black/10 p-6 dark:border-white/10"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-neutral-500"
        >
          {t("formName")}
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5 text-neutral-900 outline-none focus:border-[var(--accent)] dark:border-white/20 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-neutral-500"
        >
          {t("email")}
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5 text-neutral-900 outline-none focus:border-[var(--accent)] dark:border-white/20 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-neutral-500"
        >
          {t("formMessage")}
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full resize-y rounded-lg border border-black/15 bg-transparent px-4 py-2.5 text-neutral-900 outline-none focus:border-[var(--accent)] dark:border-white/20 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-green-700 dark:text-green-400">
          {t("formSuccess")}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          {t("formError")}
        </p>
      )}
    </form>
  );
}
