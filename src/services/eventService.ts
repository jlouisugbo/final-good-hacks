import { supabase } from '../lib/supabase';
import { Event } from '../types/database';

export const eventService = {
  // Get all upcoming events
  async getUpcomingEvents(limit: number = 10): Promise<Event[]> {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', now)
      .order('event_date', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }

    return data || [];
  },

  // Get all events (past and future)
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false });

    if (error) {
      console.error('Error fetching all events:', error);
      return [];
    }

    return data || [];
  },

  // Get events by type
  async getEventsByType(eventType: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_type', eventType)
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching events by type:', error);
      return [];
    }

    return data || [];
  },

  // Get events by program type
  async getEventsByProgram(programType: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('program_type', programType)
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching events by program:', error);
      return [];
    }

    return data || [];
  },

  // Get event by ID
  async getEventById(eventId: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      return null;
    }

    return data;
  },
};
