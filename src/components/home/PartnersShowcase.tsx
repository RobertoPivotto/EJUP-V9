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
    <section className="bg-ejup-darkBg py-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-ejup-pink/10 via-ejup-cyan/5 to-ejup-orange/5 opacity-30 blur-3xl"></div>
      </div>
      
      <div className="ejup-container relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">QUEM CONFIA EM NÓS</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Parcerias com as principais instituições jurídicas do Brasil para oferecer conteúdo de qualidade e atualizado</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-10">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className="relative group cursor-pointer"
            >
              {/* Sombra com gradiente colorido - Efeito bem sutil */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-ejup-pink via-ejup-cyan to-ejup-orange opacity-0 group-hover:opacity-15 blur-sm transition-all duration-300"></div>
              
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
