import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:documentId" element={<ArticleDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
