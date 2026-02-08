// Centralized type definitions for the application

import { User, Session } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

// User and Auth related types
export interface AuthUser extends User {}

export interface AuthSession extends Session {}

export interface UserProfile {
  user_id: string;
  last_name?: string | null;
  bio?: string | null;
  email?: string | null;
  date_of_birth?: string | null;
  receive_newsletter?: boolean | null;
  receive_community_events_emails?: boolean | null;
  receive_volunteering_events_emails?: boolean | null;
  created_at: string;
  updated_at: string;
}


// Form related types
export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
}

export interface ResetPasswordForm {
  email: string;
}

export interface UpdatePasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileUpdateForm {
  first_name?: string;
  last_name?: string;
  bio?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count?: number;
  page?: number;
  limit?: number;
}

// Component Props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface UserComponentProps extends BaseComponentProps {
  user: AuthUser;
}

// Loading and Error states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface AuthState extends LoadingState {
  user: AuthUser | null;
  session: AuthSession | null;
}
