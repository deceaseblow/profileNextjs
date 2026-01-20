import React from "react";

function BlogCard({ title, date, image, content }) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-400 py-4 px-5 rounded-md">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl font-bold break-words">{title}</h1>
          <span>·</span>
          <p className="text-xs text-gray-600">{date}</p>
        </div>

        <p className="text-sm leading-relaxed break-words">
          {content || "No content available"}
        </p>

        {/* Image only renders if exists, and doesn't affect layout if missing */}
        {image && (
          <div className="w-full max-h-48 overflow-hidden rounded">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
