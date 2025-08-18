import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  const sections = [
    { id: 'objeto', title: 'Objeto' },
    { id: 'aceitacao-termos', title: 'Aceitação dos Termos' },
    { id: 'cadastro-conta', title: 'Cadastro e Conta de Usuário' },
    { id: 'planos-pagamentos', title: 'Planos, Assinaturas e Pagamentos' },
    { id: 'uso-propriedade', title: 'Uso Permitido e Propriedade Intelectual' },
    { id: 'cancelamento-reembolso', title: 'Política de Cancelamento e Reembolso' },
    { id: 'protecao-dados', title: 'Proteção de Dados Pessoais (LGPD)' },
    { id: 'limitacao-responsabilidade', title: 'Limitação de Responsabilidade' },
    { id: 'modificacoes', title: 'Modificações' },
    { id: 'disposicoes-gerais', title: 'Disposições Gerais' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="ejup-container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Índice Remissivo */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-zinc-800/50 rounded-lg border border-zinc-700/50 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Índice</h2>
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(section.id);
                        }}
                        className="text-zinc-400 hover:text-ejup-orange transition-colors text-sm"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:w-3/4">
              <div className="bg-zinc-800/50 rounded-lg border border-zinc-700/50 p-8">
                <h1 className="text-3xl font-bold text-white mb-4">Termos de Uso</h1>
                <p className="text-zinc-400 mb-8">Atualizada em 15 de agosto de 2025.</p>

                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">
                    TERMO DE USO DA PLATAFORMA EJUP
                  </h2>

                  <section id="objeto" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      1. Objeto
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>1.1.</strong> O presente Termo de Uso ("Termo") estabelece as regras para acesso e utilização da plataforma EJUP, de titularidade de EJUP – Escola Jurídica para Profissionais, pessoa jurídica de direito privado, inscrita no CNPJ sob nº 55.555.555/0001-55, com sede em Avenida Engenheiro Roberto Freire, 1962, 26, Condomínio Seaway, Capim Macio, Natal – RN, CEP n.º 59.082-095, e regula a relação contratual entre a EJUP ("EJUP", "nós" ou "nossa") e os usuários ("Usuário" ou "você").
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>1.2.</strong> A EJUP oferece serviços educacionais digitais e presenciais, incluindo cursos, programas de assinatura, eventos, conteúdos gravados e ao vivo, materiais de apoio e funcionalidades interativas, voltados à capacitação de profissionais jurídicos e correlatos.
                    </p>
                  </section>

                  <section id="aceitacao-termos" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      2. Aceitação dos Termos
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>2.1.</strong> Ao acessar ou utilizar a plataforma EJUP, o Usuário declara que leu, compreendeu e concorda com todas as disposições deste Termo e da Política de Privacidade.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>2.2.</strong> Caso não concorde com quaisquer condições, o Usuário não deverá utilizar a plataforma.
                    </p>
                  </section>

                  <section id="cadastro-conta" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      3. Cadastro e Conta de Usuário
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>3.1.</strong> Para acessar determinados conteúdos ou serviços, será necessário criar uma conta na plataforma, fornecendo informações corretas, completas e atualizadas.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>3.2.</strong> O Usuário é o único responsável por manter a confidencialidade de seu login e senha, bem como por todas as atividades realizadas com sua conta.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>3.3.</strong> É vedado o compartilhamento de credenciais de acesso, salvo nos casos autorizados expressamente pela EJUP.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>3.4.</strong> A EJUP poderá suspender ou cancelar a conta de Usuários que descumprirem este Termo ou que utilizarem a plataforma para fins ilícitos ou contrários à boa-fé.
                    </p>
                  </section>

                  <section id="planos-pagamentos" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      4. Planos, Assinaturas e Pagamentos
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>4.1.</strong> A EJUP poderá disponibilizar serviços gratuitos e pagos, com valores, prazos e condições divulgados no momento da contratação.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>4.2.</strong> Ao contratar um plano ou curso, o Usuário autoriza as cobranças recorrentes ou únicas, conforme aplicável, e declara estar ciente das regras de cancelamento e reembolso.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>4.3.</strong> Eventuais promoções, cupons ou condições especiais terão validade apenas nas condições e prazos divulgados pela EJUP.
                    </p>
                  </section>

                  <section id="uso-propriedade" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      5. Uso Permitido e Propriedade Intelectual
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>5.1.</strong> Todo o conteúdo da plataforma EJUP – incluindo textos, vídeos, áudios, imagens, marcas, logotipos, layouts e softwares – é protegido por direitos autorais e demais direitos de propriedade intelectual, sendo de titularidade da EJUP ou de terceiros parceiros.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>5.2.</strong> O Usuário recebe licença limitada, não exclusiva, intransferível e revogável para acessar e utilizar o conteúdo exclusivamente para fins pessoais e não comerciais.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>5.3.</strong> É expressamente proibido:
                    </p>
                    <div className="ml-6 text-zinc-300 mb-4">
                      <p className="mb-2"><strong>a)</strong> Reproduzir, distribuir, transmitir, vender ou explorar comercialmente qualquer conteúdo da EJUP sem autorização prévia por escrito;</p>
                      <p className="mb-2"><strong>b)</strong> Gravar, copiar ou disponibilizar a terceiros conteúdos pagos da plataforma;</p>
                      <p className="mb-2"><strong>c)</strong> Utilizar a plataforma para práticas ilícitas, antiéticas ou que possam prejudicar a EJUP ou outros Usuários.</p>
                    </div>
                  </section>

                  <section id="cancelamento-reembolso" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      6. Política de Cancelamento e Reembolso
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>6.1.</strong> As condições de cancelamento e reembolso seguem a legislação aplicável, especialmente o Código de Defesa do Consumidor, e serão informadas no ato da contratação.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>6.2.</strong> Em cursos presenciais ou eventos, a ausência do participante na data marcada não gera direito a reagendamento ou reembolso, salvo disposição contratual diversa.
                    </p>
                  </section>

                  <section id="protecao-dados" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      7. Proteção de Dados Pessoais (LGPD)
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>7.1.</strong> A EJUP coleta, armazena e trata dados pessoais dos Usuários conforme descrito em sua Política de Privacidade, documento que integra este Termo.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>7.2.</strong> O Usuário declara estar ciente dos direitos previstos nos arts. 18 e seguintes da Lei nº 13.709/2018 (LGPD), podendo exercê-los mediante solicitação ao canal{' '}
                      <a href="mailto:atendimento@ejup.com.br" className="text-ejup-orange hover:text-ejup-orange/80">
                        atendimento@ejup.com.br
                      </a>.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>7.3.</strong> O tratamento de dados poderá incluir:
                    </p>
                    <div className="ml-6 text-zinc-300 mb-4">
                      <p className="mb-2"><strong>a)</strong> Dados cadastrais e de pagamento;</p>
                      <p className="mb-2"><strong>b)</strong> Registros de acesso e uso da plataforma;</p>
                      <p className="mb-2"><strong>c)</strong> Preferências e histórico de consumo de conteúdos.</p>
                    </div>
                    <p className="text-zinc-300 mb-4">
                      <strong>7.4.</strong> A EJUP adota medidas técnicas e organizacionais para proteger os dados contra acessos não autorizados, perdas ou vazamentos.
                    </p>
                  </section>

                  <section id="limitacao-responsabilidade" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      8. Limitação de Responsabilidade
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>8.1.</strong> A EJUP não garante que a plataforma funcionará ininterruptamente ou livre de erros, não se responsabilizando por indisponibilidades causadas por terceiros, caso fortuito ou força maior.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>8.2.</strong> A EJUP não se responsabiliza por decisões tomadas pelo Usuário com base nos conteúdos disponibilizados, que têm caráter educacional e não substituem consultoria ou assessoria jurídica personalizada.
                    </p>
                  </section>

                  <section id="modificacoes" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      9. Modificações
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>9.1.</strong> A EJUP poderá alterar este Termo a qualquer momento, mediante publicação da nova versão na plataforma.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>9.2.</strong> O uso contínuo da plataforma após a atualização implica aceitação das novas condições.
                    </p>
                  </section>

                  <section id="disposicoes-gerais" className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2">
                      10. Disposições Gerais
                    </h2>
                    <p className="text-zinc-300 mb-4">
                      <strong>10.1.</strong> Este Termo é regido pelas leis da República Federativa do Brasil.
                    </p>
                    <p className="text-zinc-300 mb-4">
                      <strong>10.2.</strong> Fica eleito o foro da Comarca de Natal/RN para dirimir quaisquer controvérsias oriundas deste Termo, com renúncia a qualquer outro, por mais privilegiado que seja.
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-zinc-700">
                      <p className="text-zinc-300 mb-4">
                        Para dúvidas sobre estes Termos de Uso ou questões relacionadas ao uso da plataforma, entre em contato conosco:
                      </p>
                      <div className="space-y-2">
                        <p className="text-zinc-300">
                          <strong>E-mail:</strong>{' '}
                          <a href="mailto:atendimento@ejup.com.br" className="text-ejup-orange hover:text-ejup-orange/80">
                            atendimento@ejup.com.br
                          </a>
                        </p>
                        <p className="text-zinc-300">
                          <strong>Responsável:</strong> Roberto Pivotto Nicodemo
                        </p>
                        <p className="text-zinc-300 text-sm">
                          <strong>Endereço:</strong> Avenida Engenheiro Roberto Freire, 1962, 26, Condomínio Seaway,
                          Capim Macio, Natal – RN, CEP n.º 59.082-095
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
