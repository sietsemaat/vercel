import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticle, getImageUrl } from "../api/strapi";
import BlockRenderer from "../components/BlockRenderer";

const ArticleDetail = () => {
  const { documentId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticle(documentId);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [documentId]);

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

        {/* Render content using BlockRenderer */}
        <div style={{ marginTop: "2rem" }}>
          <BlockRenderer blocks={article.blocks} />
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
