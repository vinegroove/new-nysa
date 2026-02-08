-- Remove event-related tables and enums
DROP TABLE IF EXISTS public.event_attendees CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TYPE IF EXISTS public.event_type CASCADE;