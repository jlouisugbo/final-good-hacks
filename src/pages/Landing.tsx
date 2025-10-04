import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Award, Heart, Briefcase, Trophy, Globe } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';

export default function Landing() {
  const programs = [
    {
      icon: Sparkles,
      title: 'NIA Empowerment Academy',
      description: 'Build confidence, leadership skills, and emotional intelligence through the principles of Nguzo Saba',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop',
    },
    {
      icon: Briefcase,
      title: 'UJIMA Business Program',
      description: 'Learn entrepreneurship, financial literacy, and business fundamentals from industry experts',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    },
    {
      icon: Trophy,
      title: 'Kumbathon',
      description: 'Participate in creative challenges, hackathons, and collaborative projects with your peers',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    },
    {
      icon: Globe,
      title: 'NIA Global Academy',
      description: 'Explore global cultures, international leadership, and community building across borders',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Learning Assistant',
      description: 'Get personalized guidance and support from Nia, your intelligent learning companion',
    },
    {
      icon: Award,
      title: 'Gamified Progress',
      description: 'Earn XP, unlock badges, and compete with friends while mastering new skills',
    },
    {
      icon: Heart,
      title: 'Safe Community',
      description: 'Connect with like-minded peers in a supportive, moderated environment',
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 sm:p-12 lg:p-16 mb-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
            >
              <span className="gradient-text">Empower Your Journey</span>
              <br />
              <span className="text-gray-800">with International Girls Academy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            >
              Unite, uplift, and learn through the Nguzo Saba principles
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/register">
                <GradientButton className="text-lg py-4 px-12 animate-pulse-slow">
                  Join Your Program
                </GradientButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-center mb-4 gradient-text"
          >
            Our Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto"
          >
            Choose your path to growth, leadership, and success
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover className="h-full group">
                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                        <Icon className="text-white" size={24} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{program.title}</h3>
                    <p className="text-gray-600">{program.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Why Choose IGA?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover className="text-center h-full">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-lg">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-8"></div>
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">IGA</span>
                </div>
                <span className="font-bold text-xl gradient-text">International Girls Academy</span>
              </div>
              <div className="flex items-center space-x-6 text-gray-600">
                <a href="#" className="hover:text-iga-purple transition-colors">About</a>
                <a href="#" className="hover:text-iga-purple transition-colors">Contact</a>
                <a href="#" className="hover:text-iga-purple transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
