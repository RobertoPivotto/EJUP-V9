import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FiArrowLeft, 
  FiSave, 
  FiUpload, 
  FiImage,
  FiX,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiBook,
  FiDollarSign,
  FiStar,
  FiPlay,
  FiFileText,
  FiInfo,
  FiAlertCircle,
  FiCheck,
  FiCalendar,
  FiTrendingUp,
  FiDownload,
  FiSend,
  FiSearch,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  materials: string[];
}

interface CourseFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string[];
  thumbnail: string;
  videoSalesUrl: string;
  coverImage: string;
  tags: string[];
  learningObjectives: string[];
  targetAudience: string[];
  instructorName: string;
  instructorRole: string; // Título/cargo do instrutor
  instructorBio: string;
  instructorPhoto: string;
  instructorExperience: string;
  
  // Múltiplos instrutores
  hasMultipleInstructors: boolean;
  additionalInstructors: {
    id: string;
    name: string;
    role: string;
    bio: string;
    photo: string;
    experience: string;
  }[];
  price: string;
  promotionalPrice: string;
  installments: string;
  hasPromotion: boolean;
  
  // Configurações de comissão
  instructorCommissionPercentage: number;
  gatewayTaxPercentage: number;
  taxPercentage: number;
  syllabus: string;
  modules: Module[];
  courseDuration: string;
  totalHours: string;
  maxStudents: string;
  certificateEnabled: boolean;
  isPublic: boolean;
  publishDate: string;
}

