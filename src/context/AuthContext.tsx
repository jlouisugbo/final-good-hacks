import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types/database';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  userType: 'student' | 'volunteer' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name: string, groupCode: string) => Promise<void>;
  loginDemo: (type: 'student' | 'volunteer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'student' | 'volunteer' | null>(null);

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
    // Validate access code
    if (groupCode !== 'IGA2025') {
      throw new Error('Invalid access code. Please use IGA2025');
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          group_code: groupCode,
        }
      }
    });

    if (error) {
      throw new Error('This email is already registered. Please use a different email or use Demo Mode.');
    }

    if (!data.user) {
      throw new Error('Signup failed. Please try again or use Demo Mode.');
    }

    // Wait for auth to process
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create user profile
    const { error: profileError } = await supabase.from('users').insert({
      id: data.user.id,
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
    });

    if (profileError && !profileError.message.includes('duplicate')) {
      throw new Error(`Profile creation failed: ${profileError.message}. Please use Demo Mode.`);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSupabaseUser(null);
    setUserType(null);
  };

  const loginDemo = (type: 'student' | 'volunteer') => {
    const demoUser: User = {
      id: `demo-${type}-123`,
      email: `demo.${type}@iga.com`,
      name: type === 'student' ? 'Demo Student' : 'Demo Volunteer',
      group_code: 'IGA2025',
      total_xp: type === 'student' ? 1250 : 450,
      current_level: type === 'student' ? 5 : 2,
      current_streak: type === 'student' ? 7 : 3,
      longest_streak: type === 'student' ? 14 : 5,
      badges_earned: type === 'student' ? ['1', '2', '3', '4', '5'] : ['1', '2'],
      completed_modules: type === 'student' ? ['intro-101', 'leadership-201', 'finance-101'] : ['intro-101'],
      modules_in_progress: type === 'student' ? ['entrepreneurship-301'] : [],
      show_on_leaderboard: true,
      email_notifications: true,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      age_group: type === 'student' ? 'high' : 'adult',
      program_type: type === 'student' ? 'NIA' : null,
      current_module: type === 'student' ? 'entrepreneurship-301' : null,
      avatar_url: null,
    };
    setUser(demoUser);
    setUserType(type);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, userType, login, logout, signUp, loginDemo }}>
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
