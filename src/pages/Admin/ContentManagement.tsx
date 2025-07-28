import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiPlus, FiSearch, FiEdit2, FiEye, FiTrash2, FiUpload } from "react-icons/fi";

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState("all");

  // Mock data for content
  const mockContent = [
    {
      id: 1,
      title: "Como se preparar para a OAB",
      type: "news",
      author: "Maria Silva",
      publishDate: "12/05/2023",
      status: "published",
      views: 1245,
    },
    {
      id: 2,
      title: "Novo curso de Direito Penal disponível",
      type: "news",
      author: "Admin",
      publishDate: "03/06/2023",
      status: "published",
      views: 856,
    },
    {
      id: 3,
      title: "Banner - Processo Seletivo 2023",
      type: "banner",
      author: "Admin",
      publishDate: "15/04/2023",
      status: "published",
      views: 3200,
    },
    {
      id: 4,
      title: "Webinar sobre Direito Digital",
      type: "event",
      author: "Carla Mendes",
      publishDate: "22/05/2023",
      status: "scheduled",
      views: 0,
    },
    {
      id: 5,
      title: "Dicas para aprovação no concurso público",
      type: "news",
      author: "João Ferreira",
      publishDate: "08/06/2023",
      status: "draft",
      views: 0,
    },
    {
      id: 6,
      title: "Banner - Curso de Direito Civil",
      type: "banner",
      author: "Admin",
      publishDate: "10/03/2023",
      status: "expired",
      views: 1890,
    },
  ];

  // Filter content based on search term and type
  const filteredContent = mockContent.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (contentType === "all" || content.type === contentType)
  );

  // Count content by type
  const newsCount = mockContent.filter((content) => content.type === "news").length;
  const bannerCount = mockContent.filter((content) => content.type === "banner").length;
  const eventCount = mockContent.filter((content) => content.type === "event").length;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Conteúdo</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <FiPlus /> Novo Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Conteúdo</DialogTitle>
              <DialogDescription>
                Selecione o tipo de conteúdo que deseja publicar
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-center text-lg">Notícia</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex justify-center">
                  <FiEdit2 size={40} className="text-blue-500" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Selecionar</Button>
                </CardFooter>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-center text-lg">Banner</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex justify-center">
                  <FiUpload size={40} className="text-amber-500" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Selecionar</Button>
                </CardFooter>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-center text-lg">Evento</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex justify-center">
                  <FiPlus size={40} className="text-green-500" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Selecionar</Button>
                </CardFooter>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Estatísticas de Conteúdo</CardTitle>
          <CardDescription>Visão geral do conteúdo da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total de Conteúdos</p>
              <p className="text-2xl font-bold">{mockContent.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Notícias</p>
              <p className="text-2xl font-bold">{newsCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Banners</p>
              <p className="text-2xl font-bold">{bannerCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Eventos</p>
              <p className="text-2xl font-bold">{eventCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setContentType("all")}>
            Todos
          </TabsTrigger>
          <TabsTrigger value="news" onClick={() => setContentType("news")}>
            Notícias
          </TabsTrigger>
          <TabsTrigger value="banner" onClick={() => setContentType("banner")}>
            Banners
          </TabsTrigger>
          <TabsTrigger value="event" onClick={() => setContentType("event")}>
            Eventos
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar conteúdo..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Data de Publicação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visualizações</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">
                        {content.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {content.type === "news"
                            ? "Notícia"
                            : content.type === "banner"
                            ? "Banner"
                            : "Evento"}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>{content.publishDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            content.status === "published"
                              ? "default"
                              : content.status === "draft"
                              ? "secondary"
                              : content.status === "scheduled"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {content.status === "published"
                            ? "Publicado"
                            : content.status === "draft"
                            ? "Rascunho"
                            : content.status === "scheduled"
                            ? "Agendado"
                            : "Expirado"}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost">
                            <FiEye size={16} />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <FiEdit2 size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500"
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 