// Centralized error handling utilities

import { AuthError } from "@supabase/supabase-js";

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code, 401);
    this.name = "AuthenticationError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

// Error message mapping for common Supabase auth errors
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Invalid email or password. Please check your credentials and try again.",
  "Email not confirmed": "Please check your email and click the confirmation link before signing in.",
  "Password should be at least 6 characters": "Password must be at least 6 characters long.",
  "User not found": "No account found with this email address.",
  "Signup not allowed for this instance": "Account creation is currently disabled.",
  "Email rate limit exceeded": "Too many requests. Please wait a moment before trying again.",
  "Password reset email rate limit exceeded": "Too many password reset attempts. Please wait before trying again.",
} as const;

/**
 * Converts Supabase auth errors to user-friendly messages
 */
export function handleAuthError(error: AuthError): string {
  if (!error?.message) {
    return "An unexpected error occurred. Please try again.";
  }

  // Check for known auth error messages
  const knownMessage = AUTH_ERROR_MESSAGES[error.message];
  if (knownMessage) {
    return knownMessage;
  }

  // Handle network errors
  if (error.message.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }

  // Handle rate limiting
  if (error.message.toLowerCase().includes("rate limit")) {
    return "Too many attempts. Please wait a moment before trying again.";
  }

  // Default to original message for unknown errors
  return error.message;
}

/**
 * Logs errors with context for debugging
 */
export function logError(error: Error, context?: Record<string, any>) {
  const errorInfo = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
  };

  // In development, log to console
  if (import.meta.env.DEV) {
    console.error("Application Error:", errorInfo);
  }

  // In production, you might want to send to an error reporting service
  // Example: errorReportingService.report(errorInfo);
}

/**
 * Generic error handler for async operations
 */
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
) {
  return async (...args: T): Promise<R | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error as Error, { context, args });
      return null;
    }
  };
}

/**
 * Validates form data and throws ValidationError if invalid
 */
export function validateForm<T>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>
): void {
  for (const [field, validator] of Object.entries(rules) as [keyof T, (value: any) => string | null][]) {
    const error = validator(data[field]);
    if (error) {
      throw new ValidationError(error, field as string);
    }
  }
}

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (fieldName: string) => (value: any) => 
    !value || (typeof value === "string" && value.trim() === "") 
      ? `${fieldName} is required` 
      : null,

  email: (value: string) => 
    !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
      ? "Please enter a valid email address" 
      : null,

  minLength: (min: number) => (value: string) => 
    !value || value.length < min 
      ? `Must be at least ${min} characters long` 
      : null,

  maxLength: (max: number) => (value: string) => 
    value && value.length > max 
      ? `Must be no more than ${max} characters long` 
      : null,

  passwordMatch: (confirmPassword: string) => (password: string) => 
    password !== confirmPassword 
      ? "Passwords do not match" 
      : null,
} as const;