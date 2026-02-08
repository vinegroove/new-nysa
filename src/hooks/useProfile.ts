// Custom hook for user profile management

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserProfile, ProfileUpdateForm, LoadingState } from "@/lib/types";
import { logError, ValidationRules, validateForm } from "@/lib/utils/errors";
import { TOAST_MESSAGES, VALIDATION } from "@/lib/constants";

interface ProfileState extends LoadingState {
  profile: UserProfile | null;
}

export function useProfile(userId?: string) {
  const [profileState, setProfileState] = useState<ProfileState>({
    profile: null,
    isLoading: true,
    error: undefined,
  });

  const { toast } = useToast();

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfileState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setProfileState(prev => ({ ...prev, isLoading: true, error: undefined }));

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        throw error;
      }

      setProfileState({
        profile: data,
        isLoading: false,
        error: undefined,
      });

    } catch (error) {
      const errorMessage = "Failed to load profile";
      setProfileState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      logError(error as Error, { context: "fetchProfile", userId });
    }
  }, [userId]);

  // Update user profile
  const updateProfile = useCallback(async (formData: ProfileUpdateForm) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "No user ID provided",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      // Validate form data
      const validationRules: Record<keyof ProfileUpdateForm, (value: any) => string | null> = {
        first_name: (value) => {
          if (value && typeof value === "string" && value.length > VALIDATION.MAX_NAME_LENGTH) {
            return `First name must be no more than ${VALIDATION.MAX_NAME_LENGTH} characters`;
          }
          return null;
        },
        last_name: (value) => {
          if (value && typeof value === "string" && value.length > VALIDATION.MAX_NAME_LENGTH) {
            return `Last name must be no more than ${VALIDATION.MAX_NAME_LENGTH} characters`;
          }
          return null;
        },
        bio: (value) => {
          if (value && typeof value === "string" && value.length > VALIDATION.MAX_BIO_LENGTH) {
            return `Bio must be no more than ${VALIDATION.MAX_BIO_LENGTH} characters`;
          }
          return null;
        },
      };

      validateForm(formData, validationRules);

      setProfileState(prev => ({ ...prev, isLoading: true, error: undefined }));

      // Clean up form data (remove empty strings and undefined values)
      const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = typeof value === "string" ? value.trim() : value;
        }
        return acc;
      }, {} as Record<string, any>);

      const { error } = await supabase
        .from("profiles")
        .update({
          ...cleanedData,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      // Update local state
      setProfileState(prev => ({
        ...prev,
        profile: prev.profile ? {
          ...prev.profile,
          ...cleanedData,
          updated_at: new Date().toISOString(),
        } : null,
        isLoading: false,
      }));

      toast(TOAST_MESSAGES.PROFILE.UPDATE_SUCCESS);
      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Profile update failed";
      setProfileState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      
      toast({
        ...TOAST_MESSAGES.PROFILE.UPDATE_ERROR,
        description: errorMessage,
        variant: "destructive",
      });
      
      logError(error as Error, { context: "updateProfile", userId, formData });
      return { success: false, error: errorMessage };
    }
  }, [userId, toast]);

  // Get user's display name
  const getDisplayName = useCallback((): string => {
    if (!profileState.profile) return "User";
    
    const { first_name, last_name } = profileState.profile;
    
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    } else if (first_name) {
      return first_name;
    } else if (last_name) {
      return last_name;
    }
    
    return "User";
  }, [profileState.profile]);

  // Get user's initials for avatar
  const getInitials = useCallback((): string => {
    if (!profileState.profile) return "U";
    
    const { first_name, last_name } = profileState.profile;
    
    if (first_name && last_name) {
      return `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
    } else if (first_name) {
      return first_name.charAt(0).toUpperCase();
    } else if (last_name) {
      return last_name.charAt(0).toUpperCase();
    }
    
    return "U";
  }, [profileState.profile]);

  // Initialize profile data
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    ...profileState,
    updateProfile,
    getDisplayName,
    getInitials,
    refetch: fetchProfile,
  };
}