import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Check, 
  X, 
  Star, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Coins, 
  MessageCircle, 
  Heart, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Volume2, 
  Award, 
  ChevronDown 
} from 'lucide-react';

import InteractiveRoteiro from './components/InteractiveRoteiro';
import DiagnosticQuiz from './components/DiagnosticQuiz';
import ToolCatalog from './components/ToolCatalog';
import CheckoutModal from './components/CheckoutModal';
import { Testimonial, FaqItem, ComparisonItem } from './types';

// Structured static contents to keep the app highly modular and readable
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Como eu recebo o material?",
    answer: "O envio é 100% digital e imediato. Assim que o pagamento (Pix ou Cartão) for processado no nosso sistema, você receberá um link exclusivo no e-mail cadastrado para acessar o material diretamente em formato de aplicativo prático e interativo no seu celular ou computador."
  },
  {
    question: "Preciso ter formação em Psicologia ou Teologia para aplicar?",
    answer: "Não! O material foi desenhado em linguagem clara e estruturada passo-a-passo. É totalmente acessível para mentores cristãos, casais dispostos a fazer devocionais profundos, líderes de ministério da família e terapeutas em busca de roteiros diretos e validados."
  },
  {
    question: "Como funciona a garantia de 12 Dias?",
    answer: "Nós confiamos tanto na qualidade espiritual e metodológica do kit que oferecemos uma garantia integral de 12 Dias. Se em até 12 Dias você ler e sentir que a metodologia não serve para as suas reuniões ou casamento, devolvemos 100% do seu dinheiro sem letras miúdas. Basta enviar um e-mail."
  },
  {
    question: "Como funciona o formato de aplicativo?",
    answer: "O material é fornecido diretamente em formato de aplicativo no seu celular, tablet ou computador. Você pode navegar de forma extremamente simples por todos os temas, ler os roteiros e interagir com cada ferramenta de forma interativa e dinâmica, sem necessidade de baixar arquivos PDF ou imprimir nada."
  },
  {
    question: "Os bônus estão inclusos no preço de R$ 19,90?",
    answer: "Sim! Nesta promoção oficial de hoje, todos os bônus (Diagnóstico Relacional, Hacks de Finanças, Desafio de 7 Dias e Caderno de Dinâmicas) estão 100% inclusos sem qualquer taxa extra."
  }
];

