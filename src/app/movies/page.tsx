import React from 'react';

interface Pelicula {
  id: string;
  title: string;
  release_date: string;
  description: string;
  image: string;
}

async function getPeliculas(): Promise<Pelicula[]> {
  const res = await fetch('https://ghibliapi.vercel.app/films');
  if (!res.ok) throw new Error('Error al obtener películas');
  return res.json();
}

export default async function PeliculasPage() {
  const peliculas = await getPeliculas();

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Películas de Studio Ghibli</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {peliculas.map(pelicula => (
          <div
            key={pelicula.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href={`/movies/${pelicula.id}`}>
              <img
                className="rounded-t-lg object-cover h-64 w-full"
                src={pelicula.image}
                alt={pelicula.title}
              />
            </a>
            <div className="p-5">
              <a href={`/movies/${pelicula.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {pelicula.title} ({pelicula.release_date})
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {pelicula.description.length > 100
                  ? pelicula.description.substring(0, 100) + '...'
                  : pelicula.description}
              </p>
              <a
                href={`/movies/${pelicula.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Más información
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
