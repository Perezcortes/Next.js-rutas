// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritosReducer from './favoritosSlice';

export const store = configureStore({
// Configuramos el store de Redux con el reducer de favoritos
  reducer: {
    favoritos: favoritosReducer,
  },
});

// Tipos auxiliares para facilitar el uso de Redux con TypeScript

// RootState: representa el tipo del estado global de Redux
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: tipo para el dispatch del store
export type AppDispatch = typeof store.dispatch;

