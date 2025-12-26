import ReactMarkdown from "react-markdown";
import StrapiImage from "./StrapiImage";
import { StrapiImage as StrapiImageType } from "../api/strapi";

interface RichTextBlock {
  __component: "shared.rich-text";
  body: string;
}

interface QuoteBlock {
  __component: "shared.quote";
  title?: string;
  body: string;
}

interface MediaBlock {
  __component: "shared.media";
  file: StrapiImageType;
}

interface SliderBlock {
  __component: "shared.slider";
  files: StrapiImageType[];
}

type Block = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

const RichText = ({ data }: { data: RichTextBlock }) => {
  return (
    <div className="prose prose-lg max-w-none text-gray-800 mb-8">
      <ReactMarkdown>{data.body}</ReactMarkdown>
    </div>
  );
};

const Quote = ({ data }: { data: QuoteBlock }) => {
  return (
    <blockquote className="border-l-4 border-blue-600 my-8 pl-6 py-4 bg-gray-50 italic">
      <p className="text-xl text-gray-900 mb-2">"{data.body}"</p>
      {data.title && (
        <cite className="text-sm text-gray-600 not-italic">— {data.title}</cite>
      )}
    </blockquote>
  );
};

const Media = ({ data }: { data: MediaBlock }) => {
  return (
    <figure className="my-8">
      <StrapiImage image={data.file} className="w-full rounded-lg" />
      {data.file.caption && (
        <figcaption className="text-center text-gray-500 text-sm mt-2">
          {data.file.caption}
        </figcaption>
      )}
    </figure>
  );
};

const Slider = ({ data }: { data: SliderBlock }) => {
  if (!data.files || data.files.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {data.files.map((file) => (
        <StrapiImage
          key={file.id}
          image={file}
          className="w-full h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  );
};

const BlockRenderer = ({ blocks }: { blocks?: Block[] }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="article-blocks">
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "shared.rich-text":
            return <RichText key={index} data={block} />;
          case "shared.quote":
            return <Quote key={index} data={block} />;
          case "shared.media":
            return <Media key={index} data={block} />;
          case "shared.slider":
            return <Slider key={index} data={block} />;
          default:
            console.warn(`Unknown block type: ${(block as any).__component}`);
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
