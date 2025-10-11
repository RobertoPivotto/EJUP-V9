const partners = [
  {
    id: 1,
    name: "OAB Brasil",
    category: "Fornecedor de Conteúdo",
    logo: "/lovable-uploads/logos/oab-brasil.png"
  },
  {
    id: 2,
    name: "CAAPR",
    category: "Apoiador",
    logo: "/lovable-uploads/logos/caapr.png"
  },
  {
    id: 3,
    name: "OAB Santa Catarina",
    category: "Promotor",
    logo: "/lovable-uploads/logos/oab-sc.png"
  },
  {
    id: 4,
    name: "STJ",
    category: "Fornecedor de Conteúdo",
    logo: "/lovable-uploads/logos/stj.png"
  }
];

const PartnersShowcase = () => {
  return (
    <section className="relative mt-[-2rem] pt-20 pb-16">
      {/* Efeitos de iluminação com destaque na área de parceiros */}
      <div className="absolute top-[8%] right-[-10%] w-[55%] h-[40%] bg-[#29D6E6]/9 blur-[170px] rounded-full"></div>
      <div className="absolute bottom-[5%] left-[30%] w-[60%] h-[40%] bg-[#29D6E6]/8 blur-[160px] rounded-full"></div>
      <div className="absolute top-[40%] left-[10%] w-[70%] h-[50%] bg-[#29D6E6]/5 blur-[140px] rounded-full"></div>
      
      <div className="ejup-container relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f2ca7e]">QUEM CONFIA NA EJUP</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">Parcerias com as principais instituições jurídicas do Brasil para oferecer conteúdo de qualidade e atualizado</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-10">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className="relative group cursor-pointer"
            >
              {/* Sombra com gradiente colorido - Efeito bem sutil */}
              <div className="absolute -inset-1 rounded-xl bg-[#be9e77] opacity-0 group-hover:opacity-15 blur-sm transition-all duration-300"></div>
              
              {/* Card principal */}
              <div className="relative ejup-card hover:scale-[1.02] transition-all duration-300">
                <div className="bg-zinc-900/50 rounded-lg p-2 flex items-center justify-center h-36 w-36 overflow-hidden">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className={`w-auto max-w-32 object-contain grayscale-0 group-hover:scale-110 transition-transform duration-300 filter brightness-95 group-hover:brightness-105 ${
                      index === 2 ? 'h-40' : 'h-32'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersShowcase;
