import { motion } from 'framer-motion';
import { MapPin, Globe, Phone, Mail, Users, BookOpen, Heart, Sparkles, Calendar, Video, MessageCircle, Briefcase, Trophy } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  location?: string;
  type: 'local' | 'online' | 'hybrid';
  contact?: {
    phone?: string;
    email?: string;
    meetingTime?: string;
  };
  icon: any;
}

export default function Resources() {
  const { user, loading } = useAuth();
  const resources: Resource[] = [
    {
      id: '1',
      name: 'IGA Plano Chapter',
      category: 'Local Chapters',
      description: 'Weekly in-person meetups for NIA Empowerment Academy and UJIMA Business Program. Connect with local members and attend workshops.',
      location: 'Plano, TX',
      type: 'local',
      contact: {
        email: 'plano@igacademy.org',
        meetingTime: 'Saturdays 10am-12pm'
      },
      icon: Users
    },
    {
      id: '2',
      name: 'IGA Frisco Chapter',
      category: 'Local Chapters',
      description: 'Local chapter hosting monthly Kumbathon events and leadership workshops. Join fellow members for collaborative projects.',
      location: 'Frisco, TX',
      type: 'local',
      contact: {
        email: 'frisco@igacademy.org',
        meetingTime: 'First & Third Sundays 2pm-4pm'
      },
      icon: Users
    },
    {
      id: '3',
      name: 'IGA Dallas Hub',
      category: 'Local Chapters',
      description: 'Main Dallas location offering all IGA programs. Largest chapter with weekly activities, mentorship circles, and guest speakers.',
      location: 'Dallas, TX',
      type: 'local',
      contact: {
        phone: '(214) 555-IGA1',
        email: 'dallas@igacademy.org',
        meetingTime: 'Wednesdays 4pm-6pm & Saturdays 10am-2pm'
      },
      icon: Sparkles
    },
    {
      id: '4',
      name: 'IGA Houston Chapter',
      category: 'Local Chapters',
      description: 'Houston-based chapter with focus on entrepreneurship and global leadership. Regular meetups and community service projects.',
      location: 'Houston, TX',
      type: 'local',
      contact: {
        email: 'houston@igacademy.org',
        meetingTime: 'Saturdays 1pm-3pm'
      },
      icon: Users
    },
    {
      id: '5',
      name: 'NIA Virtual Study Groups',
      category: 'Online Communities',
      description: 'Daily virtual study sessions and homework help. Connect with members worldwide through video chat and collaboration tools.',
      location: 'Online',
      type: 'online',
      contact: {
        email: 'virtual@igacademy.org',
        meetingTime: 'Daily 5pm-7pm CT'
      },
      icon: Video
    },
    {
      id: '6',
      name: 'UJIMA Business Circle',
      category: 'Online Communities',
      description: 'Online entrepreneurship community for aspiring young business owners. Monthly pitch sessions and mentorship opportunities.',
      location: 'Online',
      type: 'online',
      contact: {
        email: 'ujima@igacademy.org',
        meetingTime: 'Every Thursday 6pm CT'
      },
      icon: Briefcase
    },
    {
      id: '7',
      name: 'Kumbathon Discord Server',
      category: 'Online Communities',
      description: 'Official IGA Discord community for hackathons, creative challenges, and collaborative projects. Chat, share wins, and find teammates.',
      location: 'Online',
      type: 'online',
      contact: {
        email: 'kumbathon@igacademy.org'
      },
      icon: MessageCircle
    },
    {
      id: '8',
      name: 'Global Leadership Network',
      category: 'Online Communities',
      description: 'Connect with IGA members from around the world. Monthly cultural exchanges and international collaboration projects.',
      location: 'Online',
      type: 'online',
      contact: {
        email: 'global@igacademy.org',
        meetingTime: 'Second Saturday each month 11am CT'
      },
      icon: Globe
    },
    {
      id: '9',
      name: 'IGA Mentorship Program',
      category: 'Programs & Support',
      description: 'Get matched with a mentor from your local chapter or online. One-on-one guidance for personal growth and goal achievement.',
      location: 'Hybrid',
      type: 'hybrid',
      contact: {
        email: 'mentorship@igacademy.org'
      },
      icon: Heart
    },
    {
      id: '10',
      name: 'Monthly Wellness Workshops',
      category: 'Programs & Support',
      description: 'Virtual and in-person workshops on mental health, self-care, and wellbeing. Led by certified counselors and life coaches.',
      location: 'Hybrid',
      type: 'hybrid',
      contact: {
        email: 'wellness@igacademy.org',
        meetingTime: 'Last Saturday each month 10am CT'
      },
      icon: Heart
    },
    {
      id: '11',
      name: 'IGA Leadership Summit',
      category: 'Programs & Support',
      description: 'Quarterly leadership conference bringing together all chapters. Network with peers, learn from industry leaders, and develop skills.',
      location: 'Dallas, TX (with virtual option)',
      type: 'hybrid',
      contact: {
        email: 'summit@igacademy.org'
      },
      icon: Trophy
    },
    {
      id: '12',
      name: 'Book Club & Reading Circle',
      category: 'Programs & Support',
      description: 'Monthly book discussions focusing on empowerment, culture, and leadership. Both virtual and local chapter meetups available.',
      location: 'Hybrid',
      type: 'hybrid',
      contact: {
        email: 'bookclub@igacademy.org',
        meetingTime: 'Third Sunday each month 3pm CT'
      },
      icon: BookOpen
    }
  ];

  const categories = Array.from(new Set(resources.map(r => r.category)));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'local':
        return 'bg-gradient-to-r from-purple-500 to-fuchsia-500';
      case 'online':
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'hybrid':
        return 'bg-gradient-to-r from-fuchsia-500 to-pink-400';
      default:
        return 'gradient-button';
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

  return (
    <div className="min-h-screen gradient-bg pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            IGA Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with your local IGA chapter, join online communities, and discover programs to support your journey. All resources are part of the International Girls Academy network.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white">
                <MapPin size={16} />
                <span className="text-sm font-medium">Local</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Globe size={16} />
                <span className="text-sm font-medium">Online</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-400 text-white">
                <Sparkles size={16} />
                <span className="text-sm font-medium">Hybrid</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {categories.map((category, categoryIndex) => {
          const categoryResources = resources.filter(r => r.category === category);
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryResources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <GlassCard hover className="h-full">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl ${getTypeColor(resource.type)} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="text-white" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold text-gray-800">{resource.name}</h3>
                            </div>

                            {resource.location && (
                              <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                                <MapPin size={14} />
                                <span>{resource.location}</span>
                              </div>
                            )}

                            <p className="text-gray-700 mb-4">{resource.description}</p>

                            {resource.contact && (
                              <div className="space-y-2">
                                {resource.contact.phone && (
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Phone size={14} className="text-iga-purple" />
                                    <a href={`tel:${resource.contact.phone.replace(/\D/g, '')}`} className="text-iga-purple hover:text-iga-magenta transition-colors">
                                      {resource.contact.phone}
                                    </a>
                                  </div>
                                )}
                                {resource.contact.email && (
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Mail size={14} className="text-iga-purple" />
                                    <a href={`mailto:${resource.contact.email}`} className="text-iga-purple hover:text-iga-magenta transition-colors">
                                      {resource.contact.email}
                                    </a>
                                  </div>
                                )}
                                {resource.contact.meetingTime && (
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Calendar size={14} className="text-iga-purple" />
                                    <span className="text-gray-700">{resource.contact.meetingTime}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <GlassCard className="text-center">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Get Involved!</h3>
            <p className="text-gray-700 mb-6">
              Ready to connect with your IGA community? Here's how to get started:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-strong rounded-xl p-4">
                <p className="font-bold text-gray-800 mb-2">Find Your Chapter</p>
                <p className="text-sm text-gray-600 mb-3">Join a local chapter near you in Plano, Frisco, Dallas, or Houston</p>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <p className="font-bold text-gray-800 mb-2">Join Online</p>
                <p className="text-sm text-gray-600 mb-3">Connect virtually through our Discord, study groups, and virtual meetups</p>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <p className="font-bold text-gray-800 mb-2">Get a Mentor</p>
                <p className="text-sm text-gray-600 mb-3">Apply for one-on-one mentorship to accelerate your growth</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">Questions? Contact us at <a href="mailto:info@igacademy.org" className="text-iga-purple hover:text-iga-magenta font-semibold">info@igacademy.org</a></p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
