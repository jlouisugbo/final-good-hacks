import { supabase } from '../lib/supabase';
import { GroupLeaderboard } from '../types/database';

export const leaderboardService = {
  // Get group leaderboard for a specific group
  async getGroupLeaderboard(groupCode: string): Promise<GroupLeaderboard[]> {
    const { data, error } = await supabase
      .from('group_leaderboard')
      .select('*')
      .eq('group_code', groupCode)
      .order('rank_in_group', { ascending: true });

    if (error) {
      console.error('Error fetching group leaderboard:', error);
      return [];
    }

    return data || [];
  },

  // Get all groups ranked by total XP
  async getAllGroupsLeaderboard(): Promise<Array<{ group_code: string; total_xp: number; rank: number }>> {
    const { data, error } = await supabase
      .from('group_leaderboard')
      .select('group_code, total_xp')
      .order('total_xp', { ascending: false });

    if (error) {
      console.error('Error fetching all groups leaderboard:', error);
      return [];
    }

    // Group by group_code and sum XP
    const groupMap = new Map<string, number>();
    data?.forEach((item) => {
      if (item.group_code) {
        const currentXp = groupMap.get(item.group_code) || 0;
        groupMap.set(item.group_code, currentXp + (item.total_xp || 0));
      }
    });

    // Convert to array and add rank
    const groups = Array.from(groupMap.entries())
      .map(([group_code, total_xp]) => ({ group_code, total_xp }))
      .sort((a, b) => b.total_xp - a.total_xp)
      .map((group, index) => ({ ...group, rank: index + 1 }));

    return groups;
  },

  // Get user's rank in their group
  async getUserRankInGroup(userId: string): Promise<number | null> {
    const { data, error } = await supabase
      .from('group_leaderboard')
      .select('rank_in_group')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user rank:', error);
      return null;
    }

    return data?.rank_in_group || null;
  },
};
