import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, BookOpen, Calendar as CalendarIcon, TrendingUp, Target, Award, Clock, Star, Users, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import Calendar from '../components/Calendar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { HARDCODED_EVENTS } from '../data/hardcodedData';
import { Event } from '../types/database';

const weeklyProgress = [
  { week: 'Week 1', modules: 2 },
  { week: 'Week 2', modules: 3 },
  { week: 'Week 3', modules: 4 },
  { week: 'Week 4', modules: 3 },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showSisterTalk, setShowSisterTalk] = useState(false);
  const [showSisterTalkNotification, setShowSisterTalkNotification] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Use hardcoded events data - no database needed!
    setEvents(HARDCODED_EVENTS);

    // Show welcome video for demo users (only once per session)
    if (user.id.startsWith('demo-')) {
      const hasSeenVideo = sessionStorage.getItem('iga-welcome-video-seen');
      if (!hasSeenVideo) {
        setShowWelcomeVideo(true);
      }
    }
  }, [user]);

  // Tour steps definition
  const tourSteps = [
    {
      path: '/dashboard',
      title: 'Welcome to Your Dashboard!',
      description: 'This is your personal dashboard where you can track your progress, XP, streaks, and upcoming events.'
    },
    {
      path: '/learning',
      title: 'Learning Modules',
      description: 'Explore our learning programs including NIA Empowerment Academy, UJIMA Business Program, and more!'
    },
    {
      path: '/community',
      title: 'Community',
      description: 'Connect with other students, share your achievements, and participate in discussions.'
    },
    {
      path: '/resources',
      title: 'Resources',
      description: 'Find local IGA chapters, online communities, and helpful resources near you.'
    },
    {
      path: '/profile',
      title: 'Your Profile',
      description: 'Manage your account settings, view your badges, and track your achievements.'
    }
  ];

  const handleCloseVideo = () => {
    setShowWelcomeVideo(false);
    sessionStorage.setItem('iga-welcome-video-seen', 'true');
    // Start tour after video closes
    setShowTour(true);
    setTourStep(0);
  };

  const handleTourNext = () => {
    if (tourStep < tourSteps.length - 1) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      navigate(tourSteps[nextStep].path);
    } else {
      // Tour complete, go back to dashboard
      setShowTour(false);
      navigate('/dashboard');
    }
  };

  // Show Sister Talk notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSisterTalkNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
            {t('dashboard.welcome')}, <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-gray-600 text-lg">{t('dashboard.subtitle')}</p>
        </motion.div>

        {/* First Row: Stats + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold gradient-text">{t('dashboard.yourStats')}</h2>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span className="text-sm font-bold text-gray-700">{t('dashboard.level')} {user.current_level}</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* XP Progress Bar - Full Width */}
                <div className="glass-strong rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Trophy className="text-white" size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">{t('dashboard.experiencePoints')}</p>
                        <p className="text-xl font-bold gradient-text">{user.total_xp} XP</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{t('dashboard.nextLevel')}</p>
                      <p className="text-sm font-bold text-iga-purple">{500 - (user.total_xp % 500)} XP</p>
                    </div>
                  </div>
                  <div className="relative">
                    <ProgressBar progress={(user.total_xp % 500) / 5} showLabel />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{t('dashboard.lvl')} {user.current_level}</span>
                      <span className="text-xs font-medium gradient-text">{Math.round((user.total_xp % 500) / 5)}%</span>
                      <span className="text-xs text-gray-500">{t('dashboard.lvl')} {user.current_level + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Grid of Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Streak */}
                  <div className="glass-strong rounded-xl p-3 hover:scale-105 transition-transform">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-2">
                      <Flame className="text-white" size={16} />
                    </div>
                    <p className="text-2xl font-bold gradient-text">{user.current_streak}</p>
                    <p className="text-xs text-gray-600">{t('dashboard.dayStreak')}</p>
                    <div className="mt-2 flex items-center space-x-1">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                          style={{ width: `${(user.current_streak / user.longest_streak) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="glass-strong rounded-xl p-3 hover:scale-105 transition-transform">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mb-2">
                      <Award className="text-white" size={16} />
                    </div>
                    <p className="text-2xl font-bold gradient-text">{user.badges_earned.length}</p>
                    <p className="text-xs text-gray-600">{t('dashboard.badges')}</p>
                    <div className="mt-2 flex -space-x-1">
                      {['🎯', '🔥', '⭐', '📚', '💼'].slice(0, 3).map((emoji, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-xs">
                          {emoji}
                        </div>
                      ))}
                      {user.badges_earned.length > 3 && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                          +{user.badges_earned.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Study Time */}
                  <div className="glass-strong rounded-xl p-3 hover:scale-105 transition-transform">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2">
                      <Clock className="text-white" size={16} />
                    </div>
                    <p className="text-2xl font-bold gradient-text">{user.completed_modules.length * 25}m</p>
                    <p className="text-xs text-gray-600">{t('dashboard.studyTime')}</p>
                    <p className="text-xs text-green-600 font-medium mt-2">{t('dashboard.thisWeekUp')}</p>
                  </div>
                </div>

                {/* Progress and Group Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-strong rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                          <Target className="text-white" size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">{t('dashboard.progress')}</p>
                          <p className="text-sm font-bold gradient-text">{user.completed_modules.length}/{totalModules}</p>
                        </div>
                      </div>
                      <div className="w-16 h-16 relative">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-gray-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionPercentage)}`}
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
                          <span className="text-sm font-bold gradient-text">
                            {Math.round(completionPercentage * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl p-3 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                        <Users className="text-white" size={16} />
                      </div>
                      <p className="text-xs font-medium text-gray-700">{t('dashboard.yourGroup')}</p>
                    </div>
                    <p className="text-xl font-bold gradient-text">{user.group_code}</p>
                    <p className="text-xs text-gray-600 mt-1">🏆 {t('dashboard.topNationwide')}</p>
                  </div>
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
              <div className="flex items-center space-x-2 mb-3">
                <CalendarIcon className="text-iga-purple" size={20} />
                <h2 className="text-lg font-bold gradient-text">{t('dashboard.calendar')}</h2>
              </div>
              <div className="scale-90 -mt-2">
                <Calendar
                  events={events.map(event => ({
                    date: new Date(event.event_date),
                    title: event.title,
                    color: 'purple'
                  }))}
                />
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-iga-purple" size={24} />
                  <h2 className="text-xl font-bold gradient-text">{t('dashboard.analytics')}</h2>
                </div>
                <div className="text-xs text-gray-500">{t('dashboard.lastDays')}</div>
              </div>

              <div className="space-y-6">
                {/* Weekly Progress Chart */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">{t('dashboard.weeklyCompletion')}</h3>
                    <span className="text-xs px-2 py-1 rounded-full glass-strong text-iga-purple font-medium">
                      +{weeklyProgress.reduce((sum, w) => sum + w.modules, 0)} {t('dashboard.thisMonth')}
                    </span>
                  </div>
                  <div className="glass-strong rounded-xl p-4">
                    <div className="flex items-end justify-between space-x-3 h-40">
                      {weeklyProgress.map((week, index) => {
                        const maxModules = Math.max(...weeklyProgress.map(w => w.modules));
                        const height = (week.modules / maxModules) * 100;
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center justify-end group">
                            <div className="relative w-full">
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                                  <p className="font-bold">{week.modules} {t('dashboard.modulesCount')}</p>
                                  <p className="text-gray-300">{week.week}</p>
                                </div>
                              </div>
                              {/* Bar container with shadow base */}
                              <div className="relative w-full">
                                {/* Shadow/base layer */}
                                <div
                                  className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-t-lg blur-sm"
                                  style={{ height: `${height}%`, minHeight: '20px', transform: 'translateY(4px)' }}
                                ></div>
                                {/* Main bar */}
                                <div
                                  className="relative w-full bg-gradient-to-t from-iga-purple via-iga-magenta to-iga-pink rounded-t-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
                                  style={{
                                    height: `${height}%`,
                                    minHeight: '20px',
                                    boxShadow: '0 -4px 20px rgba(139, 92, 246, 0.4), inset 0 -2px 10px rgba(255, 255, 255, 0.3)'
                                  }}
                                >
                                  {/* Shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60"></div>
                                  {/* Animated shimmer */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                  {/* Hover highlight */}
                                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                  {/* Inner glow */}
                                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent"></div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 text-center">
                              <p className="text-lg font-bold gradient-text">{week.modules}</p>
                              <p className="text-xs text-gray-500 mt-1">{week.week.replace(t('dashboard.week') + ' ', 'W')}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-strong rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <Flame className="text-white" size={16} />
                      </div>
                      <h3 className="text-xs font-medium text-gray-700">{t('dashboard.streak')}</h3>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {[...Array(7)].map((_, index) => (
                        <div
                          key={index}
                          className={`aspect-square rounded-sm ${
                            index < user.current_streak
                              ? 'bg-gradient-to-br from-orange-400 to-red-500'
                              : 'bg-gray-200'
                          } transition-all hover:scale-110`}
                          title={`Day ${index + 1}`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xl font-bold gradient-text">{user.current_streak} {t('dashboard.days')}</p>
                  </div>

                  <div className="glass-strong rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                        <Trophy className="text-white" size={16} />
                      </div>
                      <h3 className="text-xs font-medium text-gray-700">{t('dashboard.badges')}</h3>
                    </div>
                    <div className="flex items-baseline space-x-1 mb-2">
                      <span className="text-3xl font-bold gradient-text">{user.badges_earned.length}</span>
                      <span className="text-gray-500 text-xs">/12</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                        style={{ width: `${(user.badges_earned.length / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Target className="text-white" size={16} />
                      </div>
                      <h3 className="text-xs font-medium text-gray-700">{t('dashboard.rank')}</h3>
                    </div>
                    <div className="flex items-baseline space-x-1 mb-2">
                      <span className="text-3xl font-bold gradient-text">#{Math.floor(Math.random() * 10) + 1}</span>
                      <span className="text-gray-500 text-xs">{t('dashboard.inGroup')}</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">↑ 2 {t('dashboard.spotsThisWeek')}</p>
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
                <h2 className="text-xl font-bold gradient-text">{t('dashboard.upcomingEvents')}</h2>
              </div>

              <div className="space-y-3">
                {events.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">{t('dashboard.noEvents')}</p>
                ) : (
                  (showAllEvents ? events : events.slice(0, 4)).map((event) => (
                    <div key={event.id} className="glass-strong rounded-xl p-3 hover:scale-105 transition-transform">
                      <div className="flex items-start space-x-2">
                        <span className="text-xl">{getEventIcon(event.event_type)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1">{event.title}</h3>
                          <p className="text-xs text-gray-600">
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </p>
                          <div className="mt-1 inline-block px-2 py-0.5 rounded-full gradient-button text-white text-xs font-medium">
                            {getTimeUntil(event.event_date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {events.length > 4 && (
                  <button
                    onClick={() => setShowAllEvents(!showAllEvents)}
                    className="w-full text-center text-iga-purple font-semibold hover:text-iga-magenta transition-colors mt-2"
                  >
                    {showAllEvents ? t('dashboard.showLess') : `${t('dashboard.viewAllEvents')} (${events.length})`}
                  </button>
                )}
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
            <h2 className="text-xl font-bold mb-4 gradient-text">{t('dashboard.quickActions')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={BookOpen} label={t('dashboard.continueLearning')} value={`3 ${t('dashboard.modules')}`} gradient="from-blue-500 to-purple-500" />
              <StatCard icon={Target} label={t('dashboard.dailyGoal')} value="2/3" subValue={t('dashboard.completeMore')} gradient="from-purple-500 to-fuchsia-500" />
              <StatCard icon={Trophy} label={t('dashboard.nextBadge')} value="75%" subValue={t('dashboard.entrepreneur')} gradient="from-fuchsia-500 to-pink-400" />
              <StatCard icon={Flame} label={t('dashboard.streakGoal')} value={`${user.longest_streak} ${t('dashboard.days')}`} subValue={`${user.longest_streak - user.current_streak} ${t('dashboard.moreToBeat')}`} gradient="from-orange-400 to-red-500" />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Floating Chatbot */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[620px] z-50 rounded-xl overflow-hidden shadow-2xl glass-strong">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/eoKA9EuTHDwIP-F7SBOZI"
            width="100%"
            style={{ height: '100%' }}
            frameBorder={0}
          ></iframe>
        </div>
      )}

      {/* Sister Talk Modal */}
      {showSisterTalk && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👭</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text mb-2">Sister Talk</h2>
              <p className="text-gray-700 mb-6">
                Join our weekly Sister Talk session! Connect with fellow students, share experiences, and grow together.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-100">
                <p className="text-sm text-gray-800 font-medium mb-2">📅 Every Friday at 6:00 PM EST</p>
                <p className="text-sm text-gray-800 font-medium">🎯 Topics: Empowerment, Goals, Support</p>
              </div>

              <a
                href="https://zoom.us/j/yourmeetingid"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 rounded-xl gradient-button text-white font-semibold hover:scale-105 transition-transform mb-3"
              >
                Join Zoom Meeting
              </a>

              <button
                onClick={() => setShowSisterTalk(false)}
                className="w-full py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 hover:scale-105 transition-all"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-button text-white shadow-lg hover:scale-105 transition-transform focus:outline-none"
        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
      >
        {isChatOpen ? '×' : '💬'}
      </button>

      {/* Sister Talk Button */}
      <button
        onClick={() => {
          setShowSisterTalk(true);
          setShowSisterTalkNotification(false);
        }}
        className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg hover:scale-105 transition-transform focus:outline-none relative"
        aria-label="Sister Talk"
      >
        <span className="text-2xl">👭</span>
        {showSisterTalkNotification && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold animate-pulse">!</span>
          </motion.div>
        )}
      </button>

      {/* Sister Talk Popup Notification */}
      {showSisterTalkNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-24 z-50 glass-strong rounded-xl p-4 shadow-2xl max-w-xs"
        >
          <button
            onClick={() => setShowSisterTalkNotification(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">👭</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Sister Talk Available!</h3>
              <p className="text-sm text-gray-600 mb-3">
                Join our weekly empowerment session this Friday at 6 PM!
              </p>
              <button
                onClick={() => {
                  setShowSisterTalk(true);
                  setShowSisterTalkNotification(false);
                }}
                className="text-sm font-semibold gradient-text hover:underline"
              >
                Learn More →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Welcome Video Modal */}
      {showWelcomeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 py-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 relative p-6">
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
              >
                <X size={24} className="text-gray-700" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">IGA</span>
                </div>
                <h2 className="text-3xl font-bold mb-2 gradient-text">Welcome to IGA!</h2>
                <p className="text-gray-700 text-lg">Learn more about our mission and community</p>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Xr117r9anUk"
                  title="Welcome to IGA"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <button
                onClick={handleCloseVideo}
                className="w-full py-3 px-6 rounded-xl gradient-button text-white font-semibold hover:scale-105 transition-transform"
              >
                Let's Get Started!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Tour Overlay */}
      {showTour && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4 py-8"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-lg"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 relative p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{tourStep + 1}/5</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 gradient-text">{tourSteps[tourStep].title}</h2>
                <p className="text-gray-700">{tourSteps[tourStep].description}</p>
              </div>

              <button
                onClick={handleTourNext}
                className="w-full py-3 px-6 rounded-xl gradient-button text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
              >
                <span>{tourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
