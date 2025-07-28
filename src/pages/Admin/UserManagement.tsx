import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from '../../components/AdminLayout';
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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "../../hooks/use-toast";
import { FiSearch, FiEdit, FiPlus, FiCheck, FiUser, FiUsers, FiSettings, FiShield } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Sistema de permissões hierárquico para administradores
interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'courses' | 'users' | 'content' | 'financial' | 'system';
}

interface AdminRole {
  id: string;
  name: string;
  description: string;
  level: number; // 1 = mais alto (CEO), 5 = mais baixo (Assistente)
  permissions: string[];
  color: string;
}

// Lista completa de permissões do sistema
const SYSTEM_PERMISSIONS: Permission[] = [
  // Cursos
  { id: 'courses.view', name: 'Visualizar Cursos', description: 'Ver lista e detalhes dos cursos', category: 'courses' },
  { id: 'courses.create', name: 'Criar Cursos', description: 'Criar novos cursos na plataforma', category: 'courses' },
  { id: 'courses.edit', name: 'Editar Cursos', description: 'Modificar cursos existentes', category: 'courses' },
  { id: 'courses.delete', name: 'Excluir Cursos', description: 'Remover cursos da plataforma', category: 'courses' },
  { id: 'courses.publish', name: 'Publicar Cursos', description: 'Aprovar e publicar cursos', category: 'courses' },
  { id: 'courses.pricing', name: 'Definir Preços', description: 'Alterar preços e promoções', category: 'courses' },
  
  // Usuários
  { id: 'users.view', name: 'Visualizar Usuários', description: 'Ver lista e perfis de usuários', category: 'users' },
  { id: 'users.create', name: 'Criar Usuários', description: 'Adicionar novos usuários', category: 'users' },
  { id: 'users.edit', name: 'Editar Usuários', description: 'Modificar dados de usuários', category: 'users' },
  { id: 'users.delete', name: 'Excluir Usuários', description: 'Remover usuários do sistema', category: 'users' },
  { id: 'users.permissions', name: 'Gerenciar Permissões', description: 'Alterar permissões de outros usuários', category: 'users' },
  { id: 'users.reports', name: 'Relatórios de Usuários', description: 'Acessar relatórios detalhados', category: 'users' },
  
  // Conteúdo
  { id: 'content.view', name: 'Visualizar Conteúdo', description: 'Ver artigos e materiais', category: 'content' },
  { id: 'content.create', name: 'Criar Conteúdo', description: 'Adicionar novos artigos e materiais', category: 'content' },
  { id: 'content.edit', name: 'Editar Conteúdo', description: 'Modificar conteúdo existente', category: 'content' },
  { id: 'content.delete', name: 'Excluir Conteúdo', description: 'Remover conteúdo da plataforma', category: 'content' },
  { id: 'content.moderate', name: 'Moderar Conteúdo', description: 'Aprovar/rejeitar submissões', category: 'content' },
  
  // Financeiro
  { id: 'financial.view', name: 'Visualizar Financeiro', description: 'Ver dados financeiros básicos', category: 'financial' },
  { id: 'financial.reports', name: 'Relatórios Financeiros', description: 'Acessar relatórios financeiros detalhados', category: 'financial' },
  { id: 'financial.commissions', name: 'Gerenciar Comissões', description: 'Alterar percentuais de comissão', category: 'financial' },
  { id: 'financial.payments', name: 'Processar Pagamentos', description: 'Gerenciar pagamentos e reembolsos', category: 'financial' },
  
  // Sistema
  { id: 'system.settings', name: 'Configurações do Sistema', description: 'Alterar configurações gerais', category: 'system' },
  { id: 'system.backup', name: 'Backup e Restauração', description: 'Gerenciar backups do sistema', category: 'system' },
  { id: 'system.logs', name: 'Logs do Sistema', description: 'Acessar logs de auditoria', category: 'system' },
];

// Cargos administrativos pré-definidos
const ADMIN_ROLES: AdminRole[] = [
  {
    id: 'ceo',
    name: 'CEO/Diretor Geral',
    description: 'Acesso total ao sistema, todas as permissões',
    level: 1,
    color: 'bg-red-500',
    permissions: SYSTEM_PERMISSIONS.map(p => p.id)
  },
  {
    id: 'manager',
    name: 'Gerente Geral',
    description: 'Gerenciamento completo exceto configurações críticas',
    level: 2,
    color: 'bg-orange-500',
    permissions: [
      'courses.view', 'courses.create', 'courses.edit', 'courses.publish', 'courses.pricing',
      'users.view', 'users.create', 'users.edit', 'users.reports',
      'content.view', 'content.create', 'content.edit', 'content.moderate',
      'financial.view', 'financial.reports', 'financial.commissions',
      'system.logs'
    ]
  },
  {
    id: 'content_manager',
    name: 'Gerente de Conteúdo',
    description: 'Gerenciamento de cursos, conteúdo e instrutores',
    level: 3,
    color: 'bg-blue-500',
    permissions: [
      'courses.view', 'courses.create', 'courses.edit', 'courses.publish',
      'users.view', 'users.edit',
      'content.view', 'content.create', 'content.edit', 'content.moderate',
      'financial.view'
    ]
  },
  {
    id: 'financial_manager',
    name: 'Gerente Financeiro',
    description: 'Gerenciamento financeiro e relatórios',
    level: 3,
    color: 'bg-green-500',
    permissions: [
      'courses.view', 'courses.pricing',
      'users.view', 'users.reports',
      'content.view',
      'financial.view', 'financial.reports', 'financial.commissions', 'financial.payments'
    ]
  },
  {
    id: 'analyst',
    name: 'Analista',
    description: 'Análise de dados e relatórios',
    level: 4,
    color: 'bg-purple-500',
    permissions: [
      'courses.view',
      'users.view', 'users.reports',
      'content.view',
      'financial.view', 'financial.reports'
    ]
  },
  {
    id: 'support',
    name: 'Suporte/Assistente',
    description: 'Suporte aos usuários e tarefas básicas',
    level: 5,
    color: 'bg-gray-500',
    permissions: [
      'courses.view',
      'users.view', 'users.edit',
      'content.view', 'content.edit'
    ]
  }
];

// Interface expandida para usuários
interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  phone?: string;
  profession?: string;
  company?: string;
  bio?: string;
  
  // Dados específicos para admins
  adminRole?: string;
  permissions?: string[];
  department?: string;
  supervisor?: number;
  hireDate?: string;
  lastLogin?: string;
  accessLevel?: number;

  // Dados acadêmicos para estudantes
  purchaseHistory?: Array<{
    courseId: number;
    courseName: string;
    purchaseDate: string;
    amount: number;
    completedLessons: number;
    totalLessons: number;
    lastAccessDate: string;
    timeSpent: string;
  }>;
  articlesPublished?: Array<{
    id: number;
    title: string;
    category: string;
    publishDate: string;
    views: number;
    readingTime: string;
  }>;

  // Dados específicos para instrutores
  instructorRole?: string;
  instructorBio?: string;
  instructorPhoto?: string;
  instructorExperience?: string;
  instructorCommissionPercentage?: number;
  gatewayTaxPercentage?: number;
  taxPercentage?: number;
  coursesCreated?: Array<{
    id: number;
    title: string;
    students: number;
    revenue: number;
    rating: number;
  }>;
}

