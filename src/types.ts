export interface Project {
  title: string;
  description: string;
  techStack: string[];
  period?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  category: string;
  items: { name: string; icon?: string }[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Achievement {
  title: string;
  description: string;
  metric?: string;
  tag?: string;
}
