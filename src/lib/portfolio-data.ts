export type ProjectStatus = "En cours" | "À risque" | "Livré" | "En attente";

export type Project = {
  id: string;
  name: string;
  domain: string;
  sponsor: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  health: number;
  risk: "Faible" | "Moyen" | "Élevé";
  endDate: string;
};

export const projects: Project[] = [
  {
    id: "PRJ-1042",
    name: "Migration ERP S/4HANA",
    domain: "Finance",
    sponsor: "C. Mercier",
    status: "À risque",
    progress: 62,
    budget: 4200000,
    spent: 3180000,
    health: 54,
    risk: "Élevé",
    endDate: "2026-11-30",
  },
  {
    id: "PRJ-1088",
    name: "Plateforme Data Lakehouse",
    domain: "Data & IA",
    sponsor: "L. Adam",
    status: "En cours",
    progress: 78,
    budget: 2650000,
    spent: 1810000,
    health: 82,
    risk: "Moyen",
    endDate: "2026-09-15",
  },
  {
    id: "PRJ-1103",
    name: "Refonte portail client",
    domain: "Digital",
    sponsor: "S. Novak",
    status: "En cours",
    progress: 45,
    budget: 1350000,
    spent: 520000,
    health: 88,
    risk: "Faible",
    endDate: "2027-02-28",
  },
  {
    id: "PRJ-0997",
    name: "Programme Zero Trust",
    domain: "Cybersécurité",
    sponsor: "M. Okoye",
    status: "En cours",
    progress: 71,
    budget: 3100000,
    spent: 2440000,
    health: 69,
    risk: "Moyen",
    endDate: "2026-12-20",
  },
  {
    id: "PRJ-0954",
    name: "Automatisation RPA Achats",
    domain: "Opérations",
    sponsor: "T. Lefèvre",
    status: "Livré",
    progress: 100,
    budget: 780000,
    spent: 742000,
    health: 95,
    risk: "Faible",
    endDate: "2026-06-30",
  },
  {
    id: "PRJ-1121",
    name: "Copilote IA support N1",
    domain: "Data & IA",
    sponsor: "A. Ruiz",
    status: "En attente",
    progress: 12,
    budget: 950000,
    spent: 86000,
    health: 74,
    risk: "Moyen",
    endDate: "2027-05-31",
  },
  {
    id: "PRJ-1010",
    name: "Modernisation réseau WAN",
    domain: "Infrastructure",
    sponsor: "P. Berg",
    status: "À risque",
    progress: 38,
    budget: 1980000,
    spent: 1290000,
    health: 48,
    risk: "Élevé",
    endDate: "2027-01-31",
  },
];

export const monthlySpend = [
  { month: "Jan", budget: 1250, reel: 1180, prevision: 1210 },
  { month: "Fév", budget: 1300, reel: 1355, prevision: 1290 },
  { month: "Mar", budget: 1420, reel: 1390, prevision: 1400 },
  { month: "Avr", budget: 1380, reel: 1465, prevision: 1420 },
  { month: "Mai", budget: 1500, reel: 1610, prevision: 1540 },
  { month: "Juin", budget: 1560, reel: 1495, prevision: 1560 },
  { month: "Juil", budget: 1620, reel: 1702, prevision: 1650 },
  { month: "Août", budget: 1700, reel: 1748, prevision: 1720 },
];

export const domainSplit = [
  { name: "Data & IA", value: 3600 },
  { name: "Finance", value: 4200 },
  { name: "Cybersécurité", value: 3100 },
  { name: "Digital", value: 1350 },
  { name: "Infrastructure", value: 1980 },
];

export const deliveryPerformance = [
  { trimestre: "T1", delai: 82, qualite: 88, adoption: 61 },
  { trimestre: "T2", delai: 74, qualite: 91, adoption: 68 },
  { trimestre: "T3", delai: 79, qualite: 86, adoption: 77 },
  { trimestre: "T4", delai: 88, qualite: 93, adoption: 84 },
];

export const riskRadar = [
  { axe: "Budget", score: 68 },
  { axe: "Délais", score: 54 },
  { axe: "Ressources", score: 72 },
  { axe: "Conformité", score: 86 },
  { axe: "Technique", score: 61 },
  { axe: "Fournisseurs", score: 77 },
];

export const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
export const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
export const atRisk = projects.filter((p) => p.status === "À risque").length;
export const avgHealth = Math.round(
  projects.reduce((s, p) => s + p.health, 0) / projects.length,
);

export const formatEuro = (value: number, compact = true) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);

export const portfolioContext = JSON.stringify(
  {
    projets: projects,
    budgetTotal: totalBudget,
    consomme: totalSpent,
    depensesMensuellesKEuros: monthlySpend,
    performanceLivraison: deliveryPerformance,
    radarRisques: riskRadar,
  },
  null,
  0,
);
