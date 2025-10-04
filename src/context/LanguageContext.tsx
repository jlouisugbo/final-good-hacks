import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    'nav.dashboard': 'Dashboard',
    'nav.learning': 'Learning',
    'nav.community': 'Community',
    'nav.resources': 'Resources',
    'nav.profile': 'Profile',
    'nav.joinNow': 'Join Now',
    'nav.level': 'Level',

    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.subtitle': 'Ready to continue your learning journey?',
    'dashboard.yourStats': 'Your Stats',
    'dashboard.level': 'Level',
    'dashboard.xpToNext': 'XP to next level',
    'dashboard.dayStreak': 'Day Streak',
    'dashboard.progress': 'Progress',
    'dashboard.yourGroup': 'Your Group',
    'dashboard.calendar': 'Calendar',
    'dashboard.analytics': 'Performance Analytics',
    'dashboard.weeklyCompletion': 'Weekly Module Completion',
    'dashboard.thisMonth': 'this month',
    'dashboard.streak': 'Streak',
    'dashboard.days': 'days',
    'dashboard.badges': 'Badges',
    'dashboard.rank': 'Rank',
    'dashboard.inGroup': 'in group',
    'dashboard.spotsThisWeek': 'spots this week',
    'dashboard.upcomingEvents': 'Upcoming Events',
    'dashboard.noEvents': 'No upcoming events',
    'dashboard.viewAllEvents': 'View All Events',
    'dashboard.showLess': 'Show Less',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.continueLearning': 'Continue Learning',
    'dashboard.modules': 'modules',
    'dashboard.dailyGoal': 'Daily Goal',
    'dashboard.completeMore': 'Complete 1 more',
    'dashboard.nextBadge': 'Next Badge',
    'dashboard.entrepreneur': 'Entrepreneur',
    'dashboard.streakGoal': 'Streak Goal',
    'dashboard.moreToBeat': 'more to beat record',
    'dashboard.studyTime': 'Study Time',
    'dashboard.topNationwide': 'Top 10 nationwide',
    'dashboard.thisWeekUp': '↑ 15% this week',
    'dashboard.experiencePoints': 'Experience Points',
    'dashboard.nextLevel': 'Next Level',
    'dashboard.lvl': 'Lvl',
    'dashboard.lastDays': 'Last 30 days',
    'dashboard.modulesCount': 'modules',
    'dashboard.week': 'Week',

    // Learning
    'learning.title': 'Your Learning Path',
    'learning.subtitle': 'Continue your journey to greatness',
    'learning.mainPrograms': 'Main Programs',
    'learning.additionalModules': 'Additional Learning Modules',
    'learning.progress': 'Progress',
    'learning.locked': 'Complete required modules first',
    'learning.overallProgress': 'Overall Progress',
    'learning.complete': 'Complete',
    'learning.modulesCompleted': 'modules completed',
    'learning.toUnlock': 'to unlock next level',
    'learning.completed': 'Completed',
    'learning.start': 'Start',
    'learning.review': 'Review',
    'learning.watchVideo': 'Watch this video to complete the module',
    'learning.estimatedTime': 'Estimated Time',
    'learning.earn': 'Earn',
    'learning.moduleCompleted': 'Module Completed!',
    'learning.greatJob': 'Great job on finishing this module',
    'learning.completeModule': 'Complete Module & Earn',
    'learning.min': 'min',

    // Community
    'community.title': 'Community',
    'community.subtitle': 'Celebrate wins and connect with your sisters',
    'community.shareWin': 'Share Your Win!',
    'community.whatsOnMind': "What's on your mind?",
    'community.post': 'Post',
    'community.leaderboard': 'Group Leaderboard',
    'community.yourGroup': 'Your Group',
    'community.keepUpWork': 'Keep up the great work!',
    'community.template1': 'I completed a module! 🎯',
    'community.template2': 'Earned a new badge! 🏆',
    'community.template3': 'Share a thought 💭',
    'community.reaction1': 'You go girl! 💪',
    'community.reaction2': 'Congratulations! 🎉',
    'community.reaction3': 'So proud! ❤️',
    'community.reaction4': 'Keep it up! 🔥',
    'community.characterCount': 'characters',
    'community.xp': 'XP',

    // Resources
    'resources.title': 'Resources',
    'resources.subtitle': 'Tools and support for your journey',

    // Profile
    'profile.title': 'Profile',
    'profile.subtitle': 'Manage your account and settings',
  },
  es: {
    // Navbar
    'nav.dashboard': 'Panel',
    'nav.learning': 'Aprendizaje',
    'nav.community': 'Comunidad',
    'nav.resources': 'Recursos',
    'nav.profile': 'Perfil',
    'nav.joinNow': 'Únete Ahora',
    'nav.level': 'Nivel',

    // Dashboard
    'dashboard.welcome': 'Bienvenida de nuevo',
    'dashboard.subtitle': '¿Lista para continuar tu viaje de aprendizaje?',
    'dashboard.yourStats': 'Tus Estadísticas',
    'dashboard.level': 'Nivel',
    'dashboard.xpToNext': 'XP para siguiente nivel',
    'dashboard.dayStreak': 'Racha de Días',
    'dashboard.progress': 'Progreso',
    'dashboard.yourGroup': 'Tu Grupo',
    'dashboard.calendar': 'Calendario',
    'dashboard.analytics': 'Análisis de Rendimiento',
    'dashboard.weeklyCompletion': 'Finalización Semanal de Módulos',
    'dashboard.thisMonth': 'este mes',
    'dashboard.streak': 'Racha',
    'dashboard.days': 'días',
    'dashboard.badges': 'Insignias',
    'dashboard.rank': 'Rango',
    'dashboard.inGroup': 'en grupo',
    'dashboard.spotsThisWeek': 'lugares esta semana',
    'dashboard.upcomingEvents': 'Próximos Eventos',
    'dashboard.noEvents': 'No hay eventos próximos',
    'dashboard.viewAllEvents': 'Ver Todos los Eventos',
    'dashboard.showLess': 'Mostrar Menos',
    'dashboard.quickActions': 'Acciones Rápidas',
    'dashboard.continueLearning': 'Continuar Aprendiendo',
    'dashboard.modules': 'módulos',
    'dashboard.dailyGoal': 'Meta Diaria',
    'dashboard.completeMore': 'Completa 1 más',
    'dashboard.nextBadge': 'Próxima Insignia',
    'dashboard.entrepreneur': 'Emprendedora',
    'dashboard.streakGoal': 'Meta de Racha',
    'dashboard.moreToBeat': 'más para superar récord',
    'dashboard.studyTime': 'Tiempo de Estudio',
    'dashboard.topNationwide': 'Top 10 nacional',
    'dashboard.thisWeekUp': '↑ 15% esta semana',
    'dashboard.experiencePoints': 'Puntos de Experiencia',
    'dashboard.nextLevel': 'Siguiente Nivel',
    'dashboard.lvl': 'Niv',
    'dashboard.lastDays': 'Últimos 30 días',
    'dashboard.modulesCount': 'módulos',
    'dashboard.week': 'Semana',

    // Learning
    'learning.title': 'Tu Camino de Aprendizaje',
    'learning.subtitle': 'Continúa tu viaje hacia la grandeza',
    'learning.mainPrograms': 'Programas Principales',
    'learning.additionalModules': 'Módulos de Aprendizaje Adicionales',
    'learning.progress': 'Progreso',
    'learning.locked': 'Completa los módulos requeridos primero',
    'learning.overallProgress': 'Progreso General',
    'learning.complete': 'Completo',
    'learning.modulesCompleted': 'módulos completados',
    'learning.toUnlock': 'para desbloquear siguiente nivel',
    'learning.completed': 'Completado',
    'learning.start': 'Empezar',
    'learning.review': 'Revisar',
    'learning.watchVideo': 'Mira este video para completar el módulo',
    'learning.estimatedTime': 'Tiempo Estimado',
    'learning.earn': 'Gana',
    'learning.moduleCompleted': '¡Módulo Completado!',
    'learning.greatJob': '¡Excelente trabajo al terminar este módulo!',
    'learning.completeModule': 'Completar Módulo y Ganar',
    'learning.min': 'min',

    // Community
    'community.title': 'Comunidad',
    'community.subtitle': 'Celebra victorias y conéctate con tus hermanas',
    'community.shareWin': '¡Comparte tu Victoria!',
    'community.whatsOnMind': '¿Qué estás pensando?',
    'community.post': 'Publicar',
    'community.leaderboard': 'Tabla de Clasificación del Grupo',
    'community.yourGroup': 'Tu Grupo',
    'community.keepUpWork': '¡Sigue con el buen trabajo!',
    'community.template1': '¡Completé un módulo! 🎯',
    'community.template2': '¡Gané una nueva insignia! 🏆',
    'community.template3': 'Comparte un pensamiento 💭',
    'community.reaction1': '¡Tú puedes! 💪',
    'community.reaction2': '¡Felicitaciones! 🎉',
    'community.reaction3': '¡Muy orgullosa! ❤️',
    'community.reaction4': '¡Sigue así! 🔥',
    'community.characterCount': 'caracteres',
    'community.xp': 'XP',

    // Resources
    'resources.title': 'Recursos',
    'resources.subtitle': 'Herramientas y apoyo para tu viaje',

    // Profile
    'profile.title': 'Perfil',
    'profile.subtitle': 'Administra tu cuenta y configuración',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
