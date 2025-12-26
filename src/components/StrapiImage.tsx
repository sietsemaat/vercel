import React from "react";
import { getImageUrl, StrapiImage as StrapiImageType } from "../api/strapi";
import { cn } from "../lib/utils";

interface StrapiImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  image: StrapiImageType;
  className?: string;
}

const StrapiImage: React.FC<StrapiImageProps> = ({
  image,
  className,
  ...props
}) => {
  if (!image) return null;

  const fullUrl = getImageUrl(image.url);
  if (!fullUrl) return null;

  // Generate srcset if formats exist
  const formats = image.formats;
  let srcSet = "";

  if (formats) {
    const entries = Object.values(formats);
    srcSet = entries
      .map((format) => {
        const url = getImageUrl(format?.url);
        return url ? `${url} ${format?.width}w` : "";
      })
      .filter(Boolean)
      .join(", ");

    // Add original as well
    srcSet += `, ${fullUrl} ${image.width}w`;
  }

  return (
    <img
      src={fullUrl}
      alt={image.alternativeText || image.name || "Article image"}
      srcSet={srcSet || undefined}
      width={image.width}
      height={image.height}
      loading="lazy"
      className={cn("block h-auto max-w-full", className)}
      {...props}
    />
  );
};

export default StrapiImage;
