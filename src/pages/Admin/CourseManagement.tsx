import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiEye, 
  FiBook, 
  FiUsers, 
  FiStar, 
  FiLayers, 
  FiFilter 
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for courses
  const mockCourses = [
    {
      id: 1,
      title: "Introdução ao Direito Constitucional",
      instructor: "Dr. Pedro Almeida",
      students: 48,
      status: "active",
      modules: 5,
      lastUpdated: "12/05/2023",
      revenue: "R$ 9.600,00",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      title: "Processo Civil Avançado",
      instructor: "Dra. Marina Sousa",
      students: 32,
      status: "active",
      modules: 8,
      lastUpdated: "03/04/2023",
      revenue: "R$ 6.400,00",
      thumbnail: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      title: "Direito Penal: Aspectos Contemporâneos",
      instructor: "Dr. Lucas Ferreira",
      students: 56,
      status: "active",
      modules: 6,
      lastUpdated: "18/06/2023",
      revenue: "R$ 11.200,00",
      thumbnail: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      title: "Direito Administrativo Prático",
      instructor: "Dra. Carla Mendes",
      students: 29,
      status: "draft",
      modules: 4,
      lastUpdated: "22/05/2023",
      revenue: "-",
      thumbnail: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 5,
      title: "Direito Digital e Proteção de Dados",
      instructor: "Dr. João Costa",
      students: 62,
      status: "active",
      modules: 7,
      lastUpdated: "08/07/2023",
      revenue: "R$ 12.400,00",
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
  ];

  // Filter courses based on search term and status filter
  const filteredCourses = mockCourses.filter(
    (course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        filterStatus === "all" || course.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    }
  );

  const stats = [
    {
      title: "Total de Cursos",
      value: "12",
      icon: <FiBook />,
      color: "from-ejup-cyan to-ejup-cyan/80",
      bgColor: "bg-ejup-cyan/10",
    },
    {
      title: "Cursos Ativos",
      value: "9",
      icon: <FiLayers />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Total de Alunos",
      value: "342",
      icon: <FiUsers />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Média de Avaliação",
      value: "4.7/5",
      icon: <FiStar />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Gestão de Cursos</h1>
          <p className="text-sm text-zinc-400">Gerencie cursos, módulos e materiais didáticos</p>
        </div>
        <Link to="/admin/courses/new">
          <Button className="bg-gradient-to-r from-ejup-cyan to-ejup-cyan/80 hover:from-ejup-cyan/90 hover:to-ejup-cyan/70 text-white border-0 flex items-center gap-2">
            <FiPlus /> Novo Curso
          </Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-2">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 hover:bg-zinc-800/80 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-zinc-400 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
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

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 px-2">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50 focus:ring-1 focus:ring-ejup-cyan/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <FiFilter className="text-zinc-400" />
          <select 
            className="bg-zinc-800/50 border-zinc-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ejup-cyan/50"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="draft">Rascunhos</option>
          </select>
        </div>
      </div>

      {/* Courses table */}
      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-800/10 mb-6 px-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/70">
                <th className="text-left text-xs font-medium text-zinc-400 uppercase px-4 py-3">Curso</th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase px-4 py-3">Instrutor</th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase px-4 py-3">Alunos</th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase px-4 py-3">Módulos</th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase px-4 py-3">Receita</th>
                <th className="text-right text-xs font-medium text-zinc-400 uppercase px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                      </div>
                      <span className="font-medium text-white">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{course.instructor}</td>
                  <td className="px-4 py-3 text-zinc-300">{course.students}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={cn(
                        "bg-opacity-15 border",
                        course.status === "active" 
                          ? "bg-emerald-500 border-emerald-500/20 text-emerald-400" 
                          : "bg-amber-500 border-amber-500/20 text-amber-400"
                      )}
                    >
                      {course.status === "active" ? "Ativo" : "Rascunho"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{course.modules}</td>
                  <td className="px-4 py-3 text-zinc-300">{course.revenue}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link to={`/admin/courses/${course.id}`}>
                        <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 p-0">
                          <FiEye size={16} />
                        </Button>
                      </Link>
                      <Link to={`/admin/courses/${course.id}/edit`}>
                        <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 p-0">
                          <FiEdit2 size={16} />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/30 h-8 w-8 p-0">
                        <FiTrash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
            <FiBook size={40} className="mb-4 opacity-20" />
            <p>Nenhum curso encontrado</p>
            <p className="text-sm mt-1">Tente ajustar os filtros ou criar um novo curso</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-end px-2">
        <div className="text-xs text-zinc-500">Mostrando {filteredCourses.length} de {mockCourses.length} cursos</div>
      </div>
      </div>
    </AdminLayout>
  );
} 