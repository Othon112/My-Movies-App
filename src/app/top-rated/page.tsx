'use client';

import React, { useEffect, useState } from "react";
import  getTopRatedMovies  from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [currentPage]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  }
  return (
    <div className="mx-20 my-10">
    {/* Loading indicator */}
    {loading ? (
      
      <div className="flex items-center justify-center h-96">
        <h5 className="text-lg text-white">Cargando...</h5>
      </div>
    ) : (
      <>
        <h3 className="text-3xl font-bold mb-6 text-white"> Top-Rated Movies</h3>
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

export default TopRatedClientPage;