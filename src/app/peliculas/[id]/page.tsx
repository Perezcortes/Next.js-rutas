// src/app/peliculas/[id]/page.tsx

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
  params: {
    id: string;
  };
}

async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!res.ok) throw new Error('Película no encontrada');
  return res.json();
}

export default async function PeliculaPage({ params }: Props) {
  const movie = await getMovie(params.id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="italic text-gray-600 mb-2">{movie.original_title}</p>
      <p className="mb-4">{movie.description}</p>
      <p className="text-sm text-gray-500 mb-1">Director: {movie.director}</p>
      <p className="text-sm text-gray-500">Año: {movie.release_date}</p>
    </main>
  );
}
