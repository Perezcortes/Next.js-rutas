import { Film } from '../interfaces/films';
import CardMovie from './MovieCard';

export default function GridMovies({ peliculas }: { peliculas: Film[] }) {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {peliculas.map((pelicula) => (
        <CardMovie key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
}
