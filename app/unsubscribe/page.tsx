"use client";

import { Suspense, useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

/**
 * Same Formspree endpoint as components/LeadMagnet.tsx and app/guides/page.tsx —
 * every submission is emailed to shani.creates.ai@gmail.com.
 *
 * There is no mailing-list system behind this site: addresses are collected via
 * Formspree and the list itself lives in Shani's inbox. So there is nothing to
 * unsubscribe from automatically. This page therefore does the honest thing —
 * it delivers a clearly-marked removal request to Shani, who acts on it by hand.
 * ס' 30א לחוק התקשורת (בזק ושידורים) requires that consent can be withdrawn
 * easily; it does not require that the removal be automated. The page says so
 * out loud rather than implying automation that does not exist.
 */
const FORM_ENDPOINT = "https://formspree.io/f/mnjkvblg";

const FALLBACK_EMAIL = "shani.creates.ai@gmail.com";

// Deliberately permissive: this is a "did you mistype" guard, not a validator.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  label: string;
  placeholder: string;
  button: string;
  sending: string;
  manualHeading: string;
  manualBody: string;
  invalid: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  errorMailto: string;
  privacyPrefix: string;
  privacyLink: string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "הסרה מדיוור",
    title: "הסרה מרשימת התפוצה",
    intro:
      "רוצים להפסיק לקבל ממני מיילים? כתבו כאן את הכתובת שאליה הגיעו ההודעות, ואני אסיר אותה. אין צורך להסביר ואין שאלות בדרך.",
    label: "כתובת האימייל להסרה",
    placeholder: "you@example.com",
    button: "בקשת הסרה",
    sending: "שולחת…",
    manualHeading: "איך זה עובד בפועל",
    manualBody:
      "רשימת התפוצה שלי קטנה ומנוהלת ידנית, ולכן ההסרה נעשית על ידי בעצמי ולא באופן אוטומטי. הבקשה מגיעה אליי למייל מיד עם השליחה, ואני מסירה את הכתובת תוך 24 שעות. ייתכן שהודעה שכבר יצאה לדרך לפני שהבקשה נקלטה עדיין תגיע — אחריה לא יישלחו הודעות נוספות.",
    invalid: "הכתובת לא נראית תקינה. בדקו אותה ונסו שוב.",
    successTitle: "הבקשה התקבלה.",
    successBody:
      "הבקשה נשלחה אליי ואסיר את הכתובת תוך 24 שעות. אין צורך לעשות שום דבר נוסף. אם בכל זאת תמשיכו לקבל הודעות אחרי יומיים, כתבו לי ל-shani.creates.ai@gmail.com ואטפל בזה מיד.",
    errorTitle: "השליחה נכשלה.",
    errorBody:
      "משהו השתבש בדרך ולא הצלחתי לקלוט את הבקשה. כדי שההסרה לא תיפול בין הכיסאות, שלחו לי מייל עם הכתובת להסרה לכתובת",
    errorMailto: "שליחת בקשת הסרה במייל",
    privacyPrefix: "פרטים על שמירת המידע ועל הזכות לחזור מהסכמה —",
    privacyLink: "מדיניות הפרטיות",
  },
  en: {
    kicker: "Unsubscribe",
    title: "Unsubscribe from the mailing list",
    intro:
      "Want to stop receiving my emails? Enter the address the messages were sent to and I will remove it. No explanation needed and no questions on the way out.",
    label: "Email address to remove",
    placeholder: "you@example.com",
    button: "Request removal",
    sending: "Sending…",
    manualHeading: "How this actually works",
    manualBody:
      "My mailing list is small and managed by hand, so removal is done by me personally rather than automatically. Your request reaches my inbox the moment you send it, and I remove the address within 24 hours. A message already on its way before the request arrived may still land — nothing will be sent after it.",
    invalid: "That address doesn't look right. Please check it and try again.",
    successTitle: "Request received.",
    successBody:
      "Your request has been sent to me and I will remove the address within 24 hours. There is nothing else you need to do. If you still receive messages after two days, write to shani.creates.ai@gmail.com and I will sort it out immediately.",
    errorTitle: "Sending failed.",
    errorBody:
      "Something went wrong and the request did not reach me. So that your removal doesn't fall through the cracks, please email the address you want removed to",
    errorMailto: "Send the removal request by email",
    privacyPrefix: "Details on data retention and on withdrawing consent —",
    privacyLink: "Privacy Policy",
  },
};

