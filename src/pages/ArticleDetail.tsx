import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchArticle } from "../api/strapi";
import BlockRenderer from "../components/BlockRenderer";
import StrapiImage from "../components/StrapiImage";
import { Skeleton } from "../components/ui/skeleton";

const ArticleDetail = () => {
  const { documentId } = useParams<{ documentId: string }>();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", documentId],
    queryFn: () => fetchArticle(documentId!),
    enabled: !!documentId,
  });

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-12">
        <Skeleton className="h-6 w-32 mb-8" />
        <Skeleton className="aspect-video w-full rounded-lg mb-8" />
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container py-12 text-center text-red-600">
        Error loading article.
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-12">
      <Link
        to="/"
        className="inline-block mb-8 text-blue-600 font-medium hover:underline"
      >
        &larr; Back to Home
      </Link>

      <article>
        {article.cover && (
          <StrapiImage
            image={article.cover}
            className="w-full rounded-lg mb-8 shadow-sm"
          />
        )}

        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {article.description && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.description}
          </p>
        )}

        <div className="mt-8">
          <BlockRenderer blocks={article.blocks} />
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
