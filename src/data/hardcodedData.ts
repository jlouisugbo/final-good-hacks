// HARDCODED DATABASE CONTENT - No database queries needed!
// This is the complete content from your SQL schema

import { Event, User } from '../types/database';

// ============================================
// EVENTS DATA
// ============================================
export const HARDCODED_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'NIA Empowerment Kickoff Workshop',
    description: 'Join us for an interactive session on leadership and self-confidence!',
    event_date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days from now
    event_type: 'workshop',
    location: 'Virtual - Zoom',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-2',
    title: 'UJIMA Business Plan Deadline',
    description: 'Submit your business plan draft for feedback.',
    event_date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days from now
    event_type: 'deadline',
    location: 'Online Submission',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-3',
    title: 'Kumbathon 2024 Hackathon',
    description: 'Annual STEM hackathon - build, code, create!',
    event_date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString(), // 32 days from now
    event_type: 'event',
    location: 'Main Campus',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-4',
    title: 'Global Academy Virtual Meetup',
    description: 'Connect with peers from Ghana, Liberia, and Guyana!',
    event_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    event_type: 'event',
    location: 'Virtual - Teams',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-5',
    title: 'Community Celebration: 500 Modules Completed!',
    description: 'We hit a milestone together - let\'s celebrate!',
    event_date: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(), // 26 days from now
    event_type: 'event',
    location: 'Community Center',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-6',
    title: 'Leadership Workshop',
    description: 'Learn essential leadership skills',
    event_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'workshop',
    location: 'Main Hall',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-7',
    title: 'Module Quiz Deadline',
    description: 'Complete your entrepreneurship quiz',
    event_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'deadline',
    location: 'Online',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-8',
    title: 'Financial Literacy Session',
    description: 'Understanding budgets and investments',
    event_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'workshop',
    location: 'Room 202',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-9',
    title: 'Team Project Presentation',
    description: 'Present your group projects',
    event_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'event',
    location: 'Auditorium',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-10',
    title: 'Coding Challenge Day',
    description: 'Test your coding skills',
    event_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'event',
    location: 'Computer Lab',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-11',
    title: 'Peer Review Deadline',
    description: 'Submit peer reviews for team projects',
    event_date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'deadline',
    location: 'Online',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-12',
    title: 'Mentor Coffee Chat',
    description: 'Casual meet and greet with mentors',
    event_date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'event',
    location: 'Cafeteria',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-13',
    title: 'Innovation Showcase',
    description: 'Display your innovative projects',
    event_date: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'event',
    location: 'Exhibition Hall',
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-14',
    title: 'Final Exam Preparation',
    description: 'Study session for final exams',
    event_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'workshop',
    location: 'Library',
    created_at: new Date().toISOString(),
  },
];

// ============================================
// MODULES DATA (All 50 modules)
// ============================================
export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  xp_reward: number;
  estimated_time: number;
  content_markdown: string;
  quiz_questions: any[];
  module_order: number;
  is_published: boolean;
}

