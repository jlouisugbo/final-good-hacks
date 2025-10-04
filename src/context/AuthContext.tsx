import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types/database';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name: string, groupCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string, groupCode: string) => {
    try {
      console.log('Starting signup process...');

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard',
          data: {
            name,
            group_code: groupCode,
          }
        },
      });

      console.log('Auth signup response:', { authData, authError });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user - no user returned');
      }

      console.log('Auth user created:', authData.user.id);

      // Wait a bit for auth to fully process
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create user profile in the users table
      const userProfile = {
        id: authData.user.id,
        email,
        name,
        group_code: groupCode,
        total_xp: 0,
        current_level: 1,
        current_streak: 0,
        longest_streak: 0,
        badges_earned: [],
        completed_modules: [],
        modules_in_progress: [],
        show_on_leaderboard: true,
        email_notifications: true,
      };

      console.log('Creating user profile:', userProfile);

      // Try to insert, but if user already exists, just fetch it
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .upsert(userProfile, { onConflict: 'id' })
        .select()
        .single();

      console.log('Profile upsert response:', { profileData, profileError });

      if (profileError) {
        console.error('Profile creation error:', profileError);

        // Check if it's just because the profile already exists
        if (profileError.message.includes('duplicate') || profileError.code === '23505') {
          console.log('Profile already exists, fetching existing profile...');
          const { data: existingProfile } = await supabase
            .from('users')
            .select()
            .eq('id', authData.user.id)
            .single();

          if (existingProfile) {
            console.log('Successfully retrieved existing profile');
            return; // Profile exists, we're good to go
          }
        }

        throw new Error(`Failed to create user profile: ${profileError.message}. Please try logging in instead.`);
      }

      console.log('Signup completed successfully');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSupabaseUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