function UnsubscribeForm() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";
  const params = useSearchParams();
  const inputId = useId();
  const statusId = useId();

  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error" | "invalid">("idle");

  /**
   * Prefill from ?email=… so a one-click unsubscribe link inside an email
   * (…/unsubscribe?email=someone@example.com) lands on a ready-to-send form.
   * Read in an effect rather than as the initial state so the field is not
   * frozen if the query string changes.
   */
  useEffect(() => {
    const q = params.get("email");
    if (q) setEmail(q.trim());
  }, [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setState("invalid");
      return;
    }

    setState("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          // Formspree uses _subject as the subject line of the email it sends,
          // so this request cannot be mistaken for a new lead in the inbox.
          _subject: "בקשת הסרה מדיוור — UNSUBSCRIBE REQUEST",
          request_type: "unsubscribe",
          action_required: "REMOVE THIS ADDRESS FROM THE MAILING LIST — do not treat as a new lead",
          email: value,
          marketing_consent: false,
          consent_withdrawn: true,
          consent_withdrawn_at: new Date().toISOString(),
          source: "unsubscribe-page",
          lang,
          prefilled_from_link: Boolean(params.get("email")),
          legal_basis: "ס' 30א לחוק התקשורת (בזק ושידורים), התשמ\"ב-1982",
        }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  const mailto =
    `mailto:${FALLBACK_EMAIL}` +
    `?subject=${encodeURIComponent("בקשת הסרה מדיוור / Unsubscribe request")}` +
    `&body=${encodeURIComponent(
      (email.trim() || c.placeholder) +
        (lang === "he"
          ? "\n\nאבקש להסיר את הכתובת הזו מרשימת התפוצה."
          : "\n\nPlease remove this address from the mailing list.")
    )}`;

  return (
    <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 860, margin: "0 auto" }}>
      {/* Keyboard focus ring — visible, high contrast, never removed. */}
      <style>{`
        .unsub-input:focus-visible,
        .unsub-btn:focus-visible,
        .unsub-link:focus-visible {
          outline: 3px solid var(--acc);
          outline-offset: 2px;
        }
        .unsub-input:focus { border-color: var(--acc); }
      `}</style>

      <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>{c.kicker}</div>
      <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO }}>{c.title}</h1>
      <p style={{ margin: "28px 0 0", color: "var(--ink)", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.7, fontFamily: HEEBO }}>{c.intro}</p>

      <section style={{ marginTop: 44 }}>
        <form
          onSubmit={onSubmit}
          noValidate
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: "clamp(20px,4vw,32px)",
          }}
        >
          <label
            htmlFor={inputId}
            style={{
              display: "block",
              fontFamily: HEEBO,
              fontWeight: 700,
              fontSize: 16,
              color: "var(--ink)",
              marginBottom: 10,
            }}
          >
            {c.label}
          </label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <input
              id={inputId}
              className="unsub-input"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              dir="ltr"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "invalid" || state === "error") setState("idle");
              }}
              placeholder={c.placeholder}
              aria-describedby={statusId}
              aria-invalid={state === "invalid"}
              style={{
                flex: "1 1 260px",
                minWidth: 0,
                minHeight: 48,
                padding: "13px 16px",
                borderRadius: 12,
                border: `1.5px solid ${state === "invalid" ? "var(--acc)" : "var(--line)"}`,
                background: "var(--page)",
                color: "var(--ink)",
                fontFamily: HEEBO,
                fontSize: 16,
                textAlign: "left",
              }}
            />
            <button
              type="submit"
              className="unsub-btn"
              disabled={state === "loading"}
              style={{
                flex: "0 0 auto",
                minHeight: 48,
                padding: "13px 26px",
                borderRadius: 12,
                border: "none",
                background: "var(--acc)",
                color: "var(--page)",
                fontFamily: HEEBO,
                fontWeight: 800,
                fontSize: 16,
                cursor: state === "loading" ? "not-allowed" : "pointer",
                opacity: state === "loading" ? 0.6 : 1,
              }}
            >
              {state === "loading" ? c.sending : c.button}
            </button>
          </div>

          {/* Single live region for every outcome, so a screen reader hears one
              announcement per submission rather than several competing ones. */}
          <div
            id={statusId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{ marginTop: state === "idle" ? 0 : 18 }}
          >
            {state === "invalid" && (
              <p style={{ margin: 0, fontFamily: HEEBO, fontSize: 15.5, lineHeight: 1.7, color: "var(--acc)", fontWeight: 700 }}>
                {c.invalid}
              </p>
            )}

            {state === "done" && (
              <div>
                <p style={{ margin: 0, fontFamily: HEEBO, fontSize: 18, lineHeight: 1.6, color: "var(--acc)", fontWeight: 800 }}>
                  {c.successTitle}
                </p>
                <p style={{ margin: "8px 0 0", fontFamily: HEEBO, fontSize: 16, lineHeight: 1.7, color: "var(--ink)" }}>
                  {c.successBody}
                </p>
              </div>
            )}

            {state === "error" && (
              <div>
                <p style={{ margin: 0, fontFamily: HEEBO, fontSize: 18, lineHeight: 1.6, color: "var(--acc)", fontWeight: 800 }}>
                  {c.errorTitle}
                </p>
                <p style={{ margin: "8px 0 0", fontFamily: HEEBO, fontSize: 16, lineHeight: 1.7, color: "var(--ink)" }}>
                  {c.errorBody}{" "}
                  <a
                    className="unsub-link"
                    href={mailto}
                    style={{ color: "var(--acc)", fontWeight: 700, textDecoration: "underline" }}
                  >
                    {FALLBACK_EMAIL}
                  </a>
                  .
                </p>
                <a
                  className="unsub-btn"
                  href={mailto}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginTop: 14,
                    minHeight: 44,
                    padding: "12px 22px",
                    borderRadius: 12,
                    border: "1.5px solid var(--acc)",
                    color: "var(--acc)",
                    fontFamily: HEEBO,
                    fontWeight: 800,
                    fontSize: 16,
                    textDecoration: "none",
                  }}
                >
                  {c.errorMailto}
                </a>
              </div>
            )}
          </div>
        </form>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
          {c.manualHeading}
        </h2>
        <p style={{ margin: "14px 0 0", color: "var(--ink)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, fontFamily: HEEBO }}>
          {c.manualBody}
        </p>
        <p style={{ margin: "14px 0 0", color: "var(--muted2)", fontSize: 15, lineHeight: 1.7, fontFamily: HEEBO }}>
          {c.privacyPrefix}{" "}
          <a className="unsub-link" href="/privacy" style={{ color: "var(--acc)", fontWeight: 700, textDecoration: "underline" }}>
            {c.privacyLink}
          </a>
          .
        </p>
      </section>

      <div style={{ height: 80 }} />
    </main>
  );
}

export default function UnsubscribePage() {
  /**
   * useSearchParams() opts the subtree into client-side rendering, and the App
   * Router build fails ("missing suspense boundary with useSearchParams") unless
   * it sits inside a Suspense boundary. The form lives in its own component and
   * is wrapped here; the fallback keeps the page height stable while it hydrates.
   */
  return (
    <>
      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <UnsubscribeForm />
      </Suspense>
      <Footer />
    </>
  );
}
