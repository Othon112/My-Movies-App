import Link from "next/link";
import MovieCardCarrousel from "@/components/MovieCardCarrousel/MovieCardCarrousel";
import { IMovieDetail } from "@/types/IMovieDetail";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


interface MovieCarrouselProps {
  movies: IMovieDetail[];
}

const MovieCarrousel: React.FC<MovieCarrouselProps> = ({ movies }) => {
  return (
    
      <Carousel className="w-full max-w-screen-2xl">
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="px-0 basis-1/4"
            style={{ width: 180, minWidth: 180, maxWidth: 180  }} 
          >
            <Link href={`/movie/${movie.id}`}>
              <div className="flex justify-center items-center h-full">
                <MovieCardCarrousel
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseYear={new Date(movie.release_date).getFullYear()}
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    
    
  );
};

export default MovieCarrousel;