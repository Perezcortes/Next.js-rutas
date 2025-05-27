'use client';

import { Film } from '@/app/interfaces/films';

// Generar rutas estáticas para cada director
export async function generateStaticParams() {
  const res = await fetch("https://ghibliapi.vercel.app/films");
  const peliculas: Film[] = await res.json();

  // Extraer nombres únicos de directores asegurando compatibilidad con TypeScript
  const directores = Array.from(new Set(peliculas.map((p) => p.director)));

  return directores.map((nombre) => ({
    nombre: nombre.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Obtener películas por director
async function getPeliculasPorDirector(director: string): Promise<Film[]> {
  const res = await fetch("https://ghibliapi.vercel.app/films");
  const peliculas: Film[] = await res.json();

  return peliculas.filter((p) =>
    p.director.toLowerCase().replace(/\s+/g, '-') === director
  );
}

// Página de películas por director
export default async function PeliculasPorDirector({ params }: { params: { nombre: string } }) {
  const peliculas = await getPeliculasPorDirector(params.nombre);

  return (
    <main className="container mx-auto px-6 bg-gray-900 min-h-screen">
      <div className="bg-black text-white text-center py-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">
          🎬 Películas dirigidas por {params.nombre.replace(/-/g, ' ')}
        </h1>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <img src={pelicula.image} alt={pelicula.title} className="w-full h-48 object-contain rounded-lg" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-3">{pelicula.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{pelicula.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
