import { useState } from 'react';
import { QuizQuestion } from '../types';
import { Check, ClipboardList, HelpCircle, ArrowRight, ShieldCheck, HeartCrack, Flame, Lock } from 'lucide-react';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Como costumam terminar as discussões mais difíceis no relacionamento?",
    options: [
      {
        text: "Conseguimos ouvir os argumentos do outro com calma e resolvemos sem ressentimentos.",
        score: 0,
        explanation: "Sinal de escuta madura e acolhimento mútuo."
      },
      {
        text: "Um de nós se fecha em silêncio absoluto ou se retira para evitar o estresse do conflito.",
        score: 2,
        explanation: "Sinal de distanciamento de segurança emocional."
      },
      {
        text: "Acaba subindo o tom de voz, resgatando erros antigos do passado e trocando farpas.",
        score: 3,
        explanation: "Risco alto de desgaste crônico e transbordamento emocional."
      }
    ]
  },
  {
    id: 2,
    question: "Como vocês enxergam a administração do dinheiro atualmente?",
    options: [
      {
        text: "Temos total transparência, planejamento unificado e discutimos objetivos em concordância.",
        score: 0,
        explanation: "Alinhamento bíblico de comunhão total de bens e espírito."
      },
      {
        text: "Dividimos as contas básicas, mas cada um tem a sua vida financeira sem precisar dar feedbacks.",
        score: 1,
        explanation: "Vida financeira compartilhada apenas de forma burocrática, falta conexão de propósitos."
      },
      {
        text: "Brigar por dinheiro é uma constante ou há segredos em relação aos gastos de cada um.",
        score: 3,
        explanation: "Infidelidade financeira implícita ou séria falta de consonância administrativa."
      }
    ]
  },
  {
    id: 3,
    question: "Com que frequência compartilham momentos de oração ou leitura bíblica em casal?",
    options: [
      {
        text: "Frequentemente. Praticamos devocionais juntos e nos sentimos fortalecidos na fé.",
        score: 0,
        explanation: "Forte base espiritual de sustentação espiritual no lar."
      },
      {
        text: "Ocasionalmente, apenas na igreja ou quando estamos passando por alguma dificuldade extrema.",
        score: 2,
        explanation: "Fé utilitária, faltam hábitos diários de nutrição espiritual mútua."
      },
      {
        text: "Praticamente nunca rezamos ou estudamos a palavra juntos; cada um vive sua fé isoladamente.",
        score: 3,
        explanation: "Vazio devocional conjugal, enfraquece a blindagem contra as tempestades da vida."
      }
    ]
  },
  {
    id: 4,
    question: "Quando surge alguma mágoa ou mal-entendido grande, como prossegue o perdão?",
    options: [
      {
        text: "Conversamos abertamente, pedimos desculpas sinceras e escolhemos deixar o ocorrido para trás.",
        score: 0,
        explanation: "Capacidade ágil de cicatrização emocional."
      },
      {
        text: "Esperamos que o tempo esfrie os ânimos sem discutir muito, mas o desconforto permanece por dias.",
        score: 2,
        explanation: "Substituição do perdão real pelo esquecimento simulado; gera ressentimento latente."
      },
      {
        text: "Guardamos mágoa e costumamos represar esse erro para usar de argumento em confrontos futuros.",
        score: 3,
        explanation: "Ressentimento crônico ativo, agindo como barreira de rancor e cinismo."
      }
    ]
  }
];

