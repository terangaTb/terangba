
-- Restrict EXECUTE on SECURITY DEFINER function to only roles that need it for RLS evaluation
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Tighten permissive INSERT policies on public submission tables with validation checks
DROP POLICY IF EXISTS "Anyone can submit a contact request" ON public.contact_requests;
CREATE POLICY "Anyone can submit a contact request"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(message) BETWEEN 1 AND 5000
);

DROP POLICY IF EXISTS "Anyone can submit a meeting request" ON public.meeting_requests;
CREATE POLICY "Anyone can submit a meeting request"
ON public.meeting_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone) BETWEEN 3 AND 50
  AND char_length(meeting_type) BETWEEN 1 AND 100
  AND char_length(time_slot) BETWEEN 1 AND 100
  AND (company IS NULL OR char_length(company) <= 200)
  AND (country IS NULL OR char_length(country) <= 100)
  AND (description IS NULL OR char_length(description) <= 5000)
);
