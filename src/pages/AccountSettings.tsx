import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Bell, 
  Mail, 
  Lock, 
  UserCircle, 
  MapPin, 
  Shield,
  Trash2,
  Check
} from 'lucide-react';
import InternalHeader from '@/components/layout/InternalHeader';
import Footer from '@/components/layout/Footer';

const AccountSettings = () => {
  // Estados para cada formulário
  const [formData, setFormData] = useState({
    // Perfil
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    birthDate: '1990-05-15',
    
    // Endereço
    zipCode: '01310-100',
    address: 'Av. Paulista, 1578',
    city: 'São Paulo',
    state: 'SP',
    
    // Segurança
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    
    // Pagamento
    cardNumber: '**** **** **** 4567',
    cardHolder: 'João Silva',
    expiryDate: '12/27',
    cvv: '',
    
    // Notificações
    emailNotifications: true,
    courseUpdates: true,
    newCourses: true,
    promotions: false,
    newsletter: true,
    smsNotifications: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar suas informações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não conferem.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Senha alterada",
        description: "Sua senha foi atualizada com sucesso.",
      });
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao alterar sua senha.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Preferências salvas",
        description: "Suas preferências de notificação foram atualizadas.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar suas preferências.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <InternalHeader />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Configurações da Conta</h1>
            <p className="text-zinc-400">
              Gerencie suas preferências e informações pessoais
            </p>
          </div>

          <div className="bg-zinc-900/70 rounded-xl border border-zinc-800 p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCircle size={16} />
                  <span className="hidden md:inline">Perfil</span>
                </TabsTrigger>
                <TabsTrigger value="address" className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="hidden md:inline">Endereço</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield size={16} />
                  <span className="hidden md:inline">Segurança</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span className="hidden md:inline">Pagamento</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell size={16} />
                  <span className="hidden md:inline">Notificações</span>
                </TabsTrigger>
              </TabsList>

              {/* Aba Perfil */}
              <TabsContent value="profile">
                <Card className="bg-zinc-800/30 border-zinc-700">
                                      <CardHeader>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>
                        Atualize suas informações pessoais básicas
                      </CardDescription>
                    </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="000.000.000-00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="bg-ejup-pink hover:bg-ejup-pink/90"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Aba Endereço */}
              <TabsContent value="address">
                <Card className="bg-zinc-800/30 border-zinc-700">
                  <CardHeader>
                    <CardTitle>Endereço</CardTitle>
                    <CardDescription>
                      Informações de endereço para emissão de certificados e correspondência
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="00000-000"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Rua, número, complemento"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="bg-ejup-pink hover:bg-ejup-pink/90"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Endereço'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Aba Segurança */}
              <TabsContent value="security">
                <div className="space-y-6">
                  <Card className="bg-zinc-800/30 border-zinc-700">
                    <CardHeader>
                      <CardTitle>Alterar Senha</CardTitle>
                      <CardDescription>
                        Mantenha sua conta segura com uma senha forte
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirme a Nova Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleChangePassword}
                        disabled={isLoading || !formData.currentPassword || !formData.newPassword}
                        className="bg-ejup-pink hover:bg-ejup-pink/90"
                      >
                        {isLoading ? 'Alterando...' : 'Alterar Senha'}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-zinc-800/30 border-zinc-700">
                    <CardHeader>
                      <CardTitle>Autenticação de Dois Fatores</CardTitle>
                      <CardDescription>
                        Adicione uma camada extra de segurança à sua conta
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Autenticação de dois fatores</p>
                          <p className="text-sm text-zinc-400">
                            Quando ativada, você precisará inserir um código adicional ao fazer login
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {formData.twoFactorEnabled && (
                            <Badge variant="secondary" className="bg-emerald-500/20 border-emerald-500/20 text-emerald-400">
                              <Check size={12} className="mr-1" />
                              Ativado
                            </Badge>
                          )}
                          <Switch 
                            checked={formData.twoFactorEnabled} 
                            onCheckedChange={(checked) => handleInputChange('twoFactorEnabled', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba Pagamento */}
              <TabsContent value="payment">
                <Card className="bg-zinc-800/30 border-zinc-700">
                  <CardHeader>
                    <CardTitle>Métodos de Pagamento</CardTitle>
                    <CardDescription>
                      Gerencie suas formas de pagamento para cursos e certificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-ejup-pink" />
                          <p className="font-medium">Cartão de Crédito Principal</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-ejup-pink/20 border-ejup-pink/20 text-ejup-pink">
                            Padrão
                          </Badge>
                          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-400">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-zinc-300 font-mono">{formData.cardNumber}</p>
                      <p className="text-zinc-400 text-sm">{formData.cardHolder} • Expira em {formData.expiryDate}</p>
                    </div>

                    <div className="pt-4 border-t border-zinc-700">
                      <h3 className="text-lg font-medium mb-4">Adicionar Novo Cartão</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardHolder">Nome no Cartão</Label>
                          <Input
                            id="cardHolder"
                            placeholder="Nome como está no cartão"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Data de Expiração</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/AA"
                              className="bg-zinc-800 border-zinc-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="bg-zinc-800 border-zinc-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-ejup-pink hover:bg-ejup-pink/90">
                      Adicionar Cartão
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Aba Notificações */}
              <TabsContent value="notifications">
                <Card className="bg-zinc-800/30 border-zinc-700">
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Escolha como e quando deseja ser notificado sobre atividades da plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-zinc-400">Receba confirmações e atualizações importantes</p>
                      </div>
                      <Switch 
                        checked={formData.emailNotifications} 
                        onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações por SMS</p>
                        <p className="text-sm text-zinc-400">Receba alertas importantes via SMS</p>
                      </div>
                      <Switch 
                        checked={formData.smsNotifications} 
                        onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Atualizações dos Cursos</p>
                        <p className="text-sm text-zinc-400">Novos conteúdos e materiais em seus cursos</p>
                      </div>
                      <Switch 
                        checked={formData.courseUpdates} 
                        onCheckedChange={(checked) => handleInputChange('courseUpdates', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Novos Cursos</p>
                        <p className="text-sm text-zinc-400">Cursos relacionados à sua área de interesse</p>
                      </div>
                      <Switch 
                        checked={formData.newCourses} 
                        onCheckedChange={(checked) => handleInputChange('newCourses', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promoções e Ofertas</p>
                        <p className="text-sm text-zinc-400">Descontos exclusivos e ofertas especiais</p>
                      </div>
                      <Switch 
                        checked={formData.promotions} 
                        onCheckedChange={(checked) => handleInputChange('promotions', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter EJUP</p>
                        <p className="text-sm text-zinc-400">Conteúdos jurídicos e novidades da plataforma</p>
                      </div>
                      <Switch 
                        checked={formData.newsletter} 
                        onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleSaveNotifications}
                      disabled={isLoading}
                      className="bg-ejup-pink hover:bg-ejup-pink/90"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Preferências'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>


            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettings; 