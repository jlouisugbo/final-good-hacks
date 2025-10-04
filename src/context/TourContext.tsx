import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TourContextType {
  showTour: boolean;
  tourStep: number;
  startTour: () => void;
  nextStep: () => void;
  endTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

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

export function TourProvider({ children }: { children: ReactNode }) {
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const navigate = useNavigate();

  const startTour = () => {
    setShowTour(true);
    setTourStep(0);
  };

  const nextStep = () => {
    if (tourStep < tourSteps.length - 1) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      navigate(tourSteps[nextStep].path);
    } else {
      endTour();
    }
  };

  const endTour = () => {
    setShowTour(false);
    setTourStep(0);
    navigate('/dashboard');
  };

  return (
    <TourContext.Provider value={{ showTour, tourStep, startTour, nextStep, endTour }}>
      {children}

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
                onClick={nextStep}
                className="w-full py-3 px-6 rounded-xl gradient-button text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
              >
                <span>{tourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
