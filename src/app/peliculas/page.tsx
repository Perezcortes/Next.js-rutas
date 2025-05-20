// src/app/peliculas/page.tsx

import React from "react";
import { Movie } from "../interfaces/films"; // Opcional: si tienes interface separada
import { MovieGrid } from "../components/MovieGrid"; // Ajusta ruta según dónde guardes tus componentes

async function getMovies(): Promise<Movie[]> {
  const res = await fetch('https://ghibliapi.vercel.app/films');
  if (!res.ok) throw new Error('Error al obtener películas');
  return res.json();
}

export default async function PeliculasPage() {
  const movies = await getMovies();

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Películas de Studio Ghibli</h1>
      <MovieGrid movies={movies} />
    </main>
  );
}