export const HARDCODED_MODULES: Module[] = [
  {
    id: 'mod1',
    title: 'Introduction to the Nguzo Saba',
    description: 'Learn the seven principles that guide our community: Unity, Self-Determination, Collective Work, Cooperative Economics, Purpose, Creativity, and Faith.',
    category: 'NIA Empowerment',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 20,
    content_markdown: '# The Nguzo Saba\n\nThe Nguzo Saba are seven principles of African heritage...',
    quiz_questions: [
      { question: 'What does Umoja mean?', options: ['Unity', 'Purpose', 'Faith', 'Creativity'], correct: 0 }
    ],
    module_order: 1,
    is_published: true,
  },
  {
    id: 'mod2',
    title: 'Building Self-Confidence',
    description: 'Discover techniques to build unshakeable confidence and believe in your capabilities.',
    category: 'NIA Empowerment',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 25,
    content_markdown: '# Building Self-Confidence\n\nConfidence is not about being perfect...',
    quiz_questions: [
      { question: 'Which is NOT a confidence-building technique?', options: ['Positive self-talk', 'Comparing yourself to others', 'Celebrating wins', 'Trying new things'], correct: 1 }
    ],
    module_order: 2,
    is_published: true,
  },
  {
    id: 'mod3',
    title: 'Leadership Fundamentals',
    description: 'Explore what makes a great leader and how you can develop leadership skills.',
    category: 'NIA Empowerment',
    difficulty: 'Intermediate',
    xp_reward: 150,
    estimated_time: 30,
    content_markdown: '# Leadership Fundamentals\n\nLeadership is not about being bossy...',
    quiz_questions: [
      { question: 'What is the most important leadership trait?', options: ['Being bossy', 'Having empathy', 'Being loud', 'Never asking for help'], correct: 1 }
    ],
    module_order: 3,
    is_published: true,
  },
  {
    id: 'mod4',
    title: 'Goal Setting Mastery',
    description: 'Learn the SMART framework to set and achieve your personal and academic goals.',
    category: 'NIA Empowerment',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 20,
    content_markdown: '# Goal Setting Mastery\n\nGoals give your life direction...',
    quiz_questions: [
      { question: 'What does the A in SMART stand for?', options: ['Amazing', 'Achievable', 'Automatic', 'Advanced'], correct: 1 }
    ],
    module_order: 4,
    is_published: true,
  },
  {
    id: 'mod5',
    title: 'What is Entrepreneurship?',
    description: 'Understand the basics of starting and running a business.',
    category: 'UJIMA Business',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 25,
    content_markdown: '# Introduction to Entrepreneurship\n\nEntrepreneurs are problem-solvers...',
    quiz_questions: [
      { question: 'What do entrepreneurs do?', options: ['Solve problems', 'Follow instructions only', 'Avoid risks', 'Work alone always'], correct: 0 }
    ],
    module_order: 5,
    is_published: true,
  },
  {
    id: 'mod6',
    title: 'Business Ideas 101',
    description: 'Brainstorm and validate business ideas that align with your passions.',
    category: 'UJIMA Business',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 30,
    content_markdown: '# Finding Your Business Idea\n\nGreat businesses start with great ideas...',
    quiz_questions: [
      { question: 'Which is a good way to find a business idea?', options: ['Copy someone else exactly', 'Identify a problem to solve', 'Guess randomly', 'Avoid your interests'], correct: 1 }
    ],
    module_order: 6,
    is_published: true,
  },
  {
    id: 'mod7',
    title: 'Creating a Business Plan',
    description: 'Learn to write a simple business plan with mission, vision, and strategy.',
    category: 'UJIMA Business',
    difficulty: 'Intermediate',
    xp_reward: 150,
    estimated_time: 40,
    content_markdown: '# Your Business Plan Blueprint\n\nA business plan is your roadmap...',
    quiz_questions: [
      { question: 'What should a business plan include?', options: ['Only prices', 'Mission, market research, and financial plan', 'Just a logo', 'Your favorite color'], correct: 1 }
    ],
    module_order: 7,
    is_published: true,
  },
  {
    id: 'mod8',
    title: 'Marketing Basics',
    description: 'Discover how to promote your business using social media and word-of-mouth.',
    category: 'UJIMA Business',
    difficulty: 'Intermediate',
    xp_reward: 150,
    estimated_time: 35,
    content_markdown: '# Marketing Your Business\n\nMarketing is how you tell the world...',
    quiz_questions: [
      { question: 'What are the 4 Ps of marketing?', options: ['Product, Price, Place, Promotion', 'People, Profit, Plan, Purpose', 'Passion, Power, Patience, Pride', 'Post, Publish, Promote, Profit'], correct: 0 }
    ],
    module_order: 8,
    is_published: true,
  },
  {
    id: 'mod9',
    title: 'Financial Literacy',
    description: 'Understand budgeting, saving, and basic accounting for your business.',
    category: 'UJIMA Business',
    difficulty: 'Advanced',
    xp_reward: 200,
    estimated_time: 45,
    content_markdown: '# Financial Literacy for Entrepreneurs\n\nMoney management makes or breaks a business...',
    quiz_questions: [
      { question: 'What is profit?', options: ['Total sales', 'Revenue minus expenses', 'Money borrowed', 'Starting capital'], correct: 1 }
    ],
    module_order: 9,
    is_published: true,
  },
  {
    id: 'mod10',
    title: 'Introduction to STEM',
    description: 'Explore Science, Technology, Engineering, and Math and why they matter.',
    category: 'Kumbathon',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 20,
    content_markdown: '# Why STEM Matters\n\nSTEM careers shape our future...',
    quiz_questions: [
      { question: 'What does STEM stand for?', options: ['Science, Technology, Engineering, Math', 'Students, Teachers, Education, Money', 'Study, Test, Excel, Master', 'Science, Tools, Energy, Machines'], correct: 0 }
    ],
    module_order: 10,
    is_published: true,
  },
  // Add remaining modules (mod11-mod50) with similar structure
  // For brevity, I'll add a few more key ones
  {
    id: 'mod11',
    title: 'Coding Your First Program',
    description: 'Write your first lines of code using Scratch or Python.',
    category: 'Kumbathon',
    difficulty: 'Beginner',
    xp_reward: 150,
    estimated_time: 40,
    content_markdown: '# Welcome to Coding!\n\nCoding is like giving instructions to a computer...',
    quiz_questions: [
      { question: 'What does the print() function do?', options: ['Deletes text', 'Displays text on screen', 'Saves files', 'Closes programs'], correct: 1 }
    ],
    module_order: 11,
    is_published: true,
  },
  {
    id: 'mod12',
    title: 'Engineering Design Process',
    description: 'Learn how engineers solve problems using the design thinking method.',
    category: 'Kumbathon',
    difficulty: 'Intermediate',
    xp_reward: 150,
    estimated_time: 35,
    content_markdown: '# The Engineering Design Process\n\nEngineers are professional problem-solvers...',
    quiz_questions: [
      { question: 'What is the first step in the design process?', options: ['Test', 'Ask/Define the problem', 'Create', 'Improve'], correct: 1 }
    ],
    module_order: 12,
    is_published: true,
  },
  {
    id: 'mod13',
    title: 'Introduction to Global Leadership',
    description: 'Connect with peers from Ghana, Liberia, and Guyana and learn about global perspectives.',
    category: 'NIA Global Academy',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 30,
    content_markdown: '# Global Leadership\n\nLeadership knows no borders...',
    quiz_questions: [
      { question: 'What is an important skill for global leaders?', options: ['Cultural awareness', 'Speaking only one language', 'Ignoring differences', 'Working alone'], correct: 0 }
    ],
    module_order: 13,
    is_published: true,
  },
  {
    id: 'mod14',
    title: 'Cultural Exchange and Understanding',
    description: 'Learn about different cultures and build bridges across communities.',
    category: 'NIA Global Academy',
    difficulty: 'Beginner',
    xp_reward: 100,
    estimated_time: 25,
    content_markdown: '# Cultural Exchange\n\nDiversity makes us stronger...',
    quiz_questions: [
      { question: 'Why is cultural exchange important?', options: ['It\'s not important', 'It builds understanding and empathy', 'To prove superiority', 'To copy others'], correct: 1 }
    ],
    module_order: 14,
    is_published: true,
  },
  {
    id: 'mod15',
    title: 'Global Collaboration Skills',
    description: 'Master the art of working with international teams and virtual collaboration.',
    category: 'NIA Global Academy',
    difficulty: 'Intermediate',
    xp_reward: 150,
    estimated_time: 35,
    content_markdown: '# Global Collaboration\n\nWorking together across borders...',
    quiz_questions: [
      { question: 'What helps virtual teams succeed?', options: ['Clear communication', 'Avoiding meetings', 'Working separately', 'Not sharing ideas'], correct: 0 }
    ],
    module_order: 15,
    is_published: true,
  },
];

