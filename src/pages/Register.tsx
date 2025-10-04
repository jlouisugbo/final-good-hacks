import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ageGroup: '',
    accessCode: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      login();
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">IGA</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Join the Academy</h1>
            <p className="text-gray-600">Start your empowerment journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-gray-800"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-gray-800"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  required
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Select your age group</option>
                  <option value="elementary">Elementary (6-11)</option>
                  <option value="middle">Middle School (12-14)</option>
                  <option value="high">High School (15-18)</option>
                  <option value="adult">Adult (18+)</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Access Code</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={formData.accessCode}
                  onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-gray-800"
                  placeholder="Enter your access code"
                />
              </div>
            </div>

            <GradientButton type="submit" fullWidth className="mt-8">
              Join the Academy
            </GradientButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="#" className="text-iga-purple font-semibold hover:text-iga-magenta transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <GlassCard className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 gradient-text">Welcome to IGA!</h2>
              <p className="text-gray-700 text-lg">Get ready to start your empowerment journey</p>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
