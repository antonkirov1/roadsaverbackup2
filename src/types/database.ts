
export interface Database {
  public: {
    Tables: {
      new_user_accounts: {
        Row: {
          id: string;
          username: string;
          email: string;
          password_hash: string;
          phone_number: string | null;
          gender: string | null;
          created_at: string;
          processed_at: string | null;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          password_hash: string;
          phone_number?: string | null;
          gender?: string | null;
          created_at?: string;
          processed_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          password_hash?: string;
          phone_number?: string | null;
          gender?: string | null;
          created_at?: string;
          processed_at?: string | null;
        };
      };
      existing_user_accounts: {
        Row: {
          id: string;
          auth_user_id: string | null;
          username: string;
          email: string;
          phone_number: string | null;
          gender: string | null;
          created_at: string;
          migrated_from_new_accounts: string | null;
          created_by_admin: boolean | null;
          password_hash: string | null;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          username: string;
          email: string;
          phone_number?: string | null;
          gender?: string | null;
          created_at?: string;
          migrated_from_new_accounts?: string | null;
          created_by_admin?: boolean | null;
          password_hash?: string | null;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          username?: string;
          email?: string;
          phone_number?: string | null;
          gender?: string | null;
          created_at?: string;
          migrated_from_new_accounts?: string | null;
          created_by_admin?: boolean | null;
          password_hash?: string | null;
        };
      };
      employee_accounts: {
        Row: {
          id: string;
          auth_user_id: string | null;
          username: string;
          email: string;
          phone_number: string | null;
          employee_role: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          username: string;
          email: string;
          phone_number?: string | null;
          employee_role?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          username?: string;
          email?: string;
          phone_number?: string | null;
          employee_role?: string | null;
          status?: string | null;
          created_at?: string;
        };
      };
      employee_simulation: {
        Row: {
          id: number;
          employee_number: number;
          full_name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          employee_number: number;
          full_name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          employee_number?: number;
          full_name?: string;
          created_at?: string;
        };
      };
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
          snapshot_data: any;
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
      user_history: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          service_type: string;
          status: 'completed' | 'declined';
          employee_name: string | null;
          price_paid: number | null;
          service_fee: number | null;
          total_price: number | null;
          request_date: string;
          completion_date: string;
          address_street: string | null;
          latitude: number | null;
          longitude: number | null;
          decline_reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          service_type: string;
          status: 'completed' | 'declined';
          employee_name?: string | null;
          price_paid?: number | null;
          service_fee?: number | null;
          total_price?: number | null;
          request_date: string;
          completion_date?: string;
          address_street?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          decline_reason?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          service_type?: string;
          status?: 'completed' | 'declined';
          employee_name?: string | null;
          price_paid?: number | null;
          service_fee?: number | null;
          total_price?: number | null;
          request_date?: string;
          completion_date?: string;
          address_street?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          decline_reason?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
