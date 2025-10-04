import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard as Edit2, LogOut, Award, Calendar, Flame, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';

const badges = [
  { id: '1', name: 'First Steps', icon: '🎯' },
  { id: '2', name: 'Week Warrior', icon: '🔥' },
  { id: '3', name: 'Community Star', icon: '⭐' },
  { id: '4', name: 'Knowledge Seeker', icon: '📚' },
  { id: '5', name: 'Entrepreneur', icon: '💼' },
  { id: '6', name: 'Code Master', icon: '💻' },
  { id: '7', name: 'Leader', icon: '👑' },
  { id: '8', name: 'Mentor', icon: '🤝' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    showOnLeaderboard: user?.show_on_leaderboard ?? true,
    emailNotifications: user?.email_notifications ?? true,
  });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSaveChanges = async () => {
    if (!user) return;

    try {
      await userService.updateUserProfile(user.id, {
        name: formData.name,
        show_on_leaderboard: settings.showOnLeaderboard,
        email_notifications: settings.emailNotifications,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 gradient-primary"></div>

            <div className="relative pt-16 pb-6 px-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-4xl ring-4 ring-white shadow-xl">
                  👧🏽
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-3xl font-bold mb-2 gradient-text">{user.name}</h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <div className="px-3 py-1 rounded-full gradient-button text-white text-sm font-medium">
                      Level {user.current_level}
                    </div>
                    <div className="px-3 py-1 rounded-full glass-strong text-sm font-medium text-gray-700">
                      {user.group_code}
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center justify-center sm:justify-start space-x-1">
                    <Calendar size={16} />
                    <span>Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="glass-strong px-4 py-2 rounded-xl hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <Edit2 size={18} />
                  <span className="font-medium">Edit</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full gradient-button flex items-center justify-center mx-auto mb-3">
              <Target className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{user.total_xp}</p>
            <p className="text-sm text-gray-600">Total XP</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-3">
              <Flame className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{user.current_streak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mx-auto mb-3">
              <Award className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{user.completed_modules.length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-3">
              <Flame className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{user.longest_streak}</p>
            <p className="text-sm text-gray-600">Best Streak</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <GlassCard>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Badges & Achievements</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => {
                const earned = user.badges_earned.includes(badge.id);
                return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`relative group ${
                      earned ? 'opacity-100' : 'opacity-40 grayscale'
                    }`}
                  >
                    <div
                      className={`glass-strong rounded-2xl p-4 text-center transition-all ${
                        earned ? 'hover:scale-110 hover:glow-purple cursor-pointer' : ''
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full ${earned ? 'gradient-primary' : 'bg-gray-300'} flex items-center justify-center mx-auto mb-2 transition-transform group-hover:rotate-12`}>
                        <span className="text-3xl">{badge.icon}</span>
                      </div>
                      <p className="font-bold text-sm text-gray-800 mb-1">{badge.name}</p>
                      {!earned && (
                        <p className="text-xs text-gray-500">Locked</p>
                      )}
                    </div>

                    {earned && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-button flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 glass-strong rounded-xl p-4 text-center">
              <p className="text-gray-700">
                <span className="font-bold gradient-text">{user.badges_earned.length}</span> of{' '}
                <span className="font-bold">{badges.length}</span> badges earned
              </p>
              <div className="mt-2 w-full h-2 glass rounded-full overflow-hidden">
                <div
                  className="h-full gradient-button transition-all duration-500"
                  style={{ width: `${(user.badges_earned.length / badges.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <GlassCard>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Settings</h2>

            <div className="space-y-4">
              {isEditing && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Code</label>
                    <input
                      type="text"
                      value={user.group_code}
                      className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800"
                      disabled
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-800">Show on Leaderboard</p>
                  <p className="text-sm text-gray-600">Display your progress publicly</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, showOnLeaderboard: !settings.showOnLeaderboard })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    settings.showOnLeaderboard ? 'gradient-button' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      settings.showOnLeaderboard ? 'right-1' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates about your progress</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    settings.emailNotifications ? 'gradient-button' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      settings.emailNotifications ? 'right-1' : 'left-1'
                    }`}
                  ></div>
                </button>
              </div>

              {isEditing && (
                <div className="pt-4 flex space-x-4">
                  <GradientButton onClick={handleSaveChanges} fullWidth>
                    Save Changes
                  </GradientButton>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, email: user.email });
                      setSettings({
                        showOnLeaderboard: user.show_on_leaderboard,
                        emailNotifications: user.email_notifications,
                      });
                    }}
                    className="flex-1 glass-strong py-3 px-8 rounded-xl font-semibold hover:scale-105 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 glass-strong hover:bg-red-500/20 py-3 px-6 rounded-xl font-semibold text-red-600 hover:text-red-700 transition-all"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
