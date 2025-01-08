export interface BlogPost {
  id: string;
  translations: Record<string, BlogTranslation>;
  defaultLanguage: string;
}

export interface BlogTranslation {
  title: string;
  excerpt: string;
  content: Block[];
  publishedAt: string;
}

export type Block = 
  | { type: 'paragraph'; content: string }
  | { type: 'code'; content: string; language: string }
  | { type: 'image'; url: string; caption: string }
  | { type: 'spoiler'; title: string; content: Block[] };

export type Language = 'en' | 'es' | 'pt';