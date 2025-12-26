import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchArticles, Article } from "../api/strapi";
import StrapiImage from "../components/StrapiImage";
import { Skeleton } from "../components/ui/skeleton";

const Home = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-12 w-64 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center text-red-600">
        Error loading articles.
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-12 tracking-tight">
        Latest updates
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles?.map((article: Article) => {
          const formattedDate = new Date(
            article.publishedAt
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <Link
              key={article.id}
              to={`/articles/${article.documentId}`}
              className="group flex flex-col h-full"
            >
              {article.cover && (
                <div className="mb-6 overflow-hidden rounded-lg bg-gray-100">
                  <StrapiImage
                    image={article.cover}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
                  {article.category?.name && (
                    <span className="text-blue-600">
                      {article.category.name}
                    </span>
                  )}
                  <span>{formattedDate}</span>
                </div>

                <h2 className="text-2xl font-normal text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>

                <p className="text-base text-gray-600 line-clamp-3 mb-4 flex-1">
                  {article.description}
                </p>

                <span className="text-sm font-medium text-blue-600 mt-auto">
                  Read post
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
