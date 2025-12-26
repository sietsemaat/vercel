import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../api/strapi";

const ArticleCard = ({ article }) => {
  const { documentId, title, description, cover, category, publishedAt } =
    article;

  // Use the medium format if available, otherwise original
  const imageUrl = cover?.formats?.medium?.url || cover?.url;
  const fullImageUrl = getImageUrl(imageUrl);

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/articles/${documentId}`} className="article-card">
      {fullImageUrl && (
        <img
          src={fullImageUrl}
          alt={cover.alternativeText || title}
          className="article-image"
        />
      )}
      <div className="article-content">
        <div className="article-meta">
          {category?.name && (
            <span style={{ color: "#1a73e8", marginRight: "8px" }}>
              {category.name}
            </span>
          )}
          <span>{formattedDate}</span>
        </div>
        <h2 className="article-title">{title}</h2>
        <p className="article-description">
          {description
            ? description.length > 150
              ? `${description.substring(0, 150)}...`
              : description
            : ""}
        </p>
        <span className="read-more">Read post</span>
      </div>
    </Link>
  );
};

export default ArticleCard;
