export type UserRole = 'admin' | 'director' | 'part_time'

export interface Profile {
  id: string
  email: string
  name: string
  role: UserRole
  created_at: string
  updated_at: string
}

export type PaymentStatus = 'unpaid' | 'confirming' | 'paid'
export type ExpenseStatus = 'pending' | 'approved' | 'paid' | 'rejected'
export type SalesCategory = 'rfid' | 'pc' | 'construction' | 'other'
export type ExpenseCategory = 'transportation' | 'supplies' | 'purchase' | 'software' | 'entertainment' | 'other'
export type PaymentMethod = 'bank_transfer' | 'credit_card' | 'cash'

export interface SalesRecord {
  id: string
  project_name: string
  client_name: string
  amount: number
  category: SalesCategory
  invoice_number: string
  invoice_date: string
  payment_due_date: string
  payment_status: PaymentStatus
  payment_method: PaymentMethod
  bank_account?: string
  paid_date?: string
  memo?: string
  created_by: string
  created_at: string
  updated_by?: string
  updated_at: string
  month_closed: boolean
}

export interface ExpenseRecord {
  id: string
  applicant_id: string
  applicant_name: string
  amount: number
  category: ExpenseCategory
  date: string
  purpose: string
  related_project?: string
  attendees?: string
  tax_memo?: string
  receipt_url?: string
  status: ExpenseStatus
  payment_status?: 'waiting' | 'paid'
  payment_date?: string
  payment_method?: PaymentMethod
  approved_by?: string
  approved_at?: string
  rejection_reason?: string
  created_at: string
  updated_at: string
  month_closed: boolean
}

export interface ChecklistItem {
  id: string
  title: string
  completed: boolean
  month: string // YYYY-MM format
  sort_order: number
}

export interface ChecklistTemplate {
  id: string
  title: string
  sort_order: number
}

export interface MonthlyClosing {
  id: string
  month: string // YYYY-MM format
  closed: boolean
  closed_by?: string
  closed_at?: string
}

export interface AuditLog {
  id: string
  action: string
  entity_type: string
  entity_id: string
  user_id: string
  user_name: string
  details?: string
  created_at: string
}

export interface Settings {
  id: string
  tax_rate: number
  expense_categories: string[]
  bank_accounts: string[]
  clients: string[]
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at' | 'updated_at'>; Update: Partial<Profile> }
      sales: { Row: SalesRecord; Insert: Omit<SalesRecord, 'id' | 'created_at' | 'updated_at'>; Update: Partial<SalesRecord> }
      expenses: { Row: ExpenseRecord; Insert: Omit<ExpenseRecord, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ExpenseRecord> }
      checklist_items: { Row: ChecklistItem; Insert: Omit<ChecklistItem, 'id'>; Update: Partial<ChecklistItem> }
      checklist_templates: { Row: ChecklistTemplate; Insert: Omit<ChecklistTemplate, 'id'>; Update: Partial<ChecklistTemplate> }
      monthly_closings: { Row: MonthlyClosing; Insert: Omit<MonthlyClosing, 'id'>; Update: Partial<MonthlyClosing> }
      audit_logs: { Row: AuditLog; Insert: Omit<AuditLog, 'id' | 'created_at'>; Update: never }
      settings: { Row: Settings; Insert: Omit<Settings, 'id'>; Update: Partial<Settings> }
    }
  }
}
