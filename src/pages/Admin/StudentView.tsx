import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCreditCard,
  FiBook,
  FiClock,
  FiPlay,
  FiCheckCircle,
  FiRotateCcw,
  FiSend,
  FiDollarSign,
  FiAlertTriangle
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function StudentView() {
  const { courseId, studentId } = useParams();
  
  // Mock data para o aluno - simplificado
  const studentData = {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-8888",
    document: "123.456.789-10",
    enrolledAt: "10/05/2023",
    lastAccess: "Hoje às 14:30",
    progress: 85,
    totalWatchTime: "12h 45min",
    completedLessons: 20,
    totalLessons: 24,
    
    // Dados do checkout (simplificado)
    checkoutInfo: {
      purchaseDate: "10/05/2023",
      paymentMethod: "Cartão de Crédito",
      paymentProvider: "Stripe",
      cardBrand: "Visa",
      cardLast4: "4242",
      installments: "3x de R$ 66,33",
      totalPaid: "R$ 199,00",
      originalPrice: "R$ 299,00",
      discountApplied: "33% OFF",
      couponUsed: "DIREITO30",
      paymentStatus: "Confirmado",
      transactionId: "TXN123456789",
      canRefund: true,
      canResendBilling: false,
      billingAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
        country: "Brasil"
      },
      // Informações fiscais básicas
      taxpayerName: "Ana Silva Santos",
      taxpayerDocument: "123.456.789-10"
    },

    // Progresso detalhado (simplificado)
    lessonProgress: [
      { id: 1, title: "História Constitucional", completed: true, watchTime: "45min", completedAt: "11/05/2023" },
      { id: 2, title: "Princípios Constitucionais", completed: true, watchTime: "60min", completedAt: "12/05/2023" },
      { id: 3, title: "Direitos Fundamentais", completed: true, watchTime: "55min", completedAt: "13/05/2023" },
      { id: 4, title: "Garantias Constitucionais", completed: false, watchTime: "23min", completedAt: null },
      { id: 5, title: "Organização do Estado", completed: false, watchTime: "0min", completedAt: null },
    ]
  };

  const courseName = "Introdução ao Direito Constitucional";

  const handleRefund = () => {
    // Lógica para processar estorno
    alert("Processando estorno...");
  };

  const handleResendBilling = () => {
    // Lógica para reenviar cobrança
    alert("Reenviando cobrança...");
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-4">
            <Link to={`/admin/courses/${courseId}`}>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <FiArrowLeft className="mr-2" /> Voltar ao Curso
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{studentData.name}</h1>
              <p className="text-sm text-zinc-400">
                Inscrito em {courseName} • {studentData.enrolledAt}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-600 text-zinc-300">
              <FiMail className="mr-2" /> Enviar E-mail
            </Button>
          </div>
        </div>

        {/* Student Info Cards - Ajustado para altura uniforme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 px-2">
          <Card className="bg-zinc-800/50 border-zinc-700 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FiUser />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Nome Completo</p>
                  <p className="text-white">{studentData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">E-mail</p>
                  <p className="text-white">{studentData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Telefone</p>
                  <p className="text-white">{studentData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">CPF</p>
                  <p className="text-white">{studentData.document}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-800/50 border-zinc-700 h-full">
            <CardHeader>
              <CardTitle className="text-white">Progresso do Curso</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">Progresso Geral</span>
                    <span className="text-sm font-medium text-white">{studentData.progress}%</span>
                  </div>
                  <Progress value={studentData.progress} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{studentData.completedLessons}</p>
                    <p className="text-xs text-zinc-400">Aulas Concluídas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{studentData.totalWatchTime}</p>
                    <p className="text-xs text-zinc-400">Tempo Assistido</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-zinc-700">
                  <p className="text-sm text-zinc-400">Último Acesso</p>
                  <p className="text-sm text-white">{studentData.lastAccess}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <div className="px-2">
          <Tabs defaultValue="checkout" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
              <TabsTrigger value="checkout" className="data-[state=active]:bg-ejup-cyan/20">Informações de Pagamento</TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-ejup-cyan/20">Progresso Detalhado</TabsTrigger>
            </TabsList>

            <TabsContent value="checkout" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações de Pagamento - Altura uniforme */}
                <Card className="bg-zinc-800/50 border-zinc-700 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FiCreditCard />
                      Detalhes do Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Data da Compra</p>
                          <p className="text-white">{studentData.checkoutInfo.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Status do Pagamento</p>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20">
                            {studentData.checkoutInfo.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-zinc-400 mb-1">Método de Pagamento</p>
                            <p className="text-white">{studentData.checkoutInfo.paymentMethod}</p>
                          </div>
                          {studentData.checkoutInfo.cardBrand && (
                            <div>
                              <p className="text-sm text-zinc-400 mb-1">Cartão</p>
                              <p className="text-white">
                                {studentData.checkoutInfo.cardBrand} •••• {studentData.checkoutInfo.cardLast4}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-zinc-400 mb-1">Valor Original</p>
                            <p className="text-white line-through text-sm">{studentData.checkoutInfo.originalPrice}</p>
                          </div>
                          <div>
                            <p className="text-sm text-zinc-400 mb-1">Valor Pago</p>
                            <p className="text-2xl font-bold text-emerald-400">{studentData.checkoutInfo.totalPaid}</p>
                          </div>
                          <div>
                            <p className="text-sm text-zinc-400 mb-1">Desconto</p>
                            <p className="text-white">{studentData.checkoutInfo.discountApplied}</p>
                          </div>
                          <div>
                            <p className="text-sm text-zinc-400 mb-1">Cupom</p>
                            <p className="text-white">{studentData.checkoutInfo.couponUsed}</p>
                          </div>
                        </div>
                      </div>

                      {studentData.checkoutInfo.installments && (
                        <div className="pt-4 border-t border-zinc-700">
                          <p className="text-sm text-zinc-400 mb-1">Parcelamento</p>
                          <p className="text-white">{studentData.checkoutInfo.installments}</p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-zinc-700">
                        <p className="text-xs text-zinc-500">ID da Transação: {studentData.checkoutInfo.transactionId}</p>
                      </div>
                    </div>

                    {/* Ações de Pagamento - Posicionado no final */}
                    <div className="pt-4 border-t border-zinc-700">
                      <p className="text-sm text-zinc-400 mb-3">Ações de Pagamento</p>
                      <div className="flex gap-2">
                        {studentData.checkoutInfo.canRefund && (
                          <Button 
                            onClick={handleRefund}
                            variant="outline" 
                            size="sm"
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                          >
                            <FiRotateCcw className="mr-2" size={14} />
                            Estornar
                          </Button>
                        )}
                        {studentData.checkoutInfo.canResendBilling && (
                          <Button 
                            onClick={handleResendBilling}
                            variant="outline" 
                            size="sm"
                            className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                          >
                            <FiSend className="mr-2" size={14} />
                            Reenviar Cobrança
                          </Button>
                        )}
                        {!studentData.checkoutInfo.canRefund && !studentData.checkoutInfo.canResendBilling && (
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <FiAlertTriangle size={14} />
                            <span>Nenhuma ação disponível</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Endereço de Cobrança - Altura uniforme */}
                <Card className="bg-zinc-800/50 border-zinc-700 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FiMapPin />
                      Endereço de Cobrança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-zinc-400 mb-1">Endereço Completo</p>
                        <div className="text-white space-y-1">
                          <p>{studentData.checkoutInfo.billingAddress.street}</p>
                          <p>{studentData.checkoutInfo.billingAddress.neighborhood}</p>
                          <p>
                            {studentData.checkoutInfo.billingAddress.city} - {studentData.checkoutInfo.billingAddress.state}
                          </p>
                          <p>CEP: {studentData.checkoutInfo.billingAddress.zipCode}</p>
                          <p>{studentData.checkoutInfo.billingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-zinc-700">
                      <p className="text-sm text-zinc-400 mb-2">Dados Fiscais</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-zinc-500">Nome no Documento</p>
                          <p className="text-white text-sm">{studentData.checkoutInfo.taxpayerName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">CPF</p>
                          <p className="text-white text-sm">{studentData.checkoutInfo.taxpayerDocument}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Progresso por Aula</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentData.lessonProgress.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <FiCheckCircle className="text-emerald-400" size={20} />
                          ) : (
                            <FiPlay className="text-zinc-400" size={20} />
                          )}
                          <div>
                            <p className="text-white font-medium">{lesson.title}</p>
                            <p className="text-sm text-zinc-400">
                              Tempo assistido: {lesson.watchTime}
                              {lesson.completedAt && ` • Concluída em ${lesson.completedAt}`}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={lesson.completed 
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" 
                            : lesson.watchTime !== "0min"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/20"
                            : "bg-zinc-500/20 text-zinc-400 border-zinc-500/20"
                          }
                        >
                          {lesson.completed ? "Concluída" : lesson.watchTime !== "0min" ? "Em andamento" : "Não iniciada"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-zinc-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-emerald-400">
                          {studentData.lessonProgress.filter(l => l.completed).length}
                        </p>
                        <p className="text-sm text-zinc-400">Concluídas</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-amber-400">
                          {studentData.lessonProgress.filter(l => !l.completed && l.watchTime !== "0min").length}
                        </p>
                        <p className="text-sm text-zinc-400">Em Andamento</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-zinc-400">
                          {studentData.lessonProgress.filter(l => l.watchTime === "0min").length}
                        </p>
                        <p className="text-sm text-zinc-400">Não Iniciadas</p>
                      </div>
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