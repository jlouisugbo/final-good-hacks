import { supabase } from '../lib/supabase';
import { CommunityPost } from '../types/database';

export interface PostWithUser extends CommunityPost {
  user?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

export const communityService = {
  // Get all community posts with user info
  async getPosts(limit: number = 50): Promise<PostWithUser[]> {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        user:users!community_posts_user_id_fkey (
          id,
          name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data as PostWithUser[] || [];
  },

  // Create a new post
  async createPost(userId: string, content: string, postType?: string): Promise<CommunityPost | null> {
    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        user_id: userId,
        content,
        post_type: postType,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }

    return data;
  },

  // Add reaction to a post
  async addReaction(postId: string, userId: string, reaction: string): Promise<CommunityPost | null> {
    // First, get the current post
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      console.error('Error fetching post:', fetchError);
      throw fetchError;
    }

    // Update reactions count
    const reactions = post.reactions as Record<string, number> || {};
    const reactionUsers = post.reaction_users as Array<{ userId: string; reaction: string }> || [];

    // Check if user already reacted with this reaction
    const existingReaction = reactionUsers.find(
      (r) => r.userId === userId && r.reaction === reaction
    );

    if (existingReaction) {
      // User already reacted, so remove reaction
      reactions[reaction] = Math.max(0, (reactions[reaction] || 0) - 1);
      const updatedReactionUsers = reactionUsers.filter(
        (r) => !(r.userId === userId && r.reaction === reaction)
      );

      const { data, error } = await supabase
        .from('community_posts')
        .update({
          reactions,
          reaction_users: updatedReactionUsers,
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Add new reaction
      reactions[reaction] = (reactions[reaction] || 0) + 1;
      reactionUsers.push({ userId, reaction });

      const { data, error } = await supabase
        .from('community_posts')
        .update({
          reactions,
          reaction_users: reactionUsers,
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  // Subscribe to real-time post updates
  subscribeToPostUpdates(callback: (payload: any) => void) {
    const channel = supabase
      .channel('community_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_posts',
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  // Delete a post (user can only delete their own posts)
  async deletePost(postId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }

    return true;
  },
};
