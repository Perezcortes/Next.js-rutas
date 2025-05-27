'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import FavoritosModal from '../components/FavoritosModal';
import { FaHeart } from 'react-icons/fa';

export default function FavoritosFloating() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const favoritos = useSelector((state: RootState) => state.favoritos.peliculas);
  const favoritosCount = favoritos.length;

  // Solución 1: Detectar cuando estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Solución 2: Evitar renderizado condicional que cause discrepancia
  if (!isClient) {
    return (
      <div className="fixed bottom-5 right-5 md:top-5 md:right-5 z-50">
        <button
          className="bg-red-600 text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex justify-center items-center text-xl shadow-lg"
          aria-label="Ver favoritos"
        >
          <FaHeart />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 md:top-5 md:right-5 z-50">
        <button
          onClick={() => setModalOpen(true)}
          className={`
            relative bg-red-600 hover:bg-red-700 text-white rounded-full 
            w-12 h-12 md:w-14 md:h-14 flex justify-center items-center 
            text-xl shadow-lg transition-all duration-300
            transform hover:scale-105 active:scale-95
            ring-2 ring-white/20 hover:ring-white/40
          `}
          aria-label={`Ver ${favoritosCount} favoritos`}
          title={`Mis favoritos (${favoritosCount})`}
        >
          <FaHeart className="text-white" />
          
          {/* Solución 3: Renderizar siempre el span pero controlar visibilidad */}
          <span className={`
            absolute -top-2 -right-2 bg-white text-red-600 
            rounded-full w-6 h-6 flex items-center justify-center
            text-xs font-bold shadow-md border-2 border-red-600
            transition-opacity duration-200
            ${favoritosCount > 0 ? 'opacity-100 animate-pulse' : 'opacity-0'}
          `}>
            {favoritosCount}
          </span>
        </button>
      </div>

      <FavoritosModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        favoritos={favoritos}
      />
    </>
  );
}