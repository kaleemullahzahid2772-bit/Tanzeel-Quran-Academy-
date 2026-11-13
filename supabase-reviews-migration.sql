-- ============================================================================
-- Al Tanzeel Quran Academy: Parents Reviews Table & Security Policies
-- ============================================================================

-- 1. Create the `reviews` table (without any mock/dummy seed data)
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

-- ============================================================================
-- NOTE: TO CLEAR ALL DUMMY / TEST REVIEWS AT ANY TIME, RUN:
-- TRUNCATE TABLE public.reviews;
-- ============================================================================
