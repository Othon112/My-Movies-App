"use client";

import React, { useEffect, useState } from "react";

import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/guestSessionContext";
import Pagination from "@/components/Pagination";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any[]>([]); // TODO: add proper typing later
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId);
        setMovies(data?.results || []);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  }

  return (
    <div className="mx-20 my-10">
      <h3 className="text-3xl font-bold mb-6 text-white">My Favorite Movies</h3>

      {loading && (
        <h5 className="text-lg text-white">Loading favorites...</h5>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don’t have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie’s detail page and click “Add to Favorites” to see it
            here.
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default MyFavoritesPage;
