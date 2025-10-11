import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiLock, FiMail, FiAlertCircle } from "react-icons/fi";
import Logo from "@/components/ui/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Credenciais temporárias para demonstração
  const mockCredentials = {
    email: 'admin@ejup.com',
    password: 'admin123',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulando uma requisição de autenticação
    setTimeout(() => {
      if (email === mockCredentials.email && password === mockCredentials.password) {
        // Armazenar um token de autenticação (simulado)
        localStorage.setItem('adminToken', 'mock-admin-token');
        localStorage.setItem('adminUser', 'Admin EJUP');
        // Redirecionar para o dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Email ou senha incorretos. Tente novamente.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Gradiente de fundo avançado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] bg-gradient-to-br from-ejup-orange/30 via-ejup-cyan/20 to-ejup-orange/20 opacity-30 blur-3xl animate-slow-spin"></div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_70%)]"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Logo className="h-16" />
        </div>
        
        {/* Card com efeito de borda brilhante */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-[#be9e77] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
          
          <Card className="relative bg-zinc-900/90 backdrop-blur-xl border-zinc-800 shadow-2xl rounded-xl">
            <CardHeader className="space-y-1 text-center pb-2">
              <div className="flex justify-center mb-1">
                <div className="bg-[#be9e77] h-1 w-16 rounded-full"></div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">Área Administrativa</CardTitle>
              <CardDescription className="text-zinc-400">
                Entre com suas credenciais para acessar o painel
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 mb-6 flex items-center gap-2">
                  <FiAlertCircle className="text-red-500" />
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300 font-medium">Email</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                        <FiMail />
                      </div>
                      <Input
                        id="email"
                        placeholder="admin@ejup.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50 focus:ring-1 focus:ring-ejup-cyan/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-zinc-300 font-medium">Senha</Label>
                      <Button variant="link" size="sm" className="px-0 h-auto font-normal text-xs text-zinc-400 hover:text-ejup-cyan">
                        Esqueceu a senha?
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                        <FiLock />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50 focus:ring-1 focus:ring-ejup-cyan/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-ejup-cyan to-ejup-cyan/80 hover:from-ejup-cyan/90 hover:to-ejup-cyan/70 transition-all shadow-lg shadow-ejup-cyan/20 font-medium" 
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar no Sistema'}
                  </Button>
                  
                  <div className="text-center text-xs text-zinc-400 mt-4 pt-4 border-t border-zinc-800">
                    <p>Para demonstração, use:</p>
                    <p className="font-mono text-zinc-300 mt-1">Email: admin@ejup.com</p>
                    <p className="font-mono text-zinc-300">Senha: admin123</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}