export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          age_group: string | null
          group_code: string
          program_type: string | null
          total_xp: number
          current_level: number
          current_streak: number
          longest_streak: number
          badges_earned: string[]
          completed_modules: string[]
          current_module: string | null
          modules_in_progress: Json
          created_at: string
          last_active: string
          avatar_url: string | null
          show_on_leaderboard: boolean
          email_notifications: boolean
        }
        Insert: {
          id?: string
          email: string
          name: string
          age_group?: string | null
          group_code: string
          program_type?: string | null
          total_xp?: number
          current_level?: number
          current_streak?: number
          longest_streak?: number
          badges_earned?: string[]
          completed_modules?: string[]
          current_module?: string | null
          modules_in_progress?: Json
          created_at?: string
          last_active?: string
          avatar_url?: string | null
          show_on_leaderboard?: boolean
          email_notifications?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string
          age_group?: string | null
          group_code?: string
          program_type?: string | null
          total_xp?: number
          current_level?: number
          current_streak?: number
          longest_streak?: number
          badges_earned?: string[]
          completed_modules?: string[]
          current_module?: string | null
          modules_in_progress?: Json
          created_at?: string
          last_active?: string
          avatar_url?: string | null
          show_on_leaderboard?: boolean
          email_notifications?: boolean
        }
      }
      modules: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: string | null
          xp_reward: number
          estimated_time: number | null
          content_markdown: string
          video_url: string | null
          quiz_questions: Json | null
          prerequisite_modules: string[]
          module_order: number | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description: string
          category: string
          difficulty?: string | null
          xp_reward?: number
          estimated_time?: number | null
          content_markdown: string
          video_url?: string | null
          quiz_questions?: Json | null
          prerequisite_modules?: string[]
          module_order?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: string | null
          xp_reward?: number
          estimated_time?: number | null
          content_markdown?: string
          video_url?: string | null
          quiz_questions?: Json | null
          prerequisite_modules?: string[]
          module_order?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          user_id: string | null
          content: string
          post_type: string | null
          reactions: Json
          reaction_users: Json
          comments: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          content: string
          post_type?: string | null
          reactions?: Json
          reaction_users?: Json
          comments?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          content?: string
          post_type?: string | null
          reactions?: Json
          reaction_users?: Json
          comments?: Json
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          event_type: string | null
          program_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          event_type?: string | null
          program_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_date?: string
          event_type?: string | null
          program_type?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      user_progress_summary: {
        Row: {
          id: string | null
          name: string | null
          total_xp: number | null
          current_level: number | null
          current_streak: number | null
          modules_completed: number | null
          total_modules: number | null
          completion_percentage: number | null
        }
      }
      group_leaderboard: {
        Row: {
          group_code: string | null
          name: string | null
          total_xp: number | null
          current_level: number | null
          current_streak: number | null
          rank_in_group: number | null
        }
      }
    }
    Functions: {
      [_: string]: never
    }
    Enums: {
      [_: string]: never
    }
  }
}

// Helper types
export type User = Database['public']['Tables']['users']['Row']
export type Module = Database['public']['Tables']['modules']['Row']
export type CommunityPost = Database['public']['Tables']['community_posts']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type UserProgressSummary = Database['public']['Views']['user_progress_summary']['Row']
export type GroupLeaderboard = Database['public']['Views']['group_leaderboard']['Row']
