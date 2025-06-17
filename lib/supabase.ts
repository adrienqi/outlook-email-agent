import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

// Only create client if we have valid credentials
export const supabase = supabaseUrl !== 'https://placeholder.supabase.co' 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Auth helpers
export const getCurrentUser = async () => {
  if (!supabase) {
    console.log('Supabase not configured - using placeholder credentials')
    return null
  }
  
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    // Don't log AuthSessionMissingError as it's expected when no user is signed in
    if (error.message !== 'Auth session missing!') {
      console.error('Error getting user:', error)
    }
    return null
  }
  return user
}

export const signOut = async () => {
  if (!supabase) {
    console.log('Supabase not configured - cannot sign out')
    return false
  }
  
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    return false
  }
  return true
} 