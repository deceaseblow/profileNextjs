// src/pages/shows.js
import { useState } from "react";
import ShowsCard from "../components/ShowsCard";
import { useAppData } from "../context/AppDataContext";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif",
};

const Shows = () => {
  const { data, loading } = useAppData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  if (loading) {
    return (
      <div className="pb-10 px-4 md:px-10">
        <h2
          className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
          style={fontStyle}
        >
          Shows
        </h2>
        <p className="text-center mt-4">Loading shows...</p>
      </div>
    );
  }

  const shows = data?.shows ?? [];

  if (!shows || shows.length === 0) {
    return <p className="text-center text-gray-400">No shows available.</p>;
  }

  const genres = [
    "All",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Fantasy",
    "Animation",
    "Mystery",
    "Supernatural",
  ];

  const fuzzyMatch = (str, query) => {
    if (!str || !query) return false;
    str = str.toLowerCase();
    query = query.toLowerCase();
    return [...query].every((char) => str.includes(char));
  };

  const filteredShows = shows.filter((show) => {
    const matchesSearch = searchTerm
      ? show.title && fuzzyMatch(show.title, searchTerm)
      : true;

    const matchesGenre =
      selectedGenre === "All"
        ? true
        : show.genres?.some(
            (genre) => genre.toLowerCase() === selectedGenre.toLowerCase()
          );

    return matchesSearch && matchesGenre;
  });

  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);

  return (
    <div className="pb-10 px-4 md:px-10">
      <h2
        className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}
      >
        Shows
      </h2>

      <p className="text-center text-[22px] font-bold text-black md:text-start md:text-[20px]">
        Currently {filteredShows.length === 0 ? 'no' : filteredShows.length}{" "}
        {filteredShows.length === 1 ? 'show is' : 'shows are'} found for your search.
      </p>

      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-6 w-72 sm:w-80 px-4 py-2 rounded-full border border-gray-400 bg-white text-black font-mono text-sm sm:text-base
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            placeholder-gray-500 placeholder:italic transition-all duration-200"
        />

        {/* Genre Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedGenre === genre
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-400 hover:bg-gray-100"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {filteredShows.slice(0, visibleCount).map((show, index) => (
            <ShowsCard key={index} show={show} />
          ))}
        </div>

        {visibleCount < filteredShows.length && (
          <button
            onClick={handleLoadMore}
            className="mt-6 px-6 py-3 bg-black hover:bg-white text-white hover:text-black font-semibold rounded-lg shadow-md transition duration-300 cursor-pointer"
          >
            Load More 
          </button>
        )}
      </div>
    </div>
  );
};

export default Shows;
