export interface ProfileInfo {
  name: string;
  targetSchool: string;
  currentSchool: string;
  grade: string;
  interests: string;
  englishLevel: string;
  spanishLevel: string;
  visionQuote: string;
  visionDescription: string;
}

export interface AcademicGrade {
  term: string;
  english: string;
  korean: string;
  social: string;
  achievement: string;
  englishScore: number;
  koreanScore: number;
  socialScore: number;
}

export interface LanguageActivity {
  id: string;
  text: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  subject: string;
  date: string;
  tag: string;
  preview: string;
  abstract: string;
}

export interface CoActivity {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
}

export interface BookLog {
  id: string;
  category: "humanity" | "society" | "literature";
  categoryKo: string;
  title: string;
  author: string;
  review: string;
}

export interface RoadmapStep {
  id: string;
  gradeBadge: string;
  title: string;
  text: string;
}

export interface InterviewQnA {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface PortfolioData {
  profile: ProfileInfo;
  academicGrades: AcademicGrade[];
  languageActivities: LanguageActivity[];
  competencyRadar: {
    labels: string[];
    scores: number[];
  };
  researchReports: ResearchReport[];
  coActivities: CoActivity[];
  bookLogs: BookLog[];
  roadmapSteps: RoadmapStep[];
  interviewQnAs: InterviewQnA[];
}
