import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type Arac = {
  id: string
  slug: string
  marka: string
  model: string
  yil: number
  fiyat: number
  km: number
  yakit: string
  vites: string
  renk: string
  aciklama: string
  ozellikler: string[]
  fotograflar: string[]
  kampanya: boolean
  kampanya_etiketi: string | null
  aktif: boolean
  created_at: string
}

export type IletisimFormu = {
  id: string
  ad: string
  telefon: string
  email: string | null
  mesaj: string
  arac_id: string | null
  created_at: string
  okundu: boolean
}
