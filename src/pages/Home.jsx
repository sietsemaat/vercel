import React, { useEffect, useState } from "react";
import { fetchArticles } from "../api/strapi";
import ArticleList from "../components/ArticleList";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <div className="loading">Loading articles...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Latest Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
};

export default Home;
