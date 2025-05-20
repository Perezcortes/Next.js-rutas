import React from "react";
import { MovieCard } from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  release_date: string;
}

interface Props {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: Props) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
