import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Key, 
  QrCode, 
  Landmark, 
  Check, 
  User, 
  MapPin,
  CreditCard as CardIcon,
  Download,
  BookOpen,
  FileText,
  Trash2,
  ShoppingCart,
  Tag,
  X
} from 'lucide-react';

const Checkout = () => {
  const { items, clearCart, totalPrice, removeItem } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [accountType, setAccountType] = useState('login');
  
  // Cupom de desconto
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  
  // Dados pessoais
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para aplicar o cupom
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setIsValidatingCoupon(true);
    
    // Simulando validação do cupom
    setTimeout(() => {
      // Verificação de cupons de exemplo (em produção, isso seria via API)
      const validCoupons = [
        { code: 'EJUP10', discount: 0.1 },  // 10% de desconto
        { code: 'EJUP20', discount: 0.2 },  // 20% de desconto
        { code: 'PROMO50', discount: 0.5 }, // 50% de desconto
      ];
      
      const foundCoupon = validCoupons.find(c => c.code === couponCode.toUpperCase());
      
      if (foundCoupon) {
        setAppliedCoupon(foundCoupon);
        setIsCouponValid(true);
      } else {
        setAppliedCoupon(null);
        setIsCouponValid(false);
      }
      
      setIsValidatingCoupon(false);
    }, 800);
  };
  
  // Função para remover o cupom aplicado
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setIsCouponValid(null);
  };
  
  // Calcular valor do desconto
  const discountAmount = appliedCoupon ? totalPrice * appliedCoupon.discount : 0;
  // Total final após desconto
  const finalPrice = totalPrice - discountAmount;
  
  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-ejup-darkBg">
        <Navbar />
        <main className="pt-20">
          <div className="ejup-container py-12">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
              <p className="text-zinc-400 mb-6">Adicione cursos ao seu carrinho antes de prosseguir para o checkout.</p>
              <Button asChild>
                <a href="/courses">Ver cursos disponíveis</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
    }, 2000);
  };
  
  const handleGoogleAuth = () => {
    // Implementação da autenticação via Google
    console.log("Autenticação via Google iniciada");
    // Simulação de autenticação bem-sucedida
    setTimeout(() => {
      handleNextStep();
    }, 1000);
  };
  
  if (isComplete) {
    return (
      <div className="min-h-screen bg-ejup-darkBg">
        <Navbar />
        <main className="pt-20">
          <div className="ejup-container py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-6 mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Pedido confirmado!</h1>
              <p className="text-zinc-400 mb-6">
                Obrigado pela sua compra. Você receberá um e-mail com os detalhes do seu pedido e informações de acesso aos cursos.
              </p>
              <Button asChild>
                <a href="/my-courses">Acessar meus cursos</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Renderiza o indicador de etapas (agora com 3 etapas)
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8 flex-wrap md:flex-nowrap">
        <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-[#F2CA7E]' : 'text-zinc-500'}`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#F2CA7E] text-white' : 'bg-zinc-800 text-zinc-400'}`}>
            <User className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <span className="text-xs md:text-sm mt-2 font-medium">Conta</span>
        </div>
        
        <div className={`w-12 md:w-24 h-0.5 ${currentStep >= 2 ? 'bg-[#F2CA7E]' : 'bg-zinc-700'} mx-2 md:mx-4`}></div>
        
        <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-[#F2CA7E]' : 'text-zinc-500'}`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#F2CA7E] text-white' : 'bg-zinc-800 text-zinc-400'}`}>
            <MapPin className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <span className="text-xs md:text-sm mt-2 font-medium text-center">Endereço</span>
        </div>
        
        <div className={`w-12 md:w-24 h-0.5 ${currentStep >= 3 ? 'bg-[#F2CA7E]' : 'bg-zinc-700'} mx-2 md:mx-4`}></div>
        
        <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-[#F2CA7E]' : 'text-zinc-500'}`}>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#F2CA7E] text-white' : 'bg-zinc-800 text-zinc-400'}`}>
            <CardIcon className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <span className="text-xs md:text-sm mt-2 font-medium">Pagamento</span>
        </div>
      </div>
    );
  };
  
  // Etapa 1: Dados de conta
  const renderAccountStep = () => {
    return (
      <div className="ejup-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informações da conta</h2>
        
        <Tabs value={accountType} onValueChange={setAccountType} className="mb-6">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Já tenho uma conta</TabsTrigger>
            <TabsTrigger value="signup">Criar uma conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form className="space-y-4">
              <div>
                <Label htmlFor="login-email">E-mail</Label>
                <Input id="login-email" name="email" type="email" placeholder="seu@email.com" required value={formData.email} onChange={handleInputChange} />
              </div>
              
              <div>
                <Label htmlFor="login-password">Senha</Label>
                <Input id="login-password" name="password" type="password" placeholder="Sua senha" required value={formData.password} onChange={handleInputChange} />
              </div>
              
              <Button type="button" className="w-full bg-[#F2CA7E] hover:bg-[#F2CA7E]/90" onClick={handleNextStep}>
                Continuar
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-ejup-darkBg px-2 text-zinc-400">ou</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-zinc-700 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] hover:bg-transparent hover:border-zinc-700 hover:text-white text-white"
                onClick={handleGoogleAuth}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Entrar com Google
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" name="name" placeholder="Seu nome completo" required value={formData.name} onChange={handleInputChange} />
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required value={formData.email} onChange={handleInputChange} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" name="cpf" placeholder="000.000.000-00" required value={formData.cpf} onChange={handleInputChange} />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" name="phone" placeholder="(00) 00000-0000" required value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="Crie uma senha segura" required value={formData.password} onChange={handleInputChange} />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme sua senha" required value={formData.confirmPassword} onChange={handleInputChange} />
              </div>
              
              <Button type="button" className="w-full bg-[#F2CA7E] hover:bg-[#F2CA7E]/90" onClick={handleNextStep}>
                Continuar
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-ejup-darkBg px-2 text-zinc-400">ou</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-zinc-700 flex items-center justify-center gap-2"
                onClick={handleGoogleAuth}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Cadastrar com Google
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  // Etapa 2: Dados pessoais (nova etapa)
  const renderPersonalDataStep = () => {
    return (
      <div className="ejup-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Endereço de Faturamento</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <FileText className="h-4 w-4 text-[#F2CA7E]" />
            <span>Informe seu endereço para emissão da nota fiscal</span>
          </div>
          
          <form className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <Label htmlFor="cep">CEP</Label>
                <Input 
                  id="cep" 
                  name="cep" 
                  placeholder="00000-000" 
                  value={formData.cep} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                  required 
                />
              </div>
              
              <div className="col-span-8">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="Rua/Avenida" 
                  value={formData.address} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Label htmlFor="number">Número</Label>
                <Input 
                  id="number" 
                  name="number" 
                  placeholder="123" 
                  value={formData.number} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                  required
                />
              </div>
              
              <div className="col-span-9">
                <Label htmlFor="complement">Complemento</Label>
                <Input 
                  id="complement" 
                  name="complement" 
                  placeholder="Apartamento, bloco, etc." 
                  value={formData.complement} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input 
                  id="neighborhood" 
                  name="neighborhood" 
                  placeholder="Seu bairro" 
                  value={formData.neighborhood} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                  required
                />
              </div>
              
              <div className="sm:col-span-5">
                <Label htmlFor="city">Cidade</Label>
                <Input 
                  id="city" 
                  name="city" 
                  placeholder="Sua cidade" 
                  value={formData.city} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                  required
                />
              </div>
              
              <div className="sm:col-span-3">
                <Label htmlFor="state">Estado</Label>
                <Input 
                  id="state" 
                  name="state" 
                  placeholder="UF" 
                  value={formData.state} 
                  onChange={handleInputChange}
                  className="border-zinc-700 focus-visible:ring-zinc-600"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button type="button" variant="outline" className="flex-1 border-[#F2CA7E] hover:bg-transparent hover:border-[#F2CA7E] hover:text-white text-white hover:scale-105 transition-transform" onClick={handlePrevStep}>
                Voltar
              </Button>
              <Button type="button" className="flex-1 bg-[#F2CA7E] hover:bg-[#F2CA7E]/90" onClick={handleNextStep}>
                Continuar para pagamento
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Etapa 3: Método de pagamento
  const renderPaymentStep = () => {
    return (
      <div className="ejup-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Método de Pagamento</h2>
        
        {/* Área de cupom de desconto - versão compacta */}
        <div className="mb-5 bg-zinc-900/50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center">
              <Tag className="h-4 w-4 mr-1 text-[#F2CA7E]" />
              Cupom de desconto
            </h3>
            
            {!appliedCoupon && (
              <div className="flex items-stretch gap-2">
                <Input 
                  placeholder="Digite o código do cupom" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={`h-8 text-sm ${
                    isCouponValid === false 
                      ? 'border-red-500 focus-visible:ring-red-500' 
                      : isCouponValid === true
                        ? 'border-green-500 focus-visible:ring-green-500'
                        : ''
                  }`}
                />
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-zinc-800 hover:bg-zinc-700 h-8 px-3 py-0 text-xs" 
                  onClick={handleApplyCoupon}
                  disabled={isValidatingCoupon || !couponCode.trim()}
                >
                  {isValidatingCoupon ? "..." : "Aplicar"}
                </Button>
              </div>
            )}
          </div>
          
          {appliedCoupon && (
            <div className="mt-2 flex items-center justify-between bg-[#F2CA7E]/10 p-2 rounded-md border border-[#F2CA7E]/30">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-[#F2CA7E] mr-2" />
                <p className="text-sm font-medium">
                  {appliedCoupon.code} 
                  <span className="text-xs text-zinc-400 ml-2">
                    ({appliedCoupon.discount * 100}% OFF)
                  </span>
                </p>
              </div>
              <button 
                className="text-zinc-400 hover:text-red-500 transition-colors" 
                onClick={handleRemoveCoupon}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        
        <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
          <TabsList className="grid grid-cols-4 gap-1 p-1 rounded-lg mb-4 bg-transparent">
            <TabsTrigger 
              value="credit-card" 
              className="flex flex-col items-center justify-center py-3 rounded-md transition-all duration-200 data-[state=active]:bg-[#F2CA7E]/20 data-[state=active]:text-white"
            >
              <CreditCard className="h-5 w-5 text-[#F2CA7E] mb-1" />
              <span className="text-xs">Cartão</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pix" 
              className="flex flex-col items-center justify-center py-3 rounded-md transition-all duration-200 data-[state=active]:bg-[#F2CA7E]/20 data-[state=active]:text-white"
            >
              <Key className="h-5 w-5 text-[#F2CA7E] mb-1" />
              <span className="text-xs">PIX</span>
            </TabsTrigger>
            <TabsTrigger 
              value="qrcode" 
              className="flex flex-col items-center justify-center py-3 rounded-md transition-all duration-200 data-[state=active]:bg-[#F2CA7E]/20 data-[state=active]:text-white"
            >
              <QrCode className="h-5 w-5 text-[#F2CA7E] mb-1" />
              <span className="text-xs">QR Code</span>
            </TabsTrigger>
            <TabsTrigger 
              value="bank-slip" 
              className="flex flex-col items-center justify-center py-3 rounded-md transition-all duration-200 data-[state=active]:bg-[#F2CA7E]/20 data-[state=active]:text-white"
            >
              <Landmark className="h-5 w-5 text-[#F2CA7E] mb-1" />
              <span className="text-xs">Boleto</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6 pt-2">
            <TabsContent value="credit-card">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="card-name" className="text-sm">Nome no cartão</Label>
                  <Input id="card-name" placeholder="Nome impresso no cartão" required className="h-9 mt-1 border-2 border-zinc-600 focus-visible:border-[#F2CA7E] focus-visible:ring-[#F2CA7E]" />
                </div>
                
                <div>
                  <Label htmlFor="card-number" className="text-sm">Número do cartão</Label>
                  <Input id="card-number" placeholder="0000 0000 0000 0000" required className="h-9 mt-1 border-2 border-zinc-600 focus-visible:border-[#F2CA7E] focus-visible:ring-[#F2CA7E]" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-sm">Validade</Label>
                    <Input id="expiry" placeholder="MM/AA" required className="h-9 mt-1 border-2 border-zinc-600 focus-visible:border-[#F2CA7E] focus-visible:ring-[#F2CA7E]" />
                  </div>
                  
                  <div>
                    <Label htmlFor="cvc" className="text-sm">CVC</Label>
                    <Input id="cvc" placeholder="123" required className="h-9 mt-1 border-2 border-zinc-600 focus-visible:border-[#F2CA7E] focus-visible:ring-[#F2CA7E]" />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <Button type="button" variant="outline" className="flex-1 h-9 text-sm border-[#F2CA7E] hover:bg-transparent hover:border-[#F2CA7E] hover:text-white text-white hover:scale-105 transition-transform" onClick={handlePrevStep}>
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#F2CA7E] hover:bg-[#F2CA7E]/90 h-9 text-sm" disabled={isProcessing}>
                    {isProcessing ? 'Processando...' : 'Confirmar pagamento'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="pix">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="bg-white p-3 rounded-lg mx-auto w-32 h-32 flex items-center justify-center">
                  <Key className="h-16 w-16 text-black" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-2">
                    Escaneie o código PIX ou copie a chave:
                  </p>
                  <div className="bg-zinc-800 p-2 rounded-md text-center mb-4">
                    <code className="text-xs">ejup@exemplo.com.br</code>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1 h-9 text-sm border-[#F2CA7E] hover:bg-transparent hover:border-[#F2CA7E] hover:text-white text-white hover:scale-105 transition-transform" onClick={handlePrevStep}>
                      Voltar
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1 bg-[#F2CA7E] hover:bg-[#F2CA7E]/90 h-9 text-sm" disabled={isProcessing}>
                      {isProcessing ? '...' : 'Confirmar'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="qrcode">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="bg-white p-3 rounded-lg mx-auto w-32 h-32 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-black" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-4">
                    Escaneie o QR Code com seu aplicativo bancário para realizar o pagamento.
                  </p>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1 h-9 text-sm border-[#F2CA7E] hover:bg-transparent hover:border-[#F2CA7E] hover:text-white text-white hover:scale-105 transition-transform" onClick={handlePrevStep}>
                      Voltar
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1 bg-ejup-orange hover:bg-ejup-orange/90 h-9 text-sm" disabled={isProcessing}>
                      {isProcessing ? '...' : 'Confirmar'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bank-slip">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="p-3 mx-auto w-32 h-32 flex items-center justify-center">
                  <Landmark className="h-16 w-16 text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-4">
                    Gere um boleto bancário para pagamento. O acesso será liberado em até 3 dias úteis após o pagamento.
                  </p>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1 h-9 text-sm border-[#F2CA7E] hover:bg-transparent hover:border-[#F2CA7E] hover:text-white text-white hover:scale-105 transition-transform" onClick={handlePrevStep}>
                      Voltar
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1 bg-ejup-orange hover:bg-ejup-orange/90 h-9 text-sm" disabled={isProcessing}>
                      {isProcessing ? '...' : 'Gerar boleto'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderAccountStep();
      case 2:
        return renderPersonalDataStep();
      case 3:
        return renderPaymentStep();
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg flex flex-col">
      <Navbar />
      <main className="pt-20 flex-grow">
        <div className="ejup-container py-6 md:py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Checkout</h1>
            
            {/* Indicador de etapas */}
            {renderStepIndicator()}
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
              <div className="lg:col-span-3">
                {renderCurrentStep()}
              </div>
              
              <div className="lg:col-span-2">
                <div className="ejup-card sticky top-24 w-full">
                  <div className="p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                      <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#F2CA7E]" />
                      Resumo do pedido
                    </h2>
                    
                    {/* Resumo melhorado com imagens e mais detalhes */}
                    <div className="space-y-4 mb-6 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 py-3 border-b border-zinc-800 group">
                          {item.image && (
                            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-zinc-800 rounded-md overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm line-clamp-2 pr-2">{item.title}</h3>
                              <button 
                                onClick={() => removeItem(item.id)} 
                                className="text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex items-center text-xs text-zinc-400 mt-1 space-x-2">
                              <span className="flex items-center">
                                <BookOpen className="h-3 w-3 mr-1" />
                                Digital
                              </span>
                            </div>
                            <div className="font-semibold text-[#F2CA7E] text-sm mt-1">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-zinc-800 pt-4 space-y-3">
                      <div className="flex justify-between text-sm text-zinc-400">
                        <span>Subtotal</span>
                        <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center text-green-500">
                          <Check className="h-4 w-4 mr-1" />
                          {appliedCoupon ? `Cupom: ${appliedCoupon.code}` : 'Desconto'}
                        </span>
                        <span className="text-green-500">
                          {appliedCoupon 
                            ? `- R$ ${discountAmount.toFixed(2).replace('.', ',')}` 
                            : 'R$ 0,00'}
                        </span>
                      </div>
                      
                      <div className="pt-2 border-t border-zinc-800 mt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">Pagamento único</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;