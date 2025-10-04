import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { posts, leaderboardData, mockUser } from '../data/mockData';

export default function Community() {
  const [newPost, setNewPost] = useState('');
  const [communityPosts, setCommunityPosts] = useState(posts);

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

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      userId: 'currentUser',
      userName: mockUser.name,
      userAvatar: '👧🏽',
      content: newPost,
      timestamp: new Date().toISOString(),
      reactions: {},
    };

    setCommunityPosts([post, ...communityPosts]);
    setNewPost('');
  };

  const handleReaction = (postId: number, reaction: string) => {
    setCommunityPosts(
      communityPosts.map((post) => {
        if (post.id === postId) {
          const currentCount = post.reactions[reaction] || 0;
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reaction]: currentCount + 1,
            },
          };
        }
        return post;
      })
    );
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
                        {post.userAvatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-gray-800">{post.userName}</h3>
                          <span className="text-sm text-gray-500">{getTimeAgo(post.timestamp)}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>

                        <div className="flex flex-wrap gap-2">
                          {reactionOptions.map((reaction) => {
                            const count = post.reactions[reaction] || 0;
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
                <h2 className="text-xl font-bold mb-6 gradient-text">Group Progress</h2>

                <div className="space-y-4">
                  {leaderboardData.map((group, index) => (
                    <motion.div
                      key={group.groupName}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`relative ${
                        group.isUserGroup ? 'glass-strong ring-2 ring-iga-purple/50 glow-purple' : 'glass'
                      } rounded-xl p-4 transition-all hover:scale-[1.02]`}
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
                          #{group.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold truncate ${group.isUserGroup ? 'gradient-text' : 'text-gray-800'}`}>
                            {group.groupName}
                          </h3>
                          <p className="text-sm text-gray-600">{group.xp.toLocaleString()} XP</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full h-2 glass rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-button transition-all duration-500"
                            style={{ width: `${(group.xp / leaderboardData[0].xp) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {group.isUserGroup && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg">⭐</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 glass-strong rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Your Group</p>
                  <p className="text-xl font-bold gradient-text">{mockUser.groupName}</p>
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
