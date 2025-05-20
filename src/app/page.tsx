"use client";
import { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import getPopularMovies from "@/services/movies/getPopularMovies";
import nowPlayingMovies from "@/services/movies/getNowPlayingMovies";
import MovieCarrousel from "@/components/MoviesCarrousel/MovieCarrousel";
import { IMovieDetail } from "@/types/IMovieDetail";

export default function Home() {
  const [upcoming, setUpcoming] = useState<IMovieDetail[]>([]);
  const [popular, setPopular] = useState<IMovieDetail[]>([]);
  const [nowPlaying, setNowPlaying] = useState<IMovieDetail[]>([]);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await getUpcomingMovies();
      setUpcoming(data?.results?.slice(0, 15) || []);
    };
    fetchUpcoming();
  }, []);

  useEffect(() => {
    const fetchPopular = async () => {
      const data = await getPopularMovies(1);
      setPopular(data?.results?.slice(0, 15) || []);
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const data = await nowPlayingMovies(1);
      setNowPlaying(data?.results?.slice(0, 15) || []);
    };
    fetchNowPlaying();
  }, []);

  // Carousel background logic
  useEffect(() => {
    if (!popular.length) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % Math.min(popular.length, 10));
    }, 4000);
    return () => clearInterval(interval);
  }, [popular]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const bgPoster =
    popular[bgIndex]?.backdrop_path
      ? `${IMAGE_BASE_URL}${popular[bgIndex].backdrop_path}`
      : undefined;

  return (
    <div className="flex flex-col items-center min-h-screen mb-20">
      {/* Hero con imagen de fondo dinámica */}
      <div
        className="relative w-full h-[800px] flex items-center justify-center mb-10 transition-all duration-700"
        style={{
          backgroundImage: bgPoster ? `url(${bgPoster})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.7s ease-in-out",
        }}
      >
        {/* Overlay para oscurecer la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/80" />
        {/* Texto centrado */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-white text-center drop-shadow-lg ">
            Welcome to PelisXD
          </h1>
          <p className="mt-4 text-lg text-gray-200 text-center drop-shadow-lg ">
            Explore our collection of movies, curated just for you.
          </p>
        </div>
      </div>

      {upcoming.length > 0 && (
        <div className="mt-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">Upcoming Movies</h2>
          <MovieCarrousel movies={upcoming} />
        </div>
      )}

      {popular.length > 0 && (
        <div className="mt-10 w-full flex flex-col items-center ">
          <h2 className="text-2xl font-semibold mb-4 text-white">Trending Movies</h2>
          <MovieCarrousel movies={popular} />
        </div>
      )}

      {nowPlaying.length > 0 && (
        <div className="mt-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-white">Now Playing Movies</h2>
          <MovieCarrousel movies={nowPlaying} />
        </div>
      )}
    </div>
  );
}