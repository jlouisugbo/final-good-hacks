import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import ProgressBar from '../components/ProgressBar';
import { programs, modules } from '../data/mockData';

export default function Learning() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = ['Leadership', 'Entrepreneurship', 'Coding 101', 'STEM'];

  const getModulesByCategory = (category: string) => {
    return modules.filter(m => m.category === category && !m.programId);
  };

  const selectedModuleData = selectedModule ? modules.find(m => m.id === selectedModule) : null;

  return (
    <div className="min-h-screen gradient-bg pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">Your Learning Path</h1>
          <p className="text-gray-600 text-lg">Continue your journey to greatness</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Main Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <GlassCard hover className="group relative overflow-hidden">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {program.locked && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="text-white" size={48} />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium gradient-text">{program.xp} XP</span>
                    </div>
                    <ProgressBar progress={program.progress} showLabel />
                  </div>

                  {!program.locked ? (
                    <GradientButton fullWidth>
                      <div className="flex items-center justify-center space-x-2">
                        <Play size={20} />
                        <span>Continue Learning</span>
                      </div>
                    </GradientButton>
                  ) : (
                    <div className="glass-strong rounded-xl p-3 text-center">
                      <p className="text-sm text-gray-600">Complete previous programs to unlock</p>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Supplemental Library</h2>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const categoryModules = getModulesByCategory(category);
              const isExpanded = expandedCategory === category;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category)}
                      className="w-full flex items-center justify-between p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                          <span className="text-white font-bold">{categoryModules.length}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-2"
                      >
                        {categoryModules.map((module) => (
                          <div
                            key={module.id}
                            onClick={() => setSelectedModule(module.id)}
                            className="glass-strong rounded-xl p-4 hover:scale-[1.02] transition-transform cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 flex-1">
                                <div
                                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                                    module.completed
                                      ? 'bg-gradient-to-r from-iga-purple to-iga-magenta border-transparent'
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {module.completed && <CheckCircle className="text-white" size={16} />}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-800">{module.title}</h4>
                                  <p className="text-sm text-gray-600">{module.description}</p>
                                </div>
                              </div>
                              <div className="ml-4 px-3 py-1 rounded-full gradient-button text-white text-sm font-medium">
                                {module.xp} XP
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8"
          onClick={() => setSelectedModule(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard className="relative">
              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X size={20} />
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
                <div className="glass-strong rounded-xl p-6">
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
                  <div className="flex-1 glass-strong rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Estimated Time</p>
                    <p className="text-xl font-bold gradient-text">45 minutes</p>
                  </div>
                  <div className="flex-1 glass-strong rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Earn</p>
                    <p className="text-xl font-bold gradient-text">{selectedModuleData.xp} XP</p>
                  </div>
                </div>
              </div>

              {selectedModuleData.completed ? (
                <div className="glass-strong rounded-xl p-6 text-center">
                  <CheckCircle className="text-green-500 mx-auto mb-2" size={48} />
                  <p className="font-bold text-lg text-gray-800">Module Completed!</p>
                  <p className="text-gray-600">Great job on finishing this module</p>
                </div>
              ) : (
                <GradientButton fullWidth className="py-4 text-lg">
                  Start Learning
                </GradientButton>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
