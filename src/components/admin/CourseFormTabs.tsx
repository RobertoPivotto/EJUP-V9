import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FiUsers,
  FiDollarSign,
  FiPlay,
  FiStar,
  FiEye,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit3,
  FiFileText,
  FiClock,
  FiImage
} from "react-icons/fi";
import { cn } from "@/lib/utils";

interface CourseFormTabsProps {
  formData: any;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
  addModule: () => void;
  addLesson: (moduleId: string) => void;
  addInstructor?: () => void;
  removeInstructor?: (instructorId: string) => void;
  updateInstructor?: (instructorId: string, field: string, value: string) => void;
}

export const InstructorTab = ({ formData, errors, handleChange, addInstructor, removeInstructor, updateInstructor }: CourseFormTabsProps) => (
  <TabsContent value="instrutor" className="p-8 space-y-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
        <FiUsers className="text-blue-400 text-xl" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Informações do Instrutor</h2>
        <p className="text-zinc-400">Configure o perfil do professor responsável</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Foto do instrutor */}
        <div className="space-y-4">
          <Label className="text-zinc-300">Foto do Instrutor</Label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-dashed border-zinc-600">
              {formData.instructorPhoto ? (
                <img 
                  src={formData.instructorPhoto} 
                  alt="Instrutor" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FiImage className="text-zinc-400 text-xl" />
              )}
            </div>
            <Button 
              variant="outline" 
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
            >
              <FiUpload className="mr-2" /> Carregar Foto
            </Button>
          </div>
        </div>

        {/* Nome do instrutor */}
        <div className="space-y-2">
          <Label htmlFor="instructorName" className="text-zinc-300 flex items-center gap-2">
            Nome Completo <span className="text-red-400">*</span>
            {formData.instructorName && <FiCheckCircle className="text-emerald-400" />}
          </Label>
          <Input
            id="instructorName"
            value={formData.instructorName}
            onChange={(e) => handleChange("instructorName", e.target.value)}
            placeholder="Ex: Dr. João Silva"
            className={cn(
              "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 transition-all",
              errors.instructorName ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
            )}
          />
          {errors.instructorName && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <FiAlertCircle /> {errors.instructorName}
            </p>
          )}
        </div>

        {/* Título/Cargo do instrutor */}
        <div className="space-y-2">
          <Label htmlFor="instructorRole" className="text-zinc-300 flex items-center gap-2">
            Título/Cargo <span className="text-red-400">*</span>
            {formData.instructorRole && <FiCheckCircle className="text-emerald-400" />}
          </Label>
          <Input
            id="instructorRole"
            value={formData.instructorRole}
            onChange={(e) => handleChange("instructorRole", e.target.value)}
            placeholder="Ex: Advogado Especialista, Professor de Direito, Consultor Jurídico"
            className={cn(
              "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 transition-all",
              errors.instructorRole ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
            )}
          />
          {errors.instructorRole && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <FiAlertCircle /> {errors.instructorRole}
            </p>
          )}
        </div>

        {/* Foto do instrutor */}
        <div className="space-y-2">
          <Label htmlFor="instructorPhoto" className="text-zinc-300 flex items-center gap-2">
            Foto do Instrutor
            {formData.instructorPhoto && <FiCheckCircle className="text-emerald-400" />}
          </Label>
          <Input
            id="instructorPhoto"
            value={formData.instructorPhoto}
            onChange={(e) => handleChange("instructorPhoto", e.target.value)}
            placeholder="URL da foto do instrutor"
            className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50 transition-all"
          />
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <h6 className="text-gray-300 text-xs font-medium mb-2">📐 Tamanhos recomendados da foto:</h6>
            <ul className="text-xs text-zinc-400 space-y-1">
              <li>• <strong>Página do curso (aba Instrutor):</strong> 64x64px (redonda)</li>
              <li>• <strong>Cards de curso:</strong> 40x40px (redonda)</li>
              <li>• <strong>Vídeo de vendas:</strong> 48x48px (redonda)</li>
              <li>• <strong>Formato ideal:</strong> Quadrada (1:1), mínimo 200x200px</li>
            </ul>
          </div>
        </div>

        {/* Biografia */}
        <div className="space-y-2">
          <Label htmlFor="instructorBio" className="text-zinc-300 flex items-center gap-2">
            Biografia <span className="text-red-400">*</span>
            {formData.instructorBio && <FiCheckCircle className="text-emerald-400" />}
          </Label>
          <Textarea
            id="instructorBio"
            value={formData.instructorBio}
            onChange={(e) => handleChange("instructorBio", e.target.value)}
            placeholder="Conte sobre a experiência e formação do instrutor..."
            className={cn(
              "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 min-h-[120px] transition-all",
              errors.instructorBio ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
            )}
          />
          {errors.instructorBio && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <FiAlertCircle /> {errors.instructorBio}
            </p>
          )}
        </div>

        {/* Experiência */}
        <div className="space-y-2">
          <Label htmlFor="instructorExperience" className="text-zinc-300">
            Experiência Profissional
          </Label>
          <Textarea
            id="instructorExperience"
            value={formData.instructorExperience}
            onChange={(e) => handleChange("instructorExperience", e.target.value)}
            placeholder="Principais experiências e conquistas..."
            className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[100px] focus:border-ejup-cyan/50 transition-all"
          />
        </div>

        {/* Múltiplos Instrutores */}
        <div className="space-y-4 pt-6 border-t border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-zinc-300 text-lg font-medium">
                Múltiplos Instrutores
              </Label>
              <p className="text-xs text-zinc-500 mt-1">
                Ative para adicionar mais instrutores ao curso
              </p>
            </div>
            <Switch
              checked={formData.hasMultipleInstructors}
              onCheckedChange={(checked) => handleChange("hasMultipleInstructors", checked)}
            />
          </div>

          {formData.hasMultipleInstructors && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-white">Instrutores Adicionais</h4>
                <Button
                  type="button"
                  onClick={addInstructor}
                  size="sm"
                  className="bg-ejup-cyan hover:bg-ejup-cyan/90 text-zinc-900"
                >
                  <FiPlus className="mr-2" /> Adicionar Instrutor
                </Button>
              </div>

              {formData.additionalInstructors?.map((instructor: any, index: number) => (
                <div key={instructor.id} className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-white">Instrutor {index + 2}</h5>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInstructor?.(instructor.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300 text-sm">Nome Completo</Label>
                      <Input
                        value={instructor.name}
                        onChange={(e) => updateInstructor?.(instructor.id, "name", e.target.value)}
                        placeholder="Ex: Dr. João Silva"
                        className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-10 focus:border-ejup-cyan/50 transition-all"
                      />
                    </div>

                    {/* Cargo */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300 text-sm">Título/Cargo</Label>
                      <Input
                        value={instructor.role}
                        onChange={(e) => updateInstructor?.(instructor.id, "role", e.target.value)}
                        placeholder="Ex: Advogado Especialista"
                        className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-10 focus:border-ejup-cyan/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Foto */}
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-sm">Foto do Instrutor</Label>
                    <Input
                      value={instructor.photo}
                      onChange={(e) => updateInstructor?.(instructor.id, "photo", e.target.value)}
                      placeholder="URL da foto do instrutor"
                      className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-10 focus:border-ejup-cyan/50 transition-all"
                    />
                  </div>

                  {/* Biografia */}
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-sm">Biografia</Label>
                    <Textarea
                      value={instructor.bio}
                      onChange={(e) => updateInstructor?.(instructor.id, "bio", e.target.value)}
                      placeholder="Conte sobre a experiência e formação do instrutor..."
                      className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[80px] focus:border-ejup-cyan/50 transition-all"
                    />
                  </div>

                  {/* Experiência */}
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-sm">Experiência Profissional</Label>
                    <Textarea
                      value={instructor.experience}
                      onChange={(e) => updateInstructor?.(instructor.id, "experience", e.target.value)}
                      placeholder="Principais experiências e conquistas..."
                      className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[80px] focus:border-ejup-cyan/50 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview do Instrutor */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FiEye /> Preview do Instrutor
        </h3>
        <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
              {formData.instructorPhoto ? (
                <img 
                  src={formData.instructorPhoto} 
                  alt="Instrutor" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FiUsers className="text-zinc-400 text-xl" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-white">
                {formData.instructorName || "Nome do Instrutor"}
              </h4>
              <p className="text-sm text-zinc-400">{formData.instructorRole || "Título/Cargo"}</p>
            </div>
          </div>
          <p className="text-sm text-zinc-300 line-clamp-4">
            {formData.instructorBio || "Biografia do instrutor aparecerá aqui..."}
          </p>
        </div>
      </div>
    </div>
  </TabsContent>
);

export const FinancialTab = ({ formData, errors, handleChange }: CourseFormTabsProps) => (
  <TabsContent value="financeiro" className="p-8 space-y-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
        <FiDollarSign className="text-emerald-400 text-xl" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Informações Financeiras</h2>
        <p className="text-zinc-400">Configure preços e condições de pagamento</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Preço principal */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-zinc-300 flex items-center gap-2">
            Preço do Curso <span className="text-red-400">*</span>
            {formData.price && <FiCheckCircle className="text-emerald-400" />}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">R$</span>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="0,00"
              className={cn(
                "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 pl-12 text-lg transition-all",
                errors.price ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
              )}
            />
          </div>
          {errors.price && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <FiAlertCircle /> {errors.price}
            </p>
          )}
        </div>

        {/* Promoção */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hasPromotion" className="text-zinc-300">
              Ativar Preço Promocional
            </Label>
            <Switch
              id="hasPromotion"
              checked={formData.hasPromotion}
              onCheckedChange={(checked) => handleChange("hasPromotion", checked)}
            />
          </div>
          
          {formData.hasPromotion && (
            <div className="space-y-2">
              <Label htmlFor="promotionalPrice" className="text-zinc-300">
                Preço Promocional <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">R$</span>
                <Input
                  id="promotionalPrice"
                  type="number"
                  value={formData.promotionalPrice}
                  onChange={(e) => handleChange("promotionalPrice", e.target.value)}
                  placeholder="0,00"
                  className={cn(
                    "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 h-12 pl-12 text-lg transition-all",
                    errors.promotionalPrice ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
                  )}
                />
              </div>
              {errors.promotionalPrice && (
                <p className="text-red-400 text-sm">{errors.promotionalPrice}</p>
              )}
            </div>
          )}
        </div>

        {/* Parcelamento */}
        <div className="space-y-2">
          <Label htmlFor="installments" className="text-zinc-300">
            Parcelamento (máximo)
          </Label>
          <Select
            value={formData.installments}
            onValueChange={(value) => handleChange("installments", value)}
          >
            <SelectTrigger className="bg-zinc-900/50 border-2 border-zinc-700 text-white h-12 focus:border-ejup-cyan/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              <SelectItem value="1">À vista</SelectItem>
              <SelectItem value="3">3x sem juros</SelectItem>
              <SelectItem value="6">6x sem juros</SelectItem>
              <SelectItem value="12">12x sem juros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview dos preços */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FiEye /> Preview dos Preços
        </h3>
        <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-6 space-y-4">
          <div className="text-center">
            {formData.hasPromotion && formData.promotionalPrice ? (
              <div>
                <p className="text-sm text-zinc-400 line-through">
                  R$ {formData.price ? Number(formData.price).toFixed(2).replace('.', ',') : '0,00'}
                </p>
                <p className="text-3xl font-bold text-ejup-cyan">
                  R$ {Number(formData.promotionalPrice).toFixed(2).replace('.', ',')}
                </p>
                <Badge className="bg-red-500/20 text-red-400 mt-2">
                  Oferta Especial
                </Badge>
              </div>
            ) : (
              <p className="text-3xl font-bold text-white">
                R$ {formData.price ? Number(formData.price).toFixed(2).replace('.', ',') : '0,00'}
              </p>
            )}
          </div>
          
          {formData.installments !== "1" && (
            <div className="text-center">
              <p className="text-sm text-zinc-400">ou em até</p>
              <p className="text-lg font-semibold text-white">
                {formData.installments}x de R$ {
                  formData.price ? 
                    (Number(formData.hasPromotion && formData.promotionalPrice ? formData.promotionalPrice : formData.price) / Number(formData.installments))
                      .toFixed(2).replace('.', ',') 
                    : '0,00'
                }
              </p>
              <p className="text-xs text-zinc-500">sem juros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </TabsContent>
);

export const ContentTab = ({ formData, errors, handleChange, addModule, addLesson }: CourseFormTabsProps) => (
  <TabsContent value="ementa" className="p-8 space-y-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
        <FiPlay className="text-purple-400 text-xl" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Conteúdo do Curso</h2>
        <p className="text-zinc-400">Organize módulos, aulas e materiais didáticos</p>
      </div>
    </div>

    <div className="space-y-6">
      {/* Ementa */}
      <div className="space-y-2">
        <Label htmlFor="syllabus" className="text-zinc-300 flex items-center gap-2">
          Ementa do Curso <span className="text-red-400">*</span>
          {formData.syllabus && <FiCheckCircle className="text-emerald-400" />}
        </Label>
        <Textarea
          id="syllabus"
          value={formData.syllabus}
          onChange={(e) => handleChange("syllabus", e.target.value)}
          placeholder="Descreva os principais tópicos e objetivos de aprendizagem..."
          className={cn(
            "bg-zinc-900/50 border-2 text-white placeholder:text-zinc-500 min-h-[120px] transition-all",
            errors.syllabus ? "border-red-500" : "border-zinc-700 focus:border-ejup-cyan/50"
          )}
        />
        {errors.syllabus && (
          <p className="text-red-400 text-sm flex items-center gap-2">
            <FiAlertCircle /> {errors.syllabus}
          </p>
        )}
      </div>

      {/* Duração total */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalDuration" className="text-zinc-300">
            Duração Total (horas)
          </Label>
          <Input
            id="totalDuration"
            type="number"
            value={formData.totalDuration}
            onChange={(e) => handleChange("totalDuration", e.target.value)}
            placeholder="Ex: 40"
            className="bg-zinc-900/50 border-2 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus:border-ejup-cyan/50"
          />
        </div>
      </div>

      {/* Módulos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Módulos do Curso</h3>
          <Button
            onClick={addModule}
            className="bg-ejup-cyan hover:bg-ejup-cyan/90 text-zinc-900"
          >
            <FiPlus className="mr-2" /> Adicionar Módulo
          </Button>
        </div>

        {formData.modules.map((module: any, moduleIndex: number) => (
          <div key={module.id} className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-ejup-cyan/20 rounded-full flex items-center justify-center text-sm font-semibold text-ejup-cyan">
                  {moduleIndex + 1}
                </div>
                Módulo {moduleIndex + 1}
              </h4>
              {formData.modules.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <FiTrash2 />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Título do Módulo</Label>
                <Input
                  value={module.title}
                  onChange={(e) => {
                    const updatedModules = [...formData.modules];
                    updatedModules[moduleIndex].title = e.target.value;
                    handleChange("modules", updatedModules);
                  }}
                  placeholder="Ex: Fundamentos do Direito"
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Descrição</Label>
                <Input
                  value={module.description}
                  onChange={(e) => {
                    const updatedModules = [...formData.modules];
                    updatedModules[moduleIndex].description = e.target.value;
                    handleChange("modules", updatedModules);
                  }}
                  placeholder="Breve descrição do módulo"
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-ejup-cyan/50"
                />
              </div>
            </div>

            {/* Aulas do módulo */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-white">Aulas</h5>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addLesson(module.id)}
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                >
                  <FiPlus className="mr-1" size={12} /> Adicionar Aula
                </Button>
              </div>

              {module.lessons.map((lesson: any, lessonIndex: number) => (
                <div key={lesson.id} className="bg-zinc-800/30 border border-zinc-600/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">
                      Aula {lessonIndex + 1}
                    </span>
                    {module.lessons.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-6 w-6 p-0"
                      >
                        <FiTrash2 size={12} />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        value={lesson.title}
                        onChange={(e) => {
                          const updatedModules = [...formData.modules];
                          updatedModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                          handleChange("modules", updatedModules);
                        }}
                        placeholder="Título da aula"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:border-ejup-cyan/50"
                      />
                      <Input
                        value={lesson.duration}
                        onChange={(e) => {
                          const updatedModules = [...formData.modules];
                          updatedModules[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                          handleChange("modules", updatedModules);
                        }}
                        placeholder="Duração (min)"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:border-ejup-cyan/50"
                      />
                      <Input
                        value={lesson.videoUrl}
                        onChange={(e) => {
                          const updatedModules = [...formData.modules];
                          updatedModules[moduleIndex].lessons[lessonIndex].videoUrl = e.target.value;
                          handleChange("modules", updatedModules);
                        }}
                        placeholder="URL do vídeo"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:border-ejup-cyan/50"
                      />
                    </div>
                    
                    {/* Resumo da Aula */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300 text-xs">Resumo da Aula</Label>
                      <Textarea
                        value={lesson.content || ''}
                        onChange={(e) => {
                          const updatedModules = [...formData.modules];
                          updatedModules[moduleIndex].lessons[lessonIndex].content = e.target.value;
                          handleChange("modules", updatedModules);
                        }}
                        placeholder="Descreva o conteúdo e objetivos desta aula..."
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:border-ejup-cyan/50 min-h-[80px]"
                      />
                    </div>
                    
                    {/* Pontos-chave */}
                    <div className="space-y-2">
                      <Label className="text-zinc-300 text-xs">Pontos-chave (um por linha)</Label>
                      <Textarea
                        value={lesson.keyPoints ? lesson.keyPoints.join('\n') : ''}
                        onChange={(e) => {
                          const updatedModules = [...formData.modules];
                          updatedModules[moduleIndex].lessons[lessonIndex].keyPoints = e.target.value.split('\n').filter(point => point.trim());
                          handleChange("modules", updatedModules);
                        }}
                        placeholder="• Primeiro ponto-chave&#10;• Segundo ponto-chave&#10;• Terceiro ponto-chave"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:border-ejup-cyan/50 min-h-[60px]"
                      />
                    </div>
                    
                    {/* Configurações de Exercícios e Materiais */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`hasExercises-${lesson.id}`}
                          checked={lesson.hasExercises || false}
                          onChange={(e) => {
                            const updatedModules = [...formData.modules];
                            updatedModules[moduleIndex].lessons[lessonIndex].hasExercises = e.target.checked;
                            handleChange("modules", updatedModules);
                          }}
                          className="rounded border-zinc-700 bg-zinc-800"
                        />
                        <Label htmlFor={`hasExercises-${lesson.id}`} className="text-zinc-300 text-xs">
                          Possui exercícios
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`hasMaterials-${lesson.id}`}
                          checked={lesson.hasMaterials || false}
                          onChange={(e) => {
                            const updatedModules = [...formData.modules];
                            updatedModules[moduleIndex].lessons[lessonIndex].hasMaterials = e.target.checked;
                            handleChange("modules", updatedModules);
                          }}
                          className="rounded border-zinc-700 bg-zinc-800"
                        />
                        <Label htmlFor={`hasMaterials-${lesson.id}`} className="text-zinc-300 text-xs">
                          Possui materiais
                        </Label>
                      </div>
                    </div>
                    
                    {/* Seção de Exercícios (se habilitada) */}
                    {lesson.hasExercises && (
                      <div className="bg-zinc-900/50 border border-zinc-600/30 rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-zinc-300 text-xs font-medium">Exercícios</Label>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs border-zinc-600 text-zinc-300"
                            onClick={() => {
                              const updatedModules = [...formData.modules];
                              if (!updatedModules[moduleIndex].lessons[lessonIndex].exercises) {
                                updatedModules[moduleIndex].lessons[lessonIndex].exercises = [];
                              }
                              updatedModules[moduleIndex].lessons[lessonIndex].exercises.push({
                                id: Date.now(),
                                question: '',
                                type: 'essay'
                              });
                              handleChange("modules", updatedModules);
                            }}
                          >
                            <FiPlus size={10} className="mr-1" /> Adicionar
                          </Button>
                        </div>
                        
                        {lesson.exercises && lesson.exercises.map((exercise: any, exerciseIndex: number) => (
                          <div key={exercise.id} className="bg-zinc-800/30 border border-zinc-600/20 rounded p-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-400">Exercício {exerciseIndex + 1}</span>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-5 w-5 p-0 text-red-400 hover:text-red-300"
                                onClick={() => {
                                  const updatedModules = [...formData.modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].exercises.splice(exerciseIndex, 1);
                                  handleChange("modules", updatedModules);
                                }}
                              >
                                <FiTrash2 size={10} />
                              </Button>
                            </div>
                            <Textarea
                              value={exercise.question}
                              onChange={(e) => {
                                const updatedModules = [...formData.modules];
                                updatedModules[moduleIndex].lessons[lessonIndex].exercises[exerciseIndex].question = e.target.value;
                                handleChange("modules", updatedModules);
                              }}
                              placeholder="Digite a pergunta do exercício..."
                              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-xs min-h-[50px]"
                            />
                            <select
                              value={exercise.type}
                              onChange={(e) => {
                                const updatedModules = [...formData.modules];
                                updatedModules[moduleIndex].lessons[lessonIndex].exercises[exerciseIndex].type = e.target.value;
                                handleChange("modules", updatedModules);
                              }}
                              className="w-full bg-zinc-800/50 border border-zinc-700 text-white text-xs rounded px-2 py-1"
                            >
                              <option value="essay">Dissertativa</option>
                              <option value="multiple-choice">Múltipla escolha</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Seção de Materiais (se habilitada) */}
                    {lesson.hasMaterials && (
                      <div className="bg-zinc-900/50 border border-zinc-600/30 rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-zinc-300 text-xs font-medium">Materiais Complementares</Label>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs border-zinc-600 text-zinc-300"
                            onClick={() => {
                              const updatedModules = [...formData.modules];
                              if (!updatedModules[moduleIndex].lessons[lessonIndex].materials) {
                                updatedModules[moduleIndex].lessons[lessonIndex].materials = [];
                              }
                              updatedModules[moduleIndex].lessons[lessonIndex].materials.push({
                                id: Date.now(),
                                title: '',
                                type: 'pdf',
                                size: '',
                                url: ''
                              });
                              handleChange("modules", updatedModules);
                            }}
                          >
                            <FiPlus size={10} className="mr-1" /> Adicionar
                          </Button>
                        </div>
                        
                        {lesson.materials && lesson.materials.map((material: any, materialIndex: number) => (
                          <div key={material.id} className="bg-zinc-800/30 border border-zinc-600/20 rounded p-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-400">Material {materialIndex + 1}</span>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-5 w-5 p-0 text-red-400 hover:text-red-300"
                                onClick={() => {
                                  const updatedModules = [...formData.modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].materials.splice(materialIndex, 1);
                                  handleChange("modules", updatedModules);
                                }}
                              >
                                <FiTrash2 size={10} />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                value={material.title}
                                onChange={(e) => {
                                  const updatedModules = [...formData.modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].materials[materialIndex].title = e.target.value;
                                  handleChange("modules", updatedModules);
                                }}
                                placeholder="Título do material"
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-xs"
                              />
                              <Input
                                value={material.url}
                                onChange={(e) => {
                                  const updatedModules = [...formData.modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].materials[materialIndex].url = e.target.value;
                                  handleChange("modules", updatedModules);
                                }}
                                placeholder="URL do arquivo"
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-xs"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <select
                                value={material.type}
                                onChange={(e) => {
                                  const updatedModules = [...formData.modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].materials[materialIndex].type = e.target.value;
                                  handleChange("modules", updatedModules);
                                }}
                                className="bg-zinc-800/50 border border-zinc-700 text-white text-xs rounded px-2 py-1"
                              >
                                <option value="pdf">PDF</option>
                                <option value="doc">DOC</option>
                                <option value="video">Vídeo</option>
                                <option value="link">Link</option>
                              </select>
                              <Input
                                value={material.size}
                                onChange={(e) => {
                                  const updatedModules = [...formData.modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].materials[materialIndex].size = e.target.value;
                                  handleChange("modules", updatedModules);
                                }}
                                placeholder="Tamanho (ex: 2MB)"
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </TabsContent>
);

export default { InstructorTab, FinancialTab, ContentTab }; 