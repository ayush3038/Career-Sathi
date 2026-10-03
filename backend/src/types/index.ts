export type Role = "Student" | "Parent" | "Counsellor";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  fullName?: string;
}

export interface CareerDNAProfile {
  academicBackground?: string;
  subjects?: string[];
  marksIndicator?: string;
  interests?: string[];
  skills?: string[];
  workEnvironment?: string;
  goals?: string;
  onboardingComplete?: boolean;
}

export interface Preferences {
  domains?: string[];
  interests?: string[];
  skills?: string[];
  workEnvironments?: string[];
  budget?: string;
  location?: string;
  trainingDuration?: string;
  governmentPrivate?: string;
  educationPathway?: string;
}

export interface Career {
  id: string;
  name: string;
  domain: string;
  description: string;
  eligibility: string;
  training: string;
  skills: string[];
  duration: string;
  workEnvironment?: string;
  trainingType?: string;
  locationSupport?: string;
  nextSteps?: string[];
}

export interface Pathway {
  id: string;
  careerId: string;
  title: string;
  trainingProviderType?: string;
  duration?: string;
  costBand?: string;
  governmentPrivate?: string;
  location?: string;
  eligibility?: string;
  skills?: string[];
}

export interface Recommendation {
  id?: string;
  careerId: string;
  career?: Career;
  matchScore: number;
  reasons: string[];
  constraints: string[];
  skills: string[];
  training: string;
  nextSteps: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  sequence: number;
  status: "completed" | "in_progress" | "upcoming";
  estimatedDuration?: string;
  relatedSkills?: string[];
  action?: string;
  nextStep?: string;
}

export interface Roadmap {
  id?: string;
  pathwayId: string;
  careerId?: string;
  title: string;
  milestones: RoadmapMilestone[];
}

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
}
