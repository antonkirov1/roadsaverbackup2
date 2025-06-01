
export interface Database {
  public: {
    Tables: {
      price_quote_snapshots: {
        Row: {
          id: string;
          request_id: string;
          user_id: string;
          employee_id: string | null;
          service_type: string;
          price_quote: number;
          service_fee: number;
          total_price: number;
          employee_name: string;
          snapshot_data: any; // JSON data of the price quote screen
          created_at: string;
          status: 'pending' | 'accepted' | 'declined' | 'finished';
        };
        Insert: {
          id?: string;
          request_id: string;
          user_id: string;
          employee_id?: string | null;
          service_type: string;
          price_quote: number;
          service_fee: number;
          total_price: number;
          employee_name: string;
          snapshot_data: any;
          created_at?: string;
          status?: 'pending' | 'accepted' | 'declined' | 'finished';
        };
        Update: {
          id?: string;
          request_id?: string;
          user_id?: string;
          employee_id?: string | null;
          service_type?: string;
          price_quote?: number;
          service_fee?: number;
          total_price?: number;
          employee_name?: string;
          snapshot_data?: any;
          created_at?: string;
          status?: 'pending' | 'accepted' | 'declined' | 'finished';
        };
      };
      user_finished_requests: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          request_id: string;
          snapshot_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          request_id: string;
          snapshot_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          request_id?: string;
          snapshot_id?: string;
          created_at?: string;
        };
      };
      employee_finished_requests: {
        Row: {
          id: string;
          employee_id: string;
          employee_username: string;
          request_id: string;
          snapshot_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          employee_username: string;
          request_id: string;
          snapshot_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          employee_username?: string;
          request_id?: string;
          snapshot_id?: string;
          created_at?: string;
        };
      };
    };
  };
}
