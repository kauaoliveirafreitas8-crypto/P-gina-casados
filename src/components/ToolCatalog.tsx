import { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Compass, ChevronDown, Check, ArrowRight } from 'lucide-react';

interface QuarterCategory {
  quarter: string;
  focus: string;
  subtitle: string;
  weeks: string;
  description: string;
  themes: { title: string; verse: string; benefit: string }[];
}

const YEAR_CURRICULUM: QuarterCategory[] = [
  {
    quarter: "Fase 1: Comunicação & Alinhamento",
    focus: "Restaurando o Diálogo Diário",
    subtitle: "Roteiros de quebra de gelo, escuta ativa e conexões emocionais de fala pura.",
    weeks: "Semanas 1 a 13",
    description: "Ideal para casais frios, com conversas meramente funcionais, silenciosos ou propensos a explosões por besteiras cotidianas.",
    themes: [
      { title: "Roteiro da Escuta Segura", verse: "Tiago 1:19", benefit: "Neutraliza reações ríspidas e constrói empatia mútua." },
      { title: "Linguagens do Amor sob as Escrituras", verse: "1 Coríntios 13:4-5", benefit: "Identifica como o outro prefere receber apoio e validação." },
      { title: "Quebrando Hábitos de Crítica", verse: "Efésios 4:29", benefit: "Substitui cobranças ríspidas por sentimentos reais de vulnerabilidade." },
      { title: "Altar Conjugal de Acordo Diário", verse: "Amós 3:3", benefit: "Estabelece rotinas espirituais sem peso ou obrigatoriedade." }
    ]
  },
  {
    quarter: "Fase 2: Cura de Feridas & Perdão",
    focus: "Curando Passados e Ressentimentos",
    subtitle: "Roteiros para desarmar mágoas acumuladas, traumas de infância ou ciúmes.",
    weeks: "Semanas 14 a 26",
    description: "Foco absoluto em faxina emocional. Ajuda a arrancar raízes de amargura de discussões passadas que ainda comandam o cônjuge.",
    themes: [
      { title: "O Cancelamento de Dívidas Emocionais", verse: "Colossenses 3:13", benefit: "Zera o tribunal mental de cobranças e foca na restauração." },
      { title: "Curando as Feridas da Casa Paterna", verse: "Salmo 147:3", benefit: "Identifica dores infantis que influenciam as crises atuais." },
      { title: "Dificuldade de Confiança e Suspeita", verse: "Provérbios 3:5", benefit: "Reconstrói pontes de segurança onde houve rompimentos." },
      { title: "Reconhecendo Nossas Próprias Vigas", verse: "Mateus 7:3", benefit: "Gera autorresponsabilidade rápida nas falhas cotidianas." }
    ]
  },
  {
    quarter: "Fase 3: Alinhamento de Finanças",
    focus: "Prosperidade e Sonhos em Unidade",
    subtitle: "Roteiros sobre acordos financeiros claros, sonhos compartilhados e generosidade.",
    weeks: "Semanas 27 a 39",
    description: "O dinheiro deixa de ser motivo de discórdia e passa a ser uma ferramenta de aliança governada sob os conselhos de Deus.",
    themes: [
      { title: "Acordo do Cofre Transparente", verse: "Eclesiastes 4:9-10", benefit: "Sana desconfianças com gastos ocultos e compras solitárias." },
      { title: "Vencendo a Ansiedade pela Provisão", verse: "Mateus 6:33", benefit: "Tranquiliza o espírito nas crises pelo suprimento financeiro." },
      { title: "Planejamento Familiar de Honra", verse: "Lucas 14:28", benefit: "Roteiro prático para desenhar metas em total sintonia familiar." },
      { title: "O Legado da Generosidade Conjugal", verse: "Provérbios 11:25", benefit: "Sintoniza o casal com as bênçãos bíblicas da doação e colheita." }
    ]
  },
  {
    quarter: "Fase 4: Intimidade & Legado",
    focus: "Fogo, Romance e Proteção Espiritual",
    subtitle: "Roteiros focados em intimidade sexual sagrada, romance e blindagem familiar.",
    weeks: "Semanas 40 em Diante",
    description: "Criação de legados que inspiram as próximas gerações. Reacende a chama física e a cumplicidade silenciosa no casamento.",
    themes: [
      { title: "A Intimidade no Altar Secreto", verse: "Cânticos 4:10", benefit: "Desmistifica crenças limitantes e traz beleza à união sexual." },
      { title: "Blindagem de Olhar e Filtros", verse: "Salmo 101:3", benefit: "Protege o casal contra influências pornográficas e mundanas." },
      { title: "Aliança do Toque Curativo", verse: "Marcos 10:8", benefit: "Restabelece proximidade física e carinho após percalços." },
      { title: "O Legado Consagrado de Filhos", verse: "Josué 24:15", benefit: "Instaura uma cultura familiar sólida de espiritualidade ativa." }
    ]
  }
];

