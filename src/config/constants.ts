import type { LeadStatus, LeadSource, MappableField } from '@/types'

// ─── Status ───

export const LEAD_STATUSES: LeadStatus[] = [
  'novo',
  'contatado',
  'qualificado',
  'perdido',
  'convertido',
]

export const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: 'Novo',
  contatado: 'Contatado',
  qualificado: 'Qualificado',
  perdido: 'Perdido',
  convertido: 'Convertido',
}

export const STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  novo: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  contatado: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  qualificado: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  perdido: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
  convertido: { bg: 'bg-teal-50 dark:bg-teal-950/40', text: 'text-teal-700 dark:text-teal-300', dot: 'bg-teal-500' },
}

// ─── Sources ───

export const LEAD_SOURCES: LeadSource[] = [
  'orgânico',
  'pago',
  'indicação',
  'redes_sociais',
  'email',
  'outro',
]

export const SOURCE_LABELS: Record<LeadSource, string> = {
  'orgânico': 'Orgânico',
  'pago': 'Pago',
  'indicação': 'Indicação',
  'redes_sociais': 'Redes Sociais',
  'email': 'E-mail',
  'outro': 'Outro',
}

// ─── Field Definitions ───

export interface FieldDef {
  key: MappableField
  label: string
  required: boolean
  description: string
}

export const FIELD_DEFINITIONS: FieldDef[] = [
  { key: 'timestamp', label: 'Data/Hora', required: true, description: 'Data e hora do envio' },
  { key: 'name', label: 'Nome', required: true, description: 'Nome do lead' },
  { key: 'email', label: 'E-mail', required: true, description: 'Endereço de e-mail' },
  { key: 'phone', label: 'Telefone', required: false, description: 'Número de telefone' },
  { key: 'company', label: 'Empresa', required: false, description: 'Nome da empresa' },
  { key: 'role', label: 'Cargo', required: false, description: 'Cargo ou função' },
  { key: 'source', label: 'Origem', required: false, description: 'Canal de origem do lead' },
  { key: 'interest', label: 'Interesse', required: false, description: 'Área de interesse' },
  { key: 'message', label: 'Mensagem', required: false, description: 'Mensagem enviada' },
  { key: 'status', label: 'Status', required: false, description: 'Status do lead' },
]

export const REQUIRED_FIELDS: MappableField[] = ['timestamp', 'name', 'email']

// ─── Header aliases for auto-detection ───

export const HEADER_ALIASES: Record<MappableField, string[]> = {
  timestamp: ['timestamp', 'carimbo de data/hora', 'data', 'date', 'data/hora', 'created_at', 'criado em', 'data de envio', 'data_envio', 'carimbo'],
  name: ['name', 'nome', 'nome completo', 'full_name', 'nome_completo'],
  email: ['email', 'e-mail', 'email_address', 'endereço de e-mail', 'endereco_email'],
  phone: ['phone', 'telefone', 'tel', 'celular', 'whatsapp', 'numero', 'número'],
  company: ['company', 'empresa', 'organização', 'organizacao', 'org'],
  role: ['role', 'cargo', 'função', 'funcao', 'posição', 'posicao', 'titulo'],
  source: ['source', 'origem', 'canal', 'como nos encontrou', 'como_conheceu', 'referência', 'referencia'],
  interest: ['interest', 'interesse', 'área de interesse', 'area_interesse', 'produto', 'serviço', 'servico'],
  message: ['message', 'mensagem', 'comentário', 'comentario', 'observação', 'observacao', 'descrição', 'descricao'],
  status: ['status', 'situação', 'situacao', 'estado', 'etapa', 'fase'],
}

// ─── Source aliases for normalization ───

export const SOURCE_ALIASES: Record<string, LeadSource> = {
  'orgânico': 'orgânico',
  'organico': 'orgânico',
  'organic': 'orgânico',
  'busca orgânica': 'orgânico',
  'google': 'orgânico',
  'seo': 'orgânico',
  'pago': 'pago',
  'paid': 'pago',
  'ads': 'pago',
  'google ads': 'pago',
  'facebook ads': 'pago',
  'anúncio': 'pago',
  'anuncio': 'pago',
  'indicação': 'indicação',
  'indicacao': 'indicação',
  'referral': 'indicação',
  'referência': 'indicação',
  'referencia': 'indicação',
  'amigo': 'indicação',
  'redes_sociais': 'redes_sociais',
  'redes sociais': 'redes_sociais',
  'social': 'redes_sociais',
  'instagram': 'redes_sociais',
  'linkedin': 'redes_sociais',
  'facebook': 'redes_sociais',
  'twitter': 'redes_sociais',
  'tiktok': 'redes_sociais',
  'email': 'email',
  'e-mail': 'email',
  'newsletter': 'email',
  'mailing': 'email',
}

// ─── Status aliases for normalization ───

export const STATUS_ALIASES: Record<string, LeadStatus> = {
  'novo': 'novo',
  'new': 'novo',
  'aberto': 'novo',
  'contatado': 'contatado',
  'contacted': 'contatado',
  'em contato': 'contatado',
  'qualificado': 'qualificado',
  'qualified': 'qualificado',
  'quente': 'qualificado',
  'perdido': 'perdido',
  'lost': 'perdido',
  'descartado': 'perdido',
  'frio': 'perdido',
  'convertido': 'convertido',
  'converted': 'convertido',
  'fechado': 'convertido',
  'ganho': 'convertido',
  'won': 'convertido',
}
