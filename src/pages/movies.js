import { useState } from "react";
import ShowsCard from "../components/ShowsCard";
import { useAppData } from "../context/AppDataContext";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif",
};

export default function Movies() {
  const { data, loading } = useAppData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  const movies = data?.movies ?? [];

  if (loading) {
    return (
      <div className="pb-10 px-4 md:px-10">
        <h2
          className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
          style={fontStyle}
        >
          Movies
        </h2>
        <p className="text-center mt-4">Loading movies...</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="pb-10 px-4 md:px-10">
        <h2
          className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
          style={fontStyle}
        >
          Movies
        </h2>
        <p className="text-center mt-4 text-gray-400">No movies available.</p>
      </div>
    );
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
  ];

  const fuzzyMatch = (str, query) => {
    if (!str || !query) return false;
    str = str.toLowerCase();
    query = query.toLowerCase();
    return [...query].every((char) => str.includes(char));
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = searchTerm
      ? movie.title && fuzzyMatch(movie.title, searchTerm)
      : true;

    const matchesGenre =
      selectedGenre === "All"
        ? true
        : movie.genres?.some(
            (genre) => genre.toLowerCase() === selectedGenre.toLowerCase()
          );

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="pb-10 px-4 md:px-10">
      <h2
        className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}
      >
        Movies
      </h2>

      <p className="text-center text-[22px] font-bold text-black md:text-start md:text-[20px]">
        {filteredMovies.length === 0
          ? "No movies found for your search."
          : `Currently ${filteredMovies.length} ${
              filteredMovies.length === 1 ? "movie is" : "movies are"
            } found for your search.`}
      </p>

      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-6 w-72 sm:w-80 px-4 py-2 rounded-full border border-gray-400 bg-white text-black font-mono text-sm sm:text-base
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            placeholder-gray-500 placeholder:italic transition-all duration-200"
        />

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
          {filteredMovies.slice(0, visibleCount).map((movie, index) => (
            <ShowsCard key={index} show={movie} />
          ))}
        </div>

        {visibleCount < filteredMovies.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="mt-6 px-6 py-3 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 cursor-pointer"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
  