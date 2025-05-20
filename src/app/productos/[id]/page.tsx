import { Product } from '@/app/interfaces/product';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `${i + 1}`,
  }));
}

const getProductById = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error('Producto no encontrado');

    return res.json();
  } catch (error) {
    console.error(error);
    notFound();
  }
};


export default async function ProductPage({ params }: any) {
  const product = await getProductById(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <Image src={product.image} alt={product.title} width={300} height={300} />
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>${product.price}</p>
    </div>
  );
}
