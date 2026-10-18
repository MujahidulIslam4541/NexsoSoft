export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salaryRange?: string | null;
  isActive: boolean;
  createdAt: string;
  applicationsCount?: number;
  _count?: {
    applications: number;
  };
}

export const CAREER_JOBS: CareerJob[] = [];
