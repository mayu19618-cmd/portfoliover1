export interface Feature {
  heading: string;
  body: string;
}

export interface ProfileData {
  name: string;
  role: string;
  photo?: string;
  taglineJa?: string;
  bio: string;
  features: Feature[];
}

export interface SiteData {
  heroEyebrow: string;
  heroTaglineJa: string;
  contactEmail: string;
  contactText: string;
  instagramUrl?: string;
  twitterUrl?: string;
  pinterestUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface SkillsData {
  groups: SkillGroup[];
}

const profileModules = import.meta.glob('/content/profile.json', { eager: true }) as Record<string, { default: ProfileData }>;
const siteModules = import.meta.glob('/content/site.json', { eager: true }) as Record<string, { default: SiteData }>;
const skillsModules = import.meta.glob('/content/skills.json', { eager: true }) as Record<string, { default: SkillsData }>;

export const profileData: ProfileData = Object.values(profileModules)[0]?.default ?? {
  name: 'mayu.',
  role: 'Graphic Designer / Web Designer',
  bio: '',
  features: [],
};

export const siteData: SiteData = Object.values(siteModules)[0]?.default ?? {
  heroEyebrow: 'Creative Design & Web Portfolio',
  heroTaglineJa: '想いを、デザインでかたちに。',
  contactEmail: 'mayu@example.com',
  contactText: '',
};

export const skillsData: SkillsData = Object.values(skillsModules)[0]?.default ?? {
  groups: [],
};
