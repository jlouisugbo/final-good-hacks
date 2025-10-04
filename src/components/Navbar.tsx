import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  user?: {
    name: string;
    level: number;
    avatar?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = user
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Learning', path: '/learning', icon: BookOpen },
        { name: 'Community', path: '/community', icon: Users },
        { name: 'Profile', path: '/profile', icon: User },
      ]
    : [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">IGA</span>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">
              International Girls Academy
            </span>
          </Link>

          {user && (
            <>
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-iga-purple to-iga-magenta text-white'
                          : 'text-gray-700 hover:bg-white/20'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">Level {user.level}</p>
                </div>
                <img
                  src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=girl&gender=female"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover"
                />
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}

          {!user && (
            <Link to="/register">
              <GradientButton>Join Now</GradientButton>
            </Link>
          )}
        </div>
      </div>

      {mobileMenuOpen && user && (
        <div className="md:hidden glass-strong border-t border-white/20">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-iga-purple to-iga-magenta text-white'
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

import GradientButton from './GradientButton';
