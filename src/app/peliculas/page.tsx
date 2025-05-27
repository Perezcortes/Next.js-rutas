import { Film } from '../interfaces/films';
import GridMovies from '../components/MovieGrid';

async function getPeliculas(): Promise<Film[]> {
  const res = await fetch('https://ghibliapi.vercel.app/films', {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Error al obtener películas');
  return res.json();
}

export default async function PeliculasPage() {
  const peliculas = await getPeliculas();

  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen p-6">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🎥 Películas de Studio Ghibli
        </h1>
        {/* Solo pasamos peliculas, sin crearSlug */}
        <GridMovies peliculas={peliculas} />
      </div>
    </main>
  );
}