const COMPARISONS: ComparisonItem[] = [
  {
    feature: "Estrutura pronta 'Abra e Aplique'",
    premiumValue: "Total. Bastam 5 minutos de leitura prévia antes de iniciar o atendimento.",
    premiumStatus: true,
    commonValue: "Baixa. Você precisa gastar horas extraindo ideias, criando slides e inventando exercícios do zero.",
    commonStatus: false
  },
  {
    feature: "Equilíbrio Bíblico-Terapêutico",
    premiumValue: "Conexão perfeita entre teologia bíblica profunda e técnicas de psicologia relacional.",
    premiumStatus: true,
    commonValue: "Nenhum. Ou são livros teóricos cansativos de ler ou são manuais de psicologia sem valores de fé.",
    commonStatus: false
  },
  {
    feature: "Caderno de Exercícios Práticos",
    premiumValue: "Exercícios curtos, dinâmicos e cronometrados para fazer na hora da sessão.",
    premiumStatus: true,
    commonValue: "Inexistente. Apenas discussões soltas que abrem espaço para longas discussões sem fim.",
    commonStatus: false
  },
  {
    feature: "Custos por Roteiro estruturado",
    premiumValue: "Menos de R$ 1,00 por sessão estruturada e validada com acesso eterno.",
    premiumStatus: true,
    commonValue: "Alto. Assinaturas caras ou cursos cansativos que exigem investimentos pesados do seu bolso.",
    commonStatus: false
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Pastor Cláudio & Elizabeth Viana",
    role: "Líderes de Ministério de Famílias",
    avatarSeed: "silvia",
    content: "Os roteiros do 'Casados para Sempre' simplificaram 100% o nosso modelo de aconselhamento. O roteiro de escuta empática e o do cancelamento de mágoas geraram confissões e lágrimas reais nos nossos casamentos acompanhados. Recomendo muito para todas as igrejas cristãs.",
    stars: 5,
    date: "Há 2 semanas"
  },
  {
    name: "Dra. Rebeca Mendes",
    role: "Terapeuta Familiar Cristã",
    avatarSeed: "rebeca",
    content: "O grande diferencial é a união da prática clínica com a Palavra. Muitos casamentos se fecham para terapias tradicionais, mas se desarmam completamente diante dos versículos estruturados e das dinâmicas silenciosas propostas no kit. Me poupou horas preciosas de planejamento.",
    stars: 5,
    date: "Há 1 mês"
  },
  {
    name: "Mateus & Kelly Rocha",
    role: "Aconselhados por Líder",
    avatarSeed: "mateus",
    content: "Passamos por uma crise financeira forte que quase desfez nossa aliança. Nosso mentor usou o roteiro do 'Acordo do Cofre Aberto' conosco. Foi a primeira vez que conversamos sobre contas domésticas com carinho, oração e transparência real. Foi um divisor de águas.",
    stars: 5,
    date: "Há 3 dias"
  }
];

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  // Countdown timer logic for a ticking scarcity banner
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 48, seconds: 54 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimer = () => {
    const { hours, minutes, seconds } = timeLeft;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx);
  };

  const handleSmoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="landing-root" className="min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900 leading-normal">
      
      {/* ⚠️ Top Scarcity Notification Bar */}
      <div className="bg-amber-900 text-amber-200 text-xs py-2.5 px-4 font-mono font-medium text-center flex flex-col sm:flex-row justify-center items-center gap-2 border-b border-amber-800 tracking-wide">
        <span className="flex items-center gap-1.5 font-bold uppercase shrink-0 mx-auto">
          <Clock className="w-4.5 h-4.5 text-amber-400 animate-pulse" /> 
          Oferta de lançamento: Desconto HOJE (26/05/2026)
        </span>
      </div>

      {/* Hero Section */}
      <header className="relative bg-cream-gradient border-b border-stone-200/80 pt-10 pb-16 md:py-24 px-4 overflow-hidden">
        {/* Abstract sacred grid art background lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-stone-900 rounded-full"></div>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-stone-900 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
          
          {/* Hero Copy (Centered Layout) */}
          <div className="space-y-6 max-w-3xl mx-auto">

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
              Ferramentas Terapêuticas Extraídas da <span className="italic underline decoration-amber-600 underline-offset-4 text-amber-900">Bíblia</span> para Cura e Desbloqueio Emocional de casais
            </h1>

            <div className="my-4 overflow-hidden rounded-2xl border border-stone-200/80 shadow-md bg-stone-100 max-w-2xl mx-auto">
              <img 
                src="/src/assets/images/casal_biblia_restauracao_1779810559742.png" 
                alt="Casal cristão orando sobre uma Bíblia aberta para cura e restauração emocional" 
                className="w-full h-auto aspect-video object-cover hover:scale-[1.02] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-stone-600 text-base md:text-lg max-w-2xl leading-relaxed font-sans mx-auto">
              As mesmas ferramentas aplicadas por terapeutas cristãos experientes para destravar emoções, afastar desavenças e recuperar a intimidade no casamento, agora unificadas em um kit validado de cabeceira.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
              <div className="flex gap-2 items-start text-stone-700">
                <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm font-medium">Ideal para Mentores, Líderes Cristãos e Conselheiros.</span>
              </div>
              <div className="flex gap-2 items-start text-stone-700">
                <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm font-medium">Formato 100% digital.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <a
                id="hero-cta-order"
                href="https://pay.kiwify.com.br/RZhHZcj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-800 hover:bg-amber-950 text-white font-bold text-sm py-4 px-8 rounded-xl shadow-lg transition-all hover:translate-y-[-1px] focus-outline flex items-center justify-center gap-2 group text-center"
              >
                QUERO AS FERRAMENTAS <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
              </a>
              
              <button
                id="hero-scroll-demo"
                onClick={() => handleSmoothScrollTo('interactive-player-section')}
                className="w-full sm:w-auto text-stone-600 hover:text-stone-900 font-bold text-xs py-3 px-6 rounded-xl hover:bg-stone-200/50 transition-colors border border-stone-300/80"
              >
                Ver Exemplo de Roteiro
              </button>
            </div>

            {/* Social Proof Review badge */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-stone-200/60 max-w-xl mx-auto">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 11].map((n) => (
                  <div key={n} className="w-7 h-7 rounded-full bg-stone-300 border-2 border-white flex items-center justify-center overflow-hidden font-mono text-[9px] font-bold text-stone-600">
                    {n === 11 ? "+1k" : `C${n}`}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex justify-center sm:justify-start items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="text-xs font-bold text-stone-800 ml-1">4.9/5</span>
                </div>
                <span className="text-[11px] text-stone-500 block">
                  Mais de 1.400 líderes e terapeutas já utilizam as ferramentas
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Core Pain Points & Solutions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
              Pare de Perder Horas Criando Sessões de Casal do Zero
            </h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto">
              Tenha em mãos roteiros testados em aconselhamentos de casais reais. É só abrir, aplicar e ver a transformação conjugal se realizar!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/70 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-800 text-sm md:text-base">Prático, Claro e Direto</h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                Roteiros prontos que contam com versículos poderosos, perguntas cruciais e dinâmicas lúdicas passo-a-passo.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/70 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-800 text-sm md:text-base">Comprovado no Ringue Real</h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                Material exaustivamente testado em terapias de casais, baseado em princípios bíblicos duradouros.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/70 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-800 text-sm md:text-base">Presencial & Consultório Virtual</h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                Funciona com alta adesão em reuniões de casais no Zoom, Google Meet ou dinâmicas locais na sua igreja.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Sandbox Session Demo Section */}
      <section id="interactive-player-section" className="py-16 px-4 bg-stone-50 border-t border-b border-stone-200/70">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 font-mono px-2.5 py-1 rounded uppercase tracking-wider font-bold">
              🛠️ EXPERIMENTE GRÁTIS NA PÁGINA
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900">
              Veja Como é Fácil Aplicar no Dia a Dia
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto">
              Interaja com o simulador de roteiro abaixo e veja a estrutura que você terá para cada um dos temas do seu acervo.
            </p>
          </div>

          <InteractiveRoteiro />

          <p className="text-center text-xs text-stone-400 italic">
            * O kit completo contém todos os roteiros estruturados iguaizinhos a estes para usar diretamente em formato de aplicativo no seu celular ou tablet.
          </p>
        </div>
      </section>

      {/* Curriculum breakdown timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <ToolCatalog />
        </div>
      </section>

      {/* Competitive comparison against other solutions with collapse/expand detail */}
      <section className="py-16 px-4 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
              Por que Outros Manuais e Livros Genéricos Falharam com Você?
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto">
              Descubra por que a metodologia conjugal &quot;Casados para Sempre&quot; gera engajamento e transformação onde a concorrência tradicional falha.
            </p>
          </div>

          <div className="overflow-hidden border border-stone-200 rounded-2xl bg-white shadow-sm">
            <div className="grid grid-cols-12 bg-stone-900 text-white p-3 font-mono text-[10px] font-bold uppercase tracking-wider text-center">
              <div className="col-span-4 text-left pl-2">Recurso Metodológico</div>
              <div className="col-span-4 text-amber-400">Kit Casados Para Sempre</div>
              <div className="col-span-4 text-stone-400">Outros Manuais Teóricos</div>
            </div>

            <div className="divide-y divide-stone-200">
              {COMPARISONS.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 items-center text-xs text-stone-700">
                  <div className="col-span-4 font-bold text-stone-800 pr-1">{item.feature}</div>
                  
                  <div className="col-span-4 text-center bg-amber-50/50 py-3 px-2 rounded-lg border border-amber-100/50 space-y-1">
                    <span className="font-bold text-amber-950 block">{item.premiumValue}</span>
                  </div>
                  
                  <div className="col-span-4 text-center text-stone-500 py-3 px-2">
                    <span>{item.commonValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Area featuring the product matching images */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">SUPER BÔNUS EXCLUSIVOS</span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900">
              Bônus Exclusivos Para Aquisição Hoje
            </h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto">
              Ao garantir o seu Kit de Roteiros de Aconselhamento, você recebe uma suíte de materiais especiais em formato de aplicativo interativo para usar no seu celular e blindar todos os pilares do casal.
            </p>
          </div>

          {/* Bonuses Grid (Bônus 1, 2, 3, 4) with Premium Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bônus 1 */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 border-b border-stone-200/60">
                  <img 
                    src="/src/assets/images/casal_biblia_restauracao_1779810559742.png" 
                    alt="Bônus 1: Diagnóstico Relacional Clássico" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 pt-2 space-y-2">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded uppercase">Bônus 1</span>
                  <h4 className="font-bold text-stone-900 text-sm md:text-base leading-tight">Diagnóstico Relacional Clássico</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Ferramenta de diagnóstico em formato de aplicativo para encontrar de forma imediata bloqueios de comunicação e gargalos no casamento antes de iniciar os roteiros.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-3 border-t border-stone-200 text-xs text-amber-700 font-bold italic text-right bg-amber-50/20">
                Incluso Grátis
              </div>
            </div>

            {/* Bônus 2 */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 border-b border-stone-200/60">
                  <img 
                    src="/src/assets/images/bonus_finance_simple_1779815949917.png" 
                    alt="Bônus 2: Blindagem de Finanças de Casais" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 pt-2 space-y-2">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded uppercase">Bônus 2</span>
                  <h4 className="font-bold text-stone-900 text-sm md:text-base leading-tight">Blindagem de Finanças</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Princípios práticos e hacks na tela do celular para extinguir discussões financeiras, organizar o orçamento doméstico sob bênção divina e traçar caminhos de prosperidade.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-3 border-t border-stone-200 text-xs text-amber-700 font-bold italic text-right bg-amber-50/20">
                Incluso Grátis
              </div>
            </div>

            {/* Bônus 3 */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 border-b border-stone-200/60">
                  <img 
                    src="/src/assets/images/bonus_dynamics_simple_1779815968939.png" 
                    alt="Bônus 3: Dinâmicas Para Casais" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 pt-2 space-y-2">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded uppercase">Bônus 3</span>
                  <h4 className="font-bold text-stone-900 text-sm md:text-base leading-tight">Caderno de Dinâmicas Práticas</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Atividades inteligentes e quebra-gelos inovadores em formato digital para encontros lúdicos de casais, pequenos grupos ou encontros especiais.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-3 border-t border-stone-200 text-xs text-amber-700 font-bold italic text-right bg-amber-50/20">
                Incluso Grátis
              </div>
            </div>

            {/* Bônus 4 */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 border-b border-stone-200/60">
                  <img 
                    src="/src/assets/images/bonus_challenge_simple_1779815988715.png" 
                    alt="Bônus 4: Desafio 7 Dias de Reconexão" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 pt-2 space-y-2">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded uppercase">Bônus 4</span>
                  <h4 className="font-bold text-stone-900 text-sm md:text-base leading-tight">Desafio 7 Dias de Reconexão</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Cronograma diariamente estruturado de atividades afetivas e orações ágeis para casais restabelecerem a cumplicidade e superarem a rotina fria.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-3 border-t border-stone-200 text-xs text-amber-700 font-bold italic text-right bg-amber-50/20">
                Incluso Grátis
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-stone-50 border-t border-b border-stone-200/60 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
              O Que Dizem Quem Já Usa na Prática
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto">
              Líderes de casais, pastores e conselheiros do Brasil testemunham as reconciliações geradas a partir destas abordagens bíblicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs text-left flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-xs md:text-sm italic leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing and Guarantee CTA block */}
      <section id="pricing-section" className="py-16 px-4 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-stone-50 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-12">
          
          {/* Main Pricing Box */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 md:p-10 border border-stone-800 shadow-2xl space-y-8 relative overflow-hidden text-center">

            <div className="space-y-4">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase block w-fit mx-auto">
                🎉 ADQUIRA O COMBO HOJE COM DESCONTO
              </span>

              {/* Duplicated premium image above the section name */}
              <div className="my-4 overflow-hidden rounded-2xl border border-stone-800 shadow-md bg-stone-950/40 max-w-md mx-auto">
                <img 
                  src="/src/assets/images/casal_biblia_restauracao_1779810559742.png" 
                  alt="Casal cristão orando sobre uma Bíblia aberta para cura e restauração emocional" 
                  className="w-full h-auto aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="font-serif text-3xl font-extrabold tracking-tight text-white">
                Kit Completo Casados Para Sempre
              </h3>
              <p className="text-stone-400 text-xs md:text-sm max-w-md mx-auto">
                Material focado estruturado para conselheiros, líderes espirituais e maridos/esposas comprometidos com a saúde do matrimônio.
              </p>
            </div>

            {/* Checklist of what's inside the kit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto bg-stone-950/60 p-5 rounded-2xl border border-stone-850">
              <div className="flex gap-2 items-center text-xs text-stone-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>❤️ Roteiros Poderosos para Casais</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-stone-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>❤️ Bônus: Caderno de Dinâmicas Práticas</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-stone-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>❤️ Bônus: Diagnóstico Relacional Clássico</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-stone-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>❤️ Bônus: 50 Hacks para Blindar Finanças</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-stone-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>❤️ Bônus: Desafio 7 Dias de Reconexão</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-stone-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>❤️ Garantia Especial de 12 Dias</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-stone-300 col-span-1 sm:col-span-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>🔒 Pagamento 100% Seguro e Protegido</span>
              </div>
            </div>

            {/* Updated Price Box to 19,90 */}
            <div className="space-y-1 bg-stone-950/40 p-4 rounded-xl border border-stone-850 max-w-xs mx-auto">
              <span className="text-stone-500 line-through text-xs block">De R$ 97,00 por apenas</span>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-500 tracking-tight font-mono">
                R$ 19,90
              </div>
              <span className="text-[10px] text-stone-400 block font-medium">Pagamento único via Pix ou Cartão</span>
            </div>

            {/* Purchase CTA buttons */}
            <div className="space-y-4">
              <a
                id="btn-trigger-checkout-combo"
                href="https://pay.kiwify.com.br/RZhHZcj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-4 px-8 rounded-xl shadow-lg transition-all hover:translate-y-[-1px] font-serif uppercase tracking-wider focus-outline inline-flex items-center justify-center gap-2 text-center"
              >
                ADQUIRIR O COMBO COMPLETO + BÔNUS
              </a>

              <div className="flex justify-center items-center gap-3 text-stone-400 text-[10px] font-mono">
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-stone-500" /> Transação Criptografada</span>
                <span>•</span>
                <span>Acesso Imediato</span>
              </div>
            </div>

          </div>

          {/* Conditional / Trust Guarantee block changed to 12 Days */}
          <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/50 flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-amber-300/40 text-amber-800 font-serif font-bold text-lg text-center shadow-xs">
              12 Dias
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-stone-900 text-sm md:text-base">Garantia Absoluta e Incondicional de Satisfação</h4>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                Você tem 12 dias inteiros para abrir os roteiros, responder as perguntas e realizar as dinâmicas em casal. Se não sentir evolução matrimonial prática ou preferir desistir por qualquer motivo, nos mande um e-mail para receber reembolso imediato de cada centavo.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Expandable FAQs Accordion */}
      <section className="py-16 px-4 bg-stone-50 border-t border-stone-200">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
              Dúvidas Frequentes (FAQ)
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
              Selecione as perguntas abaixo para sanar suas dúvidas antes de garantir seu kit.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isExpanded = expandedFaqIdx === idx;
              return (
                <div key={idx} className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 md:p-5 flex justify-between items-center gap-3 focus:outline-none"
                  >
                    <span className="font-bold text-stone-900 text-xs md:text-sm leading-relaxed">
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-700' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="p-4 md:p-5 pt-0 border-t border-stone-100 text-xs md:text-sm text-stone-600 leading-relaxed animate-fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer copyright */}
      <footer className="bg-stone-950 text-stone-500 py-10 px-4 border-t border-stone-900 text-center space-y-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <span>2026 © Casados Para Sempre. Todos os direitos reservados.</span>
          <div className="flex gap-4 font-medium">
            <button id="btn-policy-terms" onClick={() => alert("Simulação de Termos de Uso")} className="hover:text-stone-300">Termos de Uso</button>
            <button id="btn-policy-privacy" onClick={() => alert("Simulação de Políticas de Privacidade")} className="hover:text-stone-300">Políticas de Privacidade</button>
          </div>
        </div>
        <p className="text-[10px] text-stone-600 max-w-md mx-auto leading-relaxed">
          Este site não possui afiliação oficial com o Facebook, Google ou quaisquer redes sociais externas. A eficácia prática das ferramentas apresentadas está diretamente atrelada ao comprometimento com os exercícios sugeridos e as devidas orações devocionais.
        </p>
      </footer>

      {/* Interactive Simulated Checkout modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        userEmail="kauaoliveirafreitas8@gmail.com"
      />

    </div>
  );
}
