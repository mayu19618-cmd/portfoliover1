export type WorkCategory = 'Web Design' | 'Graphic Design' | 'Branding' | 'Other Works';

export interface WorkImage {
  url: string;
  alt: string;
}

export interface Work {
  id: string;
  urlSlug: string; // ルーティングに使うスラッグ（slug フィールド || id）
  slug?: string;   // CMS で設定するカスタムURL
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

type WorkData = Omit<Work, 'id' | 'urlSlug'>;

const modules = import.meta.glob('/content/works/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, WorkData>;

export const works: Work[] = Object.entries(modules)
  .map(([path, data]) => {
    const id = path.split('/').pop()!.replace('.json', '');
    return {
      id,
      urlSlug: data.slug || id, // カスタムスラッグ優先、なければファイル名
      ...data,
    };
  })
  .filter((w) => w.published !== false)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const categories: WorkCategory[] = ['Web Design', 'Graphic Design', 'Branding', 'Other Works'];
