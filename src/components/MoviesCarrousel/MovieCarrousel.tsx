import Link from "next/link";
import IMovieCard from "@/components/MovieCard/MovieCard";
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
            className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <Link href={`/movie/${movie.id}`}>
              <div className="flex justify-center items-center h-full">
                <IMovieCard
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path}
                  releaseYear={new Date(movie.release_date).getFullYear()}
                  description={movie.overview}
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