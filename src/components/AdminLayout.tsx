import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import {
  FiHome,
  FiBook,
  FiFileText,
  FiUsers,
  FiLogOut,
  FiBell,
  FiSearch,
} from "react-icons/fi";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Nome do usuário admin (em uma aplicação real, viria de um contexto ou API)
  const adminName = localStorage.getItem('adminUser') || 'Admin';
  const adminInitials = adminName.split(' ').map(name => name[0]).join('').toUpperCase();

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <FiHome size={20} />,
      href: "/admin/dashboard",
    },
    {
      label: "Cursos",
      icon: <FiBook size={20} />,
      href: "/admin/courses",
    },
    {
      label: "Conteúdo",
      icon: <FiFileText size={20} />,
      href: "/admin/articles",
    },
    {
      label: "Usuários",
      icon: <FiUsers size={20} />,
      href: "/admin/users",
    },
  ];

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 fixed h-full z-10 md:relative">
        <div className="flex flex-col h-full">
          {/* Header com Logo - Aumentado para h-28 */}
          <div className="flex items-center justify-center h-28 px-4 border-b border-zinc-800">
            <Logo className="h-12" />
          </div>

          {/* Navegação */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-3">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                        isActive
                          ? "bg-gradient-to-r from-ejup-cyan/20 to-transparent text-white border-l-2 border-ejup-cyan"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center mr-3", 
                        isActive ? "text-ejup-cyan" : ""
                      )}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Botão de Logout */}
          <div className="border-t border-zinc-800 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-800/70 text-zinc-400 hover:text-zinc-200"
            >
              <span className="flex items-center justify-center mr-3">
                <FiLogOut size={18} />
              </span>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto bg-zinc-900 md:ml-0">
        {/* Header Superior */}
        <div className="bg-zinc-900 shadow z-10 sticky top-0 border-b border-zinc-800">
          <div className="h-16 flex items-center px-6">
            {/* Barra de pesquisa */}
            <div className="hidden md:flex items-center bg-zinc-800/50 rounded-md border border-zinc-700/50 px-3 py-1.5 flex-1 max-w-md">
              <FiSearch className="text-zinc-400 mr-2" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="bg-transparent border-none outline-none text-zinc-300 text-sm w-full focus:ring-0"
              />
            </div>
            
            <div className="ml-auto flex items-center gap-4">
              {/* Botão de notificação */}
              <button className="relative p-2 text-zinc-400 hover:text-white">
                <FiBell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-ejup-orange rounded-full"></span>
              </button>
              
              {/* Avatar do usuário */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-ejup-cyan to-ejup-orange text-white flex items-center justify-center font-medium shadow-lg shadow-ejup-cyan/10">
                  {adminInitials}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{adminName}</p>
                  <p className="text-xs text-zinc-400">Administrador</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo da página */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}