import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle, X, ArrowRight, Sparkles, Briefcase, Trophy, Globe, Users, Target, Wallet } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { HARDCODED_MODULES } from '../data/hardcodedData';
import { Module } from '../types/database';

interface ModuleWithProgress extends Module {
  completed: boolean;
}

interface CategoryCard {
  name: string;
  description: string;
  imageUrl: string;
  progress: number;
  isLocked: boolean;
  moduleCount: number;
  icon: any;
}

export default function Learning() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryCard | null>(null);
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);

  // Define main program categories with hardcoded progress
  const mainCategories: CategoryCard[] = [
    {
      name: 'NIA Empowerment Academy',
      description: 'Build confidence, leadership skills, and emotional intelligence through the principles of Nguzo Saba',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop',
      progress: 65,
      isLocked: false,
      moduleCount: 4,
      icon: Sparkles,
    },
    {
      name: 'UJIMA Business Program',
      description: 'Learn entrepreneurship, financial literacy, and business fundamentals from industry experts',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      progress: 45,
      isLocked: false,
      moduleCount: 5,
      icon: Briefcase,
    },
    {
      name: 'Kumbathon',
      description: 'Participate in creative challenges, hackathons, and collaborative projects with your peers',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      progress: 0,
      isLocked: true,
      moduleCount: 3,
      icon: Trophy,
    },
    {
      name: 'NIA Global Academy',
      description: 'Explore global cultures, international leadership, and community building across borders',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      progress: 30,
      isLocked: false,
      moduleCount: 3,
      icon: Globe,
    },
  ];

  // Additional learning modules
  const additionalCategories: CategoryCard[] = [
    {
      name: 'Leadership Skills',
      description: 'Develop essential leadership qualities and team management skills.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      progress: 20,
      isLocked: false,
      moduleCount: 6,
      icon: Users,
    },
    {
      name: 'Business Tactics',
      description: 'Learn advanced business strategies and entrepreneurial tactics.',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      progress: 15,
      isLocked: false,
      moduleCount: 5,
      icon: Target,
    },
    {
      name: 'Financial Literacy',
      description: 'Master money management, budgeting, and financial planning.',
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop',
      progress: 10,
      isLocked: false,
      moduleCount: 4,
      icon: Wallet,
    },
  ];

  useEffect(() => {
    if (!user) return;

    // Use hardcoded modules data - no database needed!
    const modulesWithProgress = HARDCODED_MODULES.map(module => ({
      ...module,
      completed: user.completed_modules.includes(module.id)
    }));

    setModules(modulesWithProgress);
  }, [user]);

  const getModulesByCategory = (category: string) => {
    return modules.filter(m => m.category === category);
  };

  const getCategoryModules = (categoryName: string) => {
    // Map category card names to module categories
    const categoryMap: Record<string, string> = {
      'NIA Empowerment Academy': 'NIA Empowerment',
      'UJIMA Business Program': 'UJIMA Business',
      'Kumbathon': 'Kumbathon',
      'NIA Global Academy': 'NIA Global Academy',
    };

    const moduleCategoryName = categoryMap[categoryName];
    return modules.filter(m => m.category === moduleCategoryName);
  };

  // Sample YouTube videos for modules (educational content)
  const getYouTubeVideo = (moduleId: string) => {
    const videos = [
      'y2GwrR-4Q9E', // What is Leadership?
      'qp0HIF3SfI4', // How to Build Confidence
      'frAEmhqdLFs', // Entrepreneurship 101
      'Iw3g8xNYu18', // Goal Setting Tips
      '3KJ7N6UU3Og', // What is STEM?
      'kPRA0W1kECg', // How to Start a Business
      'NGbF7KeXF2E', // Financial Literacy Basics
      'jjF8RflzBEk', // Problem Solving Skills
      'LtIFareWR5o', // Time Management
      'XZUoCpx8jag', // Communication Skills
    ];
    // Use module ID to consistently get same video
    const index = parseInt(moduleId.replace(/\D/g, '') || '0') % videos.length;
    return videos[index];
  };

  const selectedModuleData = selectedModule ? modules.find(m => m.id === selectedModule) : null;

  const handleCompleteModule = (moduleId: string) => {
    if (!user) return;

    const module = modules.find(m => m.id === moduleId);
    if (!module || module.completed) return;

    // Update local state - using hardcoded data, no database call needed
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, completed: true } : m
    ));
    setSelectedModule(null);
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
          <h1 className="text-4xl font-bold mb-2 gradient-text">{t('learning.title')}</h1>
          <p className="text-gray-600 text-lg">{t('learning.subtitle')}</p>
        </motion.div>


        {/* Main Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('learning.mainPrograms')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <GlassCard
                    className="overflow-hidden h-full group hover:scale-105 transition-all duration-500 cursor-pointer relative"
                    onClick={() => !category.isLocked && setSelectedCategory(category)}
                  >
                    {category.isLocked && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
                        <Lock className="text-white mb-2" size={40} />
                        <p className="text-white font-bold text-sm text-center px-4">{t('learning.locked')}</p>
                      </div>
                    )}

                    {/* Category Image */}
                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                        <Icon className="text-white" size={24} />
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="px-4 pb-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">{t('learning.progress')}</span>
                          <span className="text-xs font-bold gradient-text">{category.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
                            style={{ width: `${category.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Module Count */}
                      <div className="text-sm text-gray-600">
                        {category.moduleCount} {t('dashboard.modules')}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Learning Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('learning.additionalModules')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden h-full group hover:scale-105 transition-all duration-500 cursor-pointer">
                    {/* Category Image */}
                    <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                        <Icon className="text-white" size={24} />
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="px-4 pb-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">{t('learning.progress')}</span>
                          <span className="text-xs font-bold gradient-text">{category.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
                            style={{ width: `${category.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Module Count */}
                      <div className="text-sm text-gray-600">
                        {category.moduleCount} {t('dashboard.modules')}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {selectedModuleData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 py-8"
          onClick={() => setSelectedModule(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 relative p-6">
              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <X size={24} className="text-gray-700" />
              </button>

              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-full gradient-button text-white text-sm font-medium mb-3">
                  {selectedModuleData.category}
                </div>
                <h2 className="text-3xl font-bold mb-2 gradient-text">{selectedModuleData.title}</h2>
                <p className="text-gray-600 text-lg">{selectedModuleData.description}</p>
              </div>

              <div className="mb-6 flex space-x-4 border-b border-white/20">
                <button className="px-4 py-2 font-semibold gradient-text border-b-2 border-iga-purple">
                  Learn
                </button>
                <button className="px-4 py-2 font-semibold text-gray-600 hover:text-iga-purple transition-colors">
                  Practice
                </button>
                <button className="px-4 py-2 font-semibold text-gray-600 hover:text-iga-purple transition-colors">
                  Reflect
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Module Overview</h3>
                  <p className="text-gray-700 mb-4">
                    This module will teach you the fundamental concepts and practical skills you need to succeed. You'll learn through interactive lessons, real-world examples, and hands-on activities.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="text-iga-purple flex-shrink-0 mt-1" size={16} />
                      <span>Interactive video lessons</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="text-iga-purple flex-shrink-0 mt-1" size={16} />
                      <span>Practical exercises and activities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="text-iga-purple flex-shrink-0 mt-1" size={16} />
                      <span>Reflection and journaling prompts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="text-iga-purple flex-shrink-0 mt-1" size={16} />
                      <span>Community discussion and support</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">{t('learning.estimatedTime')}</p>
                    <p className="text-xl font-bold gradient-text">{selectedModuleData.estimated_time || 45} {t('learning.min')}</p>
                  </div>
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">{t('learning.earn')}</p>
                    <p className="text-xl font-bold gradient-text">{selectedModuleData.xp_reward} XP</p>
                  </div>
                </div>
              </div>

              {selectedModuleData.completed ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
                  <CheckCircle className="text-green-500 mx-auto mb-2" size={48} />
                  <p className="font-bold text-lg text-gray-800">{t('learning.moduleCompleted')}</p>
                  <p className="text-gray-600">{t('learning.greatJob')}</p>
                </div>
              ) : (
                <GradientButton
                  fullWidth
                  className="py-4 text-lg"
                  onClick={() => handleCompleteModule(selectedModuleData.id)}
                >
                  {t('learning.completeModule')} {selectedModuleData.xp_reward} XP
                </GradientButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Category Module View (Khan Academy Style) */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 py-8"
          onClick={() => setSelectedCategory(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 relative p-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-gray-300 flex items-center justify-center hover:scale-110 transition-transform z-10 shadow-lg"
              >
                <X size={24} className="text-gray-700" />
              </button>

              {/* Category Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  {(() => {
                    const Icon = selectedCategory.icon;
                    return (
                      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                        <Icon className="text-white" size={32} />
                      </div>
                    );
                  })()}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold gradient-text">{selectedCategory.name}</h2>
                    <p className="text-gray-600 text-lg">{selectedCategory.description}</p>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{t('learning.overallProgress')}</span>
                    <span className="text-sm font-bold gradient-text">{selectedCategory.progress}% {t('learning.complete')}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
                      style={{ width: `${selectedCategory.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>{Math.round((selectedCategory.progress / 100) * getCategoryModules(selectedCategory.name).length)} of {getCategoryModules(selectedCategory.name).length} {t('learning.modulesCompleted')}</span>
                    <span>{selectedCategory.progress}% {t('learning.toUnlock')}</span>
                  </div>
                </div>
              </div>

              {/* Module List (Khan Academy Style) */}
              <div className="space-y-4">
                {getCategoryModules(selectedCategory.name).map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                      <div className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Module Number/Status */}
                          <div className="flex-shrink-0">
                            {module.completed ? (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                                <CheckCircle className="text-white" size={24} />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-white/90 border-2 border-purple-300 flex items-center justify-center shadow-md">
                                <span className="text-lg font-bold gradient-text">{index + 1}</span>
                              </div>
                            )}
                          </div>

                          {/* Module Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-bold text-gray-800">{module.title}</h3>
                              {module.completed && (
                                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                  {t('learning.completed')}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{module.description}</p>

                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Play size={14} />
                                <span>{module.estimated_time} {t('learning.min')}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Trophy size={14} />
                                <span>{module.xp_reward} XP</span>
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                                {module.difficulty}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => setSelectedModule(module.id)}
                              className="px-4 py-2 rounded-lg gradient-button text-white font-medium hover:scale-105 transition-transform"
                            >
                              {module.completed ? t('learning.review') : t('learning.start')}
                            </button>
                          </div>
                        </div>

                        {/* YouTube Video Embed */}
                        {!module.completed && (
                          <div className="mt-4 pt-4 border-t border-white/20">
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeVideo(module.id)}`}
                                title={module.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              ></iframe>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 flex items-center space-x-1">
                              <Play size={14} />
                              <span>{t('learning.watchVideo')}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
