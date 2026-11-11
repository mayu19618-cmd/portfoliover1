export type WorkCategory = 'Web Design' | 'Graphic Design' | 'Branding' | 'Other Works';

export interface WorkImage {
  url: string;
  alt: string;
}

export interface Work {
  id: string;
  title: string;
  category: WorkCategory;
  year: number;
  order: number;
  published: boolean;
  thumbnail: string;
  thumbnailAlt: string;
  color: string;
  duration?: string;
  siteUrl?: string;
  overview: string;
  purpose: string;
  target: string;
  concept: string;
  tools: string[];
  highlights: string[];
  images: WorkImage[];
}

type WorkData = Omit<Work, 'id'>;

const modules = import.meta.glob('/content/works/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, WorkData>;

export const works: Work[] = Object.entries(modules)
  .map(([path, data]) => ({
    id: path.split('/').pop()!.replace('.json', ''),
    ...data,
  }))
  .filter((w) => w.published !== false)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const categories: WorkCategory[] = ['Web Design', 'Graphic Design', 'Branding', 'Other Works'];