export default function ToolCatalog() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSmoothScrollToCheckout = () => {
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="tool-catalog" className="w-full bg-cream-gradient border border-stone-200/80 rounded-2xl shadow-lg p-6 md:p-8 focus-outline">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-stone-200/80 pb-4">
        <div>
          <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 font-mono px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1 font-bold">
            ✦ Estrutura Pedagógica Validada
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Cronograma Anual Completo de Sessões
          </h3>
          <p className="text-stone-500 text-xs md:text-sm mt-1">
            As ferramentas exclusivas no aplicativo cobrem todo o ciclo de aconselhamentos focados e transformadores.
          </p>
        </div>
        <div className="flex items-center gap-2 text-stone-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 shrink-0 text-xs font-semibold">
          <Calendar className="w-4 h-4 text-amber-700" />
          Roteiros Completos no Aplicativo
        </div>
      </div>

      <div className="space-y-4">
        {YEAR_CURRICULUM.map((cat, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div 
              key={idx} 
              className={`border rounded-xl transition-all ${
                isExpanded 
                  ? 'border-amber-600/40 bg-white shadow-md' 
                  : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
              }`}
            >
              <button
                id={`catalog-header-toggle-${idx}`}
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-4 md:p-5 flex justify-between items-center gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm font-bold shrink-0 ${
                    isExpanded 
                      ? 'bg-amber-700 text-white' 
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif font-bold text-stone-900 text-sm md:text-base">
                        {cat.quarter}
                      </span>
                      <span className="text-[9px] bg-stone-100 text-stone-500 font-mono px-1.5 py-0.5 rounded-full border border-stone-200/50">
                        {cat.weeks}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500 font-medium block">
                      {cat.focus}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-700' : ''}`} />
              </button>

              {isExpanded && (
                <div className="p-4 md:p-5 pt-0 border-t border-stone-100 animate-fade-in space-y-4">
                  <p className="text-stone-600 text-xs md:text-sm italic pl-1 border-l-2 border-stone-300">
                    {cat.subtitle}
                  </p>
                  <p className="text-stone-500 text-xs">
                    <strong className="text-stone-700">Para quem serve:</strong> {cat.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {cat.themes.map((theme, tIdx) => (
                      <div key={tIdx} className="bg-stone-50 p-3 rounded-lg border border-stone-200/50 flex gap-2.5 items-start">
                        <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-xs font-bold text-stone-800">{theme.title}</span>
                            <span className="text-[9px] bg-amber-50 text-amber-800 font-mono px-1 rounded border border-amber-200/40 text-[8px]">
                              {theme.verse}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-0.5">{theme.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <a
          id="btn-catalog-order"
          href="https://pay.kiwify.com.br/RZhHZcj"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-amber-600/30 hover:border-amber-700 text-amber-800 hover:text-amber-950 font-bold text-xs py-2.5 px-5 rounded-xl hover:bg-amber-50 transition-all active:scale-95 text-center"
        >
          Quero o cronograma completo de roteiros <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
