import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../api/strapi";

const ArticleCard = ({ article }) => {
  const { documentId, title, description, cover } = article;

  // Use the medium format if available, otherwise original
  const imageUrl = cover?.formats?.medium?.url || cover?.url;
  const fullImageUrl = getImageUrl(imageUrl);

  return (
    <div className="article-card">
      {fullImageUrl && (
        <img
          src={fullImageUrl}
          alt={cover.alternativeText || title}
          className="article-image"
        />
      )}
      <div className="article-content">
        <h2 className="article-title">{title}</h2>
        <p className="article-description">
          {description
            ? description.length > 100
              ? `${description.substring(0, 100)}...`
              : description
            : "No description available."}
        </p>
        <Link to={`/articles/${documentId}`} className="read-more">
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
