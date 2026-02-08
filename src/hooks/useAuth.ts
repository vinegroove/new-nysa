// Custom hook for authentication state management

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  AuthUser, 
  AuthSession, 
  SignInForm, 
  SignUpForm, 
  UpdatePasswordForm,
  AuthState 
} from "@/lib/types";
import { 
  handleAuthError, 
  logError, 
  ValidationRules, 
  validateForm 
} from "@/lib/utils/errors";
import { ROUTES, TOAST_MESSAGES, VALIDATION } from "@/lib/constants";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: undefined,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize auth state and set up listener
  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (mounted) {
          if (error) {
            setAuthState(prev => ({
              ...prev,
              error: handleAuthError(error),
              isLoading: false,
            }));
          } else {
            setAuthState({
              user: session?.user ?? null,
              session,
              isLoading: false,
              error: undefined,
            });
          }
        }
      } catch (error) {
        if (mounted) {
          logError(error as Error, { context: "getInitialSession" });
          setAuthState(prev => ({
            ...prev,
            error: "Failed to initialize authentication",
            isLoading: false,
          }));
        }
      }
    };

    getInitialSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setAuthState({
            user: session?.user ?? null,
            session,
            isLoading: false,
            error: undefined,
          });

          // Handle navigation based on auth state
          if (event === "SIGNED_IN" && session) {
            navigate(ROUTES.DASHBOARD);
          } else if (event === "SIGNED_OUT") {
            navigate(ROUTES.HOME);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Sign in method
  const signIn = async (formData: SignInForm) => {
    try {
      // Validate form data
      validateForm(formData, {
        email: ValidationRules.required("Email"),
        password: ValidationRules.required("Password"),
      });

      setAuthState(prev => ({ ...prev, isLoading: true, error: undefined }));

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        const errorMessage = handleAuthError(error);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return { success: false, error: errorMessage };
      }

      toast(TOAST_MESSAGES.AUTH.SIGN_IN_SUCCESS);
      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Sign in failed";
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      logError(error as Error, { context: "signIn", email: formData.email });
      return { success: false, error: errorMessage };
    }
  };

  // Sign up method
  const signUp = async (formData: SignUpForm) => {
    try {
      // Validate form data
      validateForm(formData, {
        email: ValidationRules.required("Email"),
        password: ValidationRules.minLength(VALIDATION.MIN_PASSWORD_LENGTH),
      });

      setAuthState(prev => ({ ...prev, isLoading: true, error: undefined }));

      const redirectUrl = `${window.location.origin}${ROUTES.DASHBOARD}`;
      
      const { error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        const errorMessage = handleAuthError(error);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return { success: false, error: errorMessage };
      }

      toast(TOAST_MESSAGES.AUTH.SIGN_UP_SUCCESS);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Sign up failed";
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      logError(error as Error, { context: "signUp", email: formData.email });
      return { success: false, error: errorMessage };
    }
  };

  // Sign out method
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logError(error, { context: "signOut" });
        toast({
          title: "Sign out failed",
          description: "Please try again",
          variant: "destructive",
        });
        return { success: false };
      }

      toast(TOAST_MESSAGES.AUTH.SIGN_OUT_SUCCESS);
      return { success: true };

    } catch (error) {
      logError(error as Error, { context: "signOut" });
      return { success: false };
    }
  };

  // Reset password method
  const resetPassword = async (email: string) => {
    try {
      validateForm({ email }, {
        email: ValidationRules.required("Email"),
      });

      setAuthState(prev => ({ ...prev, isLoading: true, error: undefined }));

      const redirectUrl = `${window.location.origin}${ROUTES.AUTH}?mode=reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        const errorMessage = handleAuthError(error);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return { success: false, error: errorMessage };
      }

      toast(TOAST_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password reset failed";
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      logError(error as Error, { context: "resetPassword", email });
      return { success: false, error: errorMessage };
    }
  };

  // Update password method
  const updatePassword = async (formData: UpdatePasswordForm) => {
    try {
      validateForm(formData, {
        newPassword: ValidationRules.minLength(VALIDATION.MIN_PASSWORD_LENGTH),
        confirmPassword: ValidationRules.passwordMatch(formData.newPassword),
      });

      setAuthState(prev => ({ ...prev, isLoading: true, error: undefined }));

      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) {
        const errorMessage = handleAuthError(error);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return { success: false, error: errorMessage };
      }

      toast(TOAST_MESSAGES.AUTH.PASSWORD_UPDATE_SUCCESS);
      navigate(ROUTES.DASHBOARD);
      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password update failed";
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      logError(error as Error, { context: "updatePassword" });
      return { success: false, error: errorMessage };
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };
}