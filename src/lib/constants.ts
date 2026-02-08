// Application constants and configuration

// Routes
export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
} as const;

// Auth constants
export const AUTH_MODES = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
  RESET_PASSWORD: "reset-password",
} as const;


// Form validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_EMAIL_LENGTH: 255,
  MAX_NAME_LENGTH: 100,
  MAX_BIO_LENGTH: 500,
} as const;

// API endpoints and limits
export const API = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  AUTH: {
    SIGN_IN_SUCCESS: {
      title: "Welcome back!",
      description: "Successfully signed in to your account.",
    },
    SIGN_UP_SUCCESS: {
      title: "Welcome to Nysa!",
      description: "Please check your email to confirm your account.",
    },
    PASSWORD_RESET_SUCCESS: {
      title: "Password reset email sent!",
      description: "Please check your email for password reset instructions.",
    },
    PASSWORD_UPDATE_SUCCESS: {
      title: "Password updated successfully!",
      description: "You can now access your dashboard.",
    },
    SIGN_OUT_SUCCESS: {
      title: "Signed out successfully",
      description: "Come back soon!",
    },
  },
  PROFILE: {
    UPDATE_SUCCESS: {
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    },
    UPDATE_ERROR: {
      title: "Profile update failed",
      description: "Unable to update your profile. Please try again.",
    },
  },
} as const;

// Loading states
export const LOADING_MESSAGES = {
  SIGNING_IN: "Signing in...",
  CREATING_ACCOUNT: "Creating account...",
  UPDATING_PASSWORD: "Updating password...",
  SENDING_RESET: "Sending...",
  LOADING_DASHBOARD: "Loading your dashboard...",
  
  UPDATING_PROFILE: "Updating profile...",
} as const;