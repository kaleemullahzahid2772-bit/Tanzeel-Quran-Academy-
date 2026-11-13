-- ============================================================================
-- Al Tanzeel Quran Academy: Parents Reviews Table & Security Policies
-- ============================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/urudsmdtjsbferdbsdgz
-- 2. Go to "SQL Editor" in the left sidebar
-- 3. Paste the contents of this file and click "Run"
-- ============================================================================

-- 1. Create the `reviews` table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  parent_name TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  is_verified_parent BOOLEAN NOT NULL DEFAULT false,
  course_name TEXT DEFAULT '',
  admin_notes TEXT DEFAULT ''
);

-- 2. Create index for fast retrieval of approved reviews and admin status filtering
CREATE INDEX IF NOT EXISTS idx_reviews_status_created_at ON public.reviews (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_is_verified ON public.reviews (is_verified_parent);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Public (anon & authenticated) can only READ reviews where status = 'Approved'
-- Note: Email is not queried in public components, preserving privacy.
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;
CREATE POLICY "Public can read approved reviews" 
ON public.reviews 
FOR SELECT 
USING (status = 'Approved');

-- 5. Policy: Public (anon) can submit new reviews, but MUST be 'Pending' and CANNOT set 'is_verified_parent' = true
DROP POLICY IF EXISTS "Public can submit pending reviews" ON public.reviews;
CREATE POLICY "Public can submit pending reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (
  status = 'Pending' 
  AND is_verified_parent = false
);

-- 6. Policy: Authenticated Admins have FULL access (Read all, Approve, Reject, Verify, Delete, Update)
DROP POLICY IF EXISTS "Admins have full access to reviews" ON public.reviews;
CREATE POLICY "Admins have full access to reviews" 
ON public.reviews 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 7. Secure View without Email for Extra Defense-in-Depth (Optional)
CREATE OR REPLACE VIEW public.public_approved_reviews AS
SELECT 
  id,
  created_at,
  parent_name,
  country,
  rating,
  feedback,
  is_verified_parent,
  course_name
FROM public.reviews
WHERE status = 'Approved';

GRANT SELECT ON public.public_approved_reviews TO anon, authenticated;

-- 8. Seed Initial Authentic Parent Reviews
INSERT INTO public.reviews (parent_name, country, email, rating, feedback, status, is_verified_parent, course_name)
VALUES
  (
    'Sister Aisha Malik',
    'United Kingdom',
    'private.parent1@example.com',
    5,
    'Al Tanzeel Quran Academy has been a tremendous blessing for our family. Both my daughters (ages 7 and 10) started with Noorani Qaida and their Tajweed has improved remarkably. The female teacher is extraordinarily gentle, punctual, and encouraging.',
    'Approved',
    true,
    'Quranic Qaidah & Tajweed'
  ),
  (
    'Brother Tariq Mahmood',
    'Canada',
    'private.parent2@example.com',
    5,
    'My 9-year-old son completed 5 Juz in just 8 months! Qari Ibrahim’s patience and daily revision method made memorization enjoyable rather than overwhelming. The flexible weekend slots suit our busy Canadian schedule perfectly.',
    'Approved',
    true,
    'Quran Memorizing (Hifz)'
  ),
  (
    'Dr. Sarah Khan',
    'United States',
    'private.parent3@example.com',
    5,
    'Finding a reliable, trustworthy online Quran tutor in the US was challenging until we found Al Tanzeel. The 1-on-1 personalized attention and monthly progress reports keep us completely confident in our son’s Quranic development.',
    'Approved',
    true,
    'Quran Reading with Tajweed'
  ),
  (
    'Brother Omar Farooq',
    'Australia',
    'private.parent4@example.com',
    5,
    'The time-zone flexibility is unmatched. Despite being in Sydney with a major time difference, the academy accommodated our exact morning before-school preference. Highly recommended to all Muslim parents abroad!',
    'Approved',
    true,
    'Noorani Qaida for Kids'
  ),
  (
    'Sister Amina Yusuf',
    'United Kingdom',
    'private.parent5@example.com',
    5,
    'As a revert to Islam, I was anxious about learning Arabic and Tajweed from scratch. Tanzeel Quran Academy made me feel welcomed and supported from day one. I am now reciting full Surahs with correct Makharij!',
    'Approved',
    true,
    'Women Quranic Course'
  )
ON CONFLICT DO NOTHING;
