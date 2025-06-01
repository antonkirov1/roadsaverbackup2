
import { supabase } from '@/utils/supabase';

export interface PriceQuoteSnapshot {
  id?: string;
  requestId: string;
  userId: string;
  employeeId?: string;
  serviceType: string;
  priceQuote: number;
  serviceFee: number;
  totalPrice: number;
  employeeName: string;
  snapshotData: {
    serviceType: string;
    priceQuote: number;
    serviceFee: number;
    totalPrice: number;
    employeeName: string;
    hasDeclinedOnce: boolean;
    timestamp: string;
  };
  status: 'pending' | 'accepted' | 'declined' | 'finished';
}

export const priceQuoteStorageService = {
  // Store a price quote snapshot when employee responds
  async storePriceQuoteSnapshot(data: Omit<PriceQuoteSnapshot, 'id'>): Promise<string | null> {
    try {
      const { data: snapshot, error } = await supabase
        .from('price_quote_snapshots')
        .insert({
          request_id: data.requestId,
          user_id: data.userId,
          employee_id: data.employeeId,
          service_type: data.serviceType,
          price_quote: data.priceQuote,
          service_fee: data.serviceFee,
          total_price: data.totalPrice,
          employee_name: data.employeeName,
          snapshot_data: data.snapshotData,
          status: data.status
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error storing price quote snapshot:', error);
        return null;
      }

      return snapshot?.id || null;
    } catch (error) {
      console.error('Error storing price quote snapshot:', error);
      return null;
    }
  },

  // Get a stored price quote snapshot by request ID
  async getPriceQuoteSnapshot(requestId: string): Promise<PriceQuoteSnapshot | null> {
    try {
      const { data, error } = await supabase
        .from('price_quote_snapshots')
        .select('*')
        .eq('request_id', requestId)
        .single();

      if (error) {
        console.error('Error fetching price quote snapshot:', error);
        return null;
      }

      return {
        id: data.id,
        requestId: data.request_id,
        userId: data.user_id,
        employeeId: data.employee_id,
        serviceType: data.service_type,
        priceQuote: data.price_quote,
        serviceFee: data.service_fee,
        totalPrice: data.total_price,
        employeeName: data.employee_name,
        snapshotData: data.snapshot_data,
        status: data.status
      };
    } catch (error) {
      console.error('Error fetching price quote snapshot:', error);
      return null;
    }
  },

  // Move snapshot to finished requests when request is completed
  async moveToFinishedRequests(requestId: string, userId: string, username: string, employeeId: string, employeeUsername: string): Promise<boolean> {
    try {
      // Get the snapshot
      const snapshot = await this.getPriceQuoteSnapshot(requestId);
      if (!snapshot) return false;

      // Update snapshot status to finished
      await supabase
        .from('price_quote_snapshots')
        .update({ status: 'finished' })
        .eq('request_id', requestId);

      // Add to user finished requests
      await supabase
        .from('user_finished_requests')
        .insert({
          user_id: userId,
          username: username,
          request_id: requestId,
          snapshot_id: snapshot.id!
        });

      // Add to employee finished requests
      await supabase
        .from('employee_finished_requests')
        .insert({
          employee_id: employeeId,
          employee_username: employeeUsername,
          request_id: requestId,
          snapshot_id: snapshot.id!
        });

      return true;
    } catch (error) {
      console.error('Error moving to finished requests:', error);
      return false;
    }
  },

  // Get user's finished requests
  async getUserFinishedRequests(userId: string): Promise<PriceQuoteSnapshot[]> {
    try {
      const { data, error } = await supabase
        .from('user_finished_requests')
        .select(`
          *,
          price_quote_snapshots(*)
        `)
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user finished requests:', error);
        return [];
      }

      return data.map(item => ({
        id: item.price_quote_snapshots.id,
        requestId: item.price_quote_snapshots.request_id,
        userId: item.price_quote_snapshots.user_id,
        employeeId: item.price_quote_snapshots.employee_id,
        serviceType: item.price_quote_snapshots.service_type,
        priceQuote: item.price_quote_snapshots.price_quote,
        serviceFee: item.price_quote_snapshots.service_fee,
        totalPrice: item.price_quote_snapshots.total_price,
        employeeName: item.price_quote_snapshots.employee_name,
        snapshotData: item.price_quote_snapshots.snapshot_data,
        status: item.price_quote_snapshots.status
      }));
    } catch (error) {
      console.error('Error fetching user finished requests:', error);
      return [];
    }
  },

  // Get employee's finished requests
  async getEmployeeFinishedRequests(employeeId: string): Promise<PriceQuoteSnapshot[]> {
    try {
      const { data, error } = await supabase
        .from('employee_finished_requests')
        .select(`
          *,
          price_quote_snapshots(*)
        `)
        .eq('employee_id', employeeId);

      if (error) {
        console.error('Error fetching employee finished requests:', error);
        return [];
      }

      return data.map(item => ({
        id: item.price_quote_snapshots.id,
        requestId: item.price_quote_snapshots.request_id,
        userId: item.price_quote_snapshots.user_id,
        employeeId: item.price_quote_snapshots.employee_id,
        serviceType: item.price_quote_snapshots.service_type,
        priceQuote: item.price_quote_snapshots.price_quote,
        serviceFee: item.price_quote_snapshots.service_fee,
        totalPrice: item.price_quote_snapshots.total_price,
        employeeName: item.price_quote_snapshots.employee_name,
        snapshotData: item.price_quote_snapshots.snapshot_data,
        status: item.price_quote_snapshots.status
      }));
    } catch (error) {
      console.error('Error fetching employee finished requests:', error);
      return [];
    }
  }
};
