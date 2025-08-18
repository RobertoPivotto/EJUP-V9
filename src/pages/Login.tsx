import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { addPurchasedCourse } from '@/utils/courseUtils';

// Mock authentication function (in a real app, this would connect to an authentication service)
const mockLogin = (email: string, password: string) => {
  // For demo purposes, accept any email with a password
  if (email && password.length >= 6) {
    return true;
  }
  return false;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const success = mockLogin(email, password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard...",
          duration: 3000,
        });
        
        // In a real app, this would set authentication tokens, etc.
        localStorage.setItem('isLoggedIn', 'true');
        
        // Inicializar cursos adquiridos para demonstração
        const demoOwnedCourses = [
          { id: 1, title: 'Direito Civil', purchaseDate: '2024-11-15' },
          { id: 2, title: 'Direito Penal', purchaseDate: '2024-10-20' },
          { id: 3, title: 'Direito Empresarial', purchaseDate: '2024-09-10' },
          { id: 4, title: 'Direito Trabalhista', purchaseDate: '2024-08-05' }
        ];
        
        // Adicionar cada curso como adquirido
        demoOwnedCourses.forEach(course => {
          addPurchasedCourse(course);
        });
        
        setIsLoggedIn(true);
      } else {
        toast({
          title: "Falha no login",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  if (isLoggedIn) {
    return <Navigate to="/my-courses" replace />;
  }

  return (
    <div className="min-h-screen bg-ejup-darkBg flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-start justify-center py-24 px-4 mt-16">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-zinc-700/50 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Bem-vindo de volta</h2>
              <p className="text-zinc-400 mt-2">Entre com suas credenciais para acessar sua conta</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                  style={{
                    backgroundColor: '#27272a',
                    color: '#ffffff',
                    WebkitBoxShadow: '0 0 0 30px #27272a inset',
                    WebkitTextFillColor: '#ffffff',
                    caretColor: '#ffffff'
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-sm text-ejup-orange hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                  style={{
                    backgroundColor: '#27272a',
                    color: '#ffffff',
                    WebkitBoxShadow: '0 0 0 30px #27272a inset',
                    WebkitTextFillColor: '#ffffff',
                    caretColor: '#ffffff'
                  }}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-ejup-orange hover:bg-ejup-orange/90"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              
              <div className="text-center text-sm text-zinc-400 mt-4">
                Não tem uma conta?{" "}
                <a href="#" className="text-ejup-orange hover:underline">
                  Criar conta
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
