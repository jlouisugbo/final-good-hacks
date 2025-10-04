import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { useAuth } from '../context/AuthContext';
import { communityService, PostWithUser } from '../services/communityService';
import { leaderboardService } from '../services/leaderboardService';
import { GroupLeaderboard } from '../types/database';

export default function Community() {
  const { user, loading } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [communityPosts, setCommunityPosts] = useState<PostWithUser[]>([]);
  const [leaderboard, setLeaderboard] = useState<GroupLeaderboard[]>([]);

  const reactionOptions = [
    'You go girl! 💪',
    'Congratulations! 🎉',
    'So proud! ❤️',
    'Keep it up! 🔥',
  ];

  const postTemplates = [
    'I completed a module! 🎯',
    'Earned a new badge! 🏆',
    'Share a thought 💭',
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch posts
      const posts = await communityService.getPosts();
      setCommunityPosts(posts);

      // Fetch leaderboard
      const groupData = await leaderboardService.getGroupLeaderboard(user.group_code);
      setLeaderboard(groupData);
    };

    fetchData();

    // Subscribe to real-time updates
    const unsubscribe = communityService.subscribeToPostUpdates((payload) => {
      if (payload.eventType === 'INSERT') {
        // Fetch the new post with user data
        communityService.getPosts(50).then(setPommunityPosts);
      } else if (payload.eventType === 'UPDATE') {
        setCommunityPosts(prev =>
          prev.map(post =>
            post.id === payload.new.id ? { ...post, ...payload.new } : post
          )
        );
      } else if (payload.eventType === 'DELETE') {
        setCommunityPosts(prev => prev.filter(post => post.id !== payload.old.id));
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmitPost = async () => {
    if (!newPost.trim() || !user) return;

    try {
      await communityService.createPost(user.id, newPost);
      setNewPost('');
      // The real-time subscription will update the posts automatically
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleReaction = async (postId: string, reaction: string) => {
    if (!user) return;

    try {
      await communityService.addReaction(postId, user.id, reaction);
      // Refetch posts to get updated reactions
      const posts = await communityService.getPosts();
      setCommunityPosts(posts);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diff = now.getTime() - posted.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen gradient-bg pt-20 px-4 sm:px-6 lg:px-8 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">IGA</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">Community</h1>
          <p className="text-gray-600 text-lg">Celebrate wins and connect with your sisters</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard>
                <h2 className="text-xl font-bold mb-4 gradient-text">Share Your Win!</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {postTemplates.map((template) => (
                    <button
                      key={template}
                      onClick={() => setNewPost(template)}
                      className="glass-strong px-4 py-2 rounded-full hover:scale-105 transition-transform text-sm font-medium text-gray-700"
                    >
                      {template}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value.slice(0, 280))}
                    placeholder="What's on your mind?"
                    className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 glass-strong rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                        <Smile size={18} className="text-gray-600" />
                      </button>
                      <span className="text-sm text-gray-600">{newPost.length}/280</span>
                    </div>
                    <GradientButton onClick={handleSubmitPost} className="py-2 px-6">
                      <div className="flex items-center space-x-2">
                        <Send size={16} />
                        <span>Post</span>
                      </div>
                    </GradientButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <div className="space-y-4">
              {communityPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <GlassCard hover>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-2xl flex-shrink-0 ring-2 ring-white/50">
                        {post.user?.avatar_url ? (
                          <img src={post.user.avatar_url} alt={post.user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span>👧🏽</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-gray-800">{post.user?.name || 'Anonymous'}</h3>
                          <span className="text-sm text-gray-500">{getTimeAgo(post.created_at)}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>

                        <div className="flex flex-wrap gap-2">
                          {reactionOptions.map((reaction) => {
                            const reactions = post.reactions as Record<string, number> || {};
                            const count = reactions[reaction] || 0;
                            return (
                              <button
                                key={reaction}
                                onClick={() => handleReaction(post.id, reaction)}
                                className="glass-strong px-3 py-1 rounded-full hover:scale-105 hover:bg-white/30 transition-all text-sm font-medium flex items-center space-x-1"
                              >
                                <span>{reaction}</span>
                                {count > 0 && (
                                  <span className="ml-1 text-xs gradient-text font-bold">{count}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <GlassCard>
                <h2 className="text-xl font-bold mb-6 gradient-text">Group Leaderboard</h2>

                <div className="space-y-4">
                  {leaderboard.map((member, index) => (
                    <motion.div
                      key={`${member.name}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="glass rounded-xl p-4 transition-all hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                              : index === 1
                              ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                              : index === 2
                              ? 'bg-gradient-to-r from-orange-400 to-orange-600'
                              : 'gradient-primary'
                          }`}
                        >
                          #{member.rank_in_group}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate text-gray-800">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-600">{member.total_xp?.toLocaleString() || 0} XP</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full h-2 glass rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-button transition-all duration-500"
                            style={{ width: `${leaderboard[0] ? ((member.total_xp || 0) / (leaderboard[0].total_xp || 1)) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 glass-strong rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Your Group</p>
                  <p className="text-xl font-bold gradient-text">{user.group_code}</p>
                  <p className="text-sm text-gray-600 mt-1">Keep up the great work!</p>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
