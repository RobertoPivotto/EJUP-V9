import React, { useState, useCallback, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FiArrowLeft, 
  FiArrowRight, 
  FiCheckCircle, 
  FiSave, 
  FiUpload, 
  FiImage,
  FiX,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiBook,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiStar,
  FiPlay,
  FiFileText,
  FiCamera,
  FiInfo,
  FiAlertCircle,
  FiAlertTriangle,
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
  duration: string;
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
  // Informações básicas
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string[];
  thumbnail: string;
  videoSalesUrl: string; // Link do YouTube para vídeo de vendas
  coverImage: string;
  tags: string[];
  learningObjectives: string[]; // "O que você vai aprender"
  targetAudience: string[]; // "Para quem é este curso"
  
  // Informações do professor
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
  
  // Informações financeiras
  price: string;
  promotionalPrice: string;
  installments: string;
  hasPromotion: boolean;
  
  // Configurações de comissão
  instructorCommissionPercentage: number;
  gatewayTaxPercentage: number;
  taxPercentage: number;
  
  // Ementa e módulos
  syllabus: string;
  modules: Module[];
  courseDuration: string; // Duração em horas
  totalHours: string; // Total de horas
  
  // Configurações
  maxStudents: string;
  certificateEnabled: boolean;
  isPublic: boolean;
  publishDate: string;
  
  // Cursos relacionados
  showRelatedCourses: boolean;
  relatedCourses: {
    id: string;
    title: string;
    price: string;
    link: string;
  }[];
}

