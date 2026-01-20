import { useState } from "react";
import MangaCard from "../components/MangaCard";
import { useAppData } from "../context/AppDataContext";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif"
};

const MangaList = () => {
  const { data, loading } = useAppData();

  const mangaList = data?.mangas || [];

  const [visibleReading, setVisibleReading] = useState(5);
  const [visibleWillRead, setVisibleWillRead] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  if (loading) {
    return (
      <div className="pb-10 px-4 md:px-10">
        <h2
          className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
          style={fontStyle}
        >
          Manga List
        </h2>
        <p className="text-center text-lg">Loading manga...</p>
      </div>
    );
  }

  const fuzzyMatch = (str, query) => {
    if (!str || !query) return false;
    str = str.toLowerCase();
    query = query.toLowerCase();
    return [...query].every((char) => str.includes(char));
  };

  const filteredMangas = mangaList.filter((manga) => {
    const matchesSearch = searchTerm
      ? manga.title && fuzzyMatch(manga.title, searchTerm)
      : true;

    const matchesGenre =
      selectedGenre === "All"
        ? true
        : manga.genres?.some(
            (genre) => genre.toLowerCase() === selectedGenre.toLowerCase()
          );

    return matchesSearch && matchesGenre;
  });

  const readingMangas = filteredMangas.filter(
    (manga) => manga.status === "reading"
  );

  const willReadMangas = filteredMangas.filter(
    (manga) => manga.status !== "reading"
  );

  const genres = [
    "All",
    "Romance",
    "Comedy",
    "Drama",
    "Psychological",
    "Horror",
    "GL",
    "BL",
    "Shoujo",
    "Sports",
    "Supernatural",
    "Video Games",
    "College Life"
  ];

  return (
    <div className="pb-10 px-4 md:px-10">
      <h2
        className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}
      >
        Manga List
      </h2>

      <p className="text-center text-[22px] font-bold text-black md:text-start md:text-[20px]">
        Currently {filteredMangas.length || "no"}{" "}
        {filteredMangas.length === 1 ? "manga is" : "mangas are"} found for your search.
      </p>

      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="Search manga..."
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

        <h3 className="text-[30px] font-bold border-b-4 border-black pb-2">
          Currently Reading
        </h3>

        <div className="py-3 flex flex-wrap gap-3 justify-center">
          {readingMangas.length ? (
            readingMangas.slice(0, visibleReading).map((manga, index) => (
              <MangaCard key={`reading-${index}`} manga={manga} />
            ))
          ) : (
            <p className="text-gray-600 italic">None found..</p>
          )}
        </div>

        {visibleReading < readingMangas.length && (
          <button
            onClick={() => setVisibleReading((p) => p + 5)}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
          >
            Load More
          </button>
        )}

        <h3 className="text-[30px] font-bold border-b-4 border-black pb-2 mt-6">
          Read / Favorites
        </h3>

        <div className="py-3 flex flex-wrap gap-3 justify-center">
          {willReadMangas.length ? (
            willReadMangas.slice(0, visibleWillRead).map((manga, index) => (
              <MangaCard key={`willread-${index}`} manga={manga} />
            ))
          ) : (
            <p className="text-gray-600 italic">None found..</p>
          )}
        </div>

        {visibleWillRead < willReadMangas.length && (
          <button
            onClick={() => setVisibleWillRead((p) => p + 5)}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default MangaList;
