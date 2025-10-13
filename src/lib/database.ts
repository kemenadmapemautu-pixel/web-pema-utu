// src/lib/database.ts
import { supabase } from './supabase'

// Contoh tabel untuk admin account management
export interface AdminAccount {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  created_at: string
  updated_at: string
  profile?: AdminProfile
}

export interface AdminProfile {
  id: string
  user_id: string
  avatar_url?: string
  phone?: string
  department?: string
  created_at: string
  updated_at: string
}

export class DatabaseService {
  // Admin Account Management
  static async getAdminAccounts() {
    const { data, error } = await supabase
      .from('admin_accounts')
      .select(`
        *,
        profile:admin_profiles(*)
      `)
      .order('created_at', { ascending: false })

    return { data: data as AdminAccount[] | null, error }
  }

  static async createAdminAccount(account: Omit<AdminAccount, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('admin_accounts')
      .insert(account)
      .select()
      .single()

    return { data: data as AdminAccount | null, error }
  }

  static async updateAdminAccount(id: string, updates: Partial<AdminAccount>) {
    const { data, error } = await supabase
      .from('admin_accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    return { data: data as AdminAccount | null, error }
  }

  static async deleteAdminAccount(id: string) {
    // Hapus profile terlebih dahulu (jika ada foreign key constraint)
    await supabase
      .from('admin_profiles')
      .delete()
      .eq('user_id', id)

    // Hapus akun admin
    const { error } = await supabase
      .from('admin_accounts')
      .delete()
      .eq('id', id)

    return { error }
  }

  // Generic CRUD operations untuk tabel lain
  static async insert<T>(table: string, data: Partial<T>) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()

    return { data: result as T | null, error }
  }

  static async select<T>(table: string, filters?: any) {
    let query = supabase.from(table).select('*')

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })
    }

    const { data, error } = await query
    return { data: data as T[] | null, error }
  }

  static async update<T>(table: string, id: string, updates: Partial<T>) {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    return { data: data as T | null, error }
  }

  static async delete(table: string, id: string) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    return { error }
  }
}
