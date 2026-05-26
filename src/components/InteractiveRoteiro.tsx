import { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, Target, Users, Sparkles, Heart, AppWindow, Play, Pause, RotateCcw, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { RoteiroStep } from '../types';

const SAMPLE_ROTEIROS: RoteiroStep[] = [
  {
    title: "Roteiro Bem Casados: A Escuta Segura",
    category: "Comunicação Eficaz",
    verseBook: "Tiago 1:19",
    verseText: "“Todo homem, pois, seja pronto para ouvir, tardio para falar, tardio para se irar.”",
    contextText: "A escuta verdadeira é o maior desafio dentro de um relacionamento. Muitas vezes nós não ouvimos para compreender, mas para responder. Enquanto o outro ainda fala, já estamos formulando nossa contra-resposta no pensamento, transformando a conversa em um tribunal. Ouvir com o coração é abrir mão das próprias defesas e tentar acolher as dores do outro por trás das palavras expressas.",
    targetObjective: "Trabalhar a escuta empática e abrir espaço para o casal expressar sentimentos reprimidos sem interrupções ou julgamentos.",
    questions: [
      "Quando você sente que está sendo realmente ouvido(a) pelo seu cônjuge?",
      "Você acredita que ouve mais para entender de verdade ou para construir sua defesa?",
      "O que você gostaria de dizer hoje ao seu cônjuge, mas sente que ainda não teve espaço ou segurança?"
    ],
    exerciseTitle: "Roda da Escuta Segura",
    exerciseDuration: 300, // 5 minutes
    exerciseInstructions: [
      "Cada cônjuge terá 5 minutos para falar sobre um sentimento atual no relacionamento, de forma livre, justa e sem qualquer interrupção do parceiro.",
      "O cônjuge ouvinte deve apenas prestar atenção ativamente, sem gesticular insatisfação, revirar olhos ou preparar justificativas.",
      "Após os 5 minutos, quem apenas ouviu deve repetir o que compreendeu usando as próprias palavras, iniciando com: 'O que eu ouvi você dizer foi...' e 'O que você está sentindo é...'.",
      "Termine a rodada com um sincero aperto de mãos ou abraço e a frase: 'Obrigado por compartilhar isso comigo.'"
    ],
    prayerText: "Senhor, ensina-nos a ouvir com o Teu amor. Dá-nos paciência para acolher o outro, sabedoria para compreender além das palavras e humildade para ouvir antes de responder. Que a nossa escuta gere reconciliação e não distância. Amém."
  },
  {
    title: "Roteiro Bem Casados: Finanças Unificadas",
    category: "Alinhamento Financeiro",
    verseBook: "Eclesiastes 4:9-10",
    verseText: "“Melhor é serem dois do que um... Porque se um cair, o outro levanta o seu companheiro.”",
    contextText: "O dinheiro no casamento é mais sobre parceria e valores de vida do que sobre planilhas. Quando escondemos gastos ou agimos individualmente em relação ao sustento familiar, quebramos o princípio de sermos uma só carne. O alinhamento financeiro exige transparência absoluta e sonhos construídos em conjunto, onde o sucesso financeiro pertence ao casal, não ao indivíduo.",
    targetObjective: "Derrubar barreiras e segredos em torno das finanças, alinhando sonhos familiares e planejamentos comuns.",
    questions: [
      "Se você pudesse mudar um hábito financeiro na nossa rotina hoje, qual seria?",
      "Quais sentimentos a palavra 'dinheiro' evoca em você desde a sua infância (ansiedade, controle, liberdade, medo)?",
      "Qual é o maior sonho que você gostaria que nós realizássemos juntos nos próximos 3 anos?"
    ],
    exerciseTitle: "Acordo do Cofre Aberto",
    exerciseDuration: 180, // 3 minutes
    exerciseInstructions: [
      "Peguem um papel e escrevam individualmente os 3 maiores objetivos financeiros do ano.",
      "Comparem as listas e selecionem pelo menos 1 objetivo que seja de comum acordo.",
      "Definam quem gerencia qual tarefa e coloquem uma regra simples de bem-estar: 'Gastos individuais acima de um limite X (definir agora) sempre devem ser comunicados previamente.'"
    ],
    prayerText: "Pai celeste, nós unificamos a nossa vida financeira debaixo da Tua sabedoria. Que a ganância ou a ansiedade não encontrem morada no nosso lar. Ajuda-nos a sermos mordomos fiéis e parceiros justos para crescermos juntos na provisão da Tua graça. Amém."
  },
  {
    title: "Roteiro Bem Casados: O Poder do Perdão",
    category: "Reconciliação e Cura",
    verseBook: "Colossenses 3:13",
    verseText: "“Suportem-se uns aos outros e perdoem-se mutuamente... Assim como o Senhor os perdoou, perdoem também vocês.”",
    contextText: "O perdão não é um sentimento, é uma decisão de cancelar uma dívida emocional. Guardar ressentimento no matrimônio é como tomar veneno esperando que o parceiro morra. Quando não liberamos o perdão, as mágoas do passado ditam as brigas do presente, criando barreiras que impedem a verdadeira intimidade física e espiritual.",
    targetObjective: "Reconhecer feridas acumuladas e declarar o cancelamento de ressentimentos crônicos para revitalizar o laço matrimonial.",
    questions: [
      "Existe alguma mágoa do passado que você sente que ainda não cicatrizou completamente?",
      "No nosso dia a dia, qual comportamento meu te faz sentir incompreendido(a) ou ferido(a)?",
      "Como podemos sinalizar um ao outro quando o limite da paciência estiver perto de estourar?"
    ],
    exerciseTitle: "Exercício do Papel Desfeito",
    exerciseDuration: 240, // 4 minutes
    exerciseInstructions: [
      "Cada um escreve em um papel uma pequena mágoa ou erro recente que ainda traz desconforto.",
      "Olhando nos olhos do outro, leia o que escreveu e diga: 'Eu te confesso isso e peço que me perdoe.'",
      "O outro segura as mãos e diz: 'Eu te perdoo e escolho deixar isso no passado hoje.'",
      "Rasguem o papel juntos em pedacinhos simbólicos e descartem no lixo."
    ],
    prayerText: "Senhor da misericórdia, desfaça as amarguras e orgulhos no nosso coração. Concede-nos a graça de amar como Tu amas e perdoar como fomos perdoados. Que a cura de Jesus flua em todas as nossas memórias conjugais. Amém."
  }
];

export default function InteractiveRoteiro() {
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(SAMPLE_ROTEIROS[0].exerciseDuration);
  const [timerRunning, setTimerRunning] = useState(false);
  const [exerciseDone, setExerciseDone] = useState(false);

  const roteiro = SAMPLE_ROTEIROS[activeThemeIdx];

  // Reset timer if theme changes
  useEffect(() => {
    setTimerSeconds(roteiro.exerciseDuration);
    setTimerRunning(false);
    setExerciseDone(false);
    setCurrentStep(0);
  }, [activeThemeIdx, roteiro.exerciseDuration]);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      setExerciseDone(true);
      if (clearInterval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const steps = [
    { title: "Versículo", icon: BookOpen },
    { title: "Contexto", icon: Sparkles },
    { title: "Foco", icon: Target },
    { title: "Diálogo", icon: HelpCircle },
    { title: "Exercício", icon: Users },
    { title: "Oração", icon: Heart }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerSeconds(roteiro.exerciseDuration);
    setTimerRunning(false);
    setExerciseDone(false);
  };

  return (
    <div id="interactive-player" className="w-full bg-white rounded-2xl border border-stone-200/80 shadow-xl overflow-hidden focus-outline">
      {/* Header Tabs */}
      <div className="bg-stone-50 border-b border-stone-200 p-4">
        <span className="text-xs font-mono font-medium tracking-wide text-stone-400 block mb-2 uppercase">
          ✦ DEMONSTRAÇÃO PRÁTICA INTERATIVA
        </span>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="font-serif text-lg font-bold text-stone-800">
            Navegue pelos Roteiros de Sessão
          </h3>
          <div className="flex flex-wrap gap-1 bg-stone-200/60 p-1 rounded-lg w-full sm:w-auto">
            {SAMPLE_ROTEIROS.map((item, idx) => (
              <button
                key={idx}
                id={`btn-theme-${idx}`}
                onClick={() => setActiveThemeIdx(idx)}
                className={`flex-1 sm:flex-none text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  idx === activeThemeIdx
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {item.category.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Sandbox Player */}
      <div className="p-6 md:p-8 min-h-[420px] flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
              {roteiro.category}
            </span>
            <span className="text-xs text-amber-700/80 font-medium font-mono flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              📱 Formato de Aplicativo Interativo
            </span>
          </div>

          <h4 className="font-serif text-xl sm:text-2xl text-stone-900 mb-6 font-semibold border-b border-stone-100 pb-2">
            {roteiro.title}
          </h4>

          {/* Stepper Steps UI */}
          <div className="grid grid-cols-6 gap-1 mb-8 max-w-lg">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <button
                  key={idx}
                  id={`stepper-btn-${idx}`}
                  onClick={() => setCurrentStep(idx)}
                  className="flex flex-col items-center gap-1 group focus:outline-none"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-amber-700 text-white ring-4 ring-amber-100' 
                      : isPast 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] text-center hidden md:block mt-1 font-medium ${
                    isActive ? 'text-amber-800 font-bold' : 'text-stone-400'
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step Content Card */}
          <div className="bg-stone-50/50 rounded-xl p-5 border border-stone-100 min-h-[220px] transition-all">
            {currentStep === 0 && (
              <div className="space-y-4 animate-fade-in">
                <span className="text-xs font-mono text-amber-700 tracking-wider flex items-center gap-1.5 font-bold uppercase">
                  📖 VERSÍCULO CHAVE DE CONEXÃO
                </span>
                <p className="font-serif text-lg md:text-xl text-stone-800 leading-relaxed italic border-l-4 border-amber-600 pl-4 py-1">
                  {roteiro.verseText}
                </p>
                <div className="text-right text-sm font-semibold text-stone-600">
                  — {roteiro.verseBook}
                </div>
                <p className="text-xs text-stone-500 italic mt-4">
                  * Este versículo âncora estabelece o alicerce absoluto, sintonizando o espírito do casal com os ensinamentos da palavra de Deus.
                </p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-3 animate-fade-in">
                <span className="text-xs font-mono text-amber-700 tracking-wider flex items-center gap-1.5 font-bold uppercase">
                  🗣️ CONTEXTUALIZAÇÃO (FALA DO CONSELHEIRO)
                </span>
                <p className="text-stone-700 leading-relaxed text-sm md:text-base">
                  {roteiro.contextText}
                </p>
                <div className="bg-amber-50 p-2 text-xs text-amber-800 rounded border border-amber-100 mt-2">
                  <span className="font-semibold">Dica para o Mentor:</span> Fale de forma suave, sem olhar inquisidor. O objetivo é desarmar as resistências e neutralizar as defesas antes da abertura mútua.
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-3 animate-fade-in">
                <span className="text-xs font-mono text-amber-700 tracking-wider flex items-center gap-1.5 font-bold uppercase">
                  🎯 OBJETIVO CENTRAL DA SESSÃO
                </span>
                <div className="flex gap-3 items-start bg-amber-50/40 p-4 rounded-lg border border-stone-200">
                  <Target className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-stone-800 text-sm">Foco Espiritual & Emocional</h5>
                    <p className="text-stone-600 text-sm mt-1">
                      {roteiro.targetObjective}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-stone-400 mt-4">
                  Definir clareza para a sessão poupa horas de contendas colaterais, orientando o diálogo para a solução e cura real.
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <span className="text-xs font-mono text-amber-700 tracking-wider flex items-center gap-1.5 font-bold uppercase">
                  🗨️ PERGUNTAS-CHAVE PARA REFLEXÃO CONJUGAL
                </span>
                <div className="space-y-2">
                  {roteiro.questions.map((q, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 bg-white hover:bg-stone-50 rounded-lg border border-stone-100 transition-all shadow-xs">
                      <span className="w-5 h-5 bg-amber-100 text-amber-800 text-xs font-bold font-mono rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-stone-700 text-sm font-medium">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-200 pb-2">
                  <span className="text-xs font-mono text-amber-700 tracking-wider flex items-center gap-1.5 font-bold uppercase">
                    ✍️ EXERCÍCIO TERAPÊUTICO APLICADO
                  </span>
                  <div className="text-xs font-mono font-semibold bg-stone-200 px-2 py-0.5 rounded text-stone-700">
                    Título: {roteiro.exerciseTitle}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Instructions */}
                  <div className="lg:col-span-8 space-y-2">
                    {roteiro.exerciseInstructions.map((ins, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-stone-600">
                        <span className="text-amber-600 font-bold shrink-0">•</span>
                        <p>{ins}</p>
                      </div>
                    ))}
                  </div>

                  {/* Built-in Interactive Timer Tool */}
                  <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col items-center justify-center">
                    <span className="text-[10px] text-stone-400 font-mono font-medium block uppercase mb-1">Cronômetro Integrado</span>
                    <div className="font-mono text-2xl md:text-3xl font-extrabold text-stone-800 mb-3 tracking-widest">
                      {formatTime(timerSeconds)}
                    </div>
                    
                    <div className="flex gap-2 w-full justify-center">
                      <button
                        id="play-pause-timer"
                        onClick={toggleTimer}
                        className={`text-xs px-3 py-1.5 rounded-md font-semibold text-white flex items-center gap-1 transition-all ${
                          timerRunning 
                            ? 'bg-amber-600 hover:bg-amber-700' 
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        {timerRunning ? 'Pausar' : 'Iniciar'}
                      </button>

                      <button
                        id="reset-timer"
                        onClick={resetTimer}
                        className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold px-2 py-1.5 rounded-md flex items-center transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {exerciseDone && (
                      <div className="mt-2 text-[10px] text-green-700 flex items-center gap-0.5 animate-bounce font-medium font-mono">
                        <CheckCircle className="w-3.5 h-3.5" /> Exercício Finalizado!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4 animate-fade-in">
                <span className="text-xs font-mono text-amber-700 tracking-wider flex items-center gap-1.5 font-bold uppercase">
                  🙏 ORAÇÃO FINAL DE CONEXÃO E CURA
                </span>
                <p className="font-serif text-base text-stone-800 leading-relaxed italic bg-amber-50/50 p-4 rounded-xl border border-stone-200/60 shadow-xs">
                  {roteiro.prayerText}
                </p>
                <div className="p-3 bg-stone-100/60 rounded-lg text-xs text-stone-500 border border-stone-200">
                  <span className="font-semibold text-stone-700">Dica Prática:</span> Convide o casal a se dar as mãos, fechar os olhos e acompanhar calmamente cada sentença de comunhão com Deus.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-stone-100">
          <button
            id="prev-step-btn"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 text-xs py-2 px-3 rounded-lg font-bold border transition-all ${
              currentStep === 0
                ? 'text-stone-300 border-stone-200 cursor-not-allowed'
                : 'text-stone-600 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <div className="text-xs text-stone-500 font-medium">
            Etapa {currentStep + 1} de {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              id="next-step-btn"
              onClick={handleNext}
              className="flex items-center gap-1 text-xs py-2 px-4 rounded-lg font-bold text-white bg-amber-700 hover:bg-amber-800 transition-all shadow-md hover:translate-x-0.5"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="finish-step-btn"
              onClick={() => setCurrentStep(0)}
              className="flex items-center gap-1 text-xs py-2 px-4 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md animate-pulse"
            >
              <CheckCircle className="w-4 h-4" /> Concluído (Ver Denovo)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
