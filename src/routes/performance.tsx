import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Timer, Users, Target } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import {
  ChartPanel,
  DeliveryChart,
  RiskRadarChart,
  SpendChart,
} from "@/components/dashboard/charts";

export const Route = createFileRoute("/performance")({
  head: () => ({
    meta: [
      { title: "Performance analytique — AtlasIT" },
      {
        name: "description",
        content:
          "Indicateurs analytiques de delivery IT : respect des délais, qualité, adoption et maîtrise des risques par trimestre.",
      },
      { property: "og:title", content: "Performance analytique — AtlasIT" },
      {
        property: "og:description",
        content: "Délais, qualité, adoption et risques : la performance delivery en un coup d'œil.",
      },
    ],
  }),
  component: PerformancePage,
});

function PerformancePage() {
  return (
    <AppShell
      title="Performance analytique"
      subtitle="Delivery, qualité et adoption sur 4 trimestres glissants"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Respect des délais"
          value="88%"
          delta={9}
          hint="T4 vs. T3"
          icon={Timer}
        />
        <KpiCard
          label="Qualité livrée"
          value="93%"
          delta={7}
          hint="taux d'acceptation recette"
          icon={Target}
          tone="success"
        />
        <KpiCard
          label="Adoption utilisateurs"
          value="84%"
          delta={7}
          hint="après 60 jours de mise en service"
          icon={Users}
          tone="accent"
        />
        <KpiCard
          label="Vélocité moyenne"
          value="42 pts"
          delta={-3}
          hint="par sprint et par équipe"
          icon={Gauge}
          tone="warning"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <ChartPanel
          title="Indicateurs delivery"
          description="Comparaison trimestrielle (%)"
          className="xl:col-span-2"
        >
          <DeliveryChart />
        </ChartPanel>
        <ChartPanel title="Radar de gouvernance" description="Maîtrise par axe de contrôle">
          <RiskRadarChart />
        </ChartPanel>
      </div>

      <div className="mt-5">
        <ChartPanel
          title="Corrélation budget / exécution"
          description="Dépenses mensuelles rapportées au plan (k€)"
        >
          <SpendChart />
        </ChartPanel>
      </div>
    </AppShell>
  );
}
