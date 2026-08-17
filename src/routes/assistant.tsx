import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { askPortfolioAI } from "@/lib/ai.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant IA du portefeuille — AtlasIT" },
      {
        name: "description",
        content:
          "Interrogez vos données de projets IT en langage naturel : budgets, risques, avancement et recommandations générées par l'IA.",
      },
      { property: "og:title", content: "Assistant IA du portefeuille — AtlasIT" },
      {
        property: "og:description",
        content: "Posez vos questions sur les budgets, risques et avancements de vos projets IT.",
      },
    ],
  }),
  component: AssistantPage,
});

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Quels projets dérivent le plus sur leur budget ?",
  "Résume les risques majeurs du portefeuille.",
  "Quel domaine consomme le plus d'enveloppe ?",
  "Que dois-je arbitrer au prochain comité ?",
];

function AssistantPage() {
  const ask = useServerFn(askPortfolioAI);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setError(null);
    setInput("");
    const history = messages.slice(-8);
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await ask({ data: { question: q, history } });
      if (res.error) setError(res.error);
      else setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Le service IA est indisponible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell
      title="Assistant IA du portefeuille"
      subtitle="Interrogez vos données projets en langage naturel"
    >
      <div className="panel grid-backdrop flex h-[calc(100vh-11rem)] flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="mx-auto max-w-xl py-10 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Sparkles className="size-6" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold">
                Que souhaitez-vous analyser&nbsp;?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                L'assistant s'appuie sur les données temps réel du portefeuille : budgets,
                avancements, risques et performance delivery.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-lg border border-border bg-card px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary/15 text-foreground ring-1 ring-primary/25"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Analyse des données du portefeuille…
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-3 border-t border-border bg-card/70 p-4 backdrop-blur"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex. : quel projet présente le plus fort risque de dépassement ?"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            <Send className="size-4" /> Envoyer
          </button>
        </form>
      </div>
    </AppShell>
  );
}
