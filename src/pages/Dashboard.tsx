import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, BookOpen, Calendar as CalendarIcon, TrendingUp, Target } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import Calendar from '../components/Calendar';
import ChatbotModal from '../components/ChatbotModal';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';
import { userService } from '../services/userService';
import { Event } from '../types/database';

const weeklyProgress = [
  { week: 'Week 1', modules: 2 },
  { week: 'Week 2', modules: 3 },
  { week: 'Week 3', modules: 4 },
  { week: 'Week 4', modules: 3 },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch upcoming events
      const upcomingEvents = await eventService.getUpcomingEvents(3);
      setEvents(upcomingEvents);

      // Update streak if needed
      await userService.updateStreak(user.id);
    };

    fetchData();
  }, [user]);

  const getTimeUntil = (dateString: string) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diff = eventDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getEventIcon = (eventType: string | null) => {
    switch (eventType) {
      case 'workshop':
        return '🎤';
      case 'deadline':
        return '📝';
      case 'event':
        return '🎉';
      default:
        return '📅';
    }
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

  const totalModules = 48; // This could be fetched from modules count
  const completionPercentage = user.completed_modules.length / totalModules;

  return (
    <div className="min-h-screen gradient-bg pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
        </motion.div>

        {/* First Row: Stats + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="h-full">
              <h2 className="text-xl font-bold mb-4 gradient-text">Your Stats</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-strong rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold gradient-text">{user.total_xp} XP</span>
                    <span className="text-xs text-gray-600">Level {user.current_level}</span>
                  </div>
                  <ProgressBar progress={(user.total_xp % 500) / 5} showLabel />
                  <p className="text-xs text-gray-500 mt-1">{500 - (user.total_xp % 500)} XP to next level</p>
                </div>

                <div className="glass-strong rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full gradient-button flex items-center justify-center">
                      <Flame className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold gradient-text">{user.current_streak}</p>
                      <p className="text-xs text-gray-600">Day Streak</p>
                    </div>
                  </div>
                </div>

                <div className="glass-strong rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium gradient-text">{user.completed_modules.length}/{totalModules}</span>
                  </div>
                  <div className="w-24 h-24 mx-auto relative">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage)}`}
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
                      <span className="text-xl font-bold gradient-text">
                        {Math.round(completionPercentage * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-strong rounded-xl p-4 flex flex-col justify-center">
                  <p className="text-xs font-medium text-gray-700 mb-1">Group</p>
                  <p className="text-lg font-bold gradient-text">{user.group_code}</p>
                  <p className="text-xs text-gray-600">Your Group</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center space-x-2 mb-4">
                <CalendarIcon className="text-iga-purple" size={24} />
                <h2 className="text-xl font-bold gradient-text">Calendar</h2>
              </div>
              <Calendar
                events={events.map(event => ({
                  date: new Date(event.event_date),
                  title: event.title,
                  color: 'purple'
                }))}
              />
            </GlassCard>
          </motion.div>
        </div>

        {/* Second Row: Analytics + Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-iga-purple" size={24} />
                <h2 className="text-xl font-bold gradient-text">Analytics</h2>
              </div>

              <div className="space-y-6">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-strong rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">7-Day Streak</h3>
                    <div className="grid grid-cols-7 gap-1">
                      {[...Array(7)].map((_, index) => (
                        <div
                          key={index}
                          className={`aspect-square rounded ${
                            index < user.current_streak
                              ? 'bg-gradient-to-br from-iga-purple to-iga-magenta'
                              : 'glass'
                          } transition-all hover:scale-110`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Badges Earned</h3>
                    <div className="flex space-x-2 justify-center items-center h-10">
                      <span className="text-3xl font-bold gradient-text">{user.badges_earned.length}</span>
                      <span className="text-gray-600 text-sm">badges</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center space-x-2 mb-4">
                <CalendarIcon className="text-iga-purple" size={24} />
                <h2 className="text-xl font-bold gradient-text">Upcoming Events</h2>
              </div>

              <div className="space-y-3">
                {events.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">No upcoming events</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="glass-strong rounded-xl p-4 hover:scale-105 transition-transform">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{getEventIcon(event.event_type)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </p>
                          <div className="mt-2 inline-block px-3 py-1 rounded-full gradient-button text-white text-xs font-medium">
                            {getTimeUntil(event.event_date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <button className="w-full text-center text-iga-purple font-semibold hover:text-iga-magenta transition-colors mt-2">
                  View All Events
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Third Row: Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-xl font-bold mb-4 gradient-text">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={BookOpen} label="Continue Learning" value="3 modules" gradient="from-blue-500 to-purple-500" />
              <StatCard icon={Target} label="Daily Goal" value="2/3" subValue="Complete 1 more" gradient="from-purple-500 to-fuchsia-500" />
              <StatCard icon={Trophy} label="Next Badge" value="75%" subValue="Entrepreneur" gradient="from-fuchsia-500 to-pink-400" />
              <StatCard icon={Flame} label="Streak Goal" value={`${user.longest_streak} days`} subValue={`${user.longest_streak - user.current_streak} more to beat record`} gradient="from-orange-400 to-red-500" />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Floating Chatbot */}
      <ChatbotModal />
    </div>
  );
}
