'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../redux/store'; 
import { agregarFavorito, quitarFavorito } from '../../redux/favoritosSlice';
import { Film } from '../interfaces/films';
import { FaHeart, FaRegHeart, FaPlay, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

type Props = {
  pelicula: Film;
  slug: string;
};

export default function CardMovie({ pelicula, slug }: Props) {
  const dispatch = useDispatch();
  const favoritos = useSelector((state: RootState) => state.favoritos.peliculas);
  const [hasMounted, setHasMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Verificar que el componente esté montado para evitar los problemas de hidratación con SSR
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isFavorite = favoritos.some(p => p.id === pelicula.id);

  // Alternar estado de favorito previniendo la propagación del evento
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(quitarFavorito(pelicula.id));
    } else {
      dispatch(agregarFavorito(pelicula));
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col w-full h-full border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }} // Efecto de levantar al hacer hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Área principal click que enlaza a la página de detalle id */}
      <a href={`/peliculas/${slug}`} className="relative block group">
        {/* Contenedor de imagen con altura responsiva y efectos hover */}
        <div className="relative h-48 md:h-56 lg:h-64 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {/* Imagen responsiva con efecto zoom al hacer hover */}
          <img 
            src={pelicula.image} 
            alt={pelicula.title} 
            className={`h-full w-auto transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
            style={{ maxWidth: 'none' }}
          />
          
          {/* Overlay degradado que se hace más visible al hacer hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`} />
          
          {/* Animación del botón tipo play al hacer hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4 border-2 border-white/30 animate-pulse">
              <FaPlay className="text-white text-lg md:text-xl" />
            </div>
          </div>
        </div>

        {/* Título y fecha de lanzamiento superpuestos */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="text-white text-lg md:text-xl font-bold drop-shadow-lg line-clamp-1">
            {pelicula.title}
          </h3>
          <div className="flex items-center text-white/90 text-xs md:text-sm mt-1">
            <FaCalendarAlt className="mr-1" />
            <span>{pelicula.release_date}</span>
          </div>
        </div>

        {/* Botón de favoritos con verificación de montaje para compatibilidad con SSR */}
        {hasMounted && (
          <button 
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500/90 text-white shadow-lg hover:bg-red-600' 
                : 'bg-white/30 text-white hover:bg-white/40'
            }`}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {isFavorite ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <FaHeart className="text-base md:text-lg" />
              </motion.div>
            ) : (
              <FaRegHeart className="text-base md:text-lg" />
            )}
          </button>
        )}
      </a>

      {/* Área de contenido con descripción y botones de acción */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Descripción de la película con recorte responsivo de líneas */}
        <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
          {pelicula.description}
        </p>
        
        {/* Pie de tarjeta con espaciado responsivo */}
        <div className="mt-auto flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
          <div className="flex items-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1 hidden md:block" />
              {pelicula.release_date}
            </span>
          </div>

          {/* Botón de acción con tamaño responsivo */}
          <div className="flex gap-2 justify-end">
            <a 
              href={`/peliculas/${slug}`} 
              className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-xs md:text-sm font-medium hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-1"
            >
              <FaPlay className="text-xs" />
              Ver más
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}