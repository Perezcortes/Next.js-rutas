// utils/slug.ts
export function crearSlug(texto: string) {
    return texto
      .toLowerCase()
      .normalize('NFD')                   // Descomponer acentos
      .replace(/[\u0300-\u036f]/g, '')   // Eliminar acentos
      .replace(/[^a-z0-9\s-]/g, '')      // Quitar caracteres especiales
      .trim()
      .replace(/\s+/g, '-');              // Reemplazar espacios por guiones
  }
  