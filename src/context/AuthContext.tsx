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
  loginDemo: () => void;
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
    console.log('Starting signup...', { email, groupCode });

    // Validate access code
    if (groupCode !== 'IGA2025') {
      throw new Error('Invalid access code. Please use IGA2025');
    }

    // Create auth user with email confirmation disabled
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      }
    });

    console.log('Auth signup:', { authData, authError });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('User exists, logging in...');
        await login(email, password);
        return;
      }
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No user returned from signup');
    }

    console.log('Auth user created, ID:', authData.user.id);

    // Wait a moment for auth to settle
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create user profile
    console.log('Creating user profile...');
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
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
      })
      .select()
      .single();

    console.log('Profile creation result:', { profileData, profileError });

    if (profileError && !profileError.message.includes('duplicate')) {
      console.error('Profile creation failed:', profileError);
      throw new Error(`Failed to create profile: ${profileError.message}`);
    }

    console.log('Signup complete!');
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSupabaseUser(null);
  };

  const loginDemo = () => {
    const demoUser: User = {
      id: 'demo-user-123',
      email: 'demo@iga.com',
      name: 'Demo User',
      group_code: 'IGA2025',
      total_xp: 1250,
      current_level: 5,
      current_streak: 7,
      longest_streak: 14,
      badges_earned: ['first-login', 'week-streak', 'module-master'],
      completed_modules: ['intro-101', 'leadership-201', 'finance-101'],
      modules_in_progress: ['entrepreneurship-301'],
      show_on_leaderboard: true,
      email_notifications: true,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };
    setUser(demoUser);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, login, logout, signUp, loginDemo }}>
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
