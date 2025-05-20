import React from "react";

interface Movie {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  release_date: string;
}

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <div className="mx-auto mt-2 w-72 bg-white border rounded shadow-lg overflow-hidden">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
        <p className="italic text-gray-600 mb-2">{movie.original_title}</p>
        <p className="text-sm text-gray-700 mb-3">{movie.description.substring(0, 120)}...</p>
        <p className="text-sm text-gray-500 mb-1">Director: {movie.director}</p>
        <p className="text-sm text-gray-500 mb-1">Año: {movie.release_date}</p>
      </div>
    </div>
  );
};
