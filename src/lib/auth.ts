// src/lib/auth.ts
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser extends User {
  // Anda bisa tambahkan field custom di sini
}

export class AuthService {
  // Login dengan email & password
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  // Register user baru
  static async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  // Logout
  static async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Get current user
  static async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user as AuthUser | null
  }

  // Listen to auth changes
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