export default function UserManagement() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Estados para adicionar administrador
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [selectedAdminRole, setSelectedAdminRole] = useState<string>('');
  const [customPermissions, setCustomPermissions] = useState<string[]>([]);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Estados para edição de usuário
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    company: '',
    department: '',
    bio: '',
    adminRole: '',
    status: '',
    hireDate: '',
    permissions: [] as string[],
    instructorCommissionPercentage: 70,
    gatewayTaxPercentage: 3.99,
    taxPercentage: 6
  });

  // Estados para calculadora de repasse por período
  const [repasseStartDate, setRepasseStartDate] = useState(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return firstDay.toISOString().split('T')[0];
  });
  const [repasseEndDate, setRepasseEndDate] = useState(() => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return lastDay.toISOString().split('T')[0];
  });

  // Estados para gerenciamento de cargos (C-level)
  const [isManageRolesDialogOpen, setIsManageRolesDialogOpen] = useState(false);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null);
  const [customRoles, setCustomRoles] = useState<AdminRole[]>([]);
  const [newRoleData, setNewRoleData] = useState({
    name: '',
    description: '',
    level: 3,
    color: 'bg-blue-500',
    permissions: [] as string[]
  });
  
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    company: 'EJUP - Escola de Magistratura',
    department: '',
    hireDate: new Date().toISOString().split('T')[0],
    bio: ''
  });

  // Dados dos usuários com informações completas
  const mockUsers: User[] = [
    // Estudantes
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      phone: '(11) 99999-1111',
      profession: 'Advogada',
      company: 'Silva & Associados',
      bio: 'Advogada especializada em Direito Civil com 5 anos de experiência.',
      purchaseHistory: [
        {
          courseId: 1,
          courseName: 'Direito Civil Avançado',
          purchaseDate: '2024-01-20',
          amount: 299.90,
          completedLessons: 12,
          totalLessons: 15,
          lastAccessDate: '2024-06-18',
          timeSpent: '8h 30min'
        },
        {
          courseId: 2,
          courseName: 'Processo Civil Contemporâneo',
          purchaseDate: '2024-03-10',
          amount: 399.90,
          completedLessons: 8,
          totalLessons: 12,
          lastAccessDate: '2024-06-15',
          timeSpent: '5h 45min'
        }
      ],
      articlesPublished: [
        {
          id: 1,
          title: 'Novas Tendências no Direito Civil',
          category: 'Direito Civil',
          publishDate: '2024-05-15',
          views: 1250,
          readingTime: '8 min'
        },
        {
          id: 2,
          title: 'Análise da Lei 14.382/2022',
          category: 'Legislação',
          publishDate: '2024-04-20',
          views: 890,
          readingTime: '6 min'
        }
      ]
    },
    {
      id: 2,
      name: 'Pedro Santos',
      email: 'pedro.santos@email.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-02-20',
      phone: '(11) 99999-2222',
      profession: 'Estudante de Direito',
      company: 'PUC-SP',
      bio: 'Estudante do 8º semestre de Direito, focado em Direito Empresarial.',
      purchaseHistory: [
        {
          courseId: 3,
          courseName: 'Direito Empresarial na Prática',
          purchaseDate: '2024-02-25',
          amount: 249.90,
          completedLessons: 9,
          totalLessons: 12,
          lastAccessDate: '2024-06-19',
          timeSpent: '6h 15min'
        }
      ],
      articlesPublished: []
    },
    // Instrutores
    {
      id: 3,
      name: 'Dra. Carla Mendes',
      email: 'carla.mendes@email.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2023-08-10',
      phone: '(11) 99999-3333',
      profession: 'Professora de Direito',
      company: 'Universidade de São Paulo',
      bio: 'Doutora em Direito Civil pela USP, com mais de 15 anos de experiência acadêmica.',
      instructorRole: 'Professor Titular',
      instructorBio: 'Especialista em Direito Civil e Processo Civil, com vasta experiência em pesquisa e ensino.',
      instructorExperience: '15 anos de experiência acadêmica e profissional',
      instructorCommissionPercentage: 75,
      coursesCreated: [
        {
          id: 1,
          title: 'Direito Civil Avançado',
          students: 1250,
          revenue: 45000,
          rating: 4.8
        },
        {
          id: 2,
          title: 'Processo Civil Contemporâneo',
          students: 890,
          revenue: 32000,
          rating: 4.7
        }
      ]
    },
    {
      id: 4,
      name: 'Prof. Marcos Sousa',
      email: 'marcos.sousa@email.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2023-09-15',
      phone: '(11) 99999-4444',
      profession: 'Advogado e Professor',
      company: 'Sousa Advocacia',
      bio: 'Advogado especializado em Direito Empresarial e professor universitário.',
      instructorRole: 'Professor Adjunto',
      instructorBio: 'Mestre em Direito Empresarial, atua há 12 anos na advocacia e 8 anos no ensino.',
      instructorExperience: '12 anos de advocacia e 8 anos de ensino',
      instructorCommissionPercentage: 70,
      coursesCreated: [
        {
          id: 3,
          title: 'Direito Empresarial na Prática',
          students: 650,
          revenue: 28000,
          rating: 4.6
        }
      ]
    },
    {
      id: 10,
      name: 'Dr. Fernando Oliveira',
      email: 'fernando.oliveira@email.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2023-11-20',
      phone: '(11) 99999-5555',
      profession: 'Juiz e Professor',
      company: 'Tribunal de Justiça de SP',
      bio: 'Magistrado com 20 anos de experiência e professor de Direito Processual.',
      instructorRole: 'Professor Convidado',
      instructorBio: 'Juiz de Direito há 20 anos, especialista em Direito Processual Civil e Penal.',
      instructorExperience: '20 anos na magistratura e 10 anos no ensino',
      instructorCommissionPercentage: 65,
      coursesCreated: [
        {
          id: 4,
          title: 'Direito Processual na Magistratura',
          students: 420,
          revenue: 22000,
          rating: 4.9
        }
      ]
    },
    // Administradores com sistema de permissões expandido
    {
      id: 5,
      name: 'Mariana Santos',
      email: 'mariana.santos@ejup.com',
      role: 'admin',
      status: 'active',
      joinDate: '2022-06-01',
      phone: '(11) 99999-8888',
      profession: 'CEO/Diretora Geral',
      company: 'EJUP - Escola de Magistratura',
      bio: 'CEO da EJUP. Responsável pela visão estratégica e direcionamento geral da empresa.',
      adminRole: 'ceo',
      department: 'Diretoria Executiva',
      hireDate: '2022-06-01',
      lastLogin: '2024-06-20 08:15:00',
      accessLevel: 1,
      permissions: SYSTEM_PERMISSIONS.map(p => p.id)
    },
    {
      id: 6,
      name: 'Roberto Silva',
      email: 'roberto.silva@ejup.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-01-10',
      phone: '(11) 99999-5555',
      profession: 'Gerente de Conteúdo',
      company: 'EJUP - Escola de Magistratura',
      bio: 'Gerente de Conteúdo da EJUP. Responsável pela curadoria e desenvolvimento de cursos jurídicos.',
      adminRole: 'content_manager',
      department: 'Conteúdo e Cursos',
      supervisor: 5,
      hireDate: '2023-01-10',
      lastLogin: '2024-06-20 09:30:00',
      accessLevel: 3,
      permissions: [
        'courses.view', 'courses.create', 'courses.edit', 'courses.publish',
        'users.view', 'users.edit',
        'content.view', 'content.create', 'content.edit', 'content.moderate',
        'financial.view'
      ]
    },
    {
      id: 7,
      name: 'Carlos Pereira',
      email: 'carlos.pereira@ejup.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-03-15',
      phone: '(11) 99999-9999',
      profession: 'Gerente Financeiro',
      company: 'EJUP - Escola de Magistratura',
      bio: 'Gerente Financeiro da EJUP. Responsável por toda gestão financeira e relatórios.',
      adminRole: 'financial_manager',
      department: 'Financeiro',
      supervisor: 5,
      hireDate: '2023-03-15',
      lastLogin: '2024-06-20 10:45:00',
      accessLevel: 3,
      permissions: [
        'courses.view', 'courses.pricing',
        'users.view', 'users.reports',
        'content.view',
        'financial.view', 'financial.reports', 'financial.commissions', 'financial.payments'
      ]
    },
    {
      id: 8,
      name: 'Ana Carolina Lima',
      email: 'ana.lima@ejup.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-08-20',
      phone: '(11) 99999-1010',
      profession: 'Analista de Dados',
      company: 'EJUP - Escola de Magistratura',
      bio: 'Analista de Dados da EJUP. Responsável por relatórios e análises de performance.',
      adminRole: 'analyst',
      department: 'Análise e Relatórios',
      supervisor: 7,
      hireDate: '2023-08-20',
      lastLogin: '2024-06-19 16:20:00',
      accessLevel: 4,
      permissions: [
        'courses.view',
        'users.view', 'users.reports',
        'content.view',
        'financial.view', 'financial.reports'
      ]
    },
    {
      id: 9,
      name: 'Lucas Ferreira',
      email: 'lucas.ferreira@ejup.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-10',
      phone: '(11) 99999-1111',
      profession: 'Assistente de Suporte',
      company: 'EJUP - Escola de Magistratura',
      bio: 'Assistente de Suporte da EJUP. Responsável por atendimento aos usuários.',
      adminRole: 'support',
      department: 'Suporte ao Cliente',
      supervisor: 6,
      hireDate: '2024-01-10',
      lastLogin: '2024-06-20 11:30:00',
      accessLevel: 5,
      permissions: [
        'courses.view',
        'users.view', 'users.edit',
        'content.view', 'content.edit'
      ]
    }
  ];

  // Funções auxiliares
  const getAdminRole = (roleId: string): AdminRole | undefined => {
    return getAllRoles().find(role => role.id === roleId);
  };

  const hasPermission = (user: User, permission: string): boolean => {
    if (user.role !== 'admin') return false;
    if (user.permissions?.includes(permission)) return true;
    if (user.adminRole) {
      const role = getAdminRole(user.adminRole);
      return role?.permissions.includes(permission) || false;
    }
    return false;
  };

  const getPermissionsByCategory = (category: string): Permission[] => {
    return SYSTEM_PERMISSIONS.filter(p => p.category === category);
  };

  // Verificar se o usuário atual é C-level (CEO)
  const isCurrentUserCLevel = (): boolean => {
    // Aqui você verificaria o usuário logado atual
    // Por enquanto, simulando que existe um CEO logado
    return true; // Simular que o usuário atual é CEO
  };

  // Obter todos os cargos (padrão + customizados)
  const getAllRoles = (): AdminRole[] => {
    return [...ADMIN_ROLES, ...customRoles];
  };

  // Funções para gerenciamento de cargos
  const handleManageRoles = () => {
    setIsManageRolesDialogOpen(true);
  };

  const handleAddRole = () => {
    setNewRoleData({
      name: '',
      description: '',
      level: 3,
      color: 'bg-blue-500',
      permissions: []
    });
    setIsAddRoleDialogOpen(true);
  };

  const handleEditRole = (role: AdminRole) => {
    setEditingRole(role);
    setNewRoleData({
      name: role.name,
      description: role.description,
      level: role.level,
      color: role.color,
      permissions: [...role.permissions]
    });
    setIsEditRoleDialogOpen(true);
  };

  const handleSaveNewRole = () => {
    if (!newRoleData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome do cargo é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    const newRole: AdminRole = {
      id: `custom_${Date.now()}`,
      name: newRoleData.name,
      description: newRoleData.description,
      level: newRoleData.level,
      color: newRoleData.color,
      permissions: newRoleData.permissions
    };

    setCustomRoles(prev => [...prev, newRole]);
    setIsAddRoleDialogOpen(false);
    
    toast({
      title: "Cargo criado!",
      description: `O cargo "${newRoleData.name}" foi criado com sucesso.`
    });
  };

  const handleSaveRoleChanges = () => {
    if (!editingRole) return;

    if (editingRole.id.startsWith('custom_')) {
      // Editar cargo customizado
      setCustomRoles(prev => 
        prev.map(role => 
          role.id === editingRole.id 
            ? { ...role, ...newRoleData }
            : role
        )
      );
    } else {
      // Para cargos padrão, criar uma versão customizada
      const updatedRole: AdminRole = {
        ...editingRole,
        id: `custom_${editingRole.id}_${Date.now()}`,
        ...newRoleData
      };
      setCustomRoles(prev => [...prev, updatedRole]);
    }

    setIsEditRoleDialogOpen(false);
    setEditingRole(null);
    
    toast({
      title: "Cargo atualizado!",
      description: `As alterações no cargo foram salvas com sucesso.`
    });
  };

  const handleDeleteRole = (roleId: string) => {
    if (!roleId.startsWith('custom_')) {
      toast({
        title: "Erro",
        description: "Não é possível excluir cargos padrão do sistema.",
        variant: "destructive"
      });
      return;
    }

    setCustomRoles(prev => prev.filter(role => role.id !== roleId));
    
    toast({
      title: "Cargo excluído!",
      description: "O cargo foi removido com sucesso."
    });
  };

  const handleRolePermissionToggle = (permissionId: string) => {
    setNewRoleData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddAdmin = () => {
    setIsAddAdminDialogOpen(true);
    setSelectedAdminRole('');
    setCustomPermissions([]);
    setNewAdminData({
      name: '',
      email: '',
      phone: '',
      profession: '',
      company: 'EJUP - Escola de Magistratura',
      department: '',
      hireDate: new Date().toISOString().split('T')[0],
      bio: ''
    });
  };

  const handleSaveNewAdmin = () => {
    const selectedRole = getAdminRole(selectedAdminRole);
    
    if (!selectedRole || !newAdminData.name || !newAdminData.email) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios e selecione um cargo.",
        variant: "destructive"
      });
      return;
    }

    const newAdmin: User = {
      id: Date.now(),
      name: newAdminData.name,
      email: newAdminData.email,
      role: 'admin',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      phone: newAdminData.phone,
      profession: newAdminData.profession,
      company: newAdminData.company,
      bio: newAdminData.bio,
      adminRole: selectedAdminRole,
      department: newAdminData.department,
      hireDate: newAdminData.hireDate,
      accessLevel: selectedRole.level,
      permissions: [...selectedRole.permissions, ...customPermissions]
    };

    console.log('Novo administrador criado:', newAdmin);

    toast({
      title: "Administrador adicionado!",
      description: `${newAdminData.name} foi adicionado como ${selectedRole.name}.`,
    });

    setIsAddAdminDialogOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditUserData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      profession: user.profession || '',
      company: user.company || '',
      department: user.department || '',
      bio: user.bio || '',
      adminRole: user.adminRole || '',
      status: user.status,
      hireDate: user.hireDate || '',
      permissions: user.permissions || [],
      instructorCommissionPercentage: user.instructorCommissionPercentage || 70,
      gatewayTaxPercentage: 3.99,
      taxPercentage: 6
    });
    setIsEditUserDialogOpen(true);
  };

  const handleSaveUserChanges = () => {
    if (!editingUser) return;
    
    // Aqui você implementaria a lógica para salvar no backend
    console.log('Salvando alterações do usuário:', {
      userId: editingUser.id,
      changes: editUserData
    });
    
    toast({
      title: "Usuário atualizado!",
      description: `As informações de ${editUserData.name} foram atualizadas com sucesso.`,
    });
    
    setIsEditUserDialogOpen(false);
    setEditingUser(null);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setEditUserData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Estudante';
      case 'instructor': return 'Instrutor';
      case 'admin': return 'Colaborador';
      default: return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  // Função para simular receita por período
  const getSimulatedRevenueForPeriod = (startDate: string, endDate: string, instructorName: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Simulação baseada no instrutor e período
    let baseDailyRevenue = 0;
    if (instructorName.includes('Carla')) {
      baseDailyRevenue = 180; // R$ 180/dia em média
    } else if (instructorName.includes('Marcos')) {
      baseDailyRevenue = 120; // R$ 120/dia em média
    } else if (instructorName.includes('Fernando')) {
      baseDailyRevenue = 95; // R$ 95/dia em média
    } else {
      baseDailyRevenue = 100; // Padrão
    }
    
    // Adicionar variação aleatória (±20%)
    const variation = 0.8 + Math.random() * 0.4;
    const totalRevenue = baseDailyRevenue * diffDays * variation;
    
    return Math.round(totalRevenue * 100) / 100;
  };

  // Função para calcular comissão do instrutor
  const calculateInstructorCommission = (
    grossRevenue: number,
    commissionPercentage: number,
    gatewayTax: number,
    taxes: number
  ): number => {
    // Calcular valor líquido após taxas
    const gatewayAmount = grossRevenue * (gatewayTax / 100);
    const taxAmount = grossRevenue * (taxes / 100);
    const netRevenue = grossRevenue - gatewayAmount - taxAmount;
    
    // Calcular comissão do instrutor
    const instructorCommission = netRevenue * (commissionPercentage / 100);
    
    return Math.round(instructorCommission * 100) / 100;
  };

  // Função para excluir usuário
  const handleDeleteUser = (user: User) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o usuário "${user.name}"?\n\nDigite o nome do usuário para confirmar:`
    );
    
    if (confirmDelete) {
      const userName = window.prompt('Digite o nome do usuário para confirmar a exclusão:');
      if (userName === user.name) {
        toast({
          title: "Usuário excluído com sucesso!",
          description: `${user.name} foi removido do sistema.`,
        });
        console.log('Usuário excluído:', user);
      } else {
        toast({
          title: "Exclusão cancelada",
          description: "Nome não confere. Operação cancelada.",
          variant: "destructive"
        });
      }
    }
  };

  // Função para visualizar artigo
  const handleViewArticle = (articleId: number) => {
    toast({
      title: "Artigo visualizado",
      description: `Abrindo artigo ID: ${articleId}`,
    });
    console.log('Navegando para artigo:', articleId);
    // Aqui seria a navegação real: navigate(`/articles/${articleId}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Gestão de Usuários</h1>
            <p className="text-zinc-400">Gerencie estudantes, instrutores e colaboradores com sistema de permissões</p>
          </div>
          <div className="flex gap-3">
            {isCurrentUserCLevel() && (
              <Button onClick={handleManageRoles} variant="outline" className="border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                <FiSettings className="mr-2" size={16} />
                Gerenciar Cargos
              </Button>
            )}
                          <Button onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-700">
                <FiPlus className="mr-2" size={16} />
                Adicionar Colaborador
              </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48 bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os usuários</SelectItem>
                  <SelectItem value="student">Estudantes</SelectItem>
                  <SelectItem value="instructor">Instrutores</SelectItem>
                  <SelectItem value="admin">Colaboradores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de usuários */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-zinc-700">
              Todos ({filteredUsers.length})
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-zinc-700">
              Estudantes ({filteredUsers.filter(u => u.role === 'student').length})
            </TabsTrigger>
            <TabsTrigger value="instructors" className="data-[state=active]:bg-zinc-700">
              Instrutores ({filteredUsers.filter(u => u.role === 'instructor').length})
            </TabsTrigger>
            <TabsTrigger value="admins" className="data-[state=active]:bg-zinc-700">
              Colaboradores ({filteredUsers.filter(u => u.role === 'admin').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="bg-zinc-800 border-zinc-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-700">
                    <TableHead className="text-zinc-300">Usuário</TableHead>
                    <TableHead className="text-zinc-300">Tipo</TableHead>
                    <TableHead className="text-zinc-300">Status</TableHead>
                    <TableHead className="text-zinc-300">Data de Cadastro</TableHead>
                    <TableHead className="text-zinc-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-zinc-700">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-zinc-400">{user.email}</div>
                          {user.role === 'admin' && user.adminRole && (
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`w-2 h-2 rounded-full ${getAdminRole(user.adminRole)?.color}`}></div>
                              <span className="text-xs text-blue-400">
                                {getAdminRole(user.adminRole)?.name} - {user.department}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? 'destructive' :
                          user.role === 'instructor' ? 'default' : 'secondary'
                        }>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditUser(user)}
                          className="text-zinc-300 hover:text-white"
                        >
                          <FiEdit size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Aba Estudantes */}
          <TabsContent value="students">
            <Card className="bg-zinc-800 border-zinc-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-700">
                    <TableHead className="text-zinc-300">Usuário</TableHead>
                    <TableHead className="text-zinc-300">Profissão</TableHead>
                    <TableHead className="text-zinc-300">Status</TableHead>
                    <TableHead className="text-zinc-300">Data de Cadastro</TableHead>
                    <TableHead className="text-zinc-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.filter(u => u.role === 'student').map((user) => (
                    <TableRow key={user.id} className="border-zinc-700">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-zinc-400">{user.email}</div>
                          {user.company && (
                            <div className="text-xs text-zinc-500 mt-1">{user.company}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-zinc-300">{user.profession || 'Não informado'}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditUser(user)}
                          className="text-zinc-300 hover:text-white"
                        >
                          <FiEdit size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Aba Instrutores */}
          <TabsContent value="instructors">
            <Card className="bg-zinc-800 border-zinc-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-700">
                    <TableHead className="text-zinc-300">Usuário</TableHead>
                    <TableHead className="text-zinc-300">Especialização</TableHead>
                    <TableHead className="text-zinc-300">Status</TableHead>
                    <TableHead className="text-zinc-300">Data de Cadastro</TableHead>
                    <TableHead className="text-zinc-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.filter(u => u.role === 'instructor').map((user) => (
                    <TableRow key={user.id} className="border-zinc-700">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-zinc-400">{user.email}</div>
                          {user.company && (
                            <div className="text-xs text-zinc-500 mt-1">{user.company}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-zinc-300">{user.profession || 'Não informado'}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditUser(user)}
                          className="text-zinc-300 hover:text-white"
                        >
                          <FiEdit size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Aba Administradores - Simplificada */}
          <TabsContent value="admins">
            <Card className="bg-zinc-800 border-zinc-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-700">
                    <TableHead className="text-zinc-300">Usuário</TableHead>
                    <TableHead className="text-zinc-300">Cargo</TableHead>
                    <TableHead className="text-zinc-300">Departamento</TableHead>
                    <TableHead className="text-zinc-300">Último Acesso</TableHead>
                    <TableHead className="text-zinc-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.filter(u => u.role === 'admin').map((user) => (
                    <TableRow key={user.id} className="border-zinc-700">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-zinc-400">{user.email}</div>
                          <div className="text-xs text-blue-400 mt-1">
                            {user.permissions?.length || 0} permissões ativas
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.adminRole && (
                            <>
                              <div className={`w-2 h-2 rounded-full ${getAdminRole(user.adminRole)?.color}`}></div>
                              <span className="text-zinc-300">{getAdminRole(user.adminRole)?.name}</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-zinc-300">{user.department || 'Não definido'}</span>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'Nunca'}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditUser(user)}
                          className="text-zinc-300 hover:text-white"
                        >
                          <FiEdit size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal de Adicionar Administrador */}
        <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
          <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Configure as informações e permissões do novo colaborador da EJUP
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações Básicas</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={newAdminData.name}
                    onChange={(e) => setNewAdminData({...newAdminData, name: e.target.value})}
                    className="bg-zinc-800 border-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Corporativo *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdminData.email}
                    onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                    className="bg-zinc-800 border-zinc-600"
                    placeholder="nome@ejup.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newAdminData.phone}
                    onChange={(e) => setNewAdminData({...newAdminData, phone: e.target.value})}
                    className="bg-zinc-800 border-zinc-600"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">Cargo/Profissão</Label>
                  <Input
                    id="profession"
                    value={newAdminData.profession}
                    onChange={(e) => setNewAdminData({...newAdminData, profession: e.target.value})}
                    className="bg-zinc-800 border-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    value={newAdminData.department}
                    onChange={(e) => setNewAdminData({...newAdminData, department: e.target.value})}
                    className="bg-zinc-800 border-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hireDate">Data de Contratação</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={newAdminData.hireDate}
                    onChange={(e) => setNewAdminData({...newAdminData, hireDate: e.target.value})}
                    className="bg-zinc-800 border-zinc-600"
                  />
                </div>
              </div>

              {/* Sistema de Permissões */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Sistema de Permissões</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="adminRole">Cargo Administrativo *</Label>
                  <Select value={selectedAdminRole} onValueChange={setSelectedAdminRole}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-600">
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllRoles().map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                            <span>{role.name}</span>
                            {role.id.startsWith('custom_') && (
                              <span className="text-xs text-blue-400">(Personalizado)</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedAdminRole && (
                    <div className="mt-2 p-3 bg-zinc-800 rounded-lg">
                      <p className="text-sm text-zinc-300">
                        {getAdminRole(selectedAdminRole)?.description}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Nível de acesso: {getAdminRole(selectedAdminRole)?.level} | 
                        Permissões: {getAdminRole(selectedAdminRole)?.permissions.length}
                      </p>
                    </div>
                  )}
                </div>

                {/* Preview das Permissões por Categoria */}
                {selectedAdminRole && (
                  <div className="space-y-2">
                    <Label>Permissões Incluídas no Cargo</Label>
                    <div className="max-h-60 overflow-y-auto bg-zinc-800 p-3 rounded-lg">
                      <div className="space-y-3">
                        {['courses', 'users', 'content', 'financial', 'system'].map(category => {
                          const categoryPermissions = getPermissionsByCategory(category);
                          const rolePermissions = getAdminRole(selectedAdminRole)?.permissions || [];
                          const hasAnyPermission = categoryPermissions.some(p => rolePermissions.includes(p.id));
                          
                          if (!hasAnyPermission) return null;
                          
                          return (
                            <div key={category} className="mb-3">
                              <h4 className="text-sm font-medium text-white capitalize mb-2 flex items-center gap-2">
                                {category === 'courses' && <FiUser className="text-blue-400" size={14} />}
                                {category === 'users' && <FiUsers className="text-green-400" size={14} />}
                                {category === 'content' && <FiEdit className="text-purple-400" size={14} />}
                                {category === 'financial' && <FiCheck className="text-yellow-400" size={14} />}
                                {category === 'system' && <FiSettings className="text-red-400" size={14} />}
                                {category === 'courses' ? 'Cursos' :
                                 category === 'users' ? 'Usuários' :
                                 category === 'content' ? 'Conteúdo' :
                                 category === 'financial' ? 'Financeiro' : 'Sistema'}
                              </h4>
                              <div className="space-y-1 ml-4">
                                {categoryPermissions
                                  .filter(p => rolePermissions.includes(p.id))
                                  .map(permission => (
                                    <div key={permission.id} className="flex items-center gap-2 text-xs">
                                      <FiCheck className="text-green-400" size={12} />
                                      <span className="text-zinc-300">{permission.name}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAdminDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNewAdmin} className="bg-blue-600 hover:bg-blue-700">
                Criar Colaborador
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Edição Completo */}
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Configurações da Conta</DialogTitle>
              <DialogDescription className="text-zinc-400">
                {editingUser?.role === 'admin' ? 'Configurações de colaborador' : 
                 editingUser?.role === 'instructor' ? 'Configurações de instrutor' : 
                 'Configurações de estudante'}
              </DialogDescription>
            </DialogHeader>
            
                        {editingUser && (
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
                  <TabsTrigger value="personal" className="flex items-center gap-2">
                    <FiUser className="w-3 h-3 text-zinc-400" />
                    Pessoais
                  </TabsTrigger>
                  <TabsTrigger value="academic" className="flex items-center gap-2">
                    {editingUser.role === 'student' && <FiUser className="w-3 h-3 text-zinc-400" />}
                    {editingUser.role === 'instructor' && <FiUser className="w-3 h-3 text-zinc-400" />}
                    {editingUser.role === 'admin' && <FiShield className="w-3 h-3 text-zinc-400" />}
                    {editingUser.role === 'student' ? 'Acadêmico' : 
                     editingUser.role === 'instructor' ? 'Instrutor' : 'Colaborador'}
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FiEdit className="w-3 h-3 text-zinc-400" />
                    {editingUser.role === 'instructor' ? 'Cursos' : 'Conteúdo'}
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="flex items-center gap-2">
                    <FiCheck className="w-3 h-3 text-zinc-400" />
                    {editingUser.role === 'instructor' ? 'Financeiro' : 'Sistema'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 p-6">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <Label className="text-zinc-300">Nome</Label>
                        <Input
                          value={editUserData.name}
                          onChange={(e) => setEditUserData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-zinc-700 border-zinc-600 text-white mt-2"
                        />
                      </div>
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <Label className="text-zinc-300">Email</Label>
                        <Input
                          value={editUserData.email}
                          onChange={(e) => setEditUserData(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-zinc-700 border-zinc-600 text-white mt-2"
                        />
                      </div>
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <Label className="text-zinc-300">Telefone</Label>
                        <Input
                          value={editUserData.phone}
                          onChange={(e) => setEditUserData(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-zinc-700 border-zinc-600 text-white mt-2"
                        />
                      </div>
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <Label className="text-zinc-300">Status</Label>
                        <Select value={editUserData.status} onValueChange={(value) => setEditUserData(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger className="bg-zinc-700 border-zinc-600 mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <Label className="text-zinc-300">Profissão</Label>
                        <Input
                          value={editUserData.profession}
                          onChange={(e) => setEditUserData(prev => ({ ...prev, profession: e.target.value }))}
                          className="bg-zinc-700 border-zinc-600 text-white mt-2"
                        />
                      </div>
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <Label className="text-zinc-300">Empresa/Instituição</Label>
                        <Input
                          value={editUserData.company}
                          onChange={(e) => setEditUserData(prev => ({ ...prev, company: e.target.value }))}
                          className="bg-zinc-700 border-zinc-600 text-white mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Aba Acadêmica/Instrutor/Colaborador */}
                <TabsContent value="academic" className="space-y-6 p-6">
                  {editingUser.role === 'student' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-2">Cursos Adquiridos</h3>
                          <p className="text-2xl font-bold text-blue-400">{editingUser.purchaseHistory?.length || 0}</p>
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-2">Cursos Ativos</h3>
                          <p className="text-2xl font-bold text-green-400">
                            {editingUser.purchaseHistory?.filter(course => course.completedLessons < course.totalLessons).length || 0}
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-2">Progresso Médio</h3>
                          <p className="text-2xl font-bold text-purple-400">
                            {editingUser.purchaseHistory?.length ? 
                              Math.round(editingUser.purchaseHistory.reduce((acc, course) => 
                                acc + (course.completedLessons / course.totalLessons * 100), 0) / editingUser.purchaseHistory.length) : 0}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Cursos em Progresso</h3>
                        <div className="space-y-3">
                          {editingUser.purchaseHistory?.map((course, index) => (
                            <div key={index} className="border border-zinc-700 p-3 rounded">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-white">{course.courseName}</h4>
                                <span className="text-sm text-zinc-400">{course.lastAccessDate}</span>
                              </div>
                              <div className="flex justify-between text-sm text-zinc-400 mb-2">
                                <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                                <span>{course.timeSpent} assistido</span>
                              </div>
                              <div className="w-full bg-zinc-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {editingUser.role === 'instructor' && (
                    <div className="space-y-6">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Perfil do Instrutor</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-zinc-300">Função</Label>
                            <Input
                              value={editingUser.instructorRole || ''}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                              readOnly
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Experiência</Label>
                            <Input
                              value={editingUser.instructorExperience || ''}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label className="text-zinc-300">Biografia Profissional</Label>
                          <textarea
                            value={editingUser.instructorBio || ''}
                            className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-md text-white resize-none mt-2"
                            rows={3}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {editingUser.role === 'admin' && (
                    <div className="space-y-6">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Configurações do Colaborador</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-zinc-300">Cargo</Label>
                            <Select value={editUserData.adminRole} onValueChange={(value) => setEditUserData(prev => ({ ...prev, adminRole: value }))}>
                              <SelectTrigger className="bg-zinc-700 border-zinc-600 mt-2">
                                <SelectValue placeholder="Selecione um cargo" />
                              </SelectTrigger>
                              <SelectContent>
                                {getAllRoles().map((role) => (
                                  <SelectItem key={role.id} value={role.id}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                                      <span>{role.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-zinc-300">Departamento</Label>
                            <Input
                              value={editUserData.department}
                              onChange={(e) => setEditUserData(prev => ({ ...prev, department: e.target.value }))}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label className="text-zinc-300">Data de Contratação</Label>
                          <Input
                            type="date"
                            value={editUserData.hireDate}
                            onChange={(e) => setEditUserData(prev => ({ ...prev, hireDate: e.target.value }))}
                            className="bg-zinc-700 border-zinc-600 text-white mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Aba Conteúdo/Cursos */}
                <TabsContent value="content" className="space-y-6 p-6">
                  {editingUser.role === 'student' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-2">Artigos Publicados</h3>
                          <p className="text-2xl font-bold text-green-400">{editingUser.articlesPublished?.length || 0}</p>
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-2">Elegível para Publicar</h3>
                          <p className="text-2xl font-bold text-blue-400">Sim</p>
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-2">Última Submissão</h3>
                          <p className="text-sm text-zinc-400">
                            {editingUser.articlesPublished?.length ? 
                              new Date(editingUser.articlesPublished[0].publishDate).toLocaleDateString('pt-BR') : 
                              'Nenhuma'}
                          </p>
                        </div>
                      </div>

                      {editingUser.articlesPublished && editingUser.articlesPublished.length > 0 && (
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-4">Artigos Publicados</h3>
                          <div className="space-y-3">
                            {editingUser.articlesPublished.map((article) => (
                              <div key={article.id} className="border border-zinc-700 p-4 rounded-lg hover:bg-zinc-700/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-white">{article.title}</h4>
                                  <Button
                                    size="sm"
                                    onClick={() => handleViewArticle(article.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Editar Artigo
                                  </Button>
                                </div>
                                <div className="flex justify-between text-sm text-zinc-400">
                                  <span>{article.category}</span>
                                  <span>{article.views} visualizações</span>
                                  <span>{article.readingTime}</span>
                                  <span>{new Date(article.publishDate).toLocaleDateString('pt-BR')}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {editingUser.role === 'instructor' && (
                    <div className="space-y-6">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Cursos Lecionados</h3>
                        <div className="space-y-3">
                          {editingUser.coursesCreated?.map((course) => (
                            <div key={course.id} className="border border-zinc-700 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-white">{course.title}</h4>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    navigate(`/admin/courses/${course.id}/edit`);
                                    toast({
                                      title: "Redirecionando...",
                                      description: `Abrindo edição do curso: ${course.title}`,
                                    });
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <FiEdit className="w-4 h-4 mr-2" />
                                  Editar Curso
                                </Button>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-zinc-400">Estudantes:</span>
                                  <span className="text-white ml-2">{course.students}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-400">Receita:</span>
                                  <span className="text-green-400 ml-2">R$ {course.revenue.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-400">Avaliação:</span>
                                  <span className="text-yellow-400 ml-2">⭐ {course.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {editingUser.role === 'admin' && (
                    <div className="space-y-6">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Permissões do Sistema</h3>
                        <div className="max-h-60 overflow-y-auto">
                          {['courses', 'users', 'content', 'financial', 'system'].map(category => {
                            const categoryPermissions = getPermissionsByCategory(category);
                            return (
                              <div key={category} className="mb-4">
                                <h4 className="text-sm font-medium text-white capitalize mb-2 flex items-center gap-2">
                                  {category === 'courses' && <FiUser className="text-blue-400" size={14} />}
                                  {category === 'users' && <FiUsers className="text-green-400" size={14} />}
                                  {category === 'content' && <FiEdit className="text-purple-400" size={14} />}
                                  {category === 'financial' && <FiCheck className="text-yellow-400" size={14} />}
                                  {category === 'system' && <FiSettings className="text-red-400" size={14} />}
                                  {category === 'courses' ? 'Cursos' :
                                   category === 'users' ? 'Usuários' :
                                   category === 'content' ? 'Conteúdo' :
                                   category === 'financial' ? 'Financeiro' : 'Sistema'}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 ml-4">
                                  {categoryPermissions.map(permission => (
                                    <div key={permission.id} className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        id={`perm-${permission.id}`}
                                        checked={editUserData.permissions.includes(permission.id)}
                                        onChange={() => handlePermissionToggle(permission.id)}
                                        className="rounded bg-zinc-600 border-zinc-500"
                                      />
                                      <label htmlFor={`perm-${permission.id}`} className="text-xs text-zinc-300 cursor-pointer">
                                        {permission.name}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Aba Financeiro/Sistema */}
                <TabsContent value="financial" className="space-y-6 p-6">
                  {editingUser.role === 'instructor' && (
                    <div className="space-y-6">
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Configuração de Comissão</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-zinc-300">Percentual de Comissão (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={editUserData.instructorCommissionPercentage || 70}
                              onChange={(e) => setEditUserData(prev => ({ 
                                ...prev, 
                                instructorCommissionPercentage: parseFloat(e.target.value) || 0 
                              }))}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Taxa Gateway (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.01"
                              value={editUserData.gatewayTaxPercentage || 3.99}
                              onChange={(e) => setEditUserData(prev => ({ 
                                ...prev, 
                                gatewayTaxPercentage: parseFloat(e.target.value) || 0 
                              }))}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Impostos (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="30"
                              step="0.01"
                              value={editUserData.taxPercentage || 6}
                              onChange={(e) => setEditUserData(prev => ({ 
                                ...prev, 
                                taxPercentage: parseFloat(e.target.value) || 0 
                              }))}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Calculadora de Repasse por Período */}
                      <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Calculadora de Repasse por Período</h3>
                        
                        {/* Seleção de Período */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-zinc-300">Data Inicial</Label>
                            <Input
                              type="date"
                              value={repasseStartDate}
                              onChange={(e) => setRepasseStartDate(e.target.value)}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Data Final</Label>
                            <Input
                              type="date"
                              value={repasseEndDate}
                              onChange={(e) => setRepasseEndDate(e.target.value)}
                              className="bg-zinc-700 border-zinc-600 text-white mt-2"
                            />
                          </div>
                        </div>

                        {/* Atalhos de Período */}
                        <div className="flex gap-2 mb-6">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const now = new Date();
                              const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                              const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                              setRepasseStartDate(firstDay.toISOString().split('T')[0]);
                              setRepasseEndDate(lastDay.toISOString().split('T')[0]);
                            }}
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                          >
                            Mês Atual
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const now = new Date();
                              const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                              const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
                              setRepasseStartDate(firstDay.toISOString().split('T')[0]);
                              setRepasseEndDate(lastDay.toISOString().split('T')[0]);
                            }}
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                          >
                            Mês Anterior
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const now = new Date();
                              const firstDay = new Date(now.getFullYear(), 0, 1);
                              setRepasseStartDate(firstDay.toISOString().split('T')[0]);
                              setRepasseEndDate(now.toISOString().split('T')[0]);
                            }}
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                          >
                            Ano até Agora
                          </Button>
                        </div>

                        {/* Métricas do Período */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="bg-zinc-700 p-3 rounded text-center">
                            <p className="text-sm text-zinc-400">Receita Bruta</p>
                            <p className="text-lg font-bold text-green-400">
                              R$ {getSimulatedRevenueForPeriod(repasseStartDate, repasseEndDate, editingUser.name).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className="bg-zinc-700 p-3 rounded text-center">
                            <p className="text-sm text-zinc-400">Taxa Gateway</p>
                            <p className="text-lg font-bold text-red-400">
                              -R$ {(getSimulatedRevenueForPeriod(repasseStartDate, repasseEndDate, editingUser.name) * (editUserData.gatewayTaxPercentage || 3.99) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className="bg-zinc-700 p-3 rounded text-center">
                            <p className="text-sm text-zinc-400">Impostos</p>
                            <p className="text-lg font-bold text-red-400">
                              -R$ {(getSimulatedRevenueForPeriod(repasseStartDate, repasseEndDate, editingUser.name) * (editUserData.taxPercentage || 6) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className="bg-zinc-700 p-3 rounded text-center">
                            <p className="text-sm text-zinc-400">Repasse Instrutor</p>
                            <p className="text-lg font-bold text-blue-400">
                              R$ {calculateInstructorCommission(
                                getSimulatedRevenueForPeriod(repasseStartDate, repasseEndDate, editingUser.name),
                                editUserData.instructorCommissionPercentage || 70,
                                editUserData.gatewayTaxPercentage || 3.99,
                                editUserData.taxPercentage || 6
                              ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {editingUser.role === 'student' && (
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-4">Configurações de Sistema</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-300">Notificações por Email</span>
                          <div className="bg-zinc-700 p-2 rounded text-white">Ativado</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-300">Perfil Público</span>
                          <div className="bg-zinc-700 p-2 rounded text-white">Privado</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {editingUser.role === 'admin' && (
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-4">Informações do Sistema</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-300">Último Acesso</span>
                          <div className="bg-zinc-700 p-2 rounded text-white">
                            {editingUser.lastLogin ? new Date(editingUser.lastLogin).toLocaleString('pt-BR') : 'Nunca'}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-300">Permissões Ativas</span>
                          <div className="bg-zinc-700 p-2 rounded text-white">
                            {editUserData.permissions.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}

            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (editingUser) {
                    handleDeleteUser(editingUser);
                  }
                }}
                className="border-red-600 text-red-400 hover:bg-red-900/20"
              >
                Excluir Usuário
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveUserChanges} className="bg-blue-600 hover:bg-blue-700">
                  Salvar Alterações
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Gerenciamento de Cargos */}
        <Dialog open={isManageRolesDialogOpen} onOpenChange={setIsManageRolesDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Gerenciar Cargos Administrativos</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Visualize, edite e crie novos cargos para o sistema
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Cargos Disponíveis</h3>
                <Button onClick={handleAddRole} className="bg-green-600 hover:bg-green-700">
                  <FiPlus className="mr-2" size={16} />
                  Novo Cargo
                </Button>
              </div>

              <div className="grid gap-4">
                {getAllRoles().map((role) => (
                  <Card key={role.id} className="bg-zinc-800 border-zinc-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-4 h-4 rounded-full ${role.color}`}></div>
                            <h4 className="text-lg font-medium text-white">{role.name}</h4>
                            {role.id.startsWith('custom_') && (
                              <Badge variant="outline" className="text-blue-400 border-blue-400">
                                Personalizado
                              </Badge>
                            )}
                          </div>
                          <p className="text-zinc-400 text-sm mb-3">{role.description}</p>
                          <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span>Nível: {role.level}</span>
                            <span>Permissões: {role.permissions.length}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditRole(role)}
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                          >
                            <FiEdit size={14} />
                          </Button>
                          {role.id.startsWith('custom_') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteRole(role.id)}
                              className="border-red-600 text-red-400 hover:bg-red-900/20"
                            >
                              🗑️
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsManageRolesDialogOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Adicionar Cargo */}
        <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Criar Novo Cargo</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Defina as informações e permissões do novo cargo administrativo
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Informações Básicas do Cargo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações do Cargo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roleName">Nome do Cargo *</Label>
                    <Input
                      id="roleName"
                      value={newRoleData.name}
                      onChange={(e) => setNewRoleData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-zinc-800 border-zinc-600 text-white"
                      placeholder="Ex: Gerente de Marketing"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roleLevel">Nível Hierárquico</Label>
                    <Select value={newRoleData.level.toString()} onValueChange={(value) => setNewRoleData(prev => ({ ...prev, level: parseInt(value) }))}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Executivo (CEO/Diretor)</SelectItem>
                        <SelectItem value="2">2 - Gerente Geral</SelectItem>
                        <SelectItem value="3">3 - Gerente/Coordenador</SelectItem>
                        <SelectItem value="4">4 - Analista/Especialista</SelectItem>
                        <SelectItem value="5">5 - Assistente/Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="roleDescription">Descrição</Label>
                  <textarea
                    id="roleDescription"
                    value={newRoleData.description}
                    onChange={(e) => setNewRoleData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white resize-none"
                    rows={3}
                    placeholder="Descreva as responsabilidades deste cargo..."
                  />
                </div>
                <div>
                  <Label htmlFor="roleColor">Cor do Cargo</Label>
                  <Select value={newRoleData.color} onValueChange={(value) => setNewRoleData(prev => ({ ...prev, color: value }))}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-red-500">🔴 Vermelho</SelectItem>
                      <SelectItem value="bg-orange-500">🟠 Laranja</SelectItem>
                      <SelectItem value="bg-yellow-500">🟡 Amarelo</SelectItem>
                      <SelectItem value="bg-green-500">🟢 Verde</SelectItem>
                      <SelectItem value="bg-blue-500">🔵 Azul</SelectItem>
                      <SelectItem value="bg-purple-500">🟣 Roxo</SelectItem>
                      <SelectItem value="bg-pink-500">🩷 Rosa</SelectItem>
                      <SelectItem value="bg-gray-500">⚫ Cinza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sistema de Permissões */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Permissões do Cargo</h3>
                <div className="max-h-60 overflow-y-auto bg-zinc-800 p-4 rounded-lg">
                  {['courses', 'users', 'content', 'financial', 'system'].map(category => {
                    const categoryPermissions = getPermissionsByCategory(category);
                    return (
                      <div key={category} className="mb-4">
                        <h4 className="text-sm font-medium text-white capitalize mb-2 flex items-center gap-2">
                          {category === 'courses' && <FiUser className="text-blue-400" size={14} />}
                          {category === 'users' && <FiUsers className="text-green-400" size={14} />}
                          {category === 'content' && <FiEdit className="text-purple-400" size={14} />}
                          {category === 'financial' && <FiCheck className="text-yellow-400" size={14} />}
                          {category === 'system' && <FiSettings className="text-red-400" size={14} />}
                          {category === 'courses' ? 'Cursos' :
                           category === 'users' ? 'Usuários' :
                           category === 'content' ? 'Conteúdo' :
                           category === 'financial' ? 'Financeiro' : 'Sistema'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 ml-4">
                          {categoryPermissions.map(permission => (
                            <div key={permission.id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`new-perm-${permission.id}`}
                                checked={newRoleData.permissions.includes(permission.id)}
                                onChange={() => handleRolePermissionToggle(permission.id)}
                                className="rounded bg-zinc-600 border-zinc-500"
                              />
                              <label htmlFor={`new-perm-${permission.id}`} className="text-xs text-zinc-300 cursor-pointer">
                                {permission.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-zinc-400">
                  Permissões selecionadas: {newRoleData.permissions.length}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNewRole} className="bg-green-600 hover:bg-green-700">
                Criar Cargo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Editar Cargo */}
        <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Editar Cargo</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Modifique as informações e permissões do cargo selecionado
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Informações Básicas do Cargo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações do Cargo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editRoleName">Nome do Cargo *</Label>
                    <Input
                      id="editRoleName"
                      value={newRoleData.name}
                      onChange={(e) => setNewRoleData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-zinc-800 border-zinc-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editRoleLevel">Nível Hierárquico</Label>
                    <Select value={newRoleData.level.toString()} onValueChange={(value) => setNewRoleData(prev => ({ ...prev, level: parseInt(value) }))}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Executivo (CEO/Diretor)</SelectItem>
                        <SelectItem value="2">2 - Gerente Geral</SelectItem>
                        <SelectItem value="3">3 - Gerente/Coordenador</SelectItem>
                        <SelectItem value="4">4 - Analista/Especialista</SelectItem>
                        <SelectItem value="5">5 - Assistente/Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="editRoleDescription">Descrição</Label>
                  <textarea
                    id="editRoleDescription"
                    value={newRoleData.description}
                    onChange={(e) => setNewRoleData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="editRoleColor">Cor do Cargo</Label>
                  <Select value={newRoleData.color} onValueChange={(value) => setNewRoleData(prev => ({ ...prev, color: value }))}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-red-500">🔴 Vermelho</SelectItem>
                      <SelectItem value="bg-orange-500">🟠 Laranja</SelectItem>
                      <SelectItem value="bg-yellow-500">🟡 Amarelo</SelectItem>
                      <SelectItem value="bg-green-500">🟢 Verde</SelectItem>
                      <SelectItem value="bg-blue-500">🔵 Azul</SelectItem>
                      <SelectItem value="bg-purple-500">🟣 Roxo</SelectItem>
                      <SelectItem value="bg-pink-500">🩷 Rosa</SelectItem>
                      <SelectItem value="bg-gray-500">⚫ Cinza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sistema de Permissões */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Permissões do Cargo</h3>
                <div className="max-h-60 overflow-y-auto bg-zinc-800 p-4 rounded-lg">
                  {['courses', 'users', 'content', 'financial', 'system'].map(category => {
                    const categoryPermissions = getPermissionsByCategory(category);
                    return (
                      <div key={category} className="mb-4">
                        <h4 className="text-sm font-medium text-white capitalize mb-2 flex items-center gap-2">
                          {category === 'courses' && <FiUser className="text-blue-400" size={14} />}
                          {category === 'users' && <FiUsers className="text-green-400" size={14} />}
                          {category === 'content' && <FiEdit className="text-purple-400" size={14} />}
                          {category === 'financial' && <FiCheck className="text-yellow-400" size={14} />}
                          {category === 'system' && <FiSettings className="text-red-400" size={14} />}
                          {category === 'courses' ? 'Cursos' :
                           category === 'users' ? 'Usuários' :
                           category === 'content' ? 'Conteúdo' :
                           category === 'financial' ? 'Financeiro' : 'Sistema'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 ml-4">
                          {categoryPermissions.map(permission => (
                            <div key={permission.id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`edit-perm-${permission.id}`}
                                checked={newRoleData.permissions.includes(permission.id)}
                                onChange={() => handleRolePermissionToggle(permission.id)}
                                className="rounded bg-zinc-600 border-zinc-500"
                              />
                              <label htmlFor={`edit-perm-${permission.id}`} className="text-xs text-zinc-300 cursor-pointer">
                                {permission.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-zinc-400">
                  Permissões selecionadas: {newRoleData.permissions.length}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveRoleChanges} className="bg-blue-600 hover:bg-blue-700">
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
} 