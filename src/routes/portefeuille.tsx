import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { formatEuro, projects, type ProjectStatus } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portefeuille")({
  head: () => ({
    meta: [
      { title: "Portefeuille projets — AtlasIT" },
      {
        name: "description",
        content:
          "Inventaire complet des programmes IT : avancement, sponsors, budgets consommés et niveau de risque.",
      },
      { property: "og:title", content: "Portefeuille projets — AtlasIT" },
      {
        property: "og:description",
        content: "Avancement, sponsors, budgets et risques de chaque programme IT.",
      },
    ],
  }),
  component: PortfolioPage,
});

const filters: (ProjectStatus | "Tous")[] = ["Tous", "En cours", "À risque", "En attente", "Livré"];

function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectStatus | "Tous">("Tous");
  const rows = useMemo(
    () => (filter === "Tous" ? projects : projects.filter((p) => p.status === filter)),
    [filter],
  );

  return (
    <AppShell
      title="Portefeuille de projets"
      subtitle={`${rows.length} programmes affichés · gouvernance trimestrielle`}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              filter === f
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="text-xs tracking-wide text-muted-foreground uppercase">
            <tr className="border-b border-border">
              <th className="px-5 py-3 font-medium">Projet</th>
              <th className="px-5 py-3 font-medium">Domaine</th>
              <th className="px-5 py-3 font-medium">Avancement</th>
              <th className="px-5 py-3 font-medium">Budget</th>
              <th className="px-5 py-3 font-medium">Consommé</th>
              <th className="px-5 py-3 font-medium">Risque</th>
              <th className="px-5 py-3 font-medium">Échéance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => {
              const used = Math.round((p.spent / p.budget) * 100);
              return (
                <tr key={p.id} className="transition-colors hover:bg-muted/40">
                  <td className="px-5 py-4">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.id} · {p.sponsor}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{p.domain}</td>
                  <td className="px-5 py-4">
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{p.progress}%</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs">{formatEuro(p.budget)}</td>
                  <td className="px-5 py-4">
                    <span className={used > 85 ? "text-warning" : "text-muted-foreground"}>
                      {formatEuro(p.spent)} ({used}%)
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.risk === "Élevé"
                          ? "bg-destructive/15 text-destructive"
                          : p.risk === "Moyen"
                            ? "bg-warning/15 text-warning"
                            : "bg-success/15 text-success"
                      }`}
                    >
                      {p.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {new Date(p.endDate).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
