import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Content file interfaces

export interface HomepageContent {
  locationIntro: string;
  whySellFast: { heading: string; body: string }[];
  marketSnapshot?: { label: string; value: string }[];
}

export interface AboutContent {
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export interface HowItWorksContent {
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export interface AreasIndexContent {
  headline: string;
  intro: string;
  body: string;
}

export interface AreaContent {
  name: string;
  slug: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface BlogPostContent {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  metaDescription: string;
}

export interface FAQContent {
  faqs: { question: string; answer: string }[];
}

export interface ContactContent {
  headline: string;
  intro: string;
  coverageArea: string;
}

// Content loading functions

function readJsonFile<T>(filePath: string): T {
  const fullPath = path.join(CONTENT_DIR, filePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

export function getHomepageContent(): HomepageContent {
  return readJsonFile<HomepageContent>('homepage.json');
}

export function getAboutContent(): AboutContent {
  return readJsonFile<AboutContent>('about.json');
}

export function getHowItWorksContent(): HowItWorksContent {
  return readJsonFile<HowItWorksContent>('how-it-works.json');
}

export function getAreasIndexContent(): AreasIndexContent {
  return readJsonFile<AreasIndexContent>('areas-index.json');
}

export function getAreaContent(slug: string): AreaContent | null {
  try {
    return readJsonFile<AreaContent>(`areas/${slug}.json`);
  } catch {
    return null;
  }
}

export function getAllBlogPosts(): BlogPostContent[] {
  const blogDir = path.join(CONTENT_DIR, 'blog');
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(blogDir, f), 'utf-8');
      return JSON.parse(raw) as BlogPostContent;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPostContent | null {
  try {
    return readJsonFile<BlogPostContent>(`blog/${slug}.json`);
  } catch {
    return null;
  }
}

export function getFAQContent(): FAQContent {
  return readJsonFile<FAQContent>('faq.json');
}

export function getContactContent(): ContactContent {
  return readJsonFile<ContactContent>('contact.json');
}
