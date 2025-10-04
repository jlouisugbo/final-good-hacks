import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard as Edit2, LogOut, Award, Calendar, Flame, Target } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { mockUser } from '../data/mockData';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    showOnLeaderboard: mockUser.showOnLeaderboard,
    emailNotifications: mockUser.emailNotifications,
  });

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
                  <h1 className="text-3xl font-bold mb-2 gradient-text">{mockUser.name}</h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <div className="px-3 py-1 rounded-full gradient-button text-white text-sm font-medium">
                      Level {mockUser.level}
                    </div>
                    <div className="px-3 py-1 rounded-full glass-strong text-sm font-medium text-gray-700">
                      {mockUser.groupName}
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center justify-center sm:justify-start space-x-1">
                    <Calendar size={16} />
                    <span>Member since {new Date(mockUser.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
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
            <p className="text-3xl font-bold gradient-text mb-1">{mockUser.xp}</p>
            <p className="text-sm text-gray-600">Total XP</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-3">
              <Flame className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{mockUser.streak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mx-auto mb-3">
              <Award className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{mockUser.modulesCompleted}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-3">
              <Flame className="text-white" size={24} />
            </div>
            <p className="text-3xl font-bold gradient-text mb-1">{mockUser.longestStreak}</p>
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
              {mockUser.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`relative group ${
                    badge.earned ? 'opacity-100' : 'opacity-40 grayscale'
                  }`}
                >
                  <div
                    className={`glass-strong rounded-2xl p-4 text-center transition-all ${
                      badge.earned ? 'hover:scale-110 hover:glow-purple cursor-pointer' : ''
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full ${badge.earned ? 'gradient-primary' : 'bg-gray-300'} flex items-center justify-center mx-auto mb-2 transition-transform group-hover:rotate-12`}>
                      <span className="text-3xl">{badge.icon}</span>
                    </div>
                    <p className="font-bold text-sm text-gray-800 mb-1">{badge.name}</p>
                    {badge.earned && badge.date && (
                      <p className="text-xs text-gray-600">
                        {new Date(badge.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    )}
                    {!badge.earned && (
                      <p className="text-xs text-gray-500">Locked</p>
                    )}
                  </div>

                  {badge.earned && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-button flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 glass-strong rounded-xl p-4 text-center">
              <p className="text-gray-700">
                <span className="font-bold gradient-text">{mockUser.badges.filter(b => b.earned).length}</span> of{' '}
                <span className="font-bold">{mockUser.badges.length}</span> badges earned
              </p>
              <div className="mt-2 w-full h-2 glass rounded-full overflow-hidden">
                <div
                  className="h-full gradient-button transition-all duration-500"
                  style={{ width: `${(mockUser.badges.filter(b => b.earned).length / mockUser.badges.length) * 100}%` }}
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
                      defaultValue={mockUser.name}
                      className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Code</label>
                    <input
                      type="text"
                      defaultValue={mockUser.groupCode}
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
                  <GradientButton onClick={() => setIsEditing(false)} fullWidth>
                    Save Changes
                  </GradientButton>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 glass-strong py-3 px-8 rounded-xl font-semibold hover:scale-105 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <button className="w-full flex items-center justify-center space-x-2 glass-strong hover:bg-red-500/20 py-3 px-6 rounded-xl font-semibold text-red-600 hover:text-red-700 transition-all">
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