export default function NewCourse() {
  const [activeTab, setActiveTab] = useState("informacoes-basicas");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [customAudiences, setCustomAudiences] = useState<string[]>([]);
  const [newAudience, setNewAudience] = useState("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([
    "direito-administrativo",
    "direito-civil", 
    "direito-constitucional",
    "direito-digital",
    "direito-minerario",
    "direito-penal",
    "direito-trabalhista",
    "direito-tributario",
    "processo-civil"
  ]);
  const [availableAudiences, setAvailableAudiences] = useState<string[]>([
    "advogados",
    "consultores",
    "empresarios",
    "estudantes-direito",
    "profissionais-juridicos"
  ]);
  
  // Estados para modais de confirmação
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [showDeleteAudienceModal, setShowDeleteAudienceModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>("");
  const [deleteType, setDeleteType] = useState<"default" | "custom">("default");
  
  // Estados para controlar dropdowns
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  
  // Estados para edição
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingAudience, setEditingAudience] = useState<string | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [editAudienceValue, setEditAudienceValue] = useState("");
  
  // Refs para detectar cliques fora dos dropdowns
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const audienceDropdownRef = useRef<HTMLDivElement>(null);

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

  // Instrutores disponíveis (dados compartilhados do UserManagement)
  const availableInstructors = [
    {
      id: 3,
      name: "Dra. Carla Mendes",
      specialization: "Direito Empresarial e Digital",
      bio: "Especialista com 15 anos de experiência"
    },
    {
      id: 4,
      name: "Prof. Marcos Sousa",
      specialization: "Resolução de Conflitos",
      bio: "Professor universitário e mediador certificado"
    }
  ];

  // Fechar dropdowns quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (audienceDropdownRef.current && !audienceDropdownRef.current.contains(event.target as Node)) {
        setShowAudienceDropdown(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Limpar duplicações entre categorias padrão e personalizadas
  useEffect(() => {
    const normalizeString = (str: string) => 
      str.toLowerCase()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '') // Remove acentos
         .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
         .replace(/\s+/g, '-'); // Substituir espaços por hifens

    // Remover das categorias personalizadas qualquer item que já existe nas padrão
    const cleanedCustomCategories = customCategories.filter(customCat => {
      const normalizedCustom = normalizeString(customCat);
      return !availableCategories.some(defaultCat => {
        const normalizedDefault = normalizeString(defaultCat);
        return normalizedDefault === normalizedCustom || 
               defaultCat.replace("-", " ").toLowerCase() === customCat.toLowerCase();
      });
    });

    if (cleanedCustomCategories.length !== customCategories.length) {
      setCustomCategories(cleanedCustomCategories);
    }
  }, [availableCategories, customCategories]);

  // Função para fechar todos os dropdowns
  const closeAllDropdowns = () => {
    setShowCategoryDropdown(false);
    setShowAudienceDropdown(false);
  };

  const [formData, setFormData] = useState<CourseFormData>({
    // Informações básicas
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: [],
    thumbnail: "",
    videoSalesUrl: "",
    coverImage: "",
    tags: [],
    learningObjectives: [],
    targetAudience: [],
    
    // Informações do professor
    instructorName: "",
    instructorRole: "",
    instructorBio: "",
    instructorPhoto: "",
    instructorExperience: "",
    
    // Múltiplos instrutores
    hasMultipleInstructors: false,
    additionalInstructors: [],
    
    // Informações financeiras
    price: "",
    promotionalPrice: "",
    installments: "12",
    hasPromotion: false,
    
    // Configurações de comissão
    instructorCommissionPercentage: 70,
    gatewayTaxPercentage: 3.99,
    taxPercentage: 6.0,
    
    // Ementa e módulos
    syllabus: "",
    modules: [],
    courseDuration: "",
    totalHours: "",
    
    // Configurações
    maxStudents: "",
    certificateEnabled: true,
    isPublic: true,
    publishDate: "",
    
    // Cursos relacionados
    showRelatedCourses: false,
    relatedCourses: [],
  });

  // Função para extrair ID do YouTube
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const tabs = [
    { 
      id: "informacoes-basicas", 
      label: "Informações Básicas",
      icon: <FiBook />,
      description: "Título, descrição e categoria do curso"
    },
    { 
      id: "instrutor", 
      label: "Instrutor",
      icon: <FiUsers />,
      description: "Informações sobre o professor"
    },
    { 
      id: "financeiro", 
      label: "Financeiro",
      icon: <FiDollarSign />,
      description: "Preços e condições de pagamento"
    },
    { 
      id: "ementa", 
      label: "Conteúdo",
      icon: <FiPlay />,
      description: "Módulos, aulas e materiais"
    },
    { 
      id: "configuracoes", 
      label: "Configurações",
      icon: <FiStar />,
      description: "Configurações avançadas"
    },
    { 
      id: "revisao", 
      label: "Revisão",
      icon: <FiEye />,
      description: "Revise e publique seu curso"
    },
  ];

  // Calcular progresso
  const getProgress = () => {
    return (completedSteps.size / tabs.length) * 100;
  };

  // Validar step atual
  const validateCurrentStep = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    switch (activeTab) {
      case "informacoes-basicas":
        if (!formData.title.trim()) newErrors.title = "Título é obrigatório";
        if (!formData.shortDescription.trim()) newErrors.shortDescription = "Descrição curta é obrigatória";
        if (!formData.fullDescription.trim()) newErrors.fullDescription = "Descrição completa é obrigatória";
        if (formData.category.length === 0) newErrors.category = "Categoria é obrigatória";
        if (formData.targetAudience.length === 0) newErrors.targetAudience = "Público-alvo é obrigatório";
        break;
        
      case "instrutor":
        if (!formData.instructorName.trim()) newErrors.instructorName = "Nome do instrutor é obrigatório";
    if (!formData.instructorRole.trim()) newErrors.instructorRole = "Título/cargo do instrutor é obrigatório";
        if (!formData.instructorBio.trim()) newErrors.instructorBio = "Biografia é obrigatória";
        break;
        
      case "financeiro":
        if (!formData.price.trim()) newErrors.price = "Preço é obrigatório";
        if (formData.hasPromotion && !formData.promotionalPrice.trim()) {
          newErrors.promotionalPrice = "Preço promocional é obrigatório quando há promoção";
        }
        break;
        
      case "ementa":
        if (!formData.syllabus.trim()) newErrors.syllabus = "Ementa é obrigatória";
        if (formData.modules.length === 0) newErrors.modules = "Pelo menos um módulo é obrigatório";
        break;
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setCompletedSteps(prev => new Set([...prev, activeTab]));
      return true;
    }
    
    return false;
  }, [activeTab, formData]);

  const handleChange = useCallback((field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Se o campo for instructorName, carregar configurações padrão
    if (field === 'instructorName' && value) {
      loadInstructorDefaults(value);
    }
    
    // Limpar erro do campo quando ele é editado
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleNext = () => {
    if (validateCurrentStep()) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "",
      description: "",
      duration: "",
      lessons: []
    };
    handleChange("modules", [...formData.modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: "",
      description: "",
      videoUrl: "",
      duration: "",
      materials: []
    };
    
    const updatedModules = formData.modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] }
        : module
    );
    
    handleChange("modules", updatedModules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do curso:", formData);
    alert("Curso salvo com sucesso!");
  };

  // Função para adicionar categoria personalizada
  const addCustomCategory = () => {
    if (newCategory.trim()) {
      const newCat = newCategory.trim();
      
      // Normalizar strings para comparação correta
      const normalizeString = (str: string) => 
        str.toLowerCase()
           .normalize('NFD')
           .replace(/[\u0300-\u036f]/g, '') // Remove acentos
           .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
           .replace(/\s+/g, '-'); // Substituir espaços por hifens
      
      const normalizedNewCat = normalizeString(newCat);
      
      // Verificar se já existe nas categorias padrão
      const categoryExistsInDefault = availableCategories.some(cat => 
        normalizeString(cat) === normalizedNewCat || 
        cat.replace("-", " ").toLowerCase() === newCat.toLowerCase()
      );
      
      // Verificar se já existe nas categorias personalizadas
      const categoryExistsInCustom = customCategories.some(cat => 
        normalizeString(cat) === normalizedNewCat
      );
      
      if (!categoryExistsInDefault && !categoryExistsInCustom) {
        const updatedCategories = [...customCategories, newCat].sort((a, b) => {
          return normalizeString(a).localeCompare(normalizeString(b), 'pt-BR');
        });
        setCustomCategories(updatedCategories);
        setNewCategory("");
      } else {
        // Mostrar alerta ou feedback de que a categoria já existe
        alert("Esta categoria já existe!");
      }
    }
  };

  // Função para adicionar audiência personalizada
  const addCustomAudience = () => {
    if (newAudience.trim() && !customAudiences.includes(newAudience.trim())) {
      const newAud = newAudience.trim();
      const updatedAudiences = [...customAudiences, newAud].sort((a, b) => {
        // Normalizar strings para comparação correta
        const normalizeString = (str: string) => 
          str.toLowerCase()
             .normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '') // Remove acentos
             .replace(/[^a-z0-9\s]/g, ''); // Remove caracteres especiais
        
        return normalizeString(a).localeCompare(normalizeString(b), 'pt-BR');
      });
      setCustomAudiences(updatedAudiences);
      setNewAudience("");
    }
  };

  // Função para iniciar exclusão de categoria
  const startDeleteCategory = (category: string, type: "default" | "custom") => {
    setItemToDelete(category);
    setDeleteType(type);
    setShowDeleteCategoryModal(true);
  };

  // Função para confirmar exclusão de categoria
  const confirmDeleteCategory = () => {
    if (deleteType === "default") {
      setAvailableCategories(availableCategories.filter(cat => cat !== itemToDelete));
    } else {
      const updatedCustomCategories = customCategories.filter(cat => cat !== itemToDelete);
      setCustomCategories(updatedCustomCategories.sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase(), 'pt-BR')
      ));
    }
    
    // Remove do formulário se estava selecionada
    if (formData.category.includes(itemToDelete)) {
      handleChange("category", formData.category.filter(c => c !== itemToDelete));
    }
    
    setShowDeleteCategoryModal(false);
    setItemToDelete("");
  };

  // Função para iniciar exclusão de público
  const startDeleteAudience = (audience: string, type: "default" | "custom") => {
    setItemToDelete(audience);
    setDeleteType(type);
    setShowDeleteAudienceModal(true);
  };

  // Função para confirmar exclusão de público
  const confirmDeleteAudience = () => {
    if (deleteType === "default") {
      setAvailableAudiences(availableAudiences.filter(aud => aud !== itemToDelete));
    } else {
      const updatedCustomAudiences = customAudiences.filter(aud => aud !== itemToDelete);
      setCustomAudiences(updatedCustomAudiences.sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase(), 'pt-BR')
      ));
    }
    
    // Remove do formulário se estava selecionado
    if (formData.targetAudience.includes(itemToDelete)) {
      handleChange("targetAudience", formData.targetAudience.filter(a => a !== itemToDelete));
    }
    
    setShowDeleteAudienceModal(false);
    setItemToDelete("");
  };

  // Funções para edição de categorias personalizadas
  const startEditCategory = (category: string) => {
    setEditingCategory(category);
    setEditCategoryValue(category);
  };

  const confirmEditCategory = () => {
    if (editCategoryValue.trim() && editingCategory && editCategoryValue.trim() !== editingCategory) {
      const updatedCategories = customCategories.map(cat => 
        cat === editingCategory ? editCategoryValue.trim() : cat
      ).sort((a, b) => {
        const normalizeString = (str: string) => 
          str.toLowerCase()
             .normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '')
             .replace(/[^a-z0-9\s]/g, '');
        return normalizeString(a).localeCompare(normalizeString(b), 'pt-BR');
      });
      
      setCustomCategories(updatedCategories);
      
      // Atualizar no formulário se estava selecionada
      if (formData.category.includes(editingCategory)) {
        const updatedFormCategories = formData.category.map(cat => 
          cat === editingCategory ? editCategoryValue.trim() : cat
        );
        handleChange("category", updatedFormCategories);
      }
    }
    
    setEditingCategory(null);
    setEditCategoryValue("");
  };

  const cancelEditCategory = () => {
    setEditingCategory(null);
    setEditCategoryValue("");
  };

  // Funções para edição de públicos personalizados
  const startEditAudience = (audience: string) => {
    setEditingAudience(audience);
    setEditAudienceValue(audience);
  };

  const confirmEditAudience = () => {
    if (editAudienceValue.trim() && editingAudience && editAudienceValue.trim() !== editingAudience) {
      const updatedAudiences = customAudiences.map(aud => 
        aud === editingAudience ? editAudienceValue.trim() : aud
      ).sort((a, b) => {
        const normalizeString = (str: string) => 
          str.toLowerCase()
             .normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '')
             .replace(/[^a-z0-9\s]/g, '');
        return normalizeString(a).localeCompare(normalizeString(b), 'pt-BR');
      });
      
      setCustomAudiences(updatedAudiences);
      
      // Atualizar no formulário se estava selecionado
      if (formData.targetAudience.includes(editingAudience)) {
        const updatedFormAudiences = formData.targetAudience.map(aud => 
          aud === editingAudience ? editAudienceValue.trim() : aud
        );
        handleChange("targetAudience", updatedFormAudiences);
      }
    }
    
    setEditingAudience(null);
    setEditAudienceValue("");
  };

  const cancelEditAudience = () => {
    setEditingAudience(null);
    setEditAudienceValue("");
  };

  // Funções para múltiplos instrutores
  const addInstructor = () => {
    const newInstructor = {
      id: Date.now().toString(),
      name: "",
      role: "",
      bio: "",
      photo: "",
      experience: ""
    };
    
    setFormData(prev => ({
      ...prev,
      additionalInstructors: [...prev.additionalInstructors, newInstructor]
    }));
  };

  const removeInstructor = (instructorId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalInstructors: prev.additionalInstructors.filter(inst => inst.id !== instructorId)
    }));
  };

  const updateInstructor = (instructorId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      additionalInstructors: prev.additionalInstructors.map(inst => 
        inst.id === instructorId 
          ? { ...inst, [field]: value }
          : inst
      )
    }));
  };

  // Função para carregar configurações padrão do instrutor
  const loadInstructorDefaults = (instructorName: string) => {
    // Em uma implementação real, isso buscaria as configurações do instrutor na API
    // Por agora, vamos usar configurações padrão baseadas no nome
    const instructorDefaults = {
      'Dra. Carla Mendes': {
        instructorCommissionPercentage: 75,
        gatewayTaxPercentage: 3.99,
        taxPercentage: 6.0
      },
      'Prof. Marcos Sousa': {
        instructorCommissionPercentage: 70,
        gatewayTaxPercentage: 3.99,
        taxPercentage: 6.0
      },
      'Dr. Fernando Oliveira': {
        instructorCommissionPercentage: 65,
        gatewayTaxPercentage: 3.99,
        taxPercentage: 6.0
      }
    };

    const defaults = instructorDefaults[instructorName as keyof typeof instructorDefaults];
    if (defaults) {
      setFormData(prev => ({
        ...prev,
        ...defaults
      }));
      
      console.log(`Configurações carregadas para ${instructorName}:`, defaults);
    }
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

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-zinc-400 hover:text-white"
                onClick={() => window.history.back()}
              >
                <FiArrowLeft className="mr-2" /> Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Criar Novo Curso</h1>
                <p className="text-sm text-zinc-400">Configure seu curso para disponibilizar na plataforma</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{Math.round(getProgress())}% Completo</p>
                <Progress value={getProgress()} className="w-32 h-2" />
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={completedSteps.size < tabs.length}
                className="bg-gradient-to-r from-ejup-cyan to-ejup-cyan/80 hover:from-ejup-cyan/90 hover:to-ejup-cyan/70 text-white flex items-center gap-2 shadow-lg"
              >
                <FiSave size={16} /> Publicar Curso
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                const isCompleted = completedSteps.has(tab.id);
                const isAccessible = index === 0 || completedSteps.has(tabs[index - 1].id);
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => isAccessible && setActiveTab(tab.id)}
                    disabled={!isAccessible}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200",
                      isActive && "bg-ejup-cyan/20 border border-ejup-cyan/50 shadow-lg",
                      isCompleted && !isActive && "bg-emerald-500/20 border border-emerald-500/50",
                      !isActive && !isCompleted && isAccessible && "hover:bg-zinc-700/50 border border-transparent",
                      !isAccessible && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all",
                      isActive && "bg-ejup-cyan text-zinc-900",
                      isCompleted && !isActive && "bg-emerald-500 text-white",
                      !isActive && !isCompleted && "bg-zinc-700 text-zinc-400"
                    )}>
                      {isCompleted ? <FiCheckCircle /> : tab.icon}
                    </div>
                    <div className="text-center">
                      <p className={cn(
                        "font-medium text-sm",
                        isActive && "text-ejup-cyan",
                        isCompleted && !isActive && "text-emerald-400",
                        !isActive && !isCompleted && "text-zinc-400"
                      )}>
                        {tab.label}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1 hidden md:block">
                        {tab.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-zinc-800/40 border-zinc-700/50 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Informações Básicas */}
              <TabsContent value="informacoes-basicas" className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-ejup-cyan/20 rounded-xl flex items-center justify-center">
                    <FiBook />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Informações Básicas</h2>
                    <p className="text-zinc-400">Configure os dados principais do seu curso</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Formulário */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Título */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-zinc-300 flex items-center gap-2">
                        Título do Curso <span className="text-red-400">*</span>
                        {formData.title && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Ex: Introdução ao Direito Constitucional"
                        className={cn(
                          "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 text-lg transition-all",
                          errors.title ? "border-red-500 focus:border-red-400" : "border-zinc-700 focus:border-ejup-cyan/50"
                        )}
                      />
                      {errors.title && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <FiAlertCircle /> {errors.title}
                        </p>
                      )}
                      <p className="text-xs text-zinc-500">
                        Título que aparecerá na listagem e página do curso
                      </p>
                    </div>

                    {/* Descrição Curta */}
                    <div className="space-y-2">
                      <Label htmlFor="shortDescription" className="text-zinc-300 flex items-center gap-2">
                        Descrição Curta <span className="text-red-400">*</span>
                        {formData.shortDescription && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <Textarea
                        id="shortDescription"
                        value={formData.shortDescription}
                        onChange={(e) => handleChange("shortDescription", e.target.value)}
                        placeholder="Uma descrição atrativa em até 160 caracteres..."
                        className={cn(
                          "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 resize-none h-24 transition-all",
                          errors.shortDescription ? "border-red-500 focus:border-red-400" : "border-zinc-700 focus:border-ejup-cyan/50"
                        )}
                        maxLength={160}
                      />
                      <div className="flex justify-between items-center">
                        {errors.shortDescription ? (
                          <p className="text-red-400 text-sm flex items-center gap-2">
                            <FiAlertCircle /> {errors.shortDescription}
                          </p>
                        ) : (
                          <p className="text-xs text-zinc-500">Aparecerá nos cards de curso</p>
                        )}
                        <span className="text-xs text-zinc-500">
                          {formData.shortDescription.length}/160
                        </span>
                      </div>
                    </div>

                    {/* Descrição Completa */}
                    <div className="space-y-2">
                      <Label htmlFor="fullDescription" className="text-zinc-300 flex items-center gap-2">
                        Descrição Completa <span className="text-red-400">*</span>
                        {formData.fullDescription && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <Textarea
                        id="fullDescription"
                        value={formData.fullDescription}
                        onChange={(e) => handleChange("fullDescription", e.target.value)}
                        placeholder="Descreva o curso detalhadamente..."
                        className={cn(
                          "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 min-h-[120px] transition-all",
                          errors.fullDescription ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                        )}
                      />
                      {errors.fullDescription && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <FiAlertCircle /> {errors.fullDescription}
                        </p>
                      )}
                    </div>

                    {/* Categoria e Nível */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-zinc-300 flex items-center gap-2">
                          Categoria <span className="text-red-400">*</span>
                          {formData.category.length > 0 && <FiCheckCircle className="text-emerald-400" />}
                        </Label>
                        <div className="space-y-2">
                          {/* Dropdown de seleção múltipla para categorias */}
                          <div className="relative" ref={categoryDropdownRef}>
                            <div 
                              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                              className="bg-zinc-900/50 border-2 border-zinc-700 rounded-lg p-3 min-h-[48px] cursor-pointer hover:border-ejup-cyan/50 transition-colors"
                            >
                              {formData.category.length === 0 ? (
                                <span className="text-zinc-500">Selecione uma ou mais categorias...</span>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {formData.category.map((cat) => (
                                    <span key={cat} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-ejup-cyan/20 text-ejup-cyan border border-ejup-cyan/50">
                                      {cat.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleChange("category", formData.category.filter(c => c !== cat));
                                        }}
                                        className="ml-1 text-ejup-cyan/70 hover:text-ejup-cyan"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {/* Lista de opções com checkboxes */}
                            {showCategoryDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                <div className="p-2 space-y-1">
                                  {/* Categorias padrão */}
                                  {availableCategories.map((cat) => (
                                    <label key={cat} className="flex items-center justify-between px-2 py-2 hover:bg-zinc-700 rounded cursor-pointer">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={formData.category.includes(cat)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              handleChange("category", [...formData.category, cat]);
                                            } else {
                                              handleChange("category", formData.category.filter(c => c !== cat));
                                            }
                                          }}
                                          className="w-4 h-4 text-ejup-cyan bg-zinc-700 border-zinc-600 rounded focus:ring-ejup-cyan focus:ring-2"
                                        />
                                        <span className="text-white text-sm">
                                          {cat.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                      </div>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          startDeleteCategory(cat, "default");
                                        }}
                                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                      >
                                        <FiTrash2 size={12} />
                                      </Button>
                                    </label>
                                  ))}
                                  
                                  {/* Categorias personalizadas */}
                                  {customCategories.map((cat) => (
                                    <label key={cat} className="flex items-center justify-between px-2 py-2 hover:bg-zinc-700 rounded cursor-pointer">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={formData.category.includes(cat)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              handleChange("category", [...formData.category, cat]);
                                            } else {
                                              handleChange("category", formData.category.filter(c => c !== cat));
                                            }
                                          }}
                                          className="w-4 h-4 text-ejup-cyan bg-zinc-700 border-zinc-600 rounded focus:ring-ejup-cyan focus:ring-2"
                                        />
                                        {editingCategory === cat ? (
                                          <div className="flex items-center gap-1">
                                            <Input
                                              value={editCategoryValue}
                                              onChange={(e) => setEditCategoryValue(e.target.value)}
                                              className="h-6 text-xs bg-zinc-600 border-zinc-500 text-white w-32"
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') confirmEditCategory();
                                                if (e.key === 'Escape') cancelEditCategory();
                                              }}
                                              autoFocus
                                            />
                                            <Button
                                              type="button"
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                confirmEditCategory();
                                              }}
                                              className="h-6 w-6 p-0 text-green-400 hover:text-green-300"
                                            >
                                              <FiCheck size={10} />
                                            </Button>
                                            <Button
                                              type="button"
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                cancelEditCategory();
                                              }}
                                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
                                            >
                                              <FiX size={10} />
                                            </Button>
                                          </div>
                                        ) : (
                                          <span className="text-white text-sm">{cat}</span>
                                        )}
                                      </div>
                                      {editingCategory !== cat && (
                                        <div className="flex items-center gap-1">
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              startEditCategory(cat);
                                            }}
                                            className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                          >
                                            <FiEdit size={10} />
                                          </Button>
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              startDeleteCategory(cat, "custom");
                                            }}
                                            className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                          >
                                            <FiTrash2 size={10} />
                                          </Button>
                                        </div>
                                      )}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Adicionar nova categoria */}
                          <div className="flex gap-2">
                            <Input
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Nova categoria..."
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={addCustomCategory}
                              className="bg-ejup-cyan/20 hover:bg-ejup-cyan/30 text-ejup-cyan border border-ejup-cyan/50"
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                        {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetAudience" className="text-zinc-300 flex items-center gap-2">
                          Público Alvo <span className="text-red-400">*</span>
                          {formData.targetAudience.length > 0 && <FiCheckCircle className="text-emerald-400" />}
                        </Label>
                        <div className="space-y-2">
                          {/* Dropdown de seleção múltipla para públicos-alvo */}
                          <div className="relative" ref={audienceDropdownRef}>
                            <div 
                              onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                              className="bg-zinc-900/50 border-2 border-zinc-700 rounded-lg p-3 min-h-[48px] cursor-pointer hover:border-ejup-cyan/50 transition-colors"
                            >
                              {formData.targetAudience.length === 0 ? (
                                <span className="text-zinc-500">Selecione um ou mais públicos-alvo...</span>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {formData.targetAudience.map((aud) => (
                                    <span key={aud} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-purple-900/30 text-purple-300 border border-purple-700/50">
                                      {aud.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleChange("targetAudience", formData.targetAudience.filter(a => a !== aud));
                                        }}
                                        className="ml-1 text-purple-300/70 hover:text-purple-300"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {/* Lista de opções com checkboxes */}
                            {showAudienceDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                <div className="p-2 space-y-1">
                                  {/* Públicos padrão */}
                                  {availableAudiences.map((aud) => (
                                    <label key={aud} className="flex items-center justify-between px-2 py-2 hover:bg-zinc-700 rounded cursor-pointer">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={formData.targetAudience.includes(aud)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              handleChange("targetAudience", [...formData.targetAudience, aud]);
                                            } else {
                                              handleChange("targetAudience", formData.targetAudience.filter(a => a !== aud));
                                            }
                                          }}
                                          className="w-4 h-4 text-purple-500 bg-zinc-700 border-zinc-600 rounded focus:ring-purple-500 focus:ring-2"
                                        />
                                        <span className="text-white text-sm">
                                          {aud.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                      </div>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          startDeleteAudience(aud, "default");
                                        }}
                                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                      >
                                        <FiTrash2 size={12} />
                                      </Button>
                                    </label>
                                  ))}
                                  
                                  {/* Públicos personalizados */}
                                  {customAudiences.map((aud) => (
                                    <label key={aud} className="flex items-center justify-between px-2 py-2 hover:bg-zinc-700 rounded cursor-pointer">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={formData.targetAudience.includes(aud)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              handleChange("targetAudience", [...formData.targetAudience, aud]);
                                            } else {
                                              handleChange("targetAudience", formData.targetAudience.filter(a => a !== aud));
                                            }
                                          }}
                                          className="w-4 h-4 text-purple-500 bg-zinc-700 border-zinc-600 rounded focus:ring-purple-500 focus:ring-2"
                                        />
                                        {editingAudience === aud ? (
                                          <div className="flex items-center gap-1">
                                            <Input
                                              value={editAudienceValue}
                                              onChange={(e) => setEditAudienceValue(e.target.value)}
                                              className="h-6 text-xs bg-zinc-600 border-zinc-500 text-white w-32"
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') confirmEditAudience();
                                                if (e.key === 'Escape') cancelEditAudience();
                                              }}
                                              autoFocus
                                            />
                                            <Button
                                              type="button"
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                confirmEditAudience();
                                              }}
                                              className="h-6 w-6 p-0 text-green-400 hover:text-green-300"
                                            >
                                              <FiCheck size={10} />
                                            </Button>
                                            <Button
                                              type="button"
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                cancelEditAudience();
                                              }}
                                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
                                            >
                                              <FiX size={10} />
                                            </Button>
                                          </div>
                                        ) : (
                                          <span className="text-white text-sm">{aud}</span>
                                        )}
                                      </div>
                                      {editingAudience !== aud && (
                                        <div className="flex items-center gap-1">
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              startEditAudience(aud);
                                            }}
                                            className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                          >
                                            <FiEdit size={10} />
                                          </Button>
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              startDeleteAudience(aud, "custom");
                                            }}
                                            className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                          >
                                            <FiTrash2 size={10} />
                                          </Button>
                                        </div>
                                      )}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Adicionar novo público-alvo */}
                          <div className="flex gap-2">
                            <Input
                              value={newAudience}
                              onChange={(e) => setNewAudience(e.target.value)}
                              placeholder="Novo público-alvo..."
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={addCustomAudience}
                              className="bg-ejup-cyan/20 hover:bg-ejup-cyan/30 text-ejup-cyan border border-ejup-cyan/50"
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                        {errors.targetAudience && <p className="text-red-400 text-sm">{errors.targetAudience}</p>}
                      </div>
                    </div>

                    {/* Duração e Informações do Curso */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseDuration" className="text-zinc-300">
                          Duração do Curso (horas)
                        </Label>
                        <Input
                          id="courseDuration"
                          type="number"
                          value={formData.courseDuration}
                          onChange={(e) => handleChange("courseDuration", e.target.value)}
                          placeholder="Ex: 6"
                          className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalHours" className="text-zinc-300">
                          Total de Horas
                        </Label>
                        <Input
                          id="totalHours"
                          type="number"
                          value={formData.totalHours}
                          onChange={(e) => handleChange("totalHours", e.target.value)}
                          placeholder="Ex: 40"
                          className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50"
                        />
                      </div>
                    </div>

                    {/* O que você vai aprender */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300 flex items-center gap-2">
                        O que você vai aprender
                        {formData.learningObjectives.length > 0 && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <div className="space-y-3">
                        {formData.learningObjectives.map((objective, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <Input
                              value={objective}
                              onChange={(e) => {
                                const updated = [...formData.learningObjectives];
                                updated[index] = e.target.value;
                                handleChange("learningObjectives", updated);
                              }}
                              placeholder="Objetivo de aprendizagem..."
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                const updated = formData.learningObjectives.filter((_, i) => i !== index);
                                handleChange("learningObjectives", updated);
                              }}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <FiTrash2 size={14} />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex gap-2">
                          <Input
                            value={newObjective}
                            onChange={(e) => setNewObjective(e.target.value)}
                            placeholder="Adicionar objetivo..."
                            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => {
                              if (newObjective.trim()) {
                                handleChange("learningObjectives", [...formData.learningObjectives, newObjective.trim()]);
                                setNewObjective("");
                              }
                            }}
                            className="bg-ejup-cyan/20 hover:bg-ejup-cyan/30 text-ejup-cyan border border-ejup-cyan/50"
                          >
                            <FiPlus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail do Curso */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Thumbnail do Curso</Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-20 bg-zinc-800 rounded-lg flex items-center justify-center border-2 border-dashed border-zinc-600">
                            {formData.thumbnail ? (
                              <img 
                                src={formData.thumbnail} 
                                alt="Thumbnail" 
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <FiImage className="text-zinc-400 text-xl" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              value={formData.thumbnail}
                              onChange={(e) => handleChange("thumbnail", e.target.value)}
                              placeholder="URL da imagem ou cole a imagem aqui..."
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                            />
                            <p className="text-xs text-zinc-500 mt-1">Imagem que aparecerá nos cards do curso</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vídeo de Vendas */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Vídeo de Vendas (YouTube)</Label>
                      <Input
                        value={formData.videoSalesUrl}
                        onChange={(e) => handleChange("videoSalesUrl", e.target.value)}
                        placeholder="Cole o link do YouTube aqui..."
                        className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50"
                      />
                      <p className="text-xs text-zinc-500">Vídeo do professor explicando o curso (será exibido na página interna)</p>
                      {formData.videoSalesUrl && extractYouTubeId(formData.videoSalesUrl) && (
                        <div className="mt-2">
                          <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoSalesUrl)}`}
                              className="w-full h-full"
                              allowFullScreen
                              title="Vídeo de vendas"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FiEye /> Preview do Curso
                    </h3>
                    <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-4 space-y-4">
                      <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
                        {formData.videoSalesUrl && extractYouTubeId(formData.videoSalesUrl) ? (
                          <div className="w-full h-full rounded-lg overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoSalesUrl)}`}
                              className="w-full h-full"
                              allowFullScreen
                              title="Vídeo de vendas preview"
                            />
                          </div>
                        ) : formData.thumbnail ? (
                          <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="text-center text-zinc-400">
                            <FiImage className="mx-auto mb-2 text-2xl" />
                            <p className="text-sm">Thumbnail/Vídeo do curso</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Thumbnails em miniatura */}
                      {(formData.thumbnail || formData.videoSalesUrl) && (
                        <div className="flex gap-2 justify-center">
                          {formData.thumbnail && (
                            <div className="w-16 h-10 bg-zinc-800 rounded border border-zinc-600 overflow-hidden">
                              <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                            </div>
                          )}
                          {formData.videoSalesUrl && extractYouTubeId(formData.videoSalesUrl) && (
                            <div className="w-16 h-10 bg-zinc-800 rounded border border-zinc-600 overflow-hidden relative">
                              <img 
                                src={`https://img.youtube.com/vi/${extractYouTubeId(formData.videoSalesUrl)}/mqdefault.jpg`}
                                alt="Video thumbnail" 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FiPlay className="text-white text-xs" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-white line-clamp-2">
                          {formData.title || "Título do curso aparecerá aqui"}
                        </h4>
                        <p className="text-sm text-zinc-400 mt-2 line-clamp-3">
                          {formData.shortDescription || "Descrição curta aparecerá aqui..."}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          {formData.category.length > 0 && (
                            <Badge variant="secondary" className="bg-ejup-cyan/20 text-ejup-cyan">
                              {formData.category.map(c => c.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())).join(", ")}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Informações do curso */}
                        <div className="mt-4 space-y-2 text-xs text-zinc-400">
                          {formData.courseDuration && (
                            <div className="flex items-center gap-2">
                              <FiClock />
                              <span>{formData.courseDuration} horas de curso</span>
                            </div>
                          )}
                          {formData.totalHours && (
                            <div className="flex items-center gap-2">
                              <FiBook />
                              <span>{formData.totalHours} horas totais</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <FiUsers />
                            <span>{formData.modules.length} módulo(s)</span>
                          </div>
                          {formData.targetAudience.length > 0 && (
                            <div className="flex items-center gap-2">
                              <FiStar />
                              <span>{formData.targetAudience.map(a => a.replace("-", " ")).join(", ")}</span>
                            </div>
                          )}
                        </div>

                        {/* Objetivos de aprendizagem */}
                        {formData.learningObjectives.length > 0 && (
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-white mb-2">O que você vai aprender:</h5>
                            <ul className="space-y-1">
                              {formData.learningObjectives.slice(0, 3).map((objective, index) => (
                                <li key={index} className="text-xs text-zinc-400 flex items-start gap-2">
                                  <FiCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={12} />
                                  <span className="line-clamp-1">{objective}</span>
                                </li>
                              ))}
                              {formData.learningObjectives.length > 3 && (
                                <li className="text-xs text-zinc-500">
                                  +{formData.learningObjectives.length - 3} objetivos...
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Continue with other tabs... */}

              {/* Aba Instrutor */}
              <TabsContent value="instrutor" className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FiUsers className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Informações do Instrutor</h2>
                    <p className="text-zinc-400">Configure o perfil do professor responsável</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Seleção de Instrutor */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300 flex items-center gap-2">
                        Instrutor <span className="text-red-400">*</span>
                        {formData.instructorName && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      
                      <div className="flex gap-2">
                        <Select 
                          value={formData.instructorName}
                          onValueChange={(value) => {
                            if (value === "new") {
                              setFormData({
                                ...formData,
                                instructorName: "",
                                instructorRole: "",
                                instructorBio: "",
                                instructorPhoto: "",
                                instructorExperience: ""
                              });
                            } else {
                              // Se selecionou um instrutor existente, carrega os dados
                              if (value === "Dra. Carla Mendes") {
                                setFormData({
                                  ...formData,
                                  instructorName: "Dra. Carla Mendes",
                                  instructorRole: "Direito Empresarial e Digital",
                                  instructorBio: "Especialista com 15 anos de experiência",
                                  instructorPhoto: "/lovable-uploads/team/instructor.png",
                                  instructorExperience: "Especialista com 15 anos de experiência"
                                });
                              } else if (value === "Prof. Marcos Sousa") {
                                setFormData({
                                  ...formData,
                                  instructorName: "Prof. Marcos Sousa",
                                  instructorRole: "Resolução de Conflitos",
                                  instructorBio: "Professor universitário e mediador certificado",
                                  instructorPhoto: "/lovable-uploads/team/instructor.png",
                                  instructorExperience: "Professor universitário e mediador certificado"
                                });
                              }
                            }
                          }}
                        >
                          <SelectTrigger className={cn(
                            "bg-zinc-900/50 border-2 text-white h-12 transition-all flex-1",
                            errors.instructorName ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                          )}>
                            <SelectValue placeholder="Selecione um instrutor existente..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new" className="font-medium text-ejup-cyan">
                              ➕ Criar Novo Instrutor
                            </SelectItem>
                            <SelectItem value="Dra. Carla Mendes">
                              Dra. Carla Mendes - Direito Empresarial e Digital
                            </SelectItem>
                            <SelectItem value="Prof. Marcos Sousa">
                              Prof. Marcos Sousa - Resolução de Conflitos
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {errors.instructorName && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <FiAlertCircle /> {errors.instructorName}
                        </p>
                      )}
                    </div>

                    {/* Nome do instrutor (quando criar novo) */}
                    {(formData.instructorName === "" || (formData.instructorName !== "Dra. Carla Mendes" && formData.instructorName !== "Prof. Marcos Sousa")) && (
                      <div className="space-y-2">
                        <Label htmlFor="instructorName" className="text-zinc-300 flex items-center gap-2">
                          Nome Completo <span className="text-red-400">*</span>
                          {formData.instructorName && <FiCheckCircle className="text-emerald-400" />}
                        </Label>
                        <Input
                          id="instructorName"
                          value={formData.instructorName}
                          onChange={(e) => handleChange("instructorName", e.target.value)}
                          placeholder="Ex: Dr. João Silva"
                          className={cn(
                            "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 transition-all",
                            errors.instructorName ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                          )}
                        />
                        {errors.instructorName && (
                          <p className="text-red-400 text-sm flex items-center gap-2">
                            <FiAlertCircle /> {errors.instructorName}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Cargo/Especialização do instrutor */}
                    <div className="space-y-2">
                      <Label htmlFor="instructorRole" className="text-zinc-300 flex items-center gap-2">
                        Especialização/Cargo <span className="text-red-400">*</span>
                        {formData.instructorRole && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <Input
                        id="instructorRole"
                        value={formData.instructorRole}
                        onChange={(e) => handleChange("instructorRole", e.target.value)}
                        placeholder="Ex: Especialista em Direito Empresarial"
                        className={cn(
                          "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 transition-all",
                          errors.instructorRole ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                        )}
                      />
                      {errors.instructorRole && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <FiAlertCircle /> {errors.instructorRole}
                        </p>
                      )}
                    </div>

                    {/* Foto do instrutor */}
                    <div className="space-y-2">
                      <Label htmlFor="instructorPhoto" className="text-zinc-300 flex items-center gap-2">
                        Foto do Instrutor
                        {formData.instructorPhoto && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <Input
                        id="instructorPhoto"
                        value={formData.instructorPhoto}
                        onChange={(e) => handleChange("instructorPhoto", e.target.value)}
                        placeholder="/lovable-uploads/team/instructor.png"
                        className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50 transition-all"
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

                    {/* Biografia */}
                    <div className="space-y-2">
                      <Label htmlFor="instructorBio" className="text-zinc-300 flex items-center gap-2">
                        Biografia <span className="text-red-400">*</span>
                        {formData.instructorBio && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <Textarea
                        id="instructorBio"
                        value={formData.instructorBio}
                        onChange={(e) => handleChange("instructorBio", e.target.value)}
                        placeholder="Conte sobre a experiência e formação do instrutor..."
                        className={cn(
                          "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 min-h-[120px] transition-all",
                          errors.instructorBio ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                        )}
                      />
                      {errors.instructorBio && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <FiAlertCircle /> {errors.instructorBio}
                        </p>
                      )}
                    </div>

                    {/* Múltiplos Instrutores */}
                    <div className="space-y-4 pt-6 border-t border-zinc-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-zinc-300 text-lg font-medium">
                            Múltiplos Instrutores
                          </Label>
                          <p className="text-xs text-zinc-500 mt-1">
                            Ative para adicionar mais instrutores ao curso
                          </p>
                        </div>
                        <Switch
                          checked={formData.hasMultipleInstructors}
                          onCheckedChange={(checked) => handleChange("hasMultipleInstructors", checked)}
                        />
                      </div>

                      {formData.hasMultipleInstructors && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-white">Instrutores Adicionais</h4>
                            <Button
                              type="button"
                              onClick={addInstructor}
                              size="sm"
                              className="bg-ejup-cyan hover:bg-ejup-cyan/90 text-zinc-900"
                            >
                              <FiPlus className="mr-2" /> Adicionar Instrutor
                            </Button>
                          </div>

                          {formData.additionalInstructors?.map((instructor: any, index: number) => (
                            <div key={instructor.id} className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 space-y-4">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium text-white">Instrutor {index + 2}</h5>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeInstructor(instructor.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Nome */}
                                <div className="space-y-2">
                                  <Label className="text-zinc-300 text-sm">Nome Completo</Label>
                                  <Input
                                    value={instructor.name}
                                    onChange={(e) => updateInstructor(instructor.id, "name", e.target.value)}
                                    placeholder="Ex: Dr. João Silva"
                                    className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-10 focus:border-ejup-cyan/50 transition-all"
                                  />
                                </div>

                                {/* Cargo */}
                                <div className="space-y-2">
                                  <Label className="text-zinc-300 text-sm">Título/Cargo</Label>
                                  <Input
                                    value={instructor.role}
                                    onChange={(e) => updateInstructor(instructor.id, "role", e.target.value)}
                                    placeholder="Ex: Advogado Especialista"
                                    className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-10 focus:border-ejup-cyan/50 transition-all"
                                  />
                                </div>
                              </div>

                              {/* Foto */}
                              <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm">Foto do Instrutor</Label>
                                <Input
                                  value={instructor.photo}
                                  onChange={(e) => updateInstructor(instructor.id, "photo", e.target.value)}
                                  placeholder="URL da foto do instrutor"
                                  className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-10 focus:border-ejup-cyan/50 transition-all"
                                />
                              </div>

                              {/* Biografia */}
                              <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm">Biografia</Label>
                                <Textarea
                                  value={instructor.bio}
                                  onChange={(e) => updateInstructor(instructor.id, "bio", e.target.value)}
                                  placeholder="Conte sobre a experiência e formação do instrutor..."
                                  className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[80px] focus:border-ejup-cyan/50 transition-all"
                                />
                              </div>

                              {/* Experiência */}
                              <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm">Experiência Profissional</Label>
                                <Textarea
                                  value={instructor.experience}
                                  onChange={(e) => updateInstructor(instructor.id, "experience", e.target.value)}
                                  placeholder="Principais experiências e conquistas..."
                                  className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[80px] focus:border-ejup-cyan/50 transition-all"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview do Instrutor */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FiEye /> Preview do Instrutor
                    </h3>
                    <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                          <FiUsers className="text-zinc-400 text-xl" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {formData.instructorName || "Nome do Instrutor"}
                          </h4>
                          <p className="text-sm text-zinc-400">Instrutor</p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300 line-clamp-4">
                        {formData.instructorBio || "Biografia do instrutor aparecerá aqui..."}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Aba Financeiro */}
              <TabsContent value="financeiro" className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <FiDollarSign className="text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Informações Financeiras</h2>
                    <p className="text-zinc-400">Configure preços e condições de pagamento</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Preço principal */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-zinc-300 flex items-center gap-2">
                        Preço do Curso <span className="text-red-400">*</span>
                        {formData.price && <FiCheckCircle className="text-emerald-400" />}
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">R$</span>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleChange("price", e.target.value)}
                          placeholder="0,00"
                          className={cn(
                            "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 pl-12 text-lg transition-all",
                            errors.price ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                          )}
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                          <FiAlertCircle /> {errors.price}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Configurações de Comissão */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FiDollarSign /> Configurações de Comissão
                    </h3>
                    
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
                          onChange={(e) => handleChange("gatewayTaxPercentage", parseFloat(e.target.value) || 0)}
                          className="bg-zinc-900/50 border-zinc-700 text-white"
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
                          onChange={(e) => handleChange("taxPercentage", parseFloat(e.target.value) || 0)}
                          className="bg-zinc-900/50 border-zinc-700 text-white"
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
                          onChange={(e) => handleChange("instructorCommissionPercentage", parseInt(e.target.value) || 0)}
                          className="bg-zinc-900/50 border-zinc-700 text-white w-20"
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
                    <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-6">
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
                    <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-6">
                      <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <FiCalendar className="text-blue-400" />
                        Cálculo de Repasse por Período
                      </h4>
                      
                      {/* Seleção de Período */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDateNew" className="text-zinc-300">
                            Data Inicial
                          </Label>
                                                      <Input
                              id="startDateNew"
                              type="date"
                              value={startDate}
                              onChange={(e) => handleStartDateChange(e.target.value)}
                              className="bg-zinc-800 border-zinc-600 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDateNew" className="text-zinc-300">
                            Data Final
                          </Label>
                                                      <Input
                              id="endDateNew"
                              type="date"
                              value={endDate}
                              onChange={(e) => handleEndDateChange(e.target.value)}
                              className="bg-zinc-800 border-zinc-600 text-white"
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
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
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
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
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
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
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
                        <div className="flex gap-2 pt-2 border-t border-zinc-600">
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
                      <div className="bg-zinc-800 p-4 rounded-lg">
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
                                <div className="bg-zinc-700 p-3 rounded-lg text-center">
                                  <p className="text-zinc-300 text-sm">Total Bruto</p>
                                  <p className="text-white text-lg font-bold">R$ {totalBruto.toFixed(2)}</p>
                                </div>
                                <div className="bg-zinc-700 p-3 rounded-lg text-center">
                                  <p className="text-zinc-300 text-sm">Total Líquido</p>
                                  <p className="text-blue-400 text-lg font-bold">R$ {totalLiquido.toFixed(2)}</p>
                                </div>
                                <div className="bg-zinc-700 p-3 rounded-lg text-center">
                                  <p className="text-zinc-300 text-sm">Repasse Instrutor</p>
                                  <p className="text-green-400 text-lg font-bold">R$ {totalInstrutor.toFixed(2)}</p>
                                </div>
                              </div>

                              {/* Detalhamento por Curso */}
                              <div className="space-y-3">
                                <h6 className="text-zinc-300 font-medium">Detalhamento por Curso</h6>
                                {detalhesVendas.map((venda, index) => (
                                  <div key={index} className="bg-zinc-700 p-3 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <p className="text-white font-medium">{venda.curso}</p>
                                        <p className="text-zinc-400 text-sm">{venda.vendas} vendas × R$ {venda.preco.toFixed(2)}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-green-400 font-bold">R$ {venda.valorInstrutor.toFixed(2)}</p>
                                        <p className="text-zinc-400 text-sm">repasse</p>
                                      </div>
                                    </div>
                                    <div className="text-xs text-zinc-400 space-y-1">
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
                              <div className="flex gap-2 pt-4 border-t border-zinc-600">
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
                                  className="border-zinc-600 text-zinc-300"
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
                  </div>
                </div>
              </TabsContent>

              {/* Aba Conteúdo */}
              <TabsContent value="ementa" className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <FiPlay className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Conteúdo do Curso</h2>
                    <p className="text-zinc-400">Organize módulos, aulas e materiais didáticos</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Ementa */}
                  <div className="space-y-2">
                    <Label htmlFor="syllabus" className="text-zinc-300 flex items-center gap-2">
                      Ementa do Curso <span className="text-red-400">*</span>
                      {formData.syllabus && <FiCheckCircle className="text-emerald-400" />}
                    </Label>
                    <Textarea
                      id="syllabus"
                      value={formData.syllabus}
                      onChange={(e) => handleChange("syllabus", e.target.value)}
                      placeholder="Descreva os principais tópicos e objetivos de aprendizagem..."
                      className={cn(
                        "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 min-h-[120px] transition-all",
                        errors.syllabus ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                      )}
                    />
                    {errors.syllabus && (
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <FiAlertCircle /> {errors.syllabus}
                      </p>
                    )}
                  </div>

                  {/* Para quem é este curso */}
                  <div className="space-y-2">
                    <Label htmlFor="courseDescription" className="text-zinc-300">
                      Para quem é este curso
                    </Label>
                    <Textarea
                      id="courseDescription"
                      value={formData.targetAudience}
                      onChange={(e) => handleChange("targetAudience", e.target.value)}
                      placeholder="Descreva o público-alvo ideal para este curso..."
                      className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[100px] focus:border-ejup-cyan/50 transition-all"
                    />
                    <p className="text-xs text-zinc-500">Descreva quem deve fazer este curso e os pré-requisitos</p>
                  </div>

                  {/* Módulos */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">Módulos do Curso</h3>
                      <Button
                        onClick={addModule}
                        className="bg-ejup-cyan hover:bg-ejup-cyan/90 text-zinc-900"
                      >
                        <FiPlus className="mr-2" /> Adicionar Módulo
                      </Button>
                    </div>

                    {formData.modules.map((module: any, moduleIndex: number) => (
                      <div key={module.id} className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-white flex items-center gap-2">
                            <div className="w-8 h-8 bg-ejup-cyan/20 rounded-full flex items-center justify-center text-sm font-semibold text-ejup-cyan">
                              {moduleIndex + 1}
                            </div>
                            Módulo {moduleIndex + 1}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedModules = formData.modules.filter((_, index) => index !== moduleIndex);
                              handleChange("modules", updatedModules);
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-zinc-300">Título do Módulo</Label>
                            <Input
                              value={module.title}
                              onChange={(e) => {
                                const updatedModules = [...formData.modules];
                                updatedModules[moduleIndex].title = e.target.value;
                                handleChange("modules", updatedModules);
                              }}
                              placeholder="Ex: Fundamentos do Direito"
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-zinc-300">Duração Total</Label>
                            <Input
                              value={module.duration || ""}
                              onChange={(e) => {
                                const updatedModules = [...formData.modules];
                                updatedModules[moduleIndex].duration = e.target.value;
                                handleChange("modules", updatedModules);
                              }}
                              placeholder="Ex: 1h 20min"
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-zinc-300">Descrição do Módulo</Label>
                          <Textarea
                            value={module.description}
                            onChange={(e) => {
                              const updatedModules = [...formData.modules];
                              updatedModules[moduleIndex].description = e.target.value;
                              handleChange("modules", updatedModules);
                            }}
                            placeholder="Breve descrição do que será abordado neste módulo"
                            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50 min-h-[80px]"
                          />
                        </div>

                        {/* Aulas do Módulo */}
                        <div className="space-y-3 mt-6">
                          <div className="flex items-center justify-between">
                            <h5 className="text-base font-medium text-white">Aulas do Módulo {moduleIndex + 1}</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLesson(module.id)}
                              className="text-ejup-cyan border-ejup-cyan hover:bg-ejup-cyan hover:text-zinc-900"
                            >
                              <FiPlus className="mr-1" size={14} /> Adicionar Aula
                            </Button>
                          </div>

                          {module.lessons && module.lessons.length > 0 ? (
                            <div className="space-y-3 pl-4 border-l-2 border-zinc-700">
                              {module.lessons.map((lesson: any, lessonIndex: number) => (
                                <div key={lesson.id} className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-xs text-zinc-300">
                                        {lessonIndex + 1}
                                      </div>
                                      <span className="text-sm font-medium text-white">Aula {lessonIndex + 1}</span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const updatedModules = [...formData.modules];
                                        updatedModules[moduleIndex].lessons = module.lessons.filter((_: any, index: number) => index !== lessonIndex);
                                        handleChange("modules", updatedModules);
                                      }}
                                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                                    >
                                      <FiX size={14} />
                                    </Button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-zinc-400">Título da Aula</Label>
                                      <Input
                                        value={lesson.title}
                                        onChange={(e) => {
                                          const updatedModules = [...formData.modules];
                                          updatedModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                                          handleChange("modules", updatedModules);
                                        }}
                                        placeholder="Ex: Princípios básicos"
                                        className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm h-9 focus:border-ejup-cyan/50"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-zinc-400">Duração</Label>
                                      <Input
                                        value={lesson.duration}
                                        onChange={(e) => {
                                          const updatedModules = [...formData.modules];
                                          updatedModules[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                                          handleChange("modules", updatedModules);
                                        }}
                                        placeholder="Ex: 15 min"
                                        className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm h-9 focus:border-ejup-cyan/50"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-xs text-zinc-400">URL do Vídeo</Label>
                                    <Input
                                      value={lesson.videoUrl}
                                      onChange={(e) => {
                                        const updatedModules = [...formData.modules];
                                        updatedModules[moduleIndex].lessons[lessonIndex].videoUrl = e.target.value;
                                        handleChange("modules", updatedModules);
                                      }}
                                      placeholder="https://youtube.com/watch?v=..."
                                      className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm h-9 focus:border-ejup-cyan/50"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-xs text-zinc-400">Descrição da Aula (opcional)</Label>
                                    <Textarea
                                      value={lesson.description}
                                      onChange={(e) => {
                                        const updatedModules = [...formData.modules];
                                        updatedModules[moduleIndex].lessons[lessonIndex].description = e.target.value;
                                        handleChange("modules", updatedModules);
                                      }}
                                      placeholder="Breve descrição do conteúdo da aula..."
                                      className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm min-h-[60px] focus:border-ejup-cyan/50"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 text-zinc-500 bg-zinc-800/20 rounded-lg border border-dashed border-zinc-700">
                              <FiPlay className="mx-auto mb-2" size={24} />
                              <p className="text-sm">Nenhuma aula adicionada</p>
                              <p className="text-xs">Clique em "Adicionar Aula" para começar</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {formData.modules.length === 0 && (
                      <div className="text-center py-12 text-zinc-500 bg-zinc-800/20 rounded-lg border border-dashed border-zinc-700">
                        <FiBook className="mx-auto mb-3" size={32} />
                        <p className="text-lg font-medium mb-1">Nenhum módulo criado</p>
                        <p className="text-sm">Clique em "Adicionar Módulo" para começar a estruturar seu curso</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Aba Configurações */}
              <TabsContent value="configuracoes" className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <FiStar className="text-amber-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Configurações do Curso</h2>
                    <p className="text-zinc-400">Defina configurações avançadas e limitações</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents" className="text-zinc-300">
                        Número Máximo de Alunos
                      </Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        value={formData.maxStudents}
                        onChange={(e) => handleChange("maxStudents", e.target.value)}
                        placeholder="Ex: 100"
                        className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50"
                      />
                    </div>
                  </div>

                  {/* Cursos Relacionados */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">Cursos Relacionados</h3>
                        <div className="text-xs bg-zinc-700/50 text-zinc-400 px-2 py-1 rounded">Opcional</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="showRelatedCourses" className="text-zinc-300 text-sm">Ativar</Label>
                        <input
                          id="showRelatedCourses"
                          type="checkbox"
                          checked={formData.showRelatedCourses}
                          onChange={(e) => handleChange("showRelatedCourses", e.target.checked)}
                          className="w-4 h-4 text-ejup-cyan bg-zinc-800 border-zinc-600 rounded focus:ring-ejup-cyan focus:ring-2"
                        />
                      </div>
                    </div>
                    
                    {formData.showRelatedCourses && (
                      <div className="space-y-4 border border-zinc-700 rounded-lg p-4 bg-zinc-800/30">
                        <p className="text-sm text-zinc-400">Configure até 4 cursos relacionados que aparecerão na página de vendas</p>
                        
                        <div className="space-y-3">
                          {formData.relatedCourses.map((course, index) => (
                            <div key={index} className="border border-zinc-700 rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-white">Curso Relacionado {index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const updatedCourses = formData.relatedCourses.filter((_, i) => i !== index);
                                    handleChange("relatedCourses", updatedCourses);
                                  }}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                                >
                                  <FiX size={14} />
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label className="text-xs text-zinc-400">Título do Curso</Label>
                                  <Input
                                    value={course.title}
                                    onChange={(e) => {
                                      const updatedCourses = [...formData.relatedCourses];
                                      updatedCourses[index].title = e.target.value;
                                      handleChange("relatedCourses", updatedCourses);
                                    }}
                                    placeholder="Ex: Direito Tributário Avançado"
                                    className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm h-9 focus:border-ejup-cyan/50"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-zinc-400">Preço (R$)</Label>
                                  <Input
                                    value={course.price}
                                    onChange={(e) => {
                                      const updatedCourses = [...formData.relatedCourses];
                                      updatedCourses[index].price = e.target.value;
                                      handleChange("relatedCourses", updatedCourses);
                                    }}
                                    placeholder="Ex: 997,00"
                                    className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm h-9 focus:border-ejup-cyan/50"
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <Label className="text-xs text-zinc-400">Link do Produto</Label>
                                <Input
                                  value={course.link}
                                  onChange={(e) => {
                                    const updatedCourses = [...formData.relatedCourses];
                                    updatedCourses[index].link = e.target.value;
                                    handleChange("relatedCourses", updatedCourses);
                                  }}
                                  placeholder="Ex: /courses/2 ou https://..."
                                  className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 text-sm h-9 focus:border-ejup-cyan/50"
                                />
                              </div>
                            </div>
                          ))}
                          
                          {formData.relatedCourses.length < 4 && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                const newCourse = {
                                  id: Date.now().toString(),
                                  title: "",
                                  price: "",
                                  link: ""
                                };
                                handleChange("relatedCourses", [...formData.relatedCourses, newCourse]);
                              }}
                              className="w-full border-ejup-cyan/30 text-ejup-cyan hover:bg-ejup-cyan hover:text-zinc-900"
                            >
                              <FiPlus className="mr-2" size={16} />
                              Adicionar Curso Relacionado
                            </Button>
                          )}
                          
                          <div className="text-xs text-zinc-500">
                            {formData.relatedCourses.length}/4 cursos configurados
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Aba Revisão */}
              <TabsContent value="revisao" className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <FiEye className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Revisão e Publicação</h2>
                    <p className="text-zinc-400">Revise todas as informações antes de publicar</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Resumo do Curso</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-zinc-400">Título</p>
                        <p className="text-white font-medium">{formData.title || "Não preenchido"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Instrutor</p>
                        <p className="text-white font-medium">{formData.instructorName || "Não preenchido"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Preço</p>
                        <p className="text-white font-medium">
                          {formData.price ? `R$ ${Number(formData.price).toFixed(2).replace('.', ',')}` : "Não preenchido"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Módulos</p>
                        <p className="text-white font-medium">{formData.modules.length} módulo(s)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center p-8 bg-zinc-900/40 border-t border-zinc-700/50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={tabs.findIndex(tab => tab.id === activeTab) === 0}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
              >
                <FiArrowLeft className="mr-2" /> Anterior
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-zinc-400">
                  Passo {tabs.findIndex(tab => tab.id === activeTab) + 1} de {tabs.length}
                </p>
              </div>
              
              <Button
                onClick={handleNext}
                disabled={tabs.findIndex(tab => tab.id === activeTab) === tabs.length - 1}
                className="bg-ejup-cyan hover:bg-ejup-cyan/90 text-zinc-900"
              >
                Próximo <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Confirmação - Exclusão de Categoria */}
      {showDeleteCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="text-red-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Confirmar Exclusão</h3>
                <p className="text-sm text-zinc-400">Esta ação não pode ser desfeita</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-zinc-300">
                Você está prestes a excluir a categoria <strong className="text-white">"{itemToDelete.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}"</strong>.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-300 text-sm font-medium mb-2">⚠️ Atenção:</p>
                <ul className="text-red-200 text-sm space-y-1">
                  <li>• Esta exclusão é <strong>permanente</strong></li>
                  <li>• Afetará <strong>todas as páginas</strong> que usam esta categoria</li>
                  <li>• Cursos com esta categoria ficarão sem categoria</li>
                  <li>• Filtros de busca serão atualizados automaticamente</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowDeleteCategoryModal(false);
                  setItemToDelete("");
                }}
                className="flex-1 text-zinc-400 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmDeleteCategory}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Excluir Categoria
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação - Exclusão de Público-Alvo */}
      {showDeleteAudienceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="text-red-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Confirmar Exclusão</h3>
                <p className="text-sm text-zinc-400">Esta ação não pode ser desfeita</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-zinc-300">
                Você está prestes a excluir o público-alvo <strong className="text-white">"{itemToDelete.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}"</strong>.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-300 text-sm font-medium mb-2">⚠️ Atenção:</p>
                <ul className="text-red-200 text-sm space-y-1">
                  <li>• Esta exclusão é <strong>permanente</strong></li>
                  <li>• Afetará <strong>todas as páginas</strong> que usam este público-alvo</li>
                  <li>• Cursos com este público ficarão sem público definido</li>
                  <li>• Filtros de busca serão atualizados automaticamente</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowDeleteAudienceModal(false);
                  setItemToDelete("");
                }}
                className="flex-1 text-zinc-400 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmDeleteAudience}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Excluir Público-Alvo
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
} 