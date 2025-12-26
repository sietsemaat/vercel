import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ResponsiveHeader from "./components/ResponsiveHeader";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-white font-sans antialiased">
          <ResponsiveHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles/:documentId" element={<ArticleDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
