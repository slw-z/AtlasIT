import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { deliveryPerformance, domainSplit, monthlySpend, riskRadar } from "@/lib/portfolio-data";

const axis = { stroke: "var(--muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  color: "var(--popover-foreground)",
  fontSize: "12px",
};

export function ChartPanel({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel p-5 ${className}`}>
      <header className="mb-4">
        <h2 className="font-display text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <div className="h-72 w-full">{children}</div>
    </section>
  );
}

export function SpendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={monthlySpend} margin={{ left: -18, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="gReel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gBudget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} {...axis} />
        <YAxis tickLine={false} axisLine={false} {...axis} unit=" k€" width={70} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--border)" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="budget"
          name="Budget"
          stroke="var(--chart-2)"
          fill="url(#gBudget)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="reel"
          name="Dépenses réelles"
          stroke="var(--chart-1)"
          fill="url(#gReel)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DomainPie() {
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={domainSplit}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          stroke="var(--card)"
        >
          {domainSplit.map((entry, i) => (
            <Cell key={entry.name} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v} k€`} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DeliveryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={deliveryPerformance} margin={{ left: -20, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="trimestre" tickLine={false} axisLine={false} {...axis} />
        <YAxis tickLine={false} axisLine={false} {...axis} unit="%" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.35 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="delai" name="Respect délais" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="qualite" name="Qualité" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="adoption" name="Adoption" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RiskRadarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={riskRadar} outerRadius="75%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="axe" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
        <Radar
          name="Maîtrise des risques"
          dataKey="score"
          stroke="var(--chart-1)"
          fill="var(--chart-1)"
          fillOpacity={0.3}
        />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function ForecastChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={monthlySpend} margin={{ left: -18, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} {...axis} />
        <YAxis tickLine={false} axisLine={false} {...axis} unit=" k€" width={70} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="prevision"
          name="Prévision"
          stroke="var(--chart-3)"
          strokeDasharray="5 4"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="reel"
          name="Réel"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
