import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FiBook, 
  FiFileText, 
  FiUsers, 
  FiTrendingUp, 
  FiDollarSign, 
  FiCheckCircle 
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/AdminLayout";

interface ModuleType {
  title: string;
  description: string;
  link: string;
  createLink?: string;
  createText?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export default function AdminDashboard() {
  const stats = [
    {
      title: "Alunos Ativos",
      value: "238",
      description: "↗︎ 22% em relação ao mês anterior",
      icon: <FiUsers className="w-7 h-7" />,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Cursos Ativos",
      value: "12",
      description: "↗︎ 2 novos cursos este mês",
      icon: <FiBook className="w-7 h-7" />,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Artigos Publicados",
      value: "43",
      description: "28 pendentes de revisão",
      icon: <FiFileText className="w-7 h-7" />,
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];

  const modules = [
    {
      title: "Gestão de Cursos",
      description: "Criar, editar e gerenciar cursos e módulos",
      link: "/admin/courses",
      createLink: "/admin/courses/new",
      createText: "Novo Curso",
      icon: <FiBook className="w-5 h-5" />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Gestão de Conteúdo",
      description: "Gerenciar artigos, destaques, cursos em destaque e podcasts",
      link: "/admin/articles",
      icon: <FiFileText className="w-5 h-5" />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Gestão de Usuários",
      description: "Gerenciar alunos e colaboradores",
      link: "/admin/users",
      icon: <FiUsers className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div>
      {/* Header com estatísticas */}
      <div className="mb-8 px-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <div className="flex gap-2">
            <div className="text-sm text-zinc-400">
              <span className="font-medium text-zinc-300">Hoje:</span> {new Date().toLocaleDateString('pt-BR')}
            </div>
            <Link to="/admin/courses/new" className="bg-ejup-cyan text-white text-sm px-3 py-1 rounded-md hover:bg-ejup-cyan/80 transition-colors">
              Criar Curso (Teste)
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-ejup-orange/5 via-ejup-cyan/10 to-ejup-orange/5 p-0.5 rounded-xl">
          <div className="bg-zinc-900/70 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-ejup-cyan" /> 
              <span>Visão Geral da Plataforma</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 hover:bg-zinc-800/80 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                      <p className="text-xs text-zinc-500">{stat.description}</p>
                    </div>
                    <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                      <div className={cn("text-transparent bg-gradient-to-b", stat.color, "bg-clip-text")}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Painel de atualizações rápidas */}
      <div className="mb-8 grid grid-cols-1 xl:grid-cols-3 gap-4 px-2">
        <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-lg p-5 col-span-1">
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <FiCheckCircle className="text-emerald-400" />
            <span>Tarefas Pendentes</span>
          </h2>
          <div className="space-y-3">
            <div className="p-3 border border-zinc-700/50 rounded-lg flex justify-between items-center bg-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <FiFileText className="h-4 w-4" />
                </div>
                <span className="text-sm text-zinc-300">Revisar 3 artigos pendentes</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                Ver
              </Button>
            </div>
            <div className="p-3 border border-zinc-700/50 rounded-lg flex justify-between items-center bg-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <FiBook className="h-4 w-4" />
                </div>
                <span className="text-sm text-zinc-300">Aprovar 2 novos cursos</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                Ver
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-lg p-5 col-span-2">
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <FiDollarSign className="text-green-400" />
            <span>Performance Financeira</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <p className="text-sm text-zinc-400 mb-2">Receita Total</p>
              <p className="text-xl font-bold text-white">R$ 52.320,00</p>
              <p className="text-xs text-emerald-400 flex items-center mt-1">
                <FiTrendingUp className="mr-1 h-3 w-3" /> +12% este mês
              </p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <p className="text-sm text-zinc-400 mb-2">Cursos Vendidos</p>
              <p className="text-xl font-bold text-white">124</p>
              <p className="text-xs text-emerald-400 flex items-center mt-1">
                <FiTrendingUp className="mr-1 h-3 w-3" /> +8% este mês
              </p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <p className="text-sm text-zinc-400 mb-2">Taxa de Conversão</p>
              <p className="text-xl font-bold text-white">3.2%</p>
              <p className="text-xs text-emerald-400 flex items-center mt-1">
                <FiTrendingUp className="mr-1 h-3 w-3" /> +0.8% este mês
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-medium text-white mb-4 px-2">Módulos de Gestão</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 mb-8">
        {modules.map((module, index) => (
          <div key={index} className="relative group">
            <div className={`absolute -inset-0.5 opacity-20 rounded-lg blur group-hover:opacity-30 transition-opacity ${module.color}`}></div>
            <div className="relative bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-5 hover:bg-zinc-800/80 transition-all overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">{module.title}</h3>
                  <p className="text-sm text-zinc-400 mb-6">{module.description}</p>
                </div>
                <div className={cn("p-3 rounded-lg", module.bgColor)}>
                  <div className={cn("text-transparent bg-gradient-to-b", module.color, "bg-clip-text")}>
                    {module.icon}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Link to={module.link} className="flex-1">
                  <Button className={`w-full bg-gradient-to-r ${module.color} border-0 hover:opacity-90 transition-opacity`}>
                    Acessar
                  </Button>
                </Link>
                {module.createLink && (
                  <Link to={module.createLink}>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                      {module.createText || "Criar"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </AdminLayout>
  );
} 