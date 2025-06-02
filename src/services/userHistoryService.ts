import { supabase } from '@/integrations/supabase/client';

export interface UserHistoryEntry {
  id: string;
  user_id: string;
  username: string;
  service_type: string;
  status: 'completed' | 'declined';
  employee_name?: string;
  price_paid?: number;
  service_fee?: number;
  total_price?: number;
  request_date: string;
  completion_date: string;
  address_street?: string;
  latitude?: number;
  longitude?: number;
  decline_reason?: string;
  created_at: string;
}

export class UserHistoryService {
  static async addHistoryEntry(entry: Omit<UserHistoryEntry, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('user_history')
        .insert(entry)
        .select()
        .single();

      if (error) {
        console.error('Error adding history entry:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in addHistoryEntry:', error);
      throw error;
    }
  }

  static async getUserHistory(userId: string, username: string) {
    try {
      const { data, error } = await supabase
        .from('user_history')
        .select('*')
        .eq('user_id', userId)
        .eq('username', username)
        .order('completion_date', { ascending: false })
        .limit(30);

      if (error) {
        console.error('Error fetching user history:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserHistory:', error);
      throw error;
    }
  }

  static async cleanupOldHistory(userId: string, username: string) {
    try {
      const { data: allEntries, error: fetchError } = await supabase
        .from('user_history')
        .select('id, completion_date')
        .eq('user_id', userId)
        .eq('username', username)
        .order('completion_date', { ascending: false });

      if (fetchError) {
        console.error('Error fetching entries for cleanup:', fetchError);
        return;
      }

      if (allEntries && allEntries.length > 30) {
        // Keep only the most recent 30 entries
        const entriesToDelete = allEntries.slice(30);
        const idsToDelete = entriesToDelete.map(entry => entry.id);

        const { error: deleteError } = await supabase
          .from('user_history')
          .delete()
          .in('id', idsToDelete);

        if (deleteError) {
          console.error('Error deleting old entries:', deleteError);
        }
      }
    } catch (error) {
      console.error('Error in cleanupOldHistory:', error);
    }
  }
}
