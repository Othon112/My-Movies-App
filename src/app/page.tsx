"use client";
import { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import MovieCarrousel from "@/components/MoviesCarrousel/MovieCarrousel";
import { IMovieDetail } from "@/types/IMovieDetail";

export default function Home() {
  const [upcoming, setUpcoming] = useState<IMovieDetail[]>([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await getUpcomingMovies();
      setUpcoming(data?.results?.slice(0, 15) || []);
    };
    fetchUpcoming();
  }, []);

  // Obtener la imagen de fondo de la primera película
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const backdrops = upcoming.map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero con imagen de fondo */}
      <div
        className="relative w-full h-[350px] flex items-center justify-center mb-10"
        style={{
          backgroundImage: backdrops ? `url(${backdrops})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        {/* Overlay para oscurecer la imagen */}
        <div className="absolute inset-0 bg-opacity-60" />
        {/* Texto centrado */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-white text-center drop-shadow-lg">
            Welcome to Movie App
          </h1>
          <p className="mt-4 text-lg text-gray-200 text-center drop-shadow-lg">
            Explore our collection of movies and TV shows, curated just for you.
          </p>
        </div>
      </div>

      {upcoming.length > 0 && (
        <div className="mt-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">Upcoming Movies</h2>
          <MovieCarrousel movies={upcoming} />
        </div>
      )}
    </div>
  );
}