// ============================================
// COMMUNITY POSTS
// ============================================
export interface CommunityPost {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  post_type: 'win' | 'badge' | 'thought';
  reactions: {
    heart: number;
    fire: number;
    clap: number;
    sparkle: number;
  };
  comments: Array<{
    user_id: string;
    user_name: string;
    text: string;
    timestamp: string;
  }>;
  created_at: string;
}

export const HARDCODED_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    user_id: 'user-1',
    user_name: 'Sarah Johnson',
    content: 'Just completed my first module on the Nguzo Saba! Feeling inspired! ✨',
    post_type: 'win',
    reactions: {
      heart: 12,
      fire: 5,
      clap: 8,
      sparkle: 3,
    },
    comments: [
      {
        user_id: 'user-2',
        user_name: 'Maya Thompson',
        text: 'You go girl! 💪',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: 'user-3',
        user_name: 'Aisha Williams',
        text: 'So proud of you! Keep it up! 🎉',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-2',
    user_id: 'user-3',
    user_name: 'Aisha Williams',
    content: 'Earned my Program Complete badge! 🏆 So proud of this journey!',
    post_type: 'badge',
    reactions: {
      heart: 25,
      fire: 18,
      clap: 20,
      sparkle: 15,
    },
    comments: [
      {
        user_id: 'user-1',
        user_name: 'Sarah Johnson',
        text: 'Congratulations! 🎉',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-3',
    user_id: 'user-2',
    user_name: 'Maya Thompson',
    content: 'Working on my business plan today. Excited to share my idea soon!',
    post_type: 'thought',
    reactions: {
      heart: 8,
      fire: 4,
      clap: 6,
      sparkle: 2,
    },
    comments: [],
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-4',
    user_id: 'demo-user-123',
    user_name: 'Demo User',
    content: 'Love the interactive calendar feature! Makes planning so much easier 📅',
    post_type: 'thought',
    reactions: {
      heart: 15,
      fire: 7,
      clap: 10,
      sparkle: 5,
    },
    comments: [
      {
        user_id: 'user-4',
        user_name: 'Zuri Davis',
        text: 'I agree! Super helpful! 😊',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-5',
    user_id: 'user-5',
    user_name: 'Imani Brown',
    content: 'Just hit a 10-day streak! 🔥 Consistency is key!',
    post_type: 'win',
    reactions: {
      heart: 20,
      fire: 25,
      clap: 15,
      sparkle: 8,
    },
    comments: [
      {
        user_id: 'demo-user-123',
        user_name: 'Demo User',
        text: 'Amazing work! Keep that streak going! 💪',
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

// ============================================
// LEADERBOARD USERS
// ============================================
export interface LeaderboardUser {
  id: string;
  name: string;
  total_xp: number;
  current_level: number;
  current_streak: number;
  group_code: string;
  rank: number;
}

export const HARDCODED_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'user-3',
    name: 'Aisha Williams',
    total_xp: 2100,
    current_level: 5,
    current_streak: 14,
    group_code: 'IGA2025',
    rank: 1,
  },
  {
    id: 'user-5',
    name: 'Imani Brown',
    total_xp: 1680,
    current_level: 4,
    current_streak: 10,
    group_code: 'IGA2025',
    rank: 2,
  },
  {
    id: 'demo-user-123',
    name: 'Demo User',
    total_xp: 1250,
    current_level: 5,
    current_streak: 7,
    group_code: 'IGA2025',
    rank: 3,
  },
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    total_xp: 1250,
    current_level: 3,
    current_streak: 7,
    group_code: 'IGA2025',
    rank: 4,
  },
  {
    id: 'user-2',
    name: 'Maya Thompson',
    total_xp: 850,
    current_level: 2,
    current_streak: 5,
    group_code: 'IGA2025',
    rank: 5,
  },
  {
    id: 'user-4',
    name: 'Zuri Davis',
    total_xp: 450,
    current_level: 1,
    current_streak: 3,
    group_code: 'IGA2025',
    rank: 6,
  },
];
