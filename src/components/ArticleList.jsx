import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
