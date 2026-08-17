import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AskInput = z.object({
  question: z.string().min(1).max(2000),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .max(12)
    .optional(),
});

export const askPortfolioAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AskInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Clé AI manquante côté serveur.");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const { streamText } = await import("ai");
    const { portfolioContext } = await import("./portfolio-data");

    const gateway = createLovableAiGatewayProvider(key);

    try {
      const result = streamText({
        model: gateway("google/gemini-2.5-flash"),
        system: [
          "Tu es l'analyste IA d'un tableau de bord de gouvernance de projets IT.",
          "Réponds en français, de façon concise et factuelle (max 8 lignes), en t'appuyant uniquement sur les données fournies.",
          "Cite des chiffres précis (budgets en euros, avancement en %) et propose une recommandation actionnable.",
          `Données du portefeuille (JSON): ${portfolioContext}`,
        ].join("\n"),
        messages: [
          ...(data.history ?? []).map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: data.question },
        ],
      });
      return { answer: await result.text };
    } catch (error) {
      const status = (error as { statusCode?: number; status?: number }).statusCode ??
        (error as { status?: number }).status;
      if (status === 429) {
        return { answer: "", error: "Limite de requêtes atteinte, réessayez dans un instant." };
      }
      if (status === 402) {
        return { answer: "", error: "Crédits IA épuisés : ajoutez des crédits dans Lovable." };
      }
      return {
        answer: "",
        error: error instanceof Error ? error.message : "Erreur du service IA.",
      };
    }
  });
