// src/redux/favoritosSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Film } from '../app/interfaces/films';

// Definimos la estructura del estado de favoritos
interface FavoritosState {
  peliculas: Film[];
}

// Estado inicial de favoritos
const initialState: FavoritosState = {
  peliculas:
    // Verificamos que estemos en entorno cliente antes de acceder a localStorage
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('favoritos') || '[]')
      : [],
};

// Creamos el slice de Redux para manejar favoritos
const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    // Acción para agregar una película a la lista de favoritos
    agregarFavorito: (state, action: PayloadAction<Film>) => {
      // Verificamos si la película ya está en favoritos por su ID
      const existe = state.peliculas.some(p => p.id === action.payload.id);
      if (!existe) {
        // Si no existe, la agregamos
        state.peliculas.push(action.payload);
        // Guardamos la lista actualizada en localStorage
        localStorage.setItem('favoritos', JSON.stringify(state.peliculas));
      }
    },

    // Acción para quitar una película de la lista de favoritos por su ID
    quitarFavorito: (state, action: PayloadAction<string>) => {
      // Filtramos la lista removiendo la película cuyo ID coincide
      state.peliculas = state.peliculas.filter(p => p.id !== action.payload);
      // Guardamos la nueva lista en localStorage
      localStorage.setItem('favoritos', JSON.stringify(state.peliculas));
    },
  },
});

// Exportamos las acciones para poder usarlas en componentes
export const { agregarFavorito, quitarFavorito } = favoritosSlice.actions;

// Exportamos el reducer para integrarlo al store principal
export default favoritosSlice.reducer;
