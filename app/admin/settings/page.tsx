"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Globe, Bell, Key, User, Check, Eye, EyeOff } from "lucide-react";
import PageHeader from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type Lang = "ar" | "en" | "fr";

const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "ar", label: "Arabic",  native: "العربية" },
  { code: "en", label: "English", native: "English"  },
  { code: "fr", label: "French",  native: "Français" },
];

function SectionCard({ title, children, delay = 0, isDark, cardBg }: {
  title: string; children: React.ReactNode; delay?: number; isDark: boolean; cardBg: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/[0.07]" : "border-gray-200 shadow-sm")}
    >
      <div className={cn("px-5 py-4 border-b", isDark ? "border-white/[0.07] bg-white/[0.02]" : "border-gray-100 bg-gray-50")}>
        <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{title}</p>
      </div>
      <div className={cn("p-5 space-y-5", cardBg.replace(/border[^ ]*/g, "").trim())}>
        {children}
      </div>
    </motion.div>
  );
}

function Row({ label, description, children, isDark }: {
  label: string; description?: string; children: React.ReactNode; isDark: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{label}</p>
        {description && <p className={cn("text-xs mt-0.5", isDark ? "text-white/35" : "text-gray-400")}>{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, isDark }: { value: boolean; onChange: (v: boolean) => void; isDark: boolean }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors",
        value ? "bg-violet-600" : isDark ? "bg-white/10" : "bg-gray-200",
      )}
    >
      <span className={cn(
        "absolute top-0.5 start-0.5 w-5 h-5 rounded-full bg-white shadow transition-all",
        value ? "translate-x-5" : "translate-x-0",
      )} />
    </button>
  );
}

function SecretInput({ value, placeholder, isDark }: { value: string; placeholder?: string; isDark: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm w-72",
      isDark ? "bg-white/[0.04] border-white/[0.08] text-white" : "bg-white border-gray-200 text-gray-900",
    )}>
      <input
        readOnly
        type={show ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none min-w-0 font-mono text-xs"
      />
      <button onClick={() => setShow(s => !s)} className={cn(isDark ? "text-white/30 hover:text-white" : "text-gray-400 hover:text-gray-700")}>
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { t, lang, setLang } = useAdminI18n();
  const { theme, setTheme }  = useAdminTheme();
  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const [saved, setSaved]              = useState(false);
  const [notifLeads, setNotifLeads]    = useState(true);
  const [notifMeetings, setNotifMeetings] = useState(true);
  const [notifPayments, setNotifPayments] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls = cn(
    "px-3 py-2 rounded-xl border text-sm outline-none focus:border-violet-500/50 transition-colors w-full",
    isDark ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-white/25" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400",
  );

  return (
    <div className="space-y-6 max-w-[700px]">
      <PageHeader title={t.settings.title} subtitle="Manage your admin dashboard preferences" />

      {/* Profile */}
      <SectionCard title={t.settings.profile} delay={0.05} isDark={isDark} cardBg={cardBg}>
        <Row label="Full Name" isDark={isDark}>
          <input defaultValue="Mohamed Youli" className={cn(inputCls, "w-48 md:w-64")} />
        </Row>
        <Row label="Email" isDark={isDark}>
          <input defaultValue="contact@mdigitaldev.com" className={cn(inputCls, "w-48 md:w-64")} />
        </Row>
        <Row label="Business" isDark={isDark}>
          <input defaultValue="MDigitalDev" className={cn(inputCls, "w-48 md:w-64")} />
        </Row>
        <Row label="WhatsApp" isDark={isDark}>
          <input defaultValue="+212 6XX XXX XXX" className={cn(inputCls, "w-48 md:w-64")} />
        </Row>
      </SectionCard>

      {/* Appearance */}
      <SectionCard title={t.settings.theme} delay={0.1} isDark={isDark} cardBg={cardBg}>
        <Row label={t.settings.darkMode} description="Switch between dark and light mode" isDark={isDark}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme("light")}
              className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                theme === "light" ? "bg-violet-600 text-white" : isDark ? "text-white/35 hover:bg-white/[0.07]" : "text-gray-400 hover:bg-gray-100")}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                theme === "dark" ? "bg-violet-600 text-white" : isDark ? "text-white/35 hover:bg-white/[0.07]" : "text-gray-400 hover:bg-gray-100")}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </Row>
      </SectionCard>

      {/* Language */}
      <SectionCard title={t.settings.language} delay={0.15} isDark={isDark} cardBg={cardBg}>
        <Row label="Dashboard Language" description="Changes all labels, dates, and layout direction" isDark={isDark}>
          <div className="flex gap-2">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  lang === l.code
                    ? "bg-violet-600 text-white"
                    : isDark ? "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                {l.native}
              </button>
            ))}
          </div>
        </Row>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title={t.settings.notifications} delay={0.2} isDark={isDark} cardBg={cardBg}>
        <Row label="New Leads"    description="Notify when a new lead submits the contact form" isDark={isDark}>
          <Toggle value={notifLeads}    onChange={setNotifLeads}    isDark={isDark} />
        </Row>
        <Row label="New Meetings" description="Notify when a discovery call is booked" isDark={isDark}>
          <Toggle value={notifMeetings} onChange={setNotifMeetings} isDark={isDark} />
        </Row>
        <Row label="Payments"     description="Notify on payment received or overdue" isDark={isDark}>
          <Toggle value={notifPayments} onChange={setNotifPayments} isDark={isDark} />
        </Row>
      </SectionCard>

      {/* API Keys */}
      <SectionCard title="API Keys" delay={0.25} isDark={isDark} cardBg={cardBg}>
        <Row label="Anthropic (Claude)" description="Used by the Aria chatbot" isDark={isDark}>
          <SecretInput value="sk-ant-api03-fnTw1..." isDark={isDark} />
        </Row>
        <Row label="Clerk Publishable Key" description="Admin auth" isDark={isDark}>
          <SecretInput value="pk_live_…" placeholder="Not configured" isDark={isDark} />
        </Row>
        <Row label="Supabase URL" description="Database connection" isDark={isDark}>
          <SecretInput value="https://…supabase.co" placeholder="Not configured" isDark={isDark} />
        </Row>
      </SectionCard>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all",
            saved
              ? "bg-emerald-600 text-white"
              : "bg-violet-600 hover:bg-violet-700 text-white",
          )}
        >
          {saved ? <><Check className="w-4 h-4" />{t.settings.saved}</> : t.settings.save}
        </button>
      </div>
    </div>
  );
}
