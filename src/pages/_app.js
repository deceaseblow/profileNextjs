// src/pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import DividerTop from "../components/dividerTop";
import DividerBot from "../components/dividerBot";
import Pfp from "../components/pfp";
import { AppDataProvider } from "../context/AppDataContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppDataProvider>
      <Head>
        <link rel="icon" href="/images/key.webp" type="image/webp" />
        <title>eclipse</title>
      </Head>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 beaufort">
        <div className="w-full md:w-64 bg-black text-white flex flex-col justify-between md:h-screen md:sticky md:top-0">
          <div>
            <DividerTop />
            <div className="flex items-center justify-center py-3">
              <Link href="/">
                <Pfp />
              </Link>
            </div>

            <nav className="flex flex-col">
              <div className="flex flex-wrap gap-1 md:flex-col justify-center">
                <Nav href="/" label="Home" />
                <Nav href="/blogs" label="Blog" />
                <Nav href="/links" label="Links" />
                <Nav href="/mangas" label="Manga" />
                <Nav href="/shows" label="Shows" />
                <Nav href="/movies" label="Movies" />
              </div>
            </nav>
          </div>

          <div className="hidden md:block">
            <DividerBot />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-6">
          <Component {...pageProps} />
        </div>
      </div>
    </AppDataProvider>
  );
}

function Nav({ href, label }) {
  return (
    <Link
      href={href}
      className="px-2 py-2 md:px-4 md:py-1 transition text-center text-sm md:text-base hover:bg-white hover:text-black"
    >
      {label}
    </Link>
  );
}
