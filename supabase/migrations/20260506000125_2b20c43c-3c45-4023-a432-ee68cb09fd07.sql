
CREATE TYPE public.meeting_status AS ENUM ('new', 'confirmed', 'cancelled', 'done');

CREATE TABLE public.meeting_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_type text NOT NULL,
  preferred_date date NOT NULL,
  time_slot text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  country text,
  description text,
  status public.meeting_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.meeting_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a meeting request"
ON public.meeting_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view meeting requests"
ON public.meeting_requests FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update meeting requests"
ON public.meeting_requests FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete meeting requests"
ON public.meeting_requests FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
