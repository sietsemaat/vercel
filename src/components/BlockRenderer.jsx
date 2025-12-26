import React from "react";
import ReactMarkdown from "react-markdown";
import { getImageUrl } from "../api/strapi";

const RichText = ({ data }) => {
  return (
    <div
      className="rich-text"
      style={{
        lineHeight: "1.8",
        fontSize: "18px",
        color: "#3c4043",
        marginBottom: "24px",
      }}
    >
      <ReactMarkdown>{data.body}</ReactMarkdown>
    </div>
  );
};

const Quote = ({ data }) => {
  return (
    <blockquote
      style={{
        borderLeft: "4px solid #1a73e8",
        margin: "32px 0",
        padding: "16px 24px",
        backgroundColor: "#f8f9fa",
        fontStyle: "italic",
      }}
    >
      <p style={{ fontSize: "20px", margin: "0 0 8px 0", color: "#202124" }}>
        "{data.body}"
      </p>
      {data.title && (
        <cite
          style={{ fontSize: "14px", color: "#5f6368", fontStyle: "normal" }}
        >
          — {data.title}
        </cite>
      )}
    </blockquote>
  );
};

const Media = ({ data }) => {
  if (!data.file) return null;

  const imageUrl = getImageUrl(data.file.url);

  return (
    <figure style={{ margin: "32px 0" }}>
      <img
        src={imageUrl}
        alt={data.file.alternativeText || data.file.name}
        style={{ width: "100%", borderRadius: "8px", display: "block" }}
      />
      {data.file.caption && (
        <figcaption
          style={{
            textAlign: "center",
            color: "#5f6368",
            fontSize: "14px",
            marginTop: "8px",
          }}
        >
          {data.file.caption}
        </figcaption>
      )}
    </figure>
  );
};

const Slider = ({ data }) => {
  if (!data.files || data.files.length === 0) return null;

  return (
    <div
      className="slider-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
        margin: "32px 0",
      }}
    >
      {data.files.map((file) => (
        <img
          key={file.id}
          src={getImageUrl(file.url)}
          alt={file.alternativeText || file.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ))}
    </div>
  );
};

const BlockRenderer = ({ blocks }) => {
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
            console.warn(`Unknown block type: ${block.__component}`);
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
