const ShowsCard = ({ show }) => {
  return (
    <div className="w-40 sm:w-52 md:w-60 bg-[#fff] border border-gray-700 shadow-[0_0_15px_rgba(255,255,255,0.05)] rounded-lg overflow-hidden transition-transform duration-300">
      <img
        src={show.image}
        alt={show.title}
        className="w-full h-56 sm:h-64 md:h-80 object-cover bg-gray-900"
      />
      <div className="px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-1.5 sm:gap-2 text-white">
        <h3 className="text-[#000] font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide leading-tight">
          {show.title}
        </h3>
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#000] text-[10px] sm:text-xs italic">
          <p>{show.year || "N/A"}</p>
          <span>•</span>
          {show.status && (
            <p
              className={`font-semibold uppercase ${
                show.status === "watched"
                  ? "text-[#000]"
                  : "text-red-400"
              }`}
            >
              {show.status}
            </p>
          )}
        </div>
        <p className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-[#000] mt-1 font-bold">
          Genres:&nbsp;
          {show.genres && show.genres.length > 0 ? (
            show.genres.map((genre, index) => (
              <span
                key={index}
                className="border border-gray-500 bg-[#000] text-[#fff] text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full tracking-wide uppercase"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Unknown</span>
          )}
        </p>
        {show.comment && (
          <p className="text-xs sm:text-sm font-bold italic text-gray-300 mt-2">
            “{show.comment}”
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowsCard;