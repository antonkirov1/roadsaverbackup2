
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
