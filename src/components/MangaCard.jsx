export default function MangaCard({ manga }) {
  const fallbackImage =
    "https://dennymfg.com/cdn/shop/products/ckgrayHigh_grande.jpg?v=1619109728";

  if (!manga.link) return null; 

  return (
    <a
      href={manga.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-gray-700 shadow-[0_0_15px_rgba(255,255,255,0.05)] overflow-hidden rounded-lg transition-transform duration-300 w-40 sm:w-56 md:w-64 cursor-pointer hover:scale-105 block"
    >
      <img
        src={manga.image?.trim() ? manga.image : fallbackImage}
        alt={manga.title}
        className="w-full h-56 sm:h-64 md:h-80 object-cover bg-gray-900 transition duration-300"
      />

      <div className="p-3 sm:p-4 flex flex-col gap-2 text-black">
        <h2 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide">
          {manga.title}
        </h2>

        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
          {manga.genres?.length ? (
            manga.genres.map((genre, index) => (
              <span
                key={index}
                className="bg-black text-white text-[9px] sm:text-[11px] px-2 py-0.5 rounded-full uppercase"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="border border-gray-600 text-gray-400 text-[10px] px-2 py-1 rounded-full">
              Unknown
            </span>
          )}
        </div>

        <p className="mt-2 text-[10px] sm:text-[11px] uppercase font-bold">
          Status:{" "}
          <span
            className={`font-semibold ${
              manga.status === "completed" ? "text-black" : "text-red-500"
            }`}
          >
            {manga.status || "Unknown"}
          </span>
        </p>
      </div>
    </a>
  );
}
