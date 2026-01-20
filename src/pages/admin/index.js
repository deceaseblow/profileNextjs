import { useEffect, useState } from "react";

const todayDate = () => new Date().toISOString().split("T")[0];

export default function AdminPage() {
   
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: "", image: "", content: "" });
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editBlog, setEditBlog] = useState({ title: "", image: "", content: "" });
    const [isAuth, setIsAuth] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") { // check if in browser
            const token = localStorage.getItem("adminToken");
            if (token) setIsAuth(true);
        }
    }, []);

    const login = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("adminToken", data.token); // store JWT locally
            setIsAuth(true);
        } else {
            alert("Wrong password");
        }
    };

    const [mangas, setMangas] = useState([]);
    const [newManga, setNewManga] = useState({
        title: "",
        author: "",
        year: "",
        genres: "",
        status: "",
        comment: "",
        image: "",
        link: ""
    });
    const [editingMangaId, setEditingMangaId] = useState(null);
    const [editManga, setEditManga] = useState({
        title: "",
        author: "",
        year: "",
        genres: "",
        status: "",
        comment: "",
        image: "",
        link: ""
    });

    const [mangaSearch, setMangaSearch] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("adminToken");
            if (token) setIsAuth(true);
        }
        fetchBlogs();
        fetchMangas();
    }, []); 

    const fetchBlogs = async () => {
        const res = await fetch("/api/blogs");
        setBlogs(await res.json());
    };

    const createBlog = async () => {
        if (!newBlog.title.trim()) return;
        const token = localStorage.getItem("adminToken");

        await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- add token
            },
            body: JSON.stringify({ ...newBlog, date: todayDate() })
        });
        setNewBlog({ title: "", image: "", content: "" });
        fetchBlogs();
    };

    const startEditBlog = (blog) => {
        setEditingBlogId(blog._id);
        setEditBlog({ title: blog.title, image: blog.image, content: blog.content });
    };


    const saveBlogEdit = async () => {
        const token = localStorage.getItem("adminToken");

        await fetch("/api/blogs", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- add token
            },
            body: JSON.stringify({ id: editingBlogId, ...editBlog })
        });
        setEditingBlogId(null);
        fetchBlogs();
    };


    const deleteBlog = async (id) => {
        if (!confirm("Delete this blog?")) return;
        const token = localStorage.getItem("adminToken");

        await fetch("/api/blogs", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- add token
            },
            body: JSON.stringify({ id })
        });
        fetchBlogs();
    };

    const fetchMangas = async () => {
        const res = await fetch("/api/mangas");
        setMangas(await res.json());
    };

    const createManga = async () => {
        if (!newManga.title.trim()) return;
        const token = localStorage.getItem("adminToken");

        await fetch("/api/mangas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- add token
            },
            body: JSON.stringify({
                ...newManga,
                genres: newManga.genres.split(",").map(g => g.trim()).filter(Boolean)
            })
        });
        setNewManga({
            title: "",
            author: "",
            year: "",
            genres: "",
            status: "",
            comment: "",
            image: "",
            link: ""
        });
        fetchMangas();
    };

    const startEditManga = (manga) => {
        setEditingMangaId(manga._id);
        setEditManga({
            title: manga.title,
            author: manga.author,
            year: manga.year,
            genres: (manga.genres || []).join(", "),
            status: manga.status,
            comment: manga.comment,
            image: manga.image,
            link: manga.link
        });
    };

    const saveMangaEdit = async () => {
        const token = localStorage.getItem("adminToken");

        await fetch("/api/mangas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- add token
            },
            body: JSON.stringify({
                id: editingMangaId,
                ...editManga,
                genres: editManga.genres.split(",").map(g => g.trim()).filter(Boolean)
            })
        });
        setEditingMangaId(null);
        fetchMangas();
    };

    const deleteManga = async (id) => {
        if (!confirm("Delete this manga?")) return;
        const token = localStorage.getItem("adminToken");

        await fetch("/api/mangas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- add token
            },
            body: JSON.stringify({ id })
        });
        fetchMangas();
    };

    const filteredMangas = mangas.filter((m) =>
        m.title.toLowerCase().includes(mangaSearch.toLowerCase())
    );

    if (!isAuth) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-4 py-2"
                />
                <button onClick={login} className="bg-black text-white px-4 py-2 rounded">
                    Enter
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-5 text-black">
            <div className="flex flex-col gap-3">
                <h1 className="text-[25px] font-bold text-center">EDITING MODE</h1>
                {/* 
            <section>
                <h2 className="text-2xl font-bold mb-4">Blogs</h2>

                <div className="grid gap-3 max-w-xl mb-6">
                    <input
                        placeholder="Title"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="border px-3 py-2"
                    />
                    <input
                        placeholder="Image URL"
                        value={newBlog.image}
                        onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                        className="border px-3 py-2"
                    />
                    <textarea
                        placeholder="Content"
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                        className="border px-3 py-2"
                    />
                    <button onClick={createBlog} className="bg-black text-white px-4 py-2">
                        Add Blog
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="border p-4">
                            {editingBlogId === blog._id ? (
                                <div className="grid gap-2">
                                    <input
                                        value={editBlog.title}
                                        onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
                                        className="border px-3 py-2"
                                    />
                                    <input
                                        value={editBlog.image}
                                        onChange={(e) => setEditBlog({ ...editBlog, image: e.target.value })}
                                        className="border px-3 py-2"
                                    />
                                    <textarea
                                        value={editBlog.content}
                                        onChange={(e) => setEditBlog({ ...editBlog, content: e.target.value })}
                                        className="border px-3 py-2"
                                    />
                                    <div className="flex gap-3">
                                        <button onClick={saveBlogEdit} className="bg-black text-white px-4 py-2">
                                            Save
                                        </button>
                                        <button onClick={() => setEditingBlogId(null)} className="underline">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <strong>{blog.title}</strong>
                                        <p className="text-sm text-gray-500">{blog.date}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => startEditBlog(blog)} className="underline text-sm">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteBlog(blog._id)} className="text-red-500">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
*/}
                <section className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">ADD A MANGA!</h2>
                    {/* ADDING MANGA FORM */}
                    <div className="flex flex-col gap-3 max-w-xl mb-6">
                        <input
                            placeholder="Title"
                            value={newManga.title}
                            onChange={(e) => setNewManga({ ...newManga, title: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <input
                            placeholder="Author"
                            value={newManga.author}
                            onChange={(e) => setNewManga({ ...newManga, author: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <input
                            placeholder="Year"
                            value={newManga.year}
                            onChange={(e) => setNewManga({ ...newManga, year: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <input
                            placeholder="Genres (commas)"
                            value={newManga.genres}
                            onChange={(e) => setNewManga({ ...newManga, genres: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <input
                            placeholder="Status"
                            value={newManga.status}
                            onChange={(e) => setNewManga({ ...newManga, status: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <input
                            placeholder="Image URL"
                            value={newManga.image}
                            onChange={(e) => setNewManga({ ...newManga, image: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <input
                            placeholder="External Link"
                            value={newManga.link}
                            onChange={(e) => setNewManga({ ...newManga, link: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <textarea
                            placeholder="Comment"
                            value={newManga.comment}
                            onChange={(e) => setNewManga({ ...newManga, comment: e.target.value })}
                            className="border px-3 py-2"
                        />
                        <button onClick={createManga} className="bg-black text-white px-4 py-2">
                            Add Manga
                        </button>
                    </div>
                    <div className="mb-4 text-center ">
                        <input
                            type="text"
                            placeholder="Search mangas..."
                            value={mangaSearch}
                            onChange={(e) => setMangaSearch(e.target.value)}
                            className="my-6 w-72 sm:w-80 px-4 py-2 rounded-full border border-gray-400 bg-white text-black font-mono text-sm sm:text-base
                                  focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                                placeholder-gray-500 placeholder:italic transition-all duration-200"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 ">
                        {filteredMangas.map((manga) => (
                            <div key={manga._id} className="w-[300px] flex flex-col items-center border border-2 rounded-2xl px-4 py-3">
                                {/*EDITING MANGA CARD STATE */}
                                {editingMangaId === manga._id ? (
                                    <div className="flex flex-col gap-2">
                                        <input
                                            value={editManga.title}
                                            onChange={(e) => setEditManga({ ...editManga, title: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Title"
                                        />
                                        <input
                                            value={editManga.author}
                                            onChange={(e) => setEditManga({ ...editManga, author: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Author"
                                        />
                                        <input
                                            value={editManga.year}
                                            onChange={(e) => setEditManga({ ...editManga, year: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Year"
                                        />
                                        <input
                                            value={editManga.genres}
                                            onChange={(e) => setEditManga({ ...editManga, genres: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Genres (comma separated)"
                                        />
                                        <input
                                            value={editManga.status}
                                            onChange={(e) => setEditManga({ ...editManga, status: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Status"
                                        />
                                        <input
                                            value={editManga.image}
                                            onChange={(e) => setEditManga({ ...editManga, image: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Image URL"
                                        />
                                        <input
                                            value={editManga.link}
                                            onChange={(e) => setEditManga({ ...editManga, link: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="External Link"
                                        />
                                        <textarea
                                            value={editManga.comment}
                                            onChange={(e) => setEditManga({ ...editManga, comment: e.target.value })}
                                            className="border px-3 py-2"
                                            placeholder="Comment"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={saveMangaEdit}
                                                className=" text-white px-4 py-2 rounded bg-black"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingMangaId(null)}
                                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (

                                    <div className="w-fit flex flex-col gap-5 items-center md:items-start">
                                        {/* NORMAL CARD STATE*/}
                                        <div className="flex flex-col gap-2 items-center text-center">
                                            <img src={manga.image} alt={manga.title} className="w-40 h-56 object-cover rounded" />
                                            <p className="text-[22px]">{manga.title}</p>
                                            <p className="text-md text-black">
                                                {manga.author} • {manga.year} • {manga.status}
                                            </p>
                                            <p className="text-[16px] text-black">
                                                <span className="font-bold">Genres: </span>
                                                {(manga.genres || []).join(", ")}
                                            </p>
                                            {manga.comment && <p className="italic text-gray-600">“{manga.comment}”</p>}
                                            <div className="flex gap-4">
                                                {manga.link && (
                                                    <a href={manga.link} target="_blank" rel="noopener noreferrer">
                                                        <button className="bg-black text-white px-4 py-2 rounded cursor-pointer">
                                                            Read!
                                                        </button>
                                                    </a>

                                                )}
                                                <button onClick={() => startEditManga(manga)}
                                                    className="bg-black text-white px-4 py-2 rounded cursor-pointer">
                                                    Edit
                                                </button>
                                                <button onClick={() => deleteManga(manga._id)}
                                                    className="bg-black text-white px-4 py-2 rounded cursor-pointer">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

        </div>
    );
}
