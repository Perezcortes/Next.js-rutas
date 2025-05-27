'use client'

import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { FaTrash, FaEye, FaStar, FaTimes } from 'react-icons/fa'

import { Film } from '../interfaces/films'
import { quitarFavorito } from '../../redux/favoritosSlice'
import { crearSlug } from '../utils/slug'

type Props = {
  isOpen: boolean
  onClose: () => void
  favoritos: Film[]
}

export default function FavoritosModal({ isOpen, onClose, favoritos }: Props) {
  const dispatch = useDispatch()

  const handleOutsideClick = useCallback(() => onClose(), [onClose])
  const handleInsideClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-16 md:pt-24 z-50 px-4 sm:px-6 transition-opacity duration-300"
      onClick={handleOutsideClick}
      aria-hidden={!isOpen}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={handleInsideClick}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-500 text-xl" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Tus Películas Favoritas
            </h2>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-semibold px-2 py-1 rounded-full">
              {favoritos.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <FaTimes className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          {favoritos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FaStar className="text-gray-300 dark:text-gray-600 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lista vacía
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Añade películas a favoritos para verlas aquí
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {favoritos.map((film) => (
                <li
                  key={film.id}
                  className="py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={film.image}
                        alt={film.title}
                        className="w-16 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center">
                        <FaStar className="text-white text-xs" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {film.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {film.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/peliculas/${crearSlug(film.title)}`}
                        className="p-2 text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        title="Ver detalles"
                      >
                        <FaEye size={16} />
                      </a>
                      <button
                        onClick={() => dispatch(quitarFavorito(film.id))}
                        className="p-2 text-red-600 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                        title="Eliminar de favoritos"
                        aria-label={`Quitar ${film.title} de favoritos`}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {favoritos.length > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-t from-white to-white/70 dark:from-gray-800 dark:to-gray-800/70 border-t border-gray-200 dark:border-gray-700 p-4 flex justify-center z-10">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-md"
            >
              Cerrar lista
            </button>
          </div>
        )}
      </div>
    </div>
  )
}