import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FiArrowLeft, 
  FiUsers, 
  FiStar, 
  FiClock, 
  FiBook,
  FiTrendingUp,
  FiBarChart2,
  FiTarget,
  FiCheckCircle,
  FiPlay
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function InstructorCourseView() {
  const { id } = useParams();
  
  // Mock data para o curso - sem informações financeiras sensíveis
  const courseData = {
    id: 1,
    title: "Introdução ao Direito Constitucional",
    instructor: "Dr. Pedro Almeida",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    status: "active",
    description: "Um curso abrangente sobre os fundamentos do Direito Constitucional brasileiro, cobrindo princípios, direitos fundamentais e organização do Estado.",
    totalStudents: 48,
    averageRating: 4.8,
    totalReviews: 32,
    createdAt: "15/03/2023",
    lastUpdated: "12/05/2023",
    duration: "20 horas",
    modules: 5,
    lessons: 24,
    certificateEnabled: true,
    completionRate: 78,
    category: ["Direito Constitucional", "Direito Público"],
    tags: ["constitucional", "direitos-fundamentais", "estado"]
  };

  // Mock data para métricas de engajamento
  const engagementMetrics = [
    { month: "Jan", students: 12, completionRate: 82 },
    { month: "Fev", students: 15, completionRate: 76 },
    { month: "Mar", students: 8, completionRate: 88 },
    { month: "Abr", students: 21, completionRate: 75 },
    { month: "Mai", students: 18, completionRate: 78 },
  ];

  // Mock data para avaliações
  const recentReviews = [
    { id: 1, student: "Aluno A", rating: 5, comment: "Excelente curso! Muito didático.", date: "10/05/2023" },
    { id: 2, student: "Aluno B", rating: 4, comment: "Bom conteúdo, professor experiente.", date: "08/05/2023" },
    { id: 3, student: "Aluno C", rating: 5, comment: "Superou minhas expectativas!", date: "05/05/2023" },
    { id: 4, student: "Aluno D", rating: 4, comment: "Material de qualidade e explicações claras.", date: "03/05/2023" },
  ];

  const stats = [
    {
      title: "Total de Alunos",
      value: courseData.totalStudents.toString(),
      icon: <FiUsers />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Avaliação Média",
      value: `${courseData.averageRating}/5`,
      icon: <FiStar />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Taxa de Conclusão",
      value: `${courseData.completionRate}%`,
      icon: <FiTarget />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total de Avaliações",
      value: courseData.totalReviews.toString(),
      icon: <FiCheckCircle />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-4">
            <Link to="/instructor/courses">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <FiArrowLeft className="mr-2" /> Voltar aos Meus Cursos
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{courseData.title}</h1>
              <p className="text-sm text-zinc-400">
                Criado em {courseData.createdAt} • Última atualização: {courseData.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Course Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 px-2">
          <div className="lg:col-span-2">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={courseData.thumbnail} 
                      alt={courseData.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge 
                        className={cn(
                          "bg-opacity-15 border",
                          courseData.status === "active" 
                            ? "bg-emerald-500 border-emerald-500/20 text-emerald-400" 
                            : "bg-amber-500 border-amber-500/20 text-amber-400"
                        )}
                      >
                        {courseData.status === "active" ? "Ativo" : "Rascunho"}
                      </Badge>
                      <div className="flex gap-2">
                        {courseData.category.map((cat, index) => (
                          <Badge key={index} variant="outline" className="text-zinc-300 border-zinc-600">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm mb-4">{courseData.description}</p>
                    <div className="flex items-center gap-6 text-sm text-zinc-400">
                      <div className="flex items-center gap-2">
                        <FiClock />
                        <span>{courseData.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBook />
                        <span>{courseData.modules} módulos • {courseData.lessons} aulas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiStar className="text-amber-400" />
                        <span>{courseData.averageRating} ({courseData.totalReviews} avaliações)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Informações do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-zinc-400">Instrutor</p>
                    <p className="text-white font-medium">{courseData.instructor}</p>
                  </div>
                  <div className="pt-3 border-t border-zinc-700">
                    <p className="text-sm text-zinc-400">Status</p>
                    <p className="text-white">Curso ativo</p>
                  </div>
                  <div className="pt-3 border-t border-zinc-700">
                    <p className="text-sm text-zinc-400">Certificado</p>
                    <p className="text-white">
                      {courseData.certificateEnabled ? "Emite certificado" : "Não emite certificado"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
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

        {/* Tabs Content */}
        <div className="px-2">
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50">
              <TabsTrigger value="metrics" className="data-[state=active]:bg-ejup-cyan/20">Métricas</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-ejup-cyan/20">Avaliações</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-ejup-cyan/20">Conteúdo</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FiBarChart2 />
                      Inscrições por Mês
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {engagementMetrics.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-zinc-300">{metric.month}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-zinc-400">{metric.students} alunos</span>
                            <span className="text-sm font-medium text-emerald-400">
                              {metric.completionRate}% conclusão
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FiTrendingUp />
                      Estatísticas de Engajamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-zinc-300">Taxa de Conclusão Média</span>
                        <span className="text-emerald-400 font-medium">{courseData.completionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-300">Tempo Médio de Conclusão</span>
                        <span className="text-zinc-400">12 dias</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-300">Aulas mais assistidas</span>
                        <span className="text-zinc-400">Módulo 1 - Fundamentos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-300">Maior abandono em</span>
                        <span className="text-zinc-400">Módulo 3 - Aula 2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Avaliações dos Alunos</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-amber-400">{courseData.averageRating}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(courseData.averageRating) ? "text-amber-400 fill-current" : "text-zinc-600"} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-zinc-400">({courseData.totalReviews} avaliações)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b border-zinc-700 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-white">{review.student}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar 
                                  key={i} 
                                  size={14} 
                                  className={i < review.rating ? "text-amber-400 fill-current" : "text-zinc-600"} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-zinc-400">{review.date}</span>
                        </div>
                        <p className="text-zinc-300 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Estrutura do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiBook className="text-ejup-cyan" />
                        <div>
                          <span className="text-white">Módulo 1: Fundamentos</span>
                          <p className="text-xs text-zinc-400">Taxa de conclusão: 92%</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-zinc-300 border-zinc-600">5 aulas</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiBook className="text-ejup-cyan" />
                        <div>
                          <span className="text-white">Módulo 2: Direitos Fundamentais</span>
                          <p className="text-xs text-zinc-400">Taxa de conclusão: 88%</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-zinc-300 border-zinc-600">6 aulas</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiBook className="text-ejup-cyan" />
                        <div>
                          <span className="text-white">Módulo 3: Organização do Estado</span>
                          <p className="text-xs text-zinc-400">Taxa de conclusão: 75%</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-zinc-300 border-zinc-600">4 aulas</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiBook className="text-ejup-cyan" />
                        <div>
                          <span className="text-white">Módulo 4: Controle de Constitucionalidade</span>
                          <p className="text-xs text-zinc-400">Taxa de conclusão: 82%</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-zinc-300 border-zinc-600">5 aulas</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiBook className="text-ejup-cyan" />
                        <div>
                          <span className="text-white">Módulo 5: Casos Práticos</span>
                          <p className="text-xs text-zinc-400">Taxa de conclusão: 78%</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-zinc-300 border-zinc-600">4 aulas</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
} 