import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, BookOpen, Send, Calendar, TrendingUp, Target } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { mockUser, events, aiSuggestedQuestions, weeklyProgress } from '../data/mockData';

export default function Dashboard() {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'ai', message: 'Hi Sarah! How can I help you today?' },
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    setChatHistory([...chatHistory, { type: 'user', message: chatMessage }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: 'Great question! Let me help you with that. Building confidence starts with small daily wins and celebrating your progress.'
      }]);
    }, 1000);
  };

  const getTimeUntil = (dateString: string) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diff = eventDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className="min-h-screen gradient-bg pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{mockUser.name}</span>!
          </h1>
          <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <GlassCard className="h-full">
              <h2 className="text-xl font-bold mb-4 gradient-text">Your Stats</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold gradient-text">{mockUser.xp} XP</span>
                    <span className="text-sm text-gray-600">Level {mockUser.level}</span>
                  </div>
                  <ProgressBar progress={(mockUser.xp % 500) / 5} showLabel />
                  <p className="text-xs text-gray-500 mt-1">{500 - (mockUser.xp % 500)} XP to next level</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full gradient-button flex items-center justify-center">
                    <Flame className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold gradient-text">{mockUser.streak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>

                <div className="relative pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{mockUser.modulesCompleted}/{mockUser.totalModules}</span>
                  </div>
                  <div className="w-32 h-32 mx-auto relative">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockUser.modulesCompleted / mockUser.totalModules)}`}
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#D946EF" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold gradient-text">
                        {Math.round((mockUser.modulesCompleted / mockUser.totalModules) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-strong rounded-xl p-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Group Rank</p>
                  <p className="text-xl font-bold gradient-text">#{1} in {mockUser.groupName}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <GlassCard className="h-full">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-iga-purple" size={24} />
                <h2 className="text-xl font-bold gradient-text">Upcoming Events</h2>
              </div>

              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="glass-strong rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{event.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                        <div className="mt-2 inline-block px-3 py-1 rounded-full gradient-button text-white text-xs font-medium">
                          {getTimeUntil(event.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="w-full text-center text-iga-purple font-semibold hover:text-iga-magenta transition-colors mt-2">
                  View All Events
                </button>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h2 className="text-xl font-bold gradient-text">Ask Nia</h2>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-96">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        chat.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'glass-strong text-gray-800'
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-xs text-gray-600 font-medium">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setChatMessage(question)}
                      className="glass-strong px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform text-gray-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 glass rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-800"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Send className="text-white" size={18} />
                </button>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <GlassCard className="h-full">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-iga-purple" size={24} />
                <h2 className="text-xl font-bold gradient-text">Analytics</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Weekly Progress</h3>
                  <div className="flex items-end justify-between space-x-2 h-32">
                    {weeklyProgress.map((week, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-iga-purple to-iga-magenta rounded-t-lg transition-all hover:opacity-80" style={{ height: `${(week.modules / 4) * 100}%` }}></div>
                        <p className="text-xs text-gray-600 mt-2">{week.modules}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {weeklyProgress.map((week) => (
                      <p key={week.week} className="text-xs text-gray-500">{week.week.replace('Week ', 'W')}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">7-Day Streak</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(7)].map((_, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg ${
                          index < mockUser.streak
                            ? 'bg-gradient-to-br from-iga-purple to-iga-magenta'
                            : 'glass'
                        } transition-all hover:scale-110`}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="glass-strong rounded-xl p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Badges</h3>
                  <div className="flex space-x-3">
                    {mockUser.badges.filter(b => b.earned).slice(0, 3).map((badge) => (
                      <div key={badge.id} className="text-center group">
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{badge.icon}</span>
                        </div>
                        <p className="text-xs text-gray-600">{badge.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <GlassCard>
            <h2 className="text-xl font-bold mb-4 gradient-text">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={BookOpen} label="Continue Learning" value="3 modules" gradient="from-blue-500 to-purple-500" />
              <StatCard icon={Target} label="Daily Goal" value="2/3" subValue="Complete 1 more" gradient="from-purple-500 to-fuchsia-500" />
              <StatCard icon={Trophy} label="Next Badge" value="75%" subValue="Entrepreneur" gradient="from-fuchsia-500 to-pink-400" />
              <StatCard icon={Flame} label="Streak Goal" value="14 days" subValue="7 more to beat record" gradient="from-orange-400 to-red-500" />
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
