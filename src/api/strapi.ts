const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name?: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  cover?: StrapiImage;
  category?: {
    name: string;
  };
  blocks?: any[]; // Using any for blocks for now as structure is dynamic
}

/**
 * Helper to normalize Strapi response
 */
const normalizeData = <T>(data: any): T | T[] | null => {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => normalizeData(item)) as T[];
  }

  if (data.attributes) {
    return {
      id: data.id,
      ...data.attributes,
      // Recursively normalize relations if needed
      cover: data.attributes.cover?.data
        ? normalizeData(data.attributes.cover.data)
        : null,
    } as T;
  }

  return data as T;
};

export const getImageUrl = (path?: string) => {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
};

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.statusText}`);
    }
    const json = await response.json();
    return normalizeData<Article>(json.data) as Article[];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
};

export const fetchArticle = async (documentId: string): Promise<Article> => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles/${documentId}?populate[blocks][populate]=*&populate[cover][populate]=*&populate[category][populate]=*&populate[author][populate]=*`
    );
    if (!response.ok) {
      throw new Error(`Error fetching article: ${response.statusText}`);
    }
    const json = await response.json();
    return normalizeData<Article>(json.data) as Article;
  } catch (error) {
    console.error(`Failed to fetch article ${documentId}:`, error);
    throw error;
  }
};
