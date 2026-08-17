import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  Wallet,
  Activity,
  Sparkles,
  ShieldCheck,
  Search,
  Bell,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Vue d'ensemble", icon: LayoutDashboard },
  { to: "/portefeuille", label: "Portefeuille", icon: FolderKanban },
  { to: "/budgets", label: "Budgets", icon: Wallet },
  { to: "/performance", label: "Performance", icon: Activity },
  { to: "/assistant", label: "Assistant IA", icon: Sparkles },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="border-b border-sidebar-border bg-sidebar lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-sidebar-foreground">
              Atlas<span className="text-primary">IT</span>
            </p>
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
              Governance suite
            </p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{
                className:
                  "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-primary/25",
              }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-sidebar-accent/60" }}
              className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden px-5 lg:block">
          <div className="panel p-4">
            <p className="text-xs text-muted-foreground">Comité de pilotage</p>
            <p className="mt-1 font-display text-sm">Jeudi 20 août · 09:30</p>
            <p className="mt-3 text-xs text-muted-foreground">
              7 projets à revoir, 2 arbitrages budgétaires.
            </p>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background/85 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="font-display text-xl font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
              <Search className="size-4" />
              <span>Rechercher un projet…</span>
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
            </button>
            <div className="grid size-9 place-items-center rounded-lg bg-accent/20 text-sm font-semibold text-accent ring-1 ring-accent/40">
              CM
            </div>
          </div>
        </header>

        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
