import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, TrendingUp, AlertTriangle, HeartPulse, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChartPanel, SpendChart, DomainPie, RiskRadarChart } from "@/components/dashboard/charts";
import {
  atRisk,
  avgHealth,
  formatEuro,
  projects,
  totalBudget,
  totalSpent,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AtlasIT — Pilotage BI des projets IT" },
      {
        name: "description",
        content:
          "Tableau de bord de business intelligence et de gouvernance IT : KPIs de portefeuille, budgets, performance et assistant IA.",
      },
      { property: "og:title", content: "AtlasIT — Pilotage BI des projets IT" },
      {
        property: "og:description",
        content: "KPIs de portefeuille, suivi budgétaire et analyse IA de vos projets IT.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const consumption = Math.round((totalSpent / totalBudget) * 100);

  return (
    <AppShell
      title="Vue d'ensemble du portefeuille"
      subtitle="Exercice 2026 · 7 programmes stratégiques suivis"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Budget total engagé"
          value={formatEuro(totalBudget)}
          delta={4.2}
          hint="vs. exercice précédent"
          icon={Wallet}
        />
        <KpiCard
          label="Consommation budgétaire"
          value={`${consumption}%`}
          delta={6.8}
          hint={`${formatEuro(totalSpent)} dépensés`}
          icon={TrendingUp}
          tone="accent"
        />
        <KpiCard
          label="Projets à risque"
          value={String(atRisk)}
          delta={-1}
          hint="arbitrage requis en comité"
          icon={AlertTriangle}
          tone="warning"
        />
        <KpiCard
          label="Santé moyenne"
          value={`${avgHealth}/100`}
          delta={2.5}
          hint="indice de gouvernance"
          icon={HeartPulse}
          tone="success"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <ChartPanel
          title="Trajectoire budgétaire"
          description="Budget planifié vs. dépenses réelles (k€)"
          className="xl:col-span-2"
        >
          <SpendChart />
        </ChartPanel>
        <ChartPanel title="Répartition par domaine" description="Enveloppes allouées (k€)">
          <DomainPie />
        </ChartPanel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <ChartPanel
          title="Maîtrise des risques"
          description="Score de gouvernance par axe de contrôle"
        >
          <RiskRadarChart />
        </ChartPanel>

        <section className="panel p-5 xl:col-span-2">
          <header className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-base font-semibold">Projets prioritaires</h2>
              <p className="text-sm text-muted-foreground">Suivi rapproché du comité</p>
            </div>
            <Link
              to="/portefeuille"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Tout voir <ArrowRight className="size-4" />
            </Link>
          </header>
          <ul className="divide-y divide-border">
            {projects.slice(0, 5).map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-4 py-3">
                <div className="min-w-48 flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.id} · {p.domain} · {p.sponsor}
                  </p>
                </div>
                <div className="w-40">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.progress}% réalisé</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    p.status === "À risque"
                      ? "bg-destructive/15 text-destructive"
                      : p.status === "Livré"
                        ? "bg-success/15 text-success"
                        : p.status === "En attente"
                          ? "bg-warning/15 text-warning"
                          : "bg-primary/15 text-primary"
                  }`}
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
