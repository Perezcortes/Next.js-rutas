'use client';

import { Film } from '../interfaces/films';
import CardMovie from './MovieCard';
import { crearSlug } from '../utils/slug';  // Importa aquí

type Props = {
  peliculas: Film[];
};

export default function GridMovies({ peliculas }: Props) {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {peliculas.map((pelicula) => (
        <CardMovie 
          key={pelicula.id} 
          pelicula={pelicula} 
          slug={crearSlug(pelicula.title)} 
        />
      ))}
    </div>
  );
}
