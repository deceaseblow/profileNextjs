import { createContext, useContext, useEffect, useState } from "react";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
    const [data, setData] = useState({
        animes: [],
        blogs: [],
        links: [],
        mangas: [],
        movies: [],
        list :[],
        shows: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAll() {
            setLoading(true);

            try {
                const endpoints = [
                    ["animes", "/api/animes"],
                    ["blogs", "/api/blogs"],
                    ["links", "/api/links"],
                    ["mangas", "/api/mangas"],
                    ["movies", "/api/movies"],
                    ["list", "api/list"],
                    ["shows", "api/shows"]
                ];

                const results = {};

                for (const [key, url] of endpoints) {
                    const res = await fetch(url);

                    if (!res.ok) {
                        console.error(`❌ Failed to fetch ${key}:`, res.status);
                        results[key] = [];
                        continue;
                    }

                    results[key] = await res.json();
                }

                setData({
                    animes: results.animes,
                    blogs: results.blogs,
                    links: results.links,
                    mangas: results.mangas,
                    movies: results.movies,
                    list : results.list,
                    shows: results.shows
                });
            } catch (err) {
                console.error("AppDataContext fatal error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAll();
    }, []);


    /* ---------- HELPERS (match your old API) ---------- */

    const getLinks = () => data.links;
    const getBlogs = () => data.blogs;
    const getAnimes = () => data.animes;
    const getMangas = () => data.mangas;
    const getMovies = () => data.movies;
    const getList = () => data.list
    const getShows = () => data.shows

    return (
        <AppDataContext.Provider
            value={{
                data,
                loading,
                error,
                getLinks,
                getBlogs,
                getAnimes,
                getMangas,
                getMovies,
                getList,
                getShows
            }}
        >
            {children}
        </AppDataContext.Provider>
    );
}

export function useAppData() {
    return useContext(AppDataContext);
}
