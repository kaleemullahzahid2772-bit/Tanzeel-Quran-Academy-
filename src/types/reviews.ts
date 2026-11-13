export type ReviewStatus = "Pending" | "Approved" | "Rejected";

export interface ParentReview {
  id: string | number;
  created_at: string;
  parent_name: string;
  country: string;
  email?: string; // Private field: only visible to academy admin in Admin Portal
  rating: number; // 1 to 5 stars
  feedback: string;
  status: ReviewStatus;
  is_verified_parent: boolean;
  course_name?: string;
  admin_notes?: string;
}

export interface ReviewSubmissionPayload {
  parent_name: string;
  country: string;
  email: string;
  rating: number;
  feedback: string;
  course_name?: string;
  website_trap?: string; // Honeypot field for spam prevention
}

export interface PublicReview {
  id: string | number;
  created_at: string;
  parent_name: string;
  country: string;
  rating: number;
  feedback: string;
  is_verified_parent: boolean;
  course_name?: string;
}
