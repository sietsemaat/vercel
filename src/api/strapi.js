const STRAPI_URL = "https://wealthy-flower-7b2d8b4969.strapiapp.com";

/**
 * Helper to normalize Strapi response
 * Strapi v4 returns { data: { id, attributes: { ... } } } or { data: [ { id, attributes: { ... } } ] }
 * We want to flatten this to { id, ...attributes }
 */
const normalizeData = (data) => {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => normalizeData(item));
  }

  if (data.attributes) {
    return {
      id: data.id,
      ...data.attributes,
      // Recursively normalize relations if needed, e.g. cover image
      cover: data.attributes.cover?.data
        ? normalizeData(data.attributes.cover.data)
        : null,
    };
  }

  return data;
};

export const fetchArticles = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.statusText}`);
    }
    const json = await response.json();
    return normalizeData(json.data);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
};

export const fetchArticle = async (id) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles/${id}?populate=*`);
    if (!response.ok) {
      throw new Error(`Error fetching article: ${response.statusText}`);
    }
    const json = await response.json();
    return normalizeData(json.data);
  } catch (error) {
    console.error(`Failed to fetch article ${id}:`, error);
    throw error;
  }
};

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
};
