import { supabase } from '../lib/supabase';
import { Module } from '../types/database';

export const moduleService = {
  // Get all published modules
  async getAllModules(): Promise<Module[]> {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_published', true)
      .order('module_order', { ascending: true });

    if (error) {
      console.error('Error fetching modules:', error);
      return [];
    }

    return data || [];
  },

  // Get modules by category
  async getModulesByCategory(category: string): Promise<Module[]> {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('module_order', { ascending: true });

    if (error) {
      console.error('Error fetching modules by category:', error);
      return [];
    }

    return data || [];
  },

  // Get module by ID
  async getModuleById(moduleId: string): Promise<Module | null> {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .single();

    if (error) {
      console.error('Error fetching module:', error);
      return null;
    }

    return data;
  },

  // Get user's module progress
  async getUserModuleProgress(userId: string, completedModules: string[]) {
    const allModules = await this.getAllModules();

    return allModules.map((module) => ({
      ...module,
      completed: completedModules.includes(module.id),
    }));
  },

  // Check if user can access module (based on prerequisites)
  canAccessModule(module: Module, completedModules: string[]): boolean {
    if (!module.prerequisite_modules || module.prerequisite_modules.length === 0) {
      return true;
    }

    return module.prerequisite_modules.every((prereqId) =>
      completedModules.includes(prereqId)
    );
  },

  // Get all categories
  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('modules')
      .select('category')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    // Get unique categories
    const categories = [...new Set(data.map((m) => m.category))];
    return categories;
  },
};
