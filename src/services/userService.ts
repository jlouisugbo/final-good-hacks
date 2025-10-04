import { supabase } from '../lib/supabase';
import { User } from '../types/database';

export const userService = {
  // Get user profile by ID
  async getUserProfile(userId: string): Promise<User | null> {
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
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data;
  },

  // Update user settings
  async updateUserSettings(
    userId: string,
    settings: { show_on_leaderboard?: boolean; email_notifications?: boolean }
  ): Promise<User | null> {
    return this.updateUserProfile(userId, settings);
  },

  // Complete a module and award XP
  async completeModule(userId: string, moduleId: string, xpReward: number): Promise<User | null> {
    const user = await this.getUserProfile(userId);
    if (!user) throw new Error('User not found');

    // Add module to completed list if not already there
    const completedModules = user.completed_modules.includes(moduleId)
      ? user.completed_modules
      : [...user.completed_modules, moduleId];

    // Calculate new XP and level
    const newTotalXp = user.total_xp + xpReward;
    const newLevel = Math.floor(newTotalXp / 500) + 1;

    const { data, error } = await supabase
      .from('users')
      .update({
        completed_modules: completedModules,
        total_xp: newTotalXp,
        current_level: newLevel,
        last_active: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error completing module:', error);
      throw error;
    }

    return data;
  },

  // Update user streak
  async updateStreak(userId: string): Promise<User | null> {
    const user = await this.getUserProfile(userId);
    if (!user) throw new Error('User not found');

    const lastActive = new Date(user.last_active);
    const now = new Date();
    const hoursSinceLastActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

    let newStreak = user.current_streak;
    let newLongestStreak = user.longest_streak;

    // If last active was within 24-48 hours, increment streak
    if (hoursSinceLastActive >= 24 && hoursSinceLastActive <= 48) {
      newStreak += 1;
      newLongestStreak = Math.max(newLongestStreak, newStreak);
    }
    // If last active was more than 48 hours ago, reset streak
    else if (hoursSinceLastActive > 48) {
      newStreak = 1;
    }
    // If last active was within 24 hours, keep streak the same
    // (user already logged in today)

    const { data, error } = await supabase
      .from('users')
      .update({
        current_streak: newStreak,
        longest_streak: newLongestStreak,
        last_active: now.toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating streak:', error);
      throw error;
    }

    return data;
  },

  // Award badge to user
  async awardBadge(userId: string, badgeId: string): Promise<User | null> {
    const user = await this.getUserProfile(userId);
    if (!user) throw new Error('User not found');

    if (user.badges_earned.includes(badgeId)) {
      return user; // Badge already earned
    }

    const { data, error } = await supabase
      .from('users')
      .update({
        badges_earned: [...user.badges_earned, badgeId],
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error awarding badge:', error);
      throw error;
    }

    return data;
  },

  // Get user progress summary
  async getUserProgressSummary(userId: string) {
    const { data, error } = await supabase
      .from('user_progress_summary')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user progress summary:', error);
      return null;
    }

    return data;
  },
};
