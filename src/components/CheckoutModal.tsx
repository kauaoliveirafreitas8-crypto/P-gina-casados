import { useState, useEffect, FormEvent } from 'react';
import { Shield, Sparkles, CreditCard, Landmark, CheckCircle, Copy, AlertCircle, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function CheckoutModal({ isOpen, onClose, userEmail = "seu-email@exemplo.com" }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('1');
  const [buyerEmail, setBuyerEmail] = useState(userEmail);

  // Simulated live progress
  useEffect(() => {
    let timer: any = null;
    if (step === 'processing') {
      timer = setTimeout(() => {
        setStep('success');
      }, 2500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step]);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    setCopiedPix(true);
    navigator.clipboard.writeText("00020101021126580014br.gov.bcb.pix0136894c7308-c300-4b68-b7fb-6d73f32e3d37520400005303986540537.005802BR5925Casados Para Sempre Ltda6009Sao Paulo62070503***6304ECE3");
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCardSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      alert("Por favor, preencha todos os campos do cartão.");
      return;
    }
    setStep('processing');
  };

  const handlePixSimulatePaid = () => {
    setStep('processing');
  };

  return (
    <div id="checkout-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="checkout-dialog" 
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-amber-800 text-white p-6 relative">
          <button 
            id="close-checkout"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-stone-950/20 hover:bg-stone-950/40 rounded-full w-8 h-8 flex items-center justify-center font-bold"
          >
            ×
          </button>
          
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="w-4.5 h-4.5 text-amber-300" />
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-amber-200">
              Ambiente 100% Seguro e Criptografado
            </span>
          </div>
          <h4 className="font-serif text-xl font-bold">
            Simulador de Compra Segura
          </h4>
          <p className="text-white/80 text-xs mt-1">
            Garante acesso imediato após a confirmação rápida do pagamento.
          </p>
        </div>

        {/* Content Panel */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {step === 'form' && (
            <div className="space-y-6">
              {/* Product Resume bar */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-stone-800 block">Kit Casados Para Sempre</span>
                  <span className="text-stone-500 font-mono">Roteiros Poderosos + Bônus Exclusivos</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 line-through block">R$ 97,00</span>
                  <span className="text-amber-800 font-bold text-sm">R$ 19,90</span>
                </div>
              </div>

              {/* Email capture */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase mb-1.5 font-mono">
                  E-mail para Envio do Material:
                </label>
                <input 
                  type="email"
                  id="checkout-email-input"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
                  placeholder="seu-e-mail@servidor.com"
                  required
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  É para este e-mail que enviaremos o material digital (PDF interativo).
                </span>
              </div>

              {/* Payment Select */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="select-pix"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all focus-outline ${
                    paymentMethod === 'pix'
                      ? 'border-amber-700 bg-amber-50/50 text-amber-800 ring-2 ring-amber-700/10'
                      : 'border-stone-200 hover:border-stone-300 text-stone-500'
                  }`}
                >
                  <Landmark className="w-5 h-5 text-amber-700" /> Pix Instantâneo
                </button>

                <button
                  type="button"
                  id="select-card"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all focus-outline ${
                    paymentMethod === 'card'
                      ? 'border-amber-700 bg-amber-50/50 text-amber-800 ring-2 ring-amber-700/10'
                      : 'border-stone-200 hover:border-stone-300 text-stone-500'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-700" /> Cartão de Crédito
                </button>
              </div>

              {/* Payment Methods Fields */}
              {paymentMethod === 'pix' ? (
                <div className="space-y-4 animate-fade-in text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="mx-auto bg-white p-3 border border-stone-200 rounded-xl w-40 h-40 flex items-center justify-center shadow-xs">
                    {/* Visual QR Code simulator with lines */}
                    <div className="relative w-full h-full border-4 border-stone-100 flex flex-wrap p-1 gap-1">
                      {/* Generates a simple beautiful visual matrix representation */}
                      <div className="w-6 h-6 bg-stone-900 border-2 border-white"></div>
                      <div className="flex-1 bg-stone-200"></div>
                      <div className="w-6 h-6 bg-stone-900 border-2 border-white"></div>
                      <div className="w-full h-2 bg-stone-900"></div>
                      <div className="w-10 h-10 bg-stone-900"></div>
                      <div className="flex-1 bg-stone-300"></div>
                      <div className="w-6 h-6 bg-stone-900 border-2 border-white"></div>
                      <div className="flex-1 bg-stone-400"></div>
                      <div className="w-6 h-6 bg-stone-900 border-2 border-white"></div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-600">
                    Escaneie o código PIX acima com o aplicativo do seu banco ou copie a chave abaixo.
                  </p>

                  <div className="flex items-center gap-1.5 justify-center">
                    <button
                      type="button"
                      id="copy-pix-btn"
                      onClick={handleCopyPix}
                      className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-300/60 font-bold font-mono text-[10px] py-1.5 px-3 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> 
                      {copiedPix ? "Copiado!" : "Copiar Código Copie e Cole"}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-stone-200/50">
                    <button
                      type="button"
                      id="simulate-pix-paid"
                      onClick={handlePixSimulatePaid}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-lg transition-all animate-pulse"
                    >
                      Simular Confirmação de Pagamento
                    </button>
                    <span className="text-[9px] text-stone-400 block mt-1">
                      (Clique acima para aprovar o pagamento instantaneamente)
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCardSubmit} className="space-y-3.5 animate-fade-in text-left">
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      id="checkout-card-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                      placeholder="4000 1234 5678 9010"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      id="checkout-card-name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="MARIA S OUTRO"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">
                        Validade (MM/AA)
                      </label>
                      <input
                        type="text"
                        id="checkout-card-expiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                        placeholder="12/30"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-center"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">
                        CVV / Código
                      </label>
                      <input
                        type="password"
                        id="checkout-card-cvv"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        placeholder="123"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-center"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">
                      Parcelas desejadas
                    </label>
                    <select
                      id="checkout-card-installments"
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                    >
                      <option value="1">1x de R$ 19,90 (Sem juros)</option>
                      <option value="2">2x de R$ 9,95 (Sem juros)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    id="submit-card-payment"
                    className="w-full mt-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs py-2.5 rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Shield className="w-4 h-4" /> Autorizar Cobrança de R$ 19,90
                  </button>
                </form>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-fade-in text-center">
              <Loader2 className="w-12 h-12 text-amber-700 animate-spin" />
              <h5 className="font-bold text-stone-800 text-sm">Validando transação com a operadora...</h5>
              <p className="text-xs text-stone-500 max-w-xs">
                Aguarde um instante. Nossa infraestrutura está testando os protocolos criptografados e assegurando a criação das chaves de acesso.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-5 animate-scale-up text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-md">
                <CheckCircle className="w-9 h-9" />
              </div>
              
              <div className="space-y-1">
                <h5 className="font-serif text-xl font-bold text-stone-900">
                  Acesso Liberado com Sucesso!
                </h5>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Parabéns! Sua sessão matrimonial ou ministerial de aconselhamento agora está completamente amparada.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 max-w-sm w-full space-y-2">
                <div className="flex justify-between border-b pb-1.5 border-stone-200">
                  <span className="font-semibold">Transação:</span>
                  <span className="font-mono text-stone-500 text-[10px]">CPS-{Math.floor(Math.random() * 900000 + 100000)}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-stone-200">
                  <span className="font-semibold">Destino do Envio:</span>
                  <span className="text-amber-800 font-bold">{buyerEmail}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="font-semibold">Status do Material:</span>
                  <span className="text-green-700 font-bold">Enviado com Sucesso</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400">
                Cheque sua caixa de entrada e spam. Caso precise de ajuda, entre em contato pelo suporte.
              </p>

              <button
                type="button"
                id="btn-finished-success"
                onClick={() => {
                  onClose();
                  setStep('form');
                }}
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-2 px-6 rounded-lg transition-all"
              >
                Voltar à Página Principal
              </button>
            </div>
          )}
        </div>

        {/* Footer info lock */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-center gap-2 text-[10px] text-stone-500">
          <AlertCircle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>Garantia incondicional de 12 dias. Compra protegida por SSL e PCI-DSS.</span>
        </div>
      </div>
    </div>
  );
}
