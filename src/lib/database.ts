import { supabase, isSupabaseEnabled, UserProfile } from './supabase';

export interface CreateUserData {
  email: string;
  password: string;
  username: string;
  name: string;
  role: 'admin' | 'pimpinan' | 'menteri';
  position?: string;
  department?: string;
  kementerian?: string;
}

export interface UpdateUserData {
  username?: string;
  name?: string;
  role?: 'admin' | 'pimpinan' | 'menteri';
  position?: string;
  department?: string;
  kementerian?: string;
}

/**
 * Create a new user account in Supabase
 */
export async function createUser(userData: CreateUserData) {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          username: userData.username,
          name: userData.name,
          role: userData.role,
          position: userData.position,
          department: userData.department,
          kementerian: userData.kementerian,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    // The trigger will automatically create the user profile
    // But we'll verify it was created
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // If profile wasn't created by trigger, create it manually
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: userData.email,
          username: userData.username,
          name: userData.name,
          role: userData.role,
          position: userData.position,
          department: userData.department,
          kementerian: userData.kementerian,
        });

      if (insertError) throw insertError;
    }

    return {
      success: true,
      user: authData.user,
      message: 'User created successfully',
    };
  } catch (error: any) {
    console.error('Create user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create user',
    };
  }
}

/**
 * Get all users from the database
 */
export async function getAllUsers() {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      users: data as UserProfile[],
    };
  } catch (error: any) {
    console.error('Get users error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch users',
      users: [],
    };
  }
}

/**
 * Get a single user by ID
 */
export async function getUserById(userId: string) {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      success: true,
      user: data as UserProfile,
    };
  } catch (error: any) {
    console.error('Get user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch user',
    };
  }
}

/**
 * Update user profile
 */
export async function updateUser(userId: string, updates: UpdateUserData) {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      user: data as UserProfile,
      message: 'User updated successfully',
    };
  } catch (error: any) {
    console.error('Update user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to update user',
    };
  }
}

/**
 * Delete a user (soft delete - you might want to keep the auth user)
 */
export async function deleteUser(userId: string) {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    // Delete from users table
    const { error: profileError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (profileError) throw profileError;

    // Note: Deleting from auth.users requires admin privileges
    // This should be done via Supabase Admin API or dashboard
    
    return {
      success: true,
      message: 'User deleted successfully',
    };
  } catch (error: any) {
    console.error('Delete user error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete user',
    };
  }
}

/**
 * Check if username is available
 */
export async function isUsernameAvailable(username: string, excludeUserId?: string) {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    let query = supabase
      .from('users')
      .select('id')
      .eq('username', username);

    if (excludeUserId) {
      query = query.neq('id', excludeUserId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      success: true,
      available: !data || data.length === 0,
    };
  } catch (error: any) {
    console.error('Check username error:', error);
    return {
      success: false,
      available: false,
      error: error.message,
    };
  }
}

/**
 * Check if email is available
 */
export async function isEmailAvailable(email: string, excludeUserId?: string) {
  if (!isSupabaseEnabled() || !supabase) {
    throw new Error('Supabase is not configured');
  }

  try {
    let query = supabase
      .from('users')
      .select('id')
      .eq('email', email);

    if (excludeUserId) {
      query = query.neq('id', excludeUserId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      success: true,
      available: !data || data.length === 0,
    };
  } catch (error: any) {
    console.error('Check email error:', error);
    return {
      success: false,
      available: false,
      error: error.message,
    };
  }
}