export default function DiagnosticQuiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (score: number) => {
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setCompleted(false);
  };

  const calculateTotalScore = () => {
    return answers.reduce((acc, curr) => acc + curr, 0);
  };

  const getResult = () => {
    const score = calculateTotalScore();
    if (score <= 2) {
      return {
        title: "Laço Fortalecido e Alinhado",
        colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
        icon: ShieldCheck,
        desc: "Parabéns! Há uma base de respeito mútuo, diálogo e valores compartilhados no seu lar. Entretanto, manter e nutrir essa conexão espiritual é um dever de todos os dias.",
        suggestedFocus: "Manutenção preventiva através de roteiros de aprofundamento emocional, dinâmicas de romance e desafios de reconexão de 7 dias."
      };
    } else if (score <= 6) {
      return {
        title: "Conexão Sob Monitoramento (Zonas de Alerta)",
        colorClass: "text-amber-700 bg-amber-50 border-amber-200",
        icon: Flame,
        desc: "Cuidado. Existem focos de silêncio, divergências ocultas ou desculpas parciais que aos poucos constroem uma parede invisível na vida de vocês. O individualismo está ganhando espaço.",
        suggestedFocus: "Aplicação imediata de roteiros sobre escuta compassiva, diálogo financeiro transparente e dinâmicas de quebra de gelo para casais."
      };
    } else {
      return {
        title: "Urgência de Restauração Conjugal",
        colorClass: "text-rose-700 bg-rose-50 border-rose-200",
        icon: HeartCrack,
        desc: "Sinal Vermelho. O relacionamento dá marcas de fadiga emocional severa, mágoas represadas ou perda da conexão devocional em casal. É fundamental desarmar disputas de ego.",
        suggestedFocus: "Uso estratégico e continuado de roteiros sobre perdão genuíno, cura de feridas emocionais conjugais e práticas frequentes de oração mútua ordenada."
      };
    }
  };

  const handleSmoothScrollToCheckout = () => {
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="diagnostic-tool" className="w-full bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-2xl p-6 md:p-8 focus-outline">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-600/20 text-amber-500 rounded-lg">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1 font-bold">
            ✦ Bônus Premium 1 (Visualização Interativa)
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight text-white">
            Mini Diagnóstico de Saúde Relacional
          </h3>
        </div>
      </div>

      {!completed ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs text-stone-400 mb-2 font-mono">
              <span>Questão {currentQuestionIdx + 1} de {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentQuestionIdx) / QUIZ_QUESTIONS.length) * 100)}% Concluído</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-600 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-stone-800/40 p-4 rounded-xl border border-stone-800 min-h-[70px] flex items-center">
            <h4 className="font-medium text-stone-100 text-sm md:text-base leading-relaxed">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Answers List */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                id={`quiz-option-${currentQuestion.id}-${idx}`}
                onClick={() => handleSelectOption(opt.score)}
                className="w-full text-left p-4 rounded-xl border border-stone-800 bg-stone-800/20 hover:bg-stone-800/70 hover:border-amber-600/40 transition-all group flex items-start gap-3 active:scale-[0.99] focus-outline"
              >
                <div className="w-4.5 h-4.5 border border-stone-600 group-hover:border-amber-500 rounded-full flex items-center justify-center text-amber-500 shrink-0 mt-0.5 group-hover:bg-amber-600/10 transition-all font-mono text-[10px] font-bold">
                  {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                </div>
                <span className="text-stone-300 text-xs md:text-sm group-hover:text-white transition-colors">
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Result Banner */}
          {(() => {
            const result = getResult();
            const ResultIcon = result.icon;
            return (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${result.colorClass} flex flex-col sm:flex-row items-center sm:items-start gap-3`}>
                  <ResultIcon className="w-8 h-8 shrink-0 mt-0.5" />
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold font-serif text-base tracking-tight mb-1">
                      Status do Diagnóstico: {result.title}
                    </h4>
                    <p className="text-xs leading-relaxed opacity-95">
                      {result.desc}
                    </p>
                  </div>
                </div>

                {/* Score breakdown description */}
                <div className="bg-stone-800/30 p-5 rounded-xl border border-stone-800 space-y-3">
                  <div className="text-xs font-mono font-bold tracking-wide text-amber-500 uppercase">
                    🛠️ RECOMENDAÇÃO DE FERRAMENTAS DO MATRICIAL NO APLICATIVO
                  </div>
                  <p className="text-sm text-stone-200">
                    <strong className="text-white">Área Recomendada para iniciar:</strong> {result.suggestedFocus}
                  </p>
                  <p className="text-xs text-stone-400">
                    Ao adquirir o kit completo, você recebe o questionário relacional estendido (com dezenas de métricas para casais) para que você meça os resultados e aplique as sessões certas no momento oportuno.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    id="cta-quiz-order"
                    href="https://pay.kiwify.com.br/RZhHZcj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 text-center"
                  >
                    Garantir Meu Kit + Diagnóstico <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    id="btn-quiz-retry"
                    onClick={restartQuiz}
                    className="px-4 py-3 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 text-xs font-semibold transition-all font-mono"
                  >
                    Refazer Diagnóstico
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
