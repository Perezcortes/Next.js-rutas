import { Film } from '../../interfaces/films';

// Generar rutas estáticas con el título en lugar del ID
export async function generateStaticParams() {
  const res = await fetch("https://ghibliapi.vercel.app/films");
  const peliculas = await res.json();

  return peliculas.map((pelicula: { title: string }) => ({
    id: pelicula.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Obtener datos de una película por título
const getPeliculaPorTitulo = async (titulo: string): Promise<Film | null> => {
  try {
    const res = await fetch("https://ghibliapi.vercel.app/films");
    const peliculas: Film[] = await res.json();

    // Buscar la película usando el título en formato URL
    return peliculas.find((p) =>
      p.title.toLowerCase().replace(/\s+/g, '-') === titulo
    ) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Página de detalles de película con datos estáticos
export default async function DetallePeliculaPage({ params }: { params: { id: string } }) {
  const pelicula = await getPeliculaPorTitulo(params.id);
  
  if (!pelicula) return <h1 className="text-3xl text-red-600 text-center mt-20">⚠️ Película no encontrada</h1>;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
      <img 
        src={pelicula.image} 
        alt={pelicula.title} 
        className="w-full h-64 md:h-96 object-contain rounded-lg mb-6"
        loading="lazy"
      />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{pelicula.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{pelicula.description}</p>
      <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
        Año de estreno: {pelicula.release_date}
      </p>
    </main>
  );
}
