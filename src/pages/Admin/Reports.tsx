import React, { useState } from "react";
import AdminLayout from '../../components/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  FiDownload, 
  FiBarChart2, 
  FiUsers, 
  FiBook, 
  FiDollarSign, 
  FiTrendingUp,
  FiTrendingDown,
  FiFileText,
  FiPlayCircle,
  FiStar,
  FiClock,
  FiCalendar,
  FiTarget,
  FiAward,
  FiGlobe,
  FiMail,
  FiShoppingCart,
  FiCreditCard,
  FiPieChart,
  FiActivity,
  FiEye,
  FiPercent,
  FiRefreshCw
} from "react-icons/fi";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("visao-geral");
  const [periodFilter, setPeriodFilter] = useState("month");
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-12-31"
  });

  // Sidebar de relatórios
  const reportCategories = [
    {
      title: "Dashboard",
      reports: [
        { id: "visao-geral", name: "Visão Geral", icon: <FiBarChart2 /> },
        { id: "kpis", name: "KPIs Principais", icon: <FiTarget /> },
      ]
    },
    {
      title: "Usuários",
      reports: [
        { id: "usuarios-geral", name: "Usuários Geral", icon: <FiUsers /> },
        { id: "estudantes", name: "Estudantes", icon: <FiBook /> },
        { id: "instrutores", name: "Instrutores", icon: <FiAward /> },
        { id: "engajamento", name: "Engajamento", icon: <FiActivity /> },
      ]
    },
    {
      title: "Cursos",
      reports: [
        { id: "cursos-performance", name: "Performance", icon: <FiTrendingUp /> },
        { id: "cursos-popularidade", name: "Popularidade", icon: <FiStar /> },
        { id: "conclusao", name: "Taxa de Conclusão", icon: <FiPercent /> },
        { id: "tempo-estudo", name: "Tempo de Estudo", icon: <FiClock /> },
      ]
    },
    {
      title: "Financeiro",
      reports: [
        { id: "receitas", name: "Receitas", icon: <FiDollarSign /> },
        { id: "vendas", name: "Vendas", icon: <FiShoppingCart /> },
        { id: "comissoes", name: "Comissões", icon: <FiCreditCard /> },
        { id: "roi", name: "ROI por Curso", icon: <FiPieChart /> },
      ]
    },
    {
      title: "Conteúdo",
      reports: [
        { id: "artigos", name: "Artigos", icon: <FiFileText /> },
        { id: "podcasts", name: "Podcasts", icon: <FiPlayCircle /> },
        { id: "visualizacoes", name: "Visualizações", icon: <FiEye /> },
      ]
    },
    {
      title: "Marketing",
      reports: [
        { id: "campanhas", name: "Campanhas", icon: <FiMail /> },
        { id: "conversao", name: "Conversão", icon: <FiTarget /> },
        { id: "trafego", name: "Tráfego", icon: <FiGlobe /> },
      ]
    }
  ];

  // Dados mockados para demonstração
  const mockData = {
    kpis: [
      { title: "Usuários Ativos", value: "1,247", change: "+12.5%", trend: "up", icon: <FiUsers /> },
      { title: "Receita Mensal", value: "R$ 89,432", change: "+8.2%", trend: "up", icon: <FiDollarSign /> },
      { title: "Cursos Ativos", value: "24", change: "+3", trend: "up", icon: <FiBook /> },
      { title: "Taxa de Conclusão", value: "78.4%", change: "+2.1%", trend: "up", icon: <FiTarget /> },
      { title: "NPS Score", value: "8.7", change: "+0.3", trend: "up", icon: <FiStar /> },
      { title: "Tempo Médio", value: "4h 32min", change: "+15min", trend: "up", icon: <FiClock /> },
    ],
    topCourses: [
      { name: "Direito Civil Avançado", students: 342, revenue: 28450, completion: 85.2, rating: 4.8 },
      { name: "Processo Civil Contemporâneo", students: 298, revenue: 24680, completion: 78.9, rating: 4.7 },
      { name: "Direito Digital e LGPD", students: 267, revenue: 22140, completion: 91.3, rating: 4.9 },
      { name: "Direito Penal Aplicado", students: 234, revenue: 19380, completion: 76.4, rating: 4.6 },
      { name: "Direito Trabalhista", students: 198, revenue: 16390, completion: 82.1, rating: 4.5 },
    ],
    studentMetrics: [
      { metric: "Novos Estudantes", value: 156, change: "+23%" },
      { metric: "Estudantes Ativos", value: 1089, change: "+12%" },
      { metric: "Taxa de Retenção", value: "89.3%", change: "+3.2%" },
      { metric: "Tempo Médio Sessão", value: "47min", change: "+8min" },
      { metric: "Cursos por Estudante", value: "2.4", change: "+0.3" },
      { metric: "Satisfação Geral", value: "4.7/5", change: "+0.2" },
    ],
    instructorMetrics: [
      { name: "Dra. Carla Mendes", courses: 4, students: 892, revenue: 67400, rating: 4.8 },
      { name: "Prof. Marcos Sousa", courses: 3, students: 654, revenue: 49050, rating: 4.7 },
      { name: "Dr. Fernando Oliveira", courses: 2, students: 432, revenue: 32400, rating: 4.6 },
    ],
    revenueData: {
      monthly: [
        { month: "Jan", revenue: 65400, courses: 18, students: 234 },
        { month: "Fev", revenue: 72100, courses: 19, students: 267 },
        { month: "Mar", revenue: 68900, courses: 20, students: 298 },
        { month: "Abr", revenue: 78300, courses: 21, students: 342 },
        { month: "Mai", revenue: 84200, courses: 22, students: 389 },
        { month: "Jun", revenue: 89400, courses: 24, students: 423 },
      ]
    },
    contentMetrics: [
      { type: "Artigos Publicados", value: 127, change: "+18" },
      { type: "Podcasts Lançados", value: 23, change: "+5" },
      { type: "Visualizações Totais", value: "45.2K", change: "+12.8K" },
      { type: "Tempo Médio Leitura", value: "6min 32s", change: "+45s" },
      { type: "Compartilhamentos", value: 892, change: "+156" },
      { type: "Comentários", value: 234, change: "+67" },
    ],
    engagementMetrics: [
      { metric: "Login Diário", value: "67%", change: "+5%" },
      { metric: "Tempo na Plataforma", value: "2h 15min", change: "+22min" },
      { metric: "Aulas Concluídas/Dia", value: "3.2", change: "+0.4" },
      { metric: "Interações/Usuário", value: "12.8", change: "+2.1" },
      { metric: "Downloads Material", value: "156", change: "+34" },
      { metric: "Avaliações Deixadas", value: "89", change: "+12" },
    ],
    coursePerformance: [
      { course: "Direito Civil Avançado", enrollments: 342, completion: 85.2, avgTime: "4h 20min", satisfaction: 4.8 },
      { course: "Processo Civil", students: 298, completion: 78.9, avgTime: "3h 45min", satisfaction: 4.7 },
      { course: "Direito Digital", students: 267, completion: 91.3, avgTime: "2h 30min", satisfaction: 4.9 },
      { course: "Direito Penal", students: 234, completion: 76.4, avgTime: "5h 10min", satisfaction: 4.6 },
    ],
    salesMetrics: [
      { metric: "Vendas Totais", value: "R$ 534,280", change: "+18.5%" },
      { metric: "Ticket Médio", value: "R$ 428", change: "+12%" },
      { metric: "Taxa Conversão", value: "3.2%", change: "+0.8%" },
      { metric: "Carrinho Abandonado", value: "22%", change: "-5%" },
      { metric: "Cupons Utilizados", value: "156", change: "+45" },
      { metric: "Reembolsos", value: "2.1%", change: "-0.3%" },
    ]
  };

  const renderContent = () => {
    switch (selectedReport) {
      case "visao-geral":
        return (
          <div className="space-y-6">
            {/* KPIs Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockData.kpis.map((kpi, index) => (
                <Card key={index} className="bg-zinc-800/50 border-zinc-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400">{kpi.title}</p>
                        <p className="text-2xl font-bold text-white">{kpi.value}</p>
                        <div className="flex items-center mt-1">
                          {kpi.trend === "up" ? (
                            <FiTrendingUp className="w-4 h-4 text-green-400 mr-1" />
                          ) : (
                            <FiTrendingDown className="w-4 h-4 text-red-400 mr-1" />
                          )}
                          <span className={`text-sm ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                      <div className="text-zinc-400">
                        {kpi.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Gráfico de Receita */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Receita por Mês</CardTitle>
                <CardDescription className="text-zinc-400">
                  Evolução da receita nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-zinc-700/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FiBarChart2 className="w-12 h-12 text-zinc-500 mx-auto mb-2" />
                    <p className="text-zinc-400">Gráfico de Receita Mensal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Cursos */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Top 5 Cursos</CardTitle>
                <CardDescription className="text-zinc-400">
                  Cursos com melhor performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.topCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-zinc-700/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{course.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                          <span>{course.students} alunos</span>
                          <span>R$ {course.revenue.toLocaleString()}</span>
                          <span>{course.completion}% conclusão</span>
                          <span>⭐ {course.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "kpis":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">KPIs Detalhados</CardTitle>
                <CardDescription className="text-zinc-400">
                  Indicadores chave de performance do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockData.kpis.map((kpi, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-zinc-400">{kpi.icon}</div>
                        <Badge variant={kpi.trend === "up" ? "default" : "destructive"}>
                          {kpi.change}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{kpi.title}</h3>
                      <p className="text-3xl font-bold text-white mt-2">{kpi.value}</p>
                      <Progress value={75} className="mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "estudantes":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Métricas de Estudantes</CardTitle>
                <CardDescription className="text-zinc-400">
                  Análise detalhada do comportamento dos estudantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockData.studentMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <h4 className="text-sm text-zinc-400 mb-2">{metric.metric}</h4>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        <FiTrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-green-400">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Crescimento */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Crescimento de Estudantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-zinc-700/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FiUsers className="w-12 h-12 text-zinc-500 mx-auto mb-2" />
                    <p className="text-zinc-400">Gráfico de Crescimento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "instrutores":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Performance dos Instrutores</CardTitle>
                <CardDescription className="text-zinc-400">
                  Métricas individuais de cada instrutor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.instructorMetrics.map((instructor, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{instructor.name}</h4>
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          ⭐ {instructor.rating}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-400">{instructor.courses}</p>
                          <p className="text-sm text-zinc-400">Cursos</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">{instructor.students}</p>
                          <p className="text-sm text-zinc-400">Estudantes</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-400">
                            R$ {instructor.revenue.toLocaleString()}
                          </p>
                          <p className="text-sm text-zinc-400">Receita</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "engajamento":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Métricas de Engajamento</CardTitle>
                <CardDescription className="text-zinc-400">
                  Como os usuários interagem com a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockData.engagementMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <h4 className="text-sm text-zinc-400 mb-2">{metric.metric}</h4>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        <FiTrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-green-400">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "cursos-performance":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Performance dos Cursos</CardTitle>
                <CardDescription className="text-zinc-400">
                  Análise detalhada de cada curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.coursePerformance.map((course, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">{course.course}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-blue-400">{course.enrollments || course.students}</p>
                          <p className="text-sm text-zinc-400">Matrículas</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-green-400">{course.completion}%</p>
                          <p className="text-sm text-zinc-400">Conclusão</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-purple-400">{course.avgTime}</p>
                          <p className="text-sm text-zinc-400">Tempo Médio</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-yellow-400">⭐ {course.satisfaction}</p>
                          <p className="text-sm text-zinc-400">Satisfação</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "receitas":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Análise de Receitas</CardTitle>
                <CardDescription className="text-zinc-400">
                  Detalhamento financeiro por período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.revenueData.monthly.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-zinc-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{data.month}</h4>
                        <p className="text-sm text-zinc-400">{data.students} novos estudantes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">
                          R$ {data.revenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-zinc-400">{data.courses} cursos ativos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "vendas":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Métricas de Vendas</CardTitle>
                <CardDescription className="text-zinc-400">
                  Performance do funil de vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockData.salesMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <h4 className="text-sm text-zinc-400 mb-2">{metric.metric}</h4>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.change.startsWith('+') ? (
                          <FiTrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        ) : (
                          <FiTrendingDown className="w-4 h-4 text-red-400 mr-1" />
                        )}
                        <span className={`text-sm ${metric.change.startsWith('+') ? "text-green-400" : "text-red-400"}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "artigos":
        return (
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Métricas de Conteúdo</CardTitle>
                <CardDescription className="text-zinc-400">
                  Performance de artigos e podcasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockData.contentMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-zinc-700/50 rounded-lg">
                      <h4 className="text-sm text-zinc-400 mb-2">{metric.type}</h4>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        <FiTrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-green-400">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardContent className="p-8 text-center">
              <FiBarChart2 className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Relatório em Desenvolvimento</h3>
              <p className="text-zinc-400">Este relatório está sendo desenvolvido e estará disponível em breve.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="flex h-screen bg-zinc-900">
        {/* Sidebar */}
        <div className="w-80 bg-zinc-800/50 border-r border-zinc-700 overflow-y-auto">
          <div className="p-4 border-b border-zinc-700">
            <h2 className="text-lg font-semibold text-white mb-4">Relatórios</h2>
            
            {/* Filtros de Período */}
            <div className="space-y-3">
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                  <SelectItem value="custom">Período Personalizado</SelectItem>
                </SelectContent>
              </Select>

              {periodFilter === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Lista de Relatórios */}
          <div className="p-4">
            {reportCategories.map((category, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.reports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedReport === report.id
                          ? "bg-ejup-cyan/20 text-ejup-cyan border border-ejup-cyan/30"
                          : "text-zinc-300 hover:bg-zinc-700/50 hover:text-white"
                      }`}
                    >
                      <span className="text-sm">{report.icon}</span>
                      <span className="text-sm">{report.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {reportCategories
                    .flatMap(cat => cat.reports)
                    .find(report => report.id === selectedReport)?.name || "Relatórios"}
                </h1>
                <p className="text-zinc-400 mt-1">
                  Período: {periodFilter === "custom" 
                    ? `${dateRange.start} até ${dateRange.end}` 
                    : periodFilter === "week" ? "Última Semana"
                    : periodFilter === "month" ? "Último Mês"
                    : periodFilter === "quarter" ? "Último Trimestre"
                    : "Último Ano"}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                >
                  <FiRefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
                <Button
                  size="sm"
                  className="bg-ejup-cyan hover:bg-ejup-cyan/80"
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Conteúdo do Relatório */}
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}