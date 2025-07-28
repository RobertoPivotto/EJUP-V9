export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  status: 'active' | 'inactive';
}

export const mockSponsors: Sponsor[] = [
  {
    id: 1,
    name: 'OAB Brasil',
    logo: '/lovable-uploads/logos/oab-brasil.png',
    website: 'https://oab.org.br',
    description: 'Ordem dos Advogados do Brasil',
    status: 'active'
  },
  {
    id: 2,
    name: 'OAB SC',
    logo: '/lovable-uploads/logos/oab-sc.png',
    website: 'https://oabsc.org.br',
    description: 'Ordem dos Advogados do Brasil - Santa Catarina',
    status: 'active'
  },
  {
    id: 3,
    name: 'STJ',
    logo: '/lovable-uploads/logos/stj.png',
    website: 'https://stj.jus.br',
    description: 'Superior Tribunal de Justiça',
    status: 'active'
  },
  {
    id: 4,
    name: 'AGU',
    logo: '/lovable-uploads/logos/agu.png',
    website: 'https://agu.gov.br',
    description: 'Advocacia-Geral da União',
    status: 'active'
  },
  {
    id: 5,
    name: 'MPF',
    logo: '/lovable-uploads/logos/mpf.png',
    website: 'https://mpf.mp.br',
    description: 'Ministério Público Federal',
    status: 'active'
  },
  {
    id: 6,
    name: 'TST',
    logo: '/lovable-uploads/logos/tst.png',
    website: 'https://tst.jus.br',
    description: 'Tribunal Superior do Trabalho',
    status: 'inactive'
  }
]; 