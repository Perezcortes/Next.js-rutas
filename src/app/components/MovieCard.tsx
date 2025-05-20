import { Film } from '../interfaces/films';

export default function CardMovie({ pelicula }: { pelicula: Film }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-md hover:scale-105 transition-transform duration-300">
      <a href={`/peliculas/${pelicula.id}`} className="relative">
        <div className="flex justify-center items-center bg-gray-100 aspect-video">
          <img 
            src={pelicula.image} 
            alt={pelicula.title} 
            className="w-full object-contain rounded-t-lg"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 bg-black/60 text-white text-lg font-semibold w-full text-center py-2">
          {pelicula.title}
        </div>
      </a>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
          {pelicula.description}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            🎬 {pelicula.release_date}
          </span>
          <a 
            href={`/peliculas/${pelicula.id}`} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-800 transition"
          >
            Ver más →
          </a>
        </div>
      </div>
    </div>
  );
}
