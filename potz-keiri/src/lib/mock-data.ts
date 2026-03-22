import type {
  Profile, SalesRecord, ExpenseRecord, ChecklistItem,
  ChecklistTemplate, MonthlyClosing, AuditLog, Settings
} from '@/types/database'

export const mockUser: Profile = {
  id: '1',
  email: 'ceo@potz.co.jp',
  name: '代表取締役',
  role: 'admin',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

export const mockUsers: Profile[] = [
  mockUser,
  { id: '2', email: 'director@potz.co.jp', name: '取締役', role: 'director', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: '3', email: 'part@potz.co.jp', name: 'パートタイム', role: 'part_time', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
]

export const mockSales: SalesRecord[] = [
  {
    id: '1', project_name: 'RFIDポーカーシステム 納品', client_name: '株式会社ABC',
    amount: 1200000, category: 'rfid', invoice_number: 'INV-2026-001',
    invoice_date: '2026-03-01', payment_due_date: '2026-03-31', payment_status: 'unpaid',
    payment_method: 'bank_transfer', memo: '', created_by: '1',
    created_at: '2026-03-01T00:00:00Z', updated_at: '2026-03-01T00:00:00Z', month_closed: false,
  },
  {
    id: '2', project_name: 'BTO編集PC カスタム構成', client_name: '山田太郎',
    amount: 450000, category: 'pc', invoice_number: 'INV-2026-002',
    invoice_date: '2026-03-05', payment_due_date: '2026-03-20', payment_status: 'confirming',
    payment_method: 'bank_transfer', memo: '3/18に入金連絡あり', created_by: '1',
    created_at: '2026-03-05T00:00:00Z', updated_at: '2026-03-18T00:00:00Z', month_closed: false,
  },
  {
    id: '3', project_name: '配信機材 設置工事', client_name: '株式会社DEF',
    amount: 800000, category: 'construction', invoice_number: 'INV-2026-003',
    invoice_date: '2026-02-15', payment_due_date: '2026-03-15', payment_status: 'paid',
    payment_method: 'bank_transfer', paid_date: '2026-03-14',
    created_by: '1', created_at: '2026-02-15T00:00:00Z', updated_at: '2026-03-14T00:00:00Z', month_closed: false,
  },
  {
    id: '4', project_name: 'RFIDシステム 保守サポート', client_name: '株式会社GHI',
    amount: 300000, category: 'rfid', invoice_number: 'INV-2026-004',
    invoice_date: '2026-02-01', payment_due_date: '2026-02-28', payment_status: 'paid',
    payment_method: 'bank_transfer', paid_date: '2026-02-25',
    created_by: '1', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-25T00:00:00Z', month_closed: true,
  },
  {
    id: '5', project_name: 'BTO PC 5台セット納品', client_name: '株式会社JKL',
    amount: 2000000, category: 'pc', invoice_number: 'INV-2026-005',
    invoice_date: '2026-02-10', payment_due_date: '2026-03-10', payment_status: 'unpaid',
    payment_method: 'bank_transfer',
    created_by: '1', created_at: '2026-02-10T00:00:00Z', updated_at: '2026-02-10T00:00:00Z', month_closed: false,
  },
  {
    id: '6', project_name: '配信スタジオ機材一式', client_name: '個人事業主 鈴木',
    amount: 350000, category: 'construction', invoice_number: 'INV-2026-006',
    invoice_date: '2026-01-20', payment_due_date: '2026-02-20', payment_status: 'paid',
    payment_method: 'bank_transfer', paid_date: '2026-02-18',
    created_by: '1', created_at: '2026-01-20T00:00:00Z', updated_at: '2026-02-18T00:00:00Z', month_closed: true,
  },
]

export const mockExpenses: ExpenseRecord[] = [
  {
    id: '1', applicant_id: '3', applicant_name: 'パートタイム',
    amount: 1200, category: 'transportation', date: '2026-03-18',
    purpose: 'クライアント訪問交通費', status: 'pending',
    created_at: '2026-03-18T10:00:00Z', updated_at: '2026-03-18T10:00:00Z', month_closed: false,
  },
  {
    id: '2', applicant_id: '2', applicant_name: '取締役',
    amount: 5400, category: 'supplies', date: '2026-03-15',
    purpose: 'プリンターインク購入', status: 'approved', payment_status: 'waiting',
    approved_by: '1', approved_at: '2026-03-15T14:00:00Z',
    created_at: '2026-03-15T12:00:00Z', updated_at: '2026-03-15T14:00:00Z', month_closed: false,
  },
  {
    id: '3', applicant_id: '1', applicant_name: '代表取締役',
    amount: 32000, category: 'entertainment', date: '2026-03-10',
    purpose: '株式会社ABC 接待会食', related_project: '1', attendees: '代表取締役, ABC田中様',
    status: 'approved', payment_status: 'paid', payment_date: '2026-03-12', payment_method: 'credit_card',
    approved_by: '1', approved_at: '2026-03-10T20:00:00Z',
    created_at: '2026-03-10T20:00:00Z', updated_at: '2026-03-12T00:00:00Z', month_closed: false,
  },
  {
    id: '4', applicant_id: '3', applicant_name: 'パートタイム',
    amount: 850, category: 'transportation', date: '2026-03-08',
    purpose: '倉庫往復交通費', status: 'approved', payment_status: 'paid',
    payment_date: '2026-03-09', payment_method: 'cash',
    approved_by: '1', approved_at: '2026-03-08T18:00:00Z',
    created_at: '2026-03-08T17:00:00Z', updated_at: '2026-03-09T00:00:00Z', month_closed: false,
  },
  {
    id: '5', applicant_id: '1', applicant_name: '代表取締役',
    amount: 15800, category: 'software', date: '2026-02-20',
    purpose: 'Adobe Creative Cloud 月額', status: 'approved', payment_status: 'paid',
    payment_date: '2026-02-20', payment_method: 'credit_card',
    approved_by: '1', approved_at: '2026-02-20T00:00:00Z',
    created_at: '2026-02-20T00:00:00Z', updated_at: '2026-02-20T00:00:00Z', month_closed: true,
  },
]

export const mockChecklistTemplates: ChecklistTemplate[] = [
  { id: '1', title: '法人カード明細の確認', sort_order: 1 },
  { id: '2', title: 'MoneyForward 記帳', sort_order: 2 },
  { id: '3', title: 'パート給与計算', sort_order: 3 },
  { id: '4', title: '役員給与振込', sort_order: 4 },
  { id: '5', title: '未入金案件の催促連絡', sort_order: 5 },
]

export const mockChecklist: ChecklistItem[] = [
  { id: '1', title: '法人カード明細の確認', completed: true, month: '2026-03', sort_order: 1 },
  { id: '2', title: 'MoneyForward 記帳', completed: false, month: '2026-03', sort_order: 2 },
  { id: '3', title: 'パート給与計算', completed: false, month: '2026-03', sort_order: 3 },
  { id: '4', title: '役員給与振込', completed: true, month: '2026-03', sort_order: 4 },
  { id: '5', title: '未入金案件の催促連絡', completed: false, month: '2026-03', sort_order: 5 },
]

export const mockMonthlyClosings: MonthlyClosing[] = [
  { id: '1', month: '2026-01', closed: true, closed_by: '1', closed_at: '2026-02-05T00:00:00Z' },
  { id: '2', month: '2026-02', closed: true, closed_by: '1', closed_at: '2026-03-03T00:00:00Z' },
  { id: '3', month: '2026-03', closed: false },
]

export const mockAuditLogs: AuditLog[] = [
  { id: '1', action: 'create', entity_type: 'sales', entity_id: '1', user_id: '1', user_name: '代表取締役', details: '案件「RFIDポーカーシステム 納品」を登録', created_at: '2026-03-01T09:00:00Z' },
  { id: '2', action: 'approve', entity_type: 'expense', entity_id: '2', user_id: '1', user_name: '代表取締役', details: '経費「プリンターインク購入」を承認', created_at: '2026-03-15T14:00:00Z' },
  { id: '3', action: 'update', entity_type: 'sales', entity_id: '3', user_id: '1', user_name: '代表取締役', details: '入金ステータスを「入金済」に変更', created_at: '2026-03-14T10:00:00Z' },
  { id: '4', action: 'close', entity_type: 'monthly_closing', entity_id: '2', user_id: '1', user_name: '代表取締役', details: '2026年2月を月次締め', created_at: '2026-03-03T09:00:00Z' },
  { id: '5', action: 'create', entity_type: 'expense', entity_id: '1', user_id: '3', user_name: 'パートタイム', details: '経費「クライアント訪問交通費」を申請', created_at: '2026-03-18T10:00:00Z' },
  { id: '6', action: 'update', entity_type: 'sales', entity_id: '2', user_id: '1', user_name: '代表取締役', details: '入金ステータスを「確認中」に変更', created_at: '2026-03-18T11:00:00Z' },
]

export const mockSettings: Settings = {
  id: '1',
  tax_rate: 30,
  expense_categories: ['交通費', '備品', '仕入', 'ソフトウェア', '接待', 'その他'],
  bank_accounts: ['みずほ銀行 渋谷支店 普通 1234567', '三菱UFJ銀行 新宿支店 普通 7654321'],
  clients: ['株式会社ABC', '株式会社DEF', '株式会社GHI', '株式会社JKL', '山田太郎', '個人事業主 鈴木'],
}