export default function EditCourse() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("informacoes-basicas");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estados para calculadora de período
  const [startDate, setStartDate] = useState("2025-06-20");
  const [endDate, setEndDate] = useState("2025-06-30");

  // Função para validar e corrigir datas
  const handleStartDateChange = (newStartDate: string) => {
    setStartDate(newStartDate);
    
    // Se a data inicial for posterior à data final, ajusta a data final
    if (newStartDate > endDate) {
      const startDateObj = new Date(newStartDate);
      // Adiciona 7 dias à data inicial como data final padrão
      const newEndDate = new Date(startDateObj);
      newEndDate.setDate(startDateObj.getDate() + 7);
      setEndDate(newEndDate.toISOString().split('T')[0]);
    }
  };

  const handleEndDateChange = (newEndDate: string) => {
    setEndDate(newEndDate);
    
    // Se a data final for anterior à data inicial, ajusta a data inicial
    if (newEndDate < startDate) {
      const endDateObj = new Date(newEndDate);
      // Subtrai 7 dias da data final como data inicial padrão
      const newStartDate = new Date(endDateObj);
      newStartDate.setDate(endDateObj.getDate() - 7);
      setStartDate(newStartDate.toISOString().split('T')[0]);
    }
  };
  
  // Mock data - em uma aplicação real, viria de uma API
  const [formData, setFormData] = useState<CourseFormData>({
    title: "Introdução ao Direito Constitucional",
    shortDescription: "Fundamentos essenciais do Direito Constitucional brasileiro",
    fullDescription: "Um curso abrangente sobre os fundamentos do Direito Constitucional brasileiro, cobrindo princípios, direitos fundamentais e organização do Estado. Ideal para estudantes e profissionais que desejam aprofundar seus conhecimentos na área.",
    category: ["direito-constitucional"],
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    videoSalesUrl: "https://youtube.com/watch?v=exemplo",
    coverImage: "",
    tags: ["constitucional", "direitos-fundamentais", "estado"],
    learningObjectives: [
      "Compreender os princípios fundamentais da Constituição",
      "Analisar direitos e garantias fundamentais",
      "Entender a organização do Estado brasileiro",
      "Dominar o controle de constitucionalidade"
    ],
    targetAudience: ["estudantes-direito", "advogados"],
    instructorName: "Dr. Pedro Almeida",
    instructorRole: "Professor de Direito Constitucional",
    instructorBio: "Doutor em Direito Constitucional pela USP com mais de 15 anos de experiência acadêmica e prática. Especialista em direitos fundamentais e controle de constitucionalidade.",
    instructorPhoto: "/lovable-uploads/team/instructor.png",
    instructorExperience: "Professor há 15 anos, autor de 3 livros sobre Direito Constitucional, membro do Instituto Brasileiro de Direito Constitucional (IBDC)",
    
    // Múltiplos instrutores
    hasMultipleInstructors: false,
    additionalInstructors: [],
    price: "299.00",
    promotionalPrice: "199.00",
    installments: "12",
    hasPromotion: true,
    
    // Configurações de comissão
    instructorCommissionPercentage: 70,
    gatewayTaxPercentage: 3.99,
    taxPercentage: 6.0,
    syllabus: "Curso estruturado em 5 módulos com abordagem teórica e prática",
    modules: [
      {
        id: "1",
        title: "Módulo 1: Fundamentos",
        description: "Introdução aos conceitos básicos",
        lessons: [
          { id: "1-1", title: "História Constitucional", description: "", videoUrl: "", duration: "45min", materials: [] },
          { id: "1-2", title: "Princípios Constitucionais", description: "", videoUrl: "", duration: "60min", materials: [] }
        ]
      }
    ],
    courseDuration: "20",
    totalHours: "20",
    maxStudents: "100",
    certificateEnabled: true,
    isPublic: true,
    publishDate: "2023-03-15"
  });

  const handleInputChange = (field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof CourseFormData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof CourseFormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: keyof CourseFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  // Função para simular vendas baseadas no período
  const getSimulatedSalesData = (start: string, end: string, instructorName: string) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const daysDiff = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24));
    
    // Fator de vendas baseado no período (mais vendas em períodos maiores)
    const salesFactor = Math.max(1, Math.floor(daysDiff / 7)); // vendas por semana
    
    // Cursos específicos por instrutor
    const instructorCourses = {
      "Dra. Carla Mendes": [
        { curso: "Direito Empresarial Avançado", baseVendas: 3, preco: 297 },
        { curso: "Direito Digital e LGPD", baseVendas: 2, preco: 347 }
      ],
      "Prof. Marcos Sousa": [
        { curso: "Resolução de Conflitos", baseVendas: 2, preco: 247 },
        { curso: "Contratos Empresariais", baseVendas: 3, preco: 297 }
      ],
      "Dr. Fernando Oliveira": [
        { curso: "Direito Tributário Essencial", baseVendas: 4, preco: 497 },
        { curso: "Legislação Trabalhista", baseVendas: 2, preco: 197 }
      ]
    };

    const courses = instructorCourses[instructorName] || instructorCourses["Dra. Carla Mendes"];
    
    return courses.map(curso => ({
      ...curso,
      vendas: Math.max(1, Math.round(curso.baseVendas * salesFactor * (0.8 + Math.random() * 0.4))) // variação de ±20%
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validar campos obrigatórios
      const newErrors: Record<string, string> = {};
      
      if (!formData.title.trim()) newErrors.title = "Título do curso é obrigatório";
      if (!formData.instructorName.trim()) newErrors.instructorName = "Nome do instrutor é obrigatório";
      if (!formData.instructorRole.trim()) newErrors.instructorRole = "Especialização do instrutor é obrigatória";
      if (!formData.instructorBio.trim()) newErrors.instructorBio = "Biografia do instrutor é obrigatória";
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }
      
      setErrors({});
      
      // Simular save - em uma aplicação real, faria requisição para API
      // Aqui você enviaria todos os dados do formData, incluindo as informações do instrutor
      console.log('Dados do curso sendo salvos:', {
        id,
        ...formData,
        // Garantir que as informações do instrutor sejam incluídas
        instructorData: {
          name: formData.instructorName,
          role: formData.instructorRole,
          bio: formData.instructorBio,
          photo: formData.instructorPhoto,
          experience: formData.instructorExperience
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Curso e informações do instrutor atualizados com sucesso!\n\nAs alterações aparecerão na página pública do curso.");
    } catch (error) {
      alert("Erro ao salvar curso");
    } finally {
      setLoading(false);
    }
  };

  const tabsConfig = [
    { id: "informacoes-basicas", label: "Informações Básicas", icon: <FiInfo /> },
    { id: "conteudo", label: "Conteúdo", icon: <FiBook /> },
    { id: "preco", label: "Preço", icon: <FiDollarSign /> },
    { id: "configuracoes", label: "Configurações", icon: <FiStar /> },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-4">
            <Link to={`/admin/courses/${id}`}>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <FiArrowLeft className="mr-2" /> Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Editar Curso</h1>
              <p className="text-sm text-zinc-400">Modifique as informações do curso</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-zinc-600 text-zinc-300"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-ejup-cyan to-ejup-cyan/80 hover:from-ejup-cyan/90 hover:to-ejup-cyan/70"
            >
              <FiSave className="mr-2" />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-zinc-800/50">
              {tabsConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="data-[state=active]:bg-ejup-cyan/20 flex items-center gap-2"
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Informações Básicas */}
            <TabsContent value="informacoes-basicas" className="space-y-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-zinc-300">Título do Curso *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                      placeholder="Ex: Introdução ao Direito Constitucional"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortDescription" className="text-zinc-300">Descrição Resumida *</Label>
                    <Textarea
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                      placeholder="Breve descrição do curso (até 160 caracteres)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription" className="text-zinc-300">Descrição Completa *</Label>
                    <Textarea
                      id="fullDescription"
                      value={formData.fullDescription}
                      onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                      placeholder="Descrição detalhada do curso"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-zinc-300">Duração (horas) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={formData.courseDuration}
                        onChange={(e) => handleInputChange('courseDuration', e.target.value)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                        placeholder="20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents" className="text-zinc-300">Máximo de Alunos</Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        value={formData.maxStudents}
                        onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção do Instrutor */}
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FiInfo className="text-ejup-cyan" />
                    Informações do Instrutor
                  </CardTitle>
                  <div className="space-y-2">
                    <p className="text-zinc-400 text-sm">
                      Essas informações aparecerão nas páginas públicas do curso
                    </p>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      <h5 className="text-gray-300 text-sm font-medium mb-1">📍 Onde essas informações aparecem:</h5>
                      <ul className="text-xs text-zinc-300 space-y-1">
                        <li>• <strong>Página do curso:</strong> Nome, especialização, foto e biografia na aba "Instrutor"</li>
                        <li>• <strong>Lista de cursos:</strong> Nome, especialização e iniciais no card do curso</li>
                        <li>• <strong>Vídeo de vendas:</strong> Nome e especialização abaixo do player</li>
                      </ul>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instructorName" className="text-zinc-300">Nome Completo *</Label>
                      <Input
                        id="instructorName"
                        value={formData.instructorName}
                        onChange={(e) => handleInputChange('instructorName', e.target.value)}
                        className={cn(
                          "bg-zinc-700/50 text-white",
                          errors.instructorName ? "border-red-500" : "border-zinc-600"
                        )}
                        placeholder="Dr. João Silva"
                      />
                      {errors.instructorName && (
                        <p className="text-red-400 text-sm flex items-center gap-2 mt-1">
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.instructorName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructorRole" className="text-zinc-300">Especialização/Cargo *</Label>
                      <Input
                        id="instructorRole"
                        value={formData.instructorRole}
                        onChange={(e) => handleInputChange('instructorRole', e.target.value)}
                        className={cn(
                          "bg-zinc-700/50 text-white",
                          errors.instructorRole ? "border-red-500" : "border-zinc-600"
                        )}
                        placeholder="Especialista em Direito Constitucional"
                      />
                      {errors.instructorRole && (
                        <p className="text-red-400 text-sm flex items-center gap-2 mt-1">
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.instructorRole}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructorPhoto" className="text-zinc-300">Foto do Instrutor</Label>
                    <Input
                      id="instructorPhoto"
                      value={formData.instructorPhoto}
                      onChange={(e) => handleInputChange('instructorPhoto', e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                      placeholder="/lovable-uploads/team/instructor.png"
                    />
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      <h6 className="text-gray-300 text-xs font-medium mb-2">📐 Tamanhos recomendados da foto:</h6>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>• <strong>Página do curso (aba Instrutor):</strong> 64x64px (redonda)</li>
                        <li>• <strong>Cards de curso:</strong> 40x40px (redonda)</li>
                        <li>• <strong>Vídeo de vendas:</strong> 48x48px (redonda)</li>
                        <li>• <strong>Formato ideal:</strong> Quadrada (1:1), mínimo 200x200px</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructorBio" className="text-zinc-300">Biografia do Instrutor *</Label>
                    <Textarea
                      id="instructorBio"
                      value={formData.instructorBio}
                      onChange={(e) => handleInputChange('instructorBio', e.target.value)}
                      className={cn(
                        "bg-zinc-700/50 text-white",
                        errors.instructorBio ? "border-red-500" : "border-zinc-600"
                      )}
                      placeholder="Conte sobre a formação, experiência e especialidades do instrutor..."
                      rows={3}
                    />
                    {errors.instructorBio && (
                      <p className="text-red-400 text-sm flex items-center gap-2 mt-1">
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.instructorBio}
                      </p>
                    )}
                    <p className="text-xs text-zinc-500">Esta descrição aparecerá na seção "Sobre o Instrutor" na página do curso</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructorExperience" className="text-zinc-300">Experiência Profissional</Label>
                    <Textarea
                      id="instructorExperience"
                      value={formData.instructorExperience}
                      onChange={(e) => handleInputChange('instructorExperience', e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                      placeholder="Principais experiências, conquistas e certificações..."
                      rows={3}
                    />
                    <p className="text-xs text-zinc-500">Informações adicionais sobre a trajetória do instrutor</p>
                  </div>

                  {/* Preview do Instrutor */}
                  <div className="mt-6 p-4 bg-zinc-900/40 border border-zinc-600 rounded-lg">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <FiInfo className="text-ejup-cyan" />
                      Preview - Como aparecerá na página do curso
                    </h4>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
                        {formData.instructorPhoto ? (
                          <img 
                            src={formData.instructorPhoto} 
                            alt={formData.instructorName}
                            className="w-16 h-16 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <FiInfo className="text-zinc-400 text-xl" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white">
                          {formData.instructorName || "Nome do Instrutor"}
                        </h5>
                        <p className="text-sm text-ejup-cyan mb-2">
                          {formData.instructorRole || "Especialização"}
                        </p>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {formData.instructorBio || "Biografia do instrutor aparecerá aqui..."}
                        </p>
                        {formData.instructorExperience && (
                          <div className="mt-2 pt-2 border-t border-zinc-700">
                            <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Experiência</p>
                            <p className="text-sm text-zinc-300">
                              {formData.instructorExperience}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Objetivos de Aprendizagem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={objective}
                        onChange={(e) => handleArrayChange('learningObjectives', index, e.target.value)}
                        className="bg-zinc-700/50 border-zinc-600 text-white flex-1"
                        placeholder="O que o aluno vai aprender..."
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem('learningObjectives', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiX />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('learningObjectives', 'Novo objetivo')}
                    className="border-zinc-600 text-zinc-300"
                  >
                    <FiPlus className="mr-2" /> Adicionar Objetivo
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conteúdo */}
            <TabsContent value="conteudo" className="space-y-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Módulos do Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border border-zinc-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-medium">Módulo {moduleIndex + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          <FiTrash2 />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <Input
                          value={module.title}
                          onChange={(e) => {
                            const newModules = [...formData.modules];
                            newModules[moduleIndex].title = e.target.value;
                            handleInputChange('modules', newModules);
                          }}
                          className="bg-zinc-700/50 border-zinc-600 text-white"
                          placeholder="Título do módulo"
                        />
                        <Textarea
                          value={module.description}
                          onChange={(e) => {
                            const newModules = [...formData.modules];
                            newModules[moduleIndex].description = e.target.value;
                            handleInputChange('modules', newModules);
                          }}
                          className="bg-zinc-700/50 border-zinc-600 text-white"
                          placeholder="Descrição do módulo"
                          rows={2}
                        />
                        
                        {/* Aulas do módulo */}
                        <div className="ml-4 space-y-2">
                          <h5 className="text-zinc-300 text-sm font-medium">Aulas ({module.lessons.length})</h5>
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center gap-2 bg-zinc-700/30 p-2 rounded">
                              <FiPlay className="text-ejup-cyan" size={14} />
                              <Input
                                value={lesson.title}
                                onChange={(e) => {
                                  const newModules = [...formData.modules];
                                  newModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                                  handleInputChange('modules', newModules);
                                }}
                                className="bg-zinc-600/50 border-zinc-500 text-white text-sm flex-1"
                                placeholder="Título da aula"
                              />
                              <Input
                                value={lesson.duration}
                                onChange={(e) => {
                                  const newModules = [...formData.modules];
                                  newModules[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                                  handleInputChange('modules', newModules);
                                }}
                                className="bg-zinc-600/50 border-zinc-500 text-white text-sm w-20"
                                placeholder="45min"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                              >
                                <FiX size={12} />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ejup-cyan hover:text-ejup-cyan/80"
                          >
                            <FiPlus className="mr-2" size={14} /> Adicionar Aula
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="border-zinc-600 text-zinc-300"
                  >
                    <FiPlus className="mr-2" /> Adicionar Módulo
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preço */}
            <TabsContent value="preco" className="space-y-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Configurações de Preço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-zinc-300">Preço Original (R$) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                        placeholder="299.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="promotionalPrice" className="text-zinc-300">Preço Promocional (R$)</Label>
                      <Input
                        id="promotionalPrice"
                        type="number"
                        step="0.01"
                        value={formData.promotionalPrice}
                        onChange={(e) => handleInputChange('promotionalPrice', e.target.value)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                        placeholder="199.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="installments" className="text-zinc-300">Parcelas (máx)</Label>
                      <Input
                        id="installments"
                        type="number"
                        value={formData.installments}
                        onChange={(e) => handleInputChange('installments', e.target.value)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                        placeholder="12"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasPromotion"
                      checked={formData.hasPromotion}
                      onChange={(e) => handleInputChange('hasPromotion', e.target.checked)}
                      className="rounded border-zinc-600 bg-zinc-700"
                    />
                    <Label htmlFor="hasPromotion" className="text-zinc-300">
                      Curso em promoção
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Configurações de Comissão */}
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Configurações de Comissão</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Configurações de Taxas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gatewayTax" className="text-zinc-300">
                        Taxa Gateway (%)
                      </Label>
                      <Input
                        id="gatewayTax"
                        type="number"
                        min="0"
                        max="20"
                        step="0.01"
                        value={formData.gatewayTaxPercentage}
                        onChange={(e) => handleInputChange('gatewayTaxPercentage', parseFloat(e.target.value) || 0)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxes" className="text-zinc-300">
                        Impostos (%)
                      </Label>
                      <Input
                        id="taxes"
                        type="number"
                        min="0"
                        max="30"
                        step="0.1"
                        value={formData.taxPercentage}
                        onChange={(e) => handleInputChange('taxPercentage', parseFloat(e.target.value) || 0)}
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Configuração do Percentual do Instrutor */}
                  <div className="space-y-2">
                    <Label htmlFor="commissionPercentage" className="text-zinc-300">
                      Percentual do Instrutor (%)
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="commissionPercentage"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.instructorCommissionPercentage}
                        onChange={(e) => handleInputChange('instructorCommissionPercentage', parseInt(e.target.value) || 0)}
                        className="bg-zinc-700/50 border-zinc-600 text-white w-20"
                      />
                      <span className="text-zinc-300">%</span>
                      <div className="flex-1 bg-zinc-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${formData.instructorCommissionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Simulação de Valores */}
                  <div className="bg-zinc-700/50 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Simulação de Repasse</h4>
                    
                    {(() => {
                      const valorCurso = parseFloat(formData.price) || 0;
                      const taxaGateway = formData.gatewayTaxPercentage / 100;
                      const impostos = formData.taxPercentage / 100;
                      
                      const valorTaxaGateway = valorCurso * taxaGateway;
                      const valorImpostos = valorCurso * impostos;
                      const valorLiquido = valorCurso - valorTaxaGateway - valorImpostos;
                      const valorInstrutor = valorLiquido * (formData.instructorCommissionPercentage / 100);
                      const valorPlataforma = valorLiquido - valorInstrutor;
                      
                      return (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Valor do Curso:</span>
                            <span className="text-white">R$ {valorCurso.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Taxa Gateway ({formData.gatewayTaxPercentage}%):</span>
                            <span className="text-red-400">- R$ {valorTaxaGateway.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Impostos ({formData.taxPercentage}%):</span>
                            <span className="text-red-400">- R$ {valorImpostos.toFixed(2)}</span>
                          </div>
                          <div className="border-t border-zinc-600 pt-2 flex justify-between font-medium">
                            <span className="text-zinc-300">Valor Líquido:</span>
                            <span className="text-blue-400">R$ {valorLiquido.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Instrutor ({formData.instructorCommissionPercentage}%):</span>
                            <span className="text-green-400 font-bold">R$ {valorInstrutor.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Plataforma ({100 - formData.instructorCommissionPercentage}%):</span>
                            <span className="text-purple-400">R$ {valorPlataforma.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Calculadora de Período */}
                  <div className="bg-zinc-700/50 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                      <FiCalendar className="text-blue-400" />
                      Cálculo de Repasse por Período
                    </h4>
                    
                    {/* Seleção de Período */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDateEdit" className="text-zinc-300">
                          Data Inicial
                        </Label>
                                                   <Input
                             id="startDateEdit"
                             type="date"
                             value={startDate}
                             onChange={(e) => handleStartDateChange(e.target.value)}
                             className="bg-zinc-600 border-zinc-500 text-white"
                           />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDateEdit" className="text-zinc-300">
                          Data Final
                        </Label>
                                                   <Input
                             id="endDateEdit"
                             type="date"
                             value={endDate}
                             onChange={(e) => handleEndDateChange(e.target.value)}
                             className="bg-zinc-600 border-zinc-500 text-white"
                           />
                      </div>
                    </div>

                                         {/* Atalhos de Período e Ações */}
                     <div className="space-y-3 mb-4">
                       {/* Atalhos de Período */}
                       <div className="flex flex-wrap gap-2">
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="border-zinc-500 text-zinc-300 hover:bg-zinc-600"
                           onClick={() => {
                             const today = new Date('2025-06-20'); // Data atual: 20/06/2025
                             const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                             const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                             setStartDate(startOfMonth.toISOString().split('T')[0]);
                             setEndDate(endOfMonth.toISOString().split('T')[0]);
                           }}
                         >
                           Mês Atual
                         </Button>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="border-zinc-500 text-zinc-300 hover:bg-zinc-600"
                           onClick={() => {
                             const today = new Date('2025-06-20'); // Data atual: 20/06/2025
                             const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                             const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                             setStartDate(lastMonth.toISOString().split('T')[0]);
                             setEndDate(endOfLastMonth.toISOString().split('T')[0]);
                           }}
                         >
                           Mês Anterior
                         </Button>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="border-zinc-500 text-zinc-300 hover:bg-zinc-600"
                           onClick={() => {
                             const today = new Date('2025-06-20'); // Data atual: 20/06/2025
                             const startOfYear = new Date(today.getFullYear(), 0, 1);
                             setStartDate(startOfYear.toISOString().split('T')[0]);
                             setEndDate(today.toISOString().split('T')[0]);
                           }}
                         >
                           Ano até Agora
                         </Button>
                       </div>

                       {/* Botões de Ação */}
                       <div className="flex gap-2 pt-2 border-t border-zinc-500">
                         <Button 
                           size="sm" 
                           className="bg-blue-600 hover:bg-blue-700 text-white"
                           onClick={() => {
                             const startDateFormatted = new Date(startDate).toLocaleDateString('pt-BR');
                             const endDateFormatted = new Date(endDate).toLocaleDateString('pt-BR');
                             console.log(`Período filtrado: ${startDateFormatted} - ${endDateFormatted}`);
                             // Aqui seria implementada a funcionalidade de filtro
                           }}
                         >
                           <FiSearch className="mr-2" size={14} />
                           Filtrar Período
                         </Button>
                         <Button 
                           size="sm" 
                           className="bg-green-600 hover:bg-green-700 text-white"
                           onClick={() => {
                             const instructorName = formData.instructorName || "Instrutor";
                             const startDateFormatted = new Date(startDate).toLocaleDateString('pt-BR');
                             const endDateFormatted = new Date(endDate).toLocaleDateString('pt-BR');
                             console.log(`Repasse confirmado para ${instructorName} no período ${startDateFormatted} - ${endDateFormatted}`);
                             // Aqui seria implementada a funcionalidade de confirmação do repasse
                           }}
                         >
                           <FiCheck className="mr-2" size={14} />
                           Confirmar Repasse
                         </Button>
                       </div>
                     </div>

                    {/* Simulação com Dados do Período */}
                    <div className="bg-zinc-600 p-4 rounded-lg">
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <FiTrendingUp className="text-green-400" />
                        Simulação do Período ({new Date(startDate).toLocaleDateString('pt-BR')} - {new Date(endDate).toLocaleDateString('pt-BR')})
                      </h5>
                      
                      {(() => {
                        // Dados simulados para o período baseados no instrutor
                        const instructorName = formData.instructorName || "Dra. Carla Mendes";
                        const vendasPeriodo = getSimulatedSalesData(startDate, endDate, instructorName);
                        
                        const taxaGateway = formData.gatewayTaxPercentage / 100;
                        const impostos = formData.taxPercentage / 100;
                        const percentualInstrutor = formData.instructorCommissionPercentage / 100;
                        
                        let totalBruto = 0;
                        let totalLiquido = 0;
                        let totalInstrutor = 0;
                        
                        const detalhesVendas = vendasPeriodo.map(venda => {
                          const valorBruto = venda.vendas * venda.preco;
                          const valorTaxaGateway = valorBruto * taxaGateway;
                          const valorImpostos = valorBruto * impostos;
                          const valorLiquido = valorBruto - valorTaxaGateway - valorImpostos;
                          const valorInstrutor = valorLiquido * percentualInstrutor;
                          
                          totalBruto += valorBruto;
                          totalLiquido += valorLiquido;
                          totalInstrutor += valorInstrutor;
                          
                          return {
                            ...venda,
                            valorBruto,
                            valorLiquido,
                            valorInstrutor
                          };
                        });
                        
                        return (
                          <div className="space-y-4">
                            {/* Resumo Geral */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-zinc-500 p-3 rounded-lg text-center">
                                <p className="text-zinc-200 text-sm">Total Bruto</p>
                                <p className="text-white text-lg font-bold">R$ {totalBruto.toFixed(2)}</p>
                              </div>
                              <div className="bg-zinc-500 p-3 rounded-lg text-center">
                                <p className="text-zinc-200 text-sm">Total Líquido</p>
                                <p className="text-blue-400 text-lg font-bold">R$ {totalLiquido.toFixed(2)}</p>
                              </div>
                              <div className="bg-zinc-500 p-3 rounded-lg text-center">
                                <p className="text-zinc-200 text-sm">Repasse Instrutor</p>
                                <p className="text-green-400 text-lg font-bold">R$ {totalInstrutor.toFixed(2)}</p>
                              </div>
                            </div>

                            {/* Detalhamento por Curso */}
                            <div className="space-y-3">
                              <h6 className="text-zinc-200 font-medium">Detalhamento por Curso</h6>
                              {detalhesVendas.map((venda, index) => (
                                <div key={index} className="bg-zinc-500 p-3 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="text-white font-medium">{venda.curso}</p>
                                      <p className="text-zinc-300 text-sm">{venda.vendas} vendas × R$ {venda.preco.toFixed(2)}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-green-400 font-bold">R$ {venda.valorInstrutor.toFixed(2)}</p>
                                      <p className="text-zinc-300 text-sm">repasse</p>
                                    </div>
                                  </div>
                                  <div className="text-xs text-zinc-300 space-y-1">
                                    <div className="flex justify-between">
                                      <span>Valor Bruto:</span>
                                      <span>R$ {venda.valorBruto.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Valor Líquido:</span>
                                      <span>R$ {venda.valorLiquido.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex gap-2 pt-4 border-t border-zinc-500">
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => {
                                  const startDateFormatted = new Date(startDate).toLocaleDateString('pt-BR');
                                  const endDateFormatted = new Date(endDate).toLocaleDateString('pt-BR');
                                  console.log(`Relatório exportado para período ${startDateFormatted} - ${endDateFormatted}`);
                                  // Aqui seria implementada a funcionalidade de exportação
                                }}
                              >
                                <FiDownload className="mr-2" size={14} />
                                Exportar Relatório
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-zinc-500 text-zinc-300"
                                onClick={() => {
                                  console.log(`Repasse de R$ ${totalInstrutor.toFixed(2)} processado para ${instructorName}`);
                                  // Aqui seria implementada a funcionalidade de processamento do repasse
                                }}
                              >
                                <FiSend className="mr-2" size={14} />
                                Processar Repasse
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações */}
            <TabsContent value="configuracoes" className="space-y-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={formData.isPublic}
                      onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                      className="rounded border-zinc-600 bg-zinc-700"
                    />
                    <Label htmlFor="isPublic" className="text-zinc-300">
                      Curso público (visível para todos)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="certificateEnabled"
                      checked={formData.certificateEnabled}
                      onChange={(e) => handleInputChange('certificateEnabled', e.target.checked)}
                      className="rounded border-zinc-600 bg-zinc-700"
                    />
                    <Label htmlFor="certificateEnabled" className="text-zinc-300">
                      Emitir certificado de conclusão
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publishDate" className="text-zinc-300">Data de Publicação</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                    />
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