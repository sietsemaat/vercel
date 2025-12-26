import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticle, getImageUrl } from "../api/strapi";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticle(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) return <div className="loading">Loading article...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!article) return <div className="error">Article not found</div>;

  const imageUrl = article.cover?.url;
  const fullImageUrl = getImageUrl(imageUrl);

  return (
    <div className="container">
      <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
        &larr; Back to Home
      </Link>

      <article>
        {fullImageUrl && (
          <img
            src={fullImageUrl}
            alt={article.cover.alternativeText || article.title}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
        <h1>{article.title}</h1>
        {article.description && (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            {article.description}
          </p>
        )}

        {/* Render content - assuming it might be rich text or markdown, but for now just dumping it if it's a string */}
        {/* If Strapi returns blocks (Rich Text v2), we'd need a renderer. Assuming simple text or blocks for now. */}
        <div style={{ marginTop: "2rem", lineHeight: "1.8" }}>
          {/* Simple handling for now. If it's blocks, we might need more logic. */}
          {/* Strapi v4 often returns blocks. Let's check if we can just JSON stringify it if it's complex, or render if text. */}
          {/* For this demo, we'll assume it's simple or just show a placeholder if complex blocks */}
          {typeof article.content === "string"
            ? article.content
            : article.blocks
            ? "Content is in blocks format (requires renderer)"
            : JSON.stringify(article.content)}
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
