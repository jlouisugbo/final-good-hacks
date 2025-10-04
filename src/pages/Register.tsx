import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { signUp, user, loading: authLoading, loginDemo } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    ageGroup: '',
    accessCode: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in (useEffect to avoid render issue)
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name, formData.accessCode);

      // Show success message
      setShowSuccess(true);

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      console.error('Signup error:', err);

      // Provide helpful error messages
      let errorMessage = err.message || 'Failed to create account. Please try again.';

      if (errorMessage.includes('already registered')) {
        errorMessage = 'This email is already registered. Please try logging in instead.';
      } else if (errorMessage.includes('invalid email')) {
        errorMessage = 'Please use a valid email address (e.g., yourname@gmail.com)';
      } else if (errorMessage.includes('User already registered')) {
        errorMessage = 'This email is already registered. Please log in.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
        className="relative w-full max-w-4xl"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-gray-800"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 glass rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-gray-800"
                    placeholder="Confirm your password"
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
            </div>

            {error && (
              <div className="glass-strong border-2 border-red-400 rounded-xl p-3 text-center">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <GradientButton type="submit" fullWidth className="mt-8" disabled={loading}>
              {loading ? 'Creating Account...' : 'Join the Academy'}
            </GradientButton>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="#" className="text-iga-purple font-semibold hover:text-iga-magenta transition-colors">
                Sign in
              </a>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 glass text-gray-500">or</span>
              </div>
            </div>
            <button
              onClick={() => {
                loginDemo();
                navigate('/dashboard');
              }}
              className="w-full py-3 glass-strong rounded-xl hover:scale-105 transition-transform font-semibold text-gray-700"
            >
              🎮 Try Demo Mode
            </button>
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
