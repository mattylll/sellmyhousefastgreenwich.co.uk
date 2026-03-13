"use client";

import { useState } from "react";
import { getSiteConfig } from "@/lib/config";
import { submitLead } from "@/lib/leads";

export function ContactForm() {
  const config = getSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await submitLead({
        formType: "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (result.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else if (result.fallbackUrl) {
        window.open(result.fallbackUrl, "_blank");
        setStatus("sent");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
          Message Sent
        </h3>
        <p className="text-[var(--color-muted-foreground)]">
          We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-[var(--color-foreground)] mb-1"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="contact-name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--border-radius)] bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-[var(--color-foreground)] mb-1"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="contact-email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--border-radius)] bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
      </div>
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-[var(--color-foreground)] mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="contact-phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--border-radius)] bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[var(--color-foreground)] mb-1"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 rounded-[var(--border-radius)] bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-[var(--color-secondary)] text-[var(--color-background)] font-semibold rounded-[var(--border-radius)] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-[var(--color-destructive)] text-sm">
          Something went wrong. Please try again or call us at{" "}
          <a
            href={"tel:" + config.brand.phone.replace(/\s+/g, "")}
            className="underline font-semibold"
          >
            {config.brand.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}
