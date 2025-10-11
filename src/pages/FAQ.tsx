import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const categories = [
    { id: 'geral', title: 'Informações Gerais' },
    { id: 'cursos', title: 'Cursos e Conteúdos' },
    { id: 'pagamentos', title: 'Pagamentos' },
    { id: 'plataforma', title: 'Uso da Plataforma' },
    { id: 'publicacao', title: 'Publicação de Artigos' },
    { id: 'suporte', title: 'Suporte e Contato' },
  ];

  const faqs = [
    // Informações Gerais
    {
      category: 'geral',
      question: 'O que é a EJUP?',
      answer: 'A EJUP (Escola Jurídica para Profissionais) é uma plataforma educacional especializada em capacitação jurídica, oferecendo cursos online, eventos, conteúdos exclusivos e materiais de apoio para profissionais do direito e áreas correlatas.'
    },
    {
      category: 'geral',
      question: 'Quem pode se inscrever na EJUP?',
      answer: 'A EJUP é destinada a advogados, estudantes de direito, profissionais de áreas correlatas, gestores, empresários e qualquer pessoa interessada em conhecimento jurídico aplicado ao mercado profissional.'
    },
    {
      category: 'geral',
      question: 'Como faço para criar uma conta?',
      answer: 'Para criar sua conta, clique em "Login" no menu superior, depois em "Criar conta". Preencha seus dados pessoais e profissionais. Você receberá um e-mail de confirmação para ativar sua conta.'
    },


    // Cursos e Conteúdos
    {
      category: 'cursos',
      question: 'Quais tipos de cursos vocês oferecem?',
      answer: 'Oferecemos cursos em diversas modalidades: cursos online gravados, aulas ao vivo, eventos presenciais e híbridos, além de conteúdos exclusivos como artigos e podcasts.'
    },
    {
      category: 'cursos',
      question: 'Por quanto tempo tenho acesso aos cursos?',
      answer: 'Todos os cursos ficam disponíveis por até 12 meses após a compra, permitindo que você estude no seu próprio ritmo e revise o conteúdo quantas vezes precisar durante esse período.'
    },
    {
      category: 'cursos',
      question: 'Posso assistir os cursos pelo celular?',
      answer: 'Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em computadores, tablets e smartphones. Você pode estudar onde e quando quiser.'
    },
    {
      category: 'cursos',
      question: 'Os cursos têm prazo para conclusão?',
      answer: 'A maioria dos cursos permite que você estude no seu próprio ritmo, sem prazo fixo para conclusão. Alguns programas específicos podem ter cronogramas definidos, que serão informados na descrição do curso.'
    },
    {
      category: 'cursos',
      question: 'Posso baixar as aulas para assistir offline?',
      answer: 'Atualmente, nossas aulas são disponibilizadas apenas para visualização online através da plataforma, garantindo a segurança do conteúdo e atualizações constantes.'
    },

    // Pagamentos
    {
      category: 'pagamentos',
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo), cartões de débito, PIX e boleto bancário. Escolha a forma de pagamento que for mais conveniente para você.'
    },

    {
      category: 'pagamentos',
      question: 'Vocês oferecem reembolso?',
      answer: 'Sim, seguimos a legislação do Código de Defesa do Consumidor. Para compras online, você tem 7 dias para desistência. Consulte nossos Termos de Uso para condições específicas.'
    },


    // Uso da Plataforma
    {
      category: 'plataforma',
      question: 'Esqueci minha senha, como recuperar?',
      answer: 'Na tela de login, clique em "Esqueci minha senha" e informe seu e-mail cadastrado. Você receberá instruções para criar uma nova senha.'
    },
    {
      category: 'plataforma',
      question: 'Posso alterar meus dados cadastrais?',
      answer: 'Sim, você pode atualizar seus dados a qualquer momento acessando "Configurações da Conta" no menu do usuário após fazer login.'
    },
    {
      category: 'plataforma',
      question: 'Como acompanho meu progresso nos cursos?',
      answer: 'Na área "Meus Cursos", você pode visualizar o progresso de cada curso, aulas assistidas, certificados obtidos e próximas atividades.'
    },
    {
      category: 'plataforma',
      question: 'A plataforma funciona em todos os navegadores?',
      answer: 'Sim, nossa plataforma é compatível com os principais navegadores: Chrome, Firefox, Safari e Edge. Recomendamos manter seu navegador sempre atualizado.'
    },
    {
      category: 'plataforma',
      question: 'Posso usar minha conta em vários dispositivos?',
      answer: 'Sim, você pode acessar sua conta em múltiplos dispositivos. Porém, não é permitido compartilhar credenciais com terceiros, conforme nossos Termos de Uso.'
    },

    // Publicação de Artigos
    {
      category: 'publicacao',
      question: 'Posso publicar artigos na plataforma?',
      answer: 'Sim! A EJUP permite que alunos e profissionais submetam artigos para avaliação. Todo conteúdo passa por análise de qualidade antes da publicação, garantindo relevância e excelência técnica.'
    },
    {
      category: 'publicacao',
      question: 'Como submeter um artigo para publicação?',
      answer: 'Acesse a área "Publicar Artigo" em sua conta, preencha as informações solicitadas e envie seu texto. Nossa equipe editorial analisará o conteúdo e retornará em até 10 dias úteis.'
    },
    {
      category: 'publicacao',
      question: 'Quais são os critérios para aprovação de artigos?',
      answer: 'Avaliamos originalidade, relevância técnica, qualidade da escrita, citações adequadas e conformidade com diretrizes editoriais. O artigo deve agregar valor aos profissionais da área jurídica.'
    },
    {
      category: 'publicacao',
      question: 'Há remuneração pela publicação de artigos?',
      answer: 'A publicação na EJUP é uma oportunidade de visibilidade profissional e contribuição para a comunidade jurídica. Atualmente não oferecemos remuneração financeira, mas o autor recebe créditos e reconhecimento.'
    },
    {
      category: 'publicacao',
      question: 'Posso editar meu artigo após a publicação?',
      answer: 'Pequenas correções podem ser solicitadas à equipe editorial. Alterações substanciais requerem nova submissão e análise. Entre em contato conosco para casos específicos.'
    },
    {
      category: 'publicacao',
      question: 'Mantenho os direitos autorais do meu artigo?',
      answer: 'Sim, você mantém os direitos autorais. A EJUP recebe apenas licença para publicação e divulgação na plataforma e canais oficiais, sempre com devido crédito ao autor.'
    },

    // Suporte e Contato
    {
      category: 'suporte',
      question: 'Como entro em contato com o suporte?',
      answer: 'Você pode nos contatar via WhatsApp +55 (85) 99927-1405 (Segunda a sexta: 08h às 20h, Sábado e domingo: 08h às 16h) ou por e-mail: atendimento@ejup.com.br.'
    },
    {
      category: 'suporte',
      question: 'Qual o tempo de resposta do suporte?',
      answer: 'Via WhatsApp, respondemos em tempo real durante o horário de atendimento. Por e-mail, nosso prazo de resposta é de até 24 horas em dias úteis.'
    },
    {
      category: 'suporte',
      question: 'Têm suporte técnico para problemas na plataforma?',
      answer: 'Sim, nossa equipe técnica está preparada para ajudar com questões de acesso, reprodução de vídeos, downloads e qualquer dificuldade técnica na plataforma.'
    },
    {
      category: 'suporte',
      question: 'Como sugiro melhorias ou novos cursos?',
      answer: 'Adoramos receber sugestões! Entre em contato pelo e-mail atendimento@ejup.com.br ou WhatsApp. Sua opinião é fundamental para aprimorarmos nossos serviços.'
    },
    {
      category: 'suporte',
      question: 'Vocês oferecem treinamentos para empresas?',
      answer: 'Sim! Oferecemos programas corporativos personalizados para empresas e escritórios. Entre em contato para discutir suas necessidades específicas e receber uma proposta customizada.'
    }
  ];

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(q => q !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="ejup-container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Índice de Categorias */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-gray-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-700/50 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Categorias</h2>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`#${category.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToCategory(category.id);
                        }}
                        className="text-zinc-400 hover:text-ejup-orange transition-colors text-sm block"
                      >
                        {category.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:w-3/4">
              <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-700/50 p-8">
                <h1 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h1>
                <p className="text-zinc-400 mb-8">
                  Encontre respostas para as principais dúvidas sobre a plataforma EJUP, nossos cursos e serviços.
                </p>

                {/* FAQ por Categorias */}
                {categories.map((category) => (
                  <section key={category.id} id={category.id} className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-300 dark:border-zinc-700 pb-2">
                      {category.title}
                    </h2>
                    
                    <div className="space-y-4">
                      {faqs
                        .filter(faq => faq.category === category.id)
                        .map((faq, index) => {
                          const globalIndex = faqs.findIndex(f => f === faq);
                          const isOpen = openQuestions.includes(globalIndex);
                          
                          return (
                            <div
                              key={globalIndex}
                              className="bg-zinc-900/50 rounded-lg border border-zinc-700/50 overflow-hidden"
                            >
                              <button
                                onClick={() => toggleQuestion(globalIndex)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                              >
                                <h3 className="text-lg font-medium text-white">
                                  {faq.question}
                                </h3>
                                {isOpen ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-zinc-400 flex-shrink-0 ml-2" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-zinc-400 flex-shrink-0 ml-2" />
                                )}
                              </button>
                              
                              {isOpen && (
                                <div className="px-6 pb-4">
                                  <div className="pt-2 border-t border-zinc-700/50">
                                    <p className="text-zinc-300 leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </section>
                ))}

                {/* Seção de Contato */}
                <section className="mt-12 pt-8 border-t border-gray-300 dark:border-zinc-700">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Não encontrou sua resposta?
                  </h2>
                  <p className="text-zinc-300 mb-6">
                    Nossa equipe está sempre pronta para ajudar! Entre em contato conosco:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-zinc-900/50 rounded-lg border border-zinc-700/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        WhatsApp
                      </h3>
                      <p className="text-zinc-400 text-sm mb-2">
                        Segunda a sexta - 08h às 20h<br />
                        Sábado e domingo - 08h às 16h
                      </p>
                      <a 
                        href="https://wa.me/5585999271405" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d3ccb2] hover:text-[#d3ccb2]/80 font-medium"
                      >
                        +55 (85) 99927-1405
                      </a>
                    </div>
                    
                    <div className="bg-zinc-900/50 rounded-lg border border-zinc-700/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        E-mail
                      </h3>
                      <p className="text-zinc-400 text-sm mb-2">
                        Resposta em até 24h
                      </p>
                      <a 
                        href="mailto:atendimento@ejup.com.br" 
                        className="text-[#d3ccb2] hover:text-[#d3ccb2]/80 font-medium"
                      >
                        atendimento@ejup.com.br
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
