import { createFileRoute } from "@tanstack/react-router";
import { Wallet, PiggyBank, Receipt, Scale } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChartPanel, ForecastChart, DomainPie } from "@/components/dashboard/charts";
import { formatEuro, projects, totalBudget, totalSpent } from "@/lib/portfolio-data";

export const Route = createFileRoute("/budgets")({
  head: () => ({
    meta: [
      { title: "Suivi budgétaire — AtlasIT" },
      {
        name: "description",
        content:
          "Analyse des enveloppes budgétaires IT : consommation, reste à engager, prévisions et écarts par domaine.",
      },
      { property: "og:title", content: "Suivi budgétaire — AtlasIT" },
      {
        property: "og:description",
        content: "Consommation, reste à engager et prévisions budgétaires des programmes IT.",
      },
    ],
  }),
  component: BudgetsPage,
});

function BudgetsPage() {
  const remaining = totalBudget - totalSpent;

  return (
    <AppShell title="Gouvernance budgétaire" subtitle="Consommation et prévisions, exercice 2026">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Enveloppe validée"
          value={formatEuro(totalBudget)}
          delta={4.2}
          hint="CAPEX + OPEX"
          icon={Wallet}
        />
        <KpiCard
          label="Reste à engager"
          value={formatEuro(remaining)}
          delta={-8.4}
          hint="sur les 4 prochains mois"
          icon={PiggyBank}
          tone="accent"
        />
        <KpiCard
          label="Écart prévisionnel"
          value="+3,1%"
          delta={3.1}
          hint="dérive constatée en juillet"
          icon={Scale}
          tone="warning"
        />
        <KpiCard
          label="Coût moyen / projet"
          value={formatEuro(totalBudget / projects.length)}
          delta={1.7}
          hint="7 programmes actifs"
          icon={Receipt}
          tone="success"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <ChartPanel
          title="Réel vs. prévision"
          description="Trajectoire de consommation mensuelle (k€)"
          className="xl:col-span-2"
        >
          <ForecastChart />
        </ChartPanel>
        <ChartPanel title="Allocation par domaine" description="Répartition des enveloppes (k€)">
          <DomainPie />
        </ChartPanel>
      </div>

      <section className="panel mt-5 p-5">
        <h2 className="font-display text-base font-semibold">Consommation par projet</h2>
        <p className="text-sm text-muted-foreground">Alerte au-delà de 85% d'engagement</p>
        <ul className="mt-4 space-y-4">
          {projects.map((p) => {
            const used = Math.round((p.spent / p.budget) * 100);
            return (
              <li key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatEuro(p.spent)} / {formatEuro(p.budget)}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${used > 85 ? "bg-destructive" : used > 65 ? "bg-warning" : "bg-primary"}`}
                    style={{ width: `${used}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </AppShell>
  );
}
