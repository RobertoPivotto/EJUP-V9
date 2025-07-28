import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import InternalHeader from '@/components/layout/InternalHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WriteArticle = () => {
  // Estado para controlar se o usuário concordou com as diretrizes
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);
  const [activeTab, setActiveTab] = useState('guidelines');
  
  // Estados para os campos do formulário
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [references, setReferences] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorLinkedin, setAuthorLinkedin] = useState('');
  const [authorWebsite, setAuthorWebsite] = useState('');
  const [authorOAB, setAuthorOAB] = useState('');
  const [authorSpecialty, setAuthorSpecialty] = useState('');
  
  // Estado para contagem de palavras
  const [wordCount, setWordCount] = useState(0);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setWordCount(value.split(/\s+/).filter(Boolean).length);
  };
  
  const handleAgreement = () => {
    setAgreedToGuidelines(true);
    setActiveTab('write');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui ficaria a lógica para enviar o artigo para aprovação
    alert("Artigo enviado para aprovação com sucesso!");
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <InternalHeader />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Escrever Artigo</h1>
            <p className="text-zinc-400">
              Compartilhe seu conhecimento jurídico com a comunidade
            </p>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              // Só permite mudar para a aba "write" se o usuário já concordou com as diretrizes
              if (value === 'write' && !agreedToGuidelines) {
                return;
              }
              setActiveTab(value);
            }} 
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guidelines">Diretrizes</TabsTrigger>
              <TabsTrigger value="write" className={!agreedToGuidelines ? "opacity-50 cursor-not-allowed" : ""}>
                Escrever Artigo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="guidelines" className="mt-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <InfoIcon className="h-5 w-5 text-ejup-cyan" />
                    Diretrizes para Publicação de Artigos
                  </CardTitle>
                  <CardDescription>
                    Antes de submeter seu artigo, leia com atenção as normas e diretrizes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert variant="default" className="bg-zinc-800/50 border-ejup-cyan/50">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Formato e Estrutura</AlertTitle>
                    <AlertDescription className="text-sm">
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>O artigo deve ter entre 800 e 2.500 palavras</li>
                        <li>Use parágrafos curtos e subtítulos para melhorar a legibilidade</li>
                        <li>Inclua uma introdução clara e uma conclusão objetiva</li>
                        <li>Recomenda-se o uso de linguagem clara e acessível</li>
                        <li>Prefira frases na voz ativa e evite jargões excessivos</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert variant="destructive" className="bg-red-950/20 border-red-800/50 text-white">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Responsabilidade e Direitos Autorais</AlertTitle>
                    <AlertDescription className="text-sm text-white">
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Os artigos devem ser originais e de sua própria autoria</li>
                        <li>A responsabilidade pelo conteúdo é exclusivamente do autor</li>
                        <li>Sempre cite as fontes utilizadas e respeite os direitos autorais</li>
                        <li>O plágio resultará em rejeição imediata e possíveis sanções</li>
                        <li>Ao submeter, você concede à EJUP direito não-exclusivo de publicação</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="bg-zinc-800/50 border-zinc-700">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Processo de Revisão</AlertTitle>
                    <AlertDescription className="text-sm">
                      <p className="mt-2">
                        Todos os artigos passam por análise editorial e o envio não garante publicação automática. A EJUP se reserva o direito de selecionar o conteúdo de acordo com sua relevância, qualidade e adequação à nossa linha editorial. Você receberá uma notificação por email sobre o status da sua submissão.
                      </p>
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAgreement} className="bg-ejup-pink hover:bg-ejup-pink/90">
                    Entendi e quero escrever um artigo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="write" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Informações Básicas</CardTitle>
                    <CardDescription>
                      Otimize seu artigo para SEO com um título atraente e palavras-chave relevantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do Artigo <span className="text-ejup-pink">*</span></Label>
                      <Input
                        id="title"
                        placeholder="Ex: O Impacto da Lei Geral de Proteção de Dados no Setor Empresarial"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-zinc-800 border-zinc-700"
                        required
                      />
                      <p className="text-xs text-zinc-500">Entre 50-65 caracteres para otimização SEO</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtítulo</Label>
                      <Input
                        id="subtitle"
                        placeholder="Ex: Análise das mudanças e adaptações necessárias para empresas após a LGPD"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="keywords">Palavras-chave <span className="text-ejup-pink">*</span></Label>
                        <Input
                          id="keywords"
                          placeholder="Ex: LGPD, proteção de dados, direito digital, compliance"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                          required
                        />
                        <p className="text-xs text-zinc-500">5-7 palavras separadas por vírgula</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria <span className="text-ejup-pink">*</span></Label>
                        <Select required onValueChange={setCategory} value={category}>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direito-empresarial">Direito Empresarial</SelectItem>
                            <SelectItem value="direito-digital">Direito Digital</SelectItem>
                            <SelectItem value="direito-trabalhista">Direito Trabalhista</SelectItem>
                            <SelectItem value="direito-tributario">Direito Tributário</SelectItem>
                            <SelectItem value="processo-civil">Processo Civil</SelectItem>
                            <SelectItem value="resolucao-conflitos">Resolução de Conflitos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="featured-image">URL da Imagem Destacada</Label>
                      <Input
                        id="featured-image"
                        placeholder="https://example.com/image.jpg"
                        value={featuredImage}
                        onChange={(e) => setFeaturedImage(e.target.value)}
                        className="bg-zinc-800 border-zinc-700"
                      />
                      <p className="text-xs text-zinc-500">Use uma imagem de alta qualidade, livre de direitos autorais</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Conteúdo do Artigo</CardTitle>
                    <CardDescription>
                      Escreva seu artigo usando parágrafos curtos e subtítulos para organizar as ideias
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Corpo do Artigo <span className="text-ejup-pink">*</span></Label>
                      <Textarea
                        id="content"
                        placeholder="Redija o corpo do seu artigo com parágrafos bem estruturados. Use o formato Markdown para criar subtítulos (## Subtítulo) e listas."
                        value={content}
                        onChange={handleContentChange}
                        className="min-h-[300px] bg-zinc-800 border-zinc-700"
                        required
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-500">Suporte para formatação Markdown básica (##, *, -)</p>
                        <p className={`text-xs ${wordCount < 800 ? 'text-orange-400' : wordCount <= 2500 ? 'text-green-400' : 'text-red-400'}`}>
                          {wordCount} palavras (ideal: 800-2500)
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="conclusion">Conclusão <span className="text-ejup-pink">*</span></Label>
                      <Textarea
                        id="conclusion"
                        placeholder="Resuma os principais pontos abordados e apresente sua conclusão."
                        value={conclusion}
                        onChange={(e) => setConclusion(e.target.value)}
                        className="min-h-[100px] bg-zinc-800 border-zinc-700"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="references">Referências Bibliográficas</Label>
                      <Textarea
                        id="references"
                        placeholder="Liste as fontes e referências utilizadas no seu artigo."
                        value={references}
                        onChange={(e) => setReferences(e.target.value)}
                        className="min-h-[100px] bg-zinc-800 border-zinc-700"
                      />
                      <p className="text-xs text-zinc-500">Formato sugerido: SOBRENOME, Nome. Título da obra. Edição. Local: Editora, Ano.</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Informações do Autor</CardTitle>
                    <CardDescription>
                      Esses dados serão exibidos no artigo, contribuindo para sua visibilidade profissional
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="author-bio">Minicurrículo <span className="text-ejup-pink">*</span></Label>
                        <Textarea
                          id="author-bio"
                          placeholder="Descreva sua formação, atuação profissional e áreas de especialidade (máx. 500 caracteres)."
                          value={authorBio}
                          onChange={(e) => setAuthorBio(e.target.value)}
                          className="min-h-[100px] bg-zinc-800 border-zinc-700"
                          maxLength={500}
                          required
                        />
                        <p className="text-xs text-zinc-500">{authorBio.length}/500 caracteres</p>
                      </div>
                    
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author-linkedin">LinkedIn</Label>
                          <Input
                            id="author-linkedin"
                            placeholder="https://linkedin.com/in/seu-perfil"
                            value={authorLinkedin}
                            onChange={(e) => setAuthorLinkedin(e.target.value)}
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="author-website">Website/Blog</Label>
                          <Input
                            id="author-website"
                            placeholder="https://seusite.com.br"
                            value={authorWebsite}
                            onChange={(e) => setAuthorWebsite(e.target.value)}
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="border-t border-zinc-700 pt-6 mt-6">
                        <h3 className="text-lg font-medium mb-4">Informações Profissionais</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="author-oab">Número OAB</Label>
                              <Input
                                id="author-oab"
                                placeholder="Ex: 123456/UF"
                                value={authorOAB}
                                onChange={(e) => setAuthorOAB(e.target.value)}
                                className="bg-zinc-800 border-zinc-700"
                              />
                              <p className="text-xs text-zinc-500">Opcional, mas recomendado para advogados</p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="author-specialty">Especialidade Jurídica</Label>
                              <Select onValueChange={setAuthorSpecialty} value={authorSpecialty}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                  <SelectValue placeholder="Selecione sua especialidade principal" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="direito-empresarial">Direito Empresarial</SelectItem>
                                  <SelectItem value="direito-digital">Direito Digital</SelectItem>
                                  <SelectItem value="direito-trabalhista">Direito Trabalhista</SelectItem>
                                  <SelectItem value="direito-tributario">Direito Tributário</SelectItem>
                                  <SelectItem value="direito-civil">Direito Civil</SelectItem>
                                  <SelectItem value="propriedade-intelectual">Propriedade Intelectual</SelectItem>
                                  <SelectItem value="direito-consumidor">Direito do Consumidor</SelectItem>
                                  <SelectItem value="mediacao-arbitragem">Mediação e Arbitragem</SelectItem>
                                  <SelectItem value="direito-contratual">Direito Contratual</SelectItem>
                                  <SelectItem value="outros">Outros</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="bg-zinc-800/50 p-5 rounded-lg border border-zinc-700">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                              <CheckCircle2 className="text-ejup-cyan h-5 w-5" />
                              Benefícios de completar seu perfil
                            </h3>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-2 w-2 rounded-full bg-ejup-pink" />
                                <span className="text-sm">Maior credibilidade junto aos leitores</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-2 w-2 rounded-full bg-ejup-pink" />
                                <span className="text-sm">Aumento da sua visibilidade profissional</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-2 w-2 rounded-full bg-ejup-pink" />
                                <span className="text-sm">Maior chance de aprovação dos seus artigos</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-2 w-2 rounded-full bg-ejup-pink" />
                                <span className="text-sm">Possibilidade de ser convidado para eventos</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" className="bg-ejup-pink hover:bg-ejup-pink/90">
                      Enviar Artigo para Aprovação
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WriteArticle; 