import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventDetailComponent from '@/components/events/EventDetail';

// Mock data para eventos específicos
const eventsData: { [key: string]: any } = {
  '1': {
    id: 1,
    title: 'Seminário de Direito Empresarial',
    description: 'Discussões avançadas sobre os desafios jurídicos enfrentados pelas empresas no cenário atual.',
    longDescription: 'Este seminário aborda as principais tendências e desafios do Direito Empresarial no cenário contemporâneo. Profissionais renomados compartilharão suas experiências e conhecimentos sobre temas atuais como compliance, governança corporativa, sustentabilidade empresarial e inovação jurídica. O evento oferece uma oportunidade única de networking e atualização profissional para advogados e empresários.',
    date: '15 de Junho, 2025',
    time: '19:00 - 21:00',
    location: 'São Paulo, SP',
    address: 'Auditório Central da OAB/SP - Rua Boa Vista, 94 - Centro, São Paulo',
    isOnline: false,
    category: 'empresarial',
    price: 150.00,
    isFree: false,
    maxParticipants: 200,
    currentRegistrations: 142,
    speaker: {
      name: 'Dra. Juliana Mendes',
      role: 'Advogada Tributarista',
      bio: 'Dra. Juliana Mendes é advogada especialista em Direito Tributário e Empresarial com mais de 12 anos de experiência. É sócia do escritório Mendes & Associados e mestre em Direito Tributário pela PUC-SP. Atua como consultora para grandes corporações e é palestrante frequente em eventos do setor.',
      initials: 'JM',
      image: '/lovable-uploads/team/instructor.png'
    },
    agenda: [
      {
        time: '19:00 - 19:15',
        activity: 'Credenciamento e networking'
      },
      {
        time: '19:15 - 19:30',
        activity: 'Abertura do evento'
      },
      {
        time: '19:30 - 20:30',
        activity: 'Palestra principal: "Compliance e Responsabilidade Empresarial"'
      },
      {
        time: '20:30 - 21:00',
        activity: 'Mesa redonda e perguntas do público'
      }
    ],
    topics: [
      'Compliance e Governança Corporativa',
      'Responsabilidade Civil Empresarial',
      'Sustentabilidade e ESG no Direito',
      'Inovação e Transformação Digital',
      'Gestão de Riscos Jurídicos',
      'Contratos Empresariais Modernos'
    ],
    certificate: true,
    caaP: false,
    organizedBy: {
      name: 'EJUP - Escola Jurídica para Profissionais',
      logo: '/lovable-uploads/e5e6ce5d-0718-4a69-892b-3f9d0d68a7a1.png'
    },
    image: '/lovable-uploads/events/seminario-empresarial.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  '2': {
    id: 2,
    title: 'Workshop de Contratos Inteligentes',
    description: 'Aprenda sobre a aplicação de blockchain e smart contracts no universo jurídico.',
    longDescription: 'Workshop prático sobre a implementação de contratos inteligentes (smart contracts) na prática jurídica. Os participantes aprenderão os fundamentos da tecnologia blockchain, como criar e validar smart contracts, e suas aplicações práticas no Direito. Inclui exercícios hands-on e estudos de caso reais.',
    date: '22 de Junho, 2025',
    time: '14:00 - 18:00',
    location: 'Online',
    address: 'Plataforma Zoom (link enviado por email)',
    isOnline: true,
    category: 'digital',
    price: 120.00,
    isFree: false,
    maxParticipants: 100,
    currentRegistrations: 67,
    speaker: {
      name: 'Dr. Marcos Oliveira',
      role: 'Especialista em Direito Digital',
      bio: 'Dr. Marcos Oliveira é pioneiro em Direito Digital no Brasil, com especialização em blockchain e criptomoedas. É professor de pós-graduação e consultor de empresas de tecnologia. Autor de diversos artigos sobre o tema e palestrante internacional.',
      initials: 'MO',
      image: '/lovable-uploads/team/depoente 1.png'
    },
    agenda: [
      {
        time: '14:00 - 14:30',
        activity: 'Introdução ao Blockchain e Smart Contracts'
      },
      {
        time: '14:30 - 15:30',
        activity: 'Fundamentos Técnicos e Jurídicos'
      },
      {
        time: '15:30 - 15:45',
        activity: 'Intervalo'
      },
      {
        time: '15:45 - 17:00',
        activity: 'Workshop Prático: Criando um Smart Contract'
      },
      {
        time: '17:00 - 18:00',
        activity: 'Casos de Uso e Q&A'
      }
    ],
    topics: [
      'Fundamentos do Blockchain',
      'Smart Contracts na Prática',
      'Aspectos Jurídicos da Tecnologia',
      'Casos de Uso Reais',
      'Regulamentação e Compliance',
      'Futuro dos Contratos Digitais'
    ],
    certificate: true,
    caaP: true,
    organizedBy: {
      name: 'EJUP - Escola Jurídica para Profissionais',
      logo: '/lovable-uploads/e5e6ce5d-0718-4a69-892b-3f9d0d68a7a1.png'
    },
    image: '/lovable-uploads/events/workshop-contratos.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  '4': {
    id: 4,
    title: 'Webinar: Atualidades em Direito do Trabalho',
    description: 'Discussão sobre recentes decisões dos tribunais superiores e seus impactos na prática trabalhista.',
    longDescription: 'Webinar gratuito sobre as mais recentes decisões dos tribunais superiores em matéria trabalhista e seus impactos na prática jurídica. O evento abordará mudanças legislativas, precedentes importantes e orientações práticas para profissionais da área.',
    date: '5 de Junho, 2025',
    time: '19:00 - 20:30',
    location: 'Online',
    address: 'Plataforma YouTube Live (link disponível no site)',
    isOnline: true,
    category: 'trabalhista',
    price: 0,
    isFree: true,
    maxParticipants: 1000,
    currentRegistrations: 423,
    speaker: {
      name: 'Dr. Roberto Gomes',
      role: 'Juiz do Trabalho',
      bio: 'Dr. Roberto Gomes é Juiz do Trabalho do TRT da 2ª Região com mais de 18 anos de magistratura. Especialista em Direito do Trabalho e Processo do Trabalho, é autor de diversos livros e artigos sobre a matéria. Professor de pós-graduação e palestrante renomado.',
      initials: 'RG',
      image: '/lovable-uploads/team/depoente 2.png'
    },
    agenda: [
      {
        time: '19:00 - 19:10',
        activity: 'Abertura e apresentação'
      },
      {
        time: '19:10 - 19:50',
        activity: 'Principais decisões do TST em 2025'
      },
      {
        time: '19:50 - 20:20',
        activity: 'Impactos práticos e orientações'
      },
      {
        time: '20:20 - 20:30',
        activity: 'Perguntas e encerramento'
      }
    ],
    topics: [
      'Decisões Recentes do TST',
      'Reforma Trabalhista - Atualizações',
      'Teletrabalho e Home Office',
      'Terceirização de Atividades',
      'Equiparação Salarial',
      'Responsabilidade Subsidiária'
    ],
    certificate: false,
    caaP: false,
    organizedBy: {
      name: 'EJUP - Escola Jurídica para Profissionais',
      logo: '/lovable-uploads/e5e6ce5d-0718-4a69-892b-3f9d0d68a7a1.png'
    },
    image: '/lovable-uploads/events/webinar-trabalho.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Buscar dados do evento baseado no ID
  const eventData = id ? eventsData[id] : null;
  
  if (!eventData) {
    return (
      <div className="min-h-screen bg-ejup-darkBg">
        <Navbar />
        <main className="pt-20">
          <div className="ejup-container py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Evento não encontrado</h1>
              <p className="text-zinc-400">O evento que você está procurando não existe ou foi removido.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <EventDetailComponent {...eventData} />
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail; 