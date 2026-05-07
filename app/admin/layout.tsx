"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import AdminSidebar from "@/components/admin/sidebar";
import AdminHeader  from "@/components/admin/header";
import { AdminI18nProvider, useAdminI18n } from "@/lib/admin-i18n";
import { AdminThemeProvider, useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { theme }  = useAdminTheme();
  const { dir }    = useAdminI18n();
  const isDark     = theme === "dark";

  return (
    <div
      className={cn(
        "min-h-screen flex",
        isDark ? "bg-[#0a0a0a] text-white" : "bg-[#f8f8f8] text-gray-900",
      )}
      dir={dir}
    >
      <AdminSidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: isDark
            ? { background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }
            : { background: "#fff", border: "1px solid #e5e7eb" },
        }}
      />
    </div>
  );
}

const AUTH_PATHS = ["/admin/sign-in"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const isAuthPage = AUTH_PATHS.some(p => pathname?.startsWith(p));

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: { colorPrimary: "#7c3aed" },
        elements: {
          card: "bg-[#111111] border border-white/10 shadow-2xl",
          headerTitle: "text-white",
          headerSubtitle: "text-white/50",
          socialButtonsBlockButton: "border-white/10 text-white hover:bg-white/10",
          formFieldInput: "bg-white/[0.06] border-white/[0.12] text-white",
          formFieldLabel: "text-white/60",
          footerActionLink: "text-violet-400",
        },
      }}
    >
      {isAuthPage ? (
        children
      ) : (
        <AdminThemeProvider>
          <AdminI18nProvider>
            <AdminShell>{children}</AdminShell>
          </AdminI18nProvider>
        </AdminThemeProvider>
      )}
    </ClerkProvider>
  );
}
