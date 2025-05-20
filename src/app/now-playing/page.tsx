'use client';

import React, { useEffect, useState } from "react";
import getNowPlayingMovies from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination";
import { on } from "events";

const NowPlayingClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getNowPlayingMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchNowPlayingMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  }

  return (
  <div className="mx-20 my-10">
    {/* Loading indicator */}
    {loading ? (
      
      <div className="flex items-center justify-center h-96 ">
        <h5 className="text-lg text-white">Cargando...</h5>
      </div>
    ) : (
      <>
        <h3 className="text-3xl font-bold mb-6 text-white">Now-Playing Movies</h3>
        <MovieList movies={movies}/> 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    )}
  </div>
);
};

export default NowPlayingClientPage;