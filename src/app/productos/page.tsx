
import { Product } from "../interfaces/product";
import { ProductGrid } from "../components/ProductGrid";

//import { redirect } from "next/navigation";
// export default function ProductsRoot() {
//   redirect("/productos/1");
// }


//   export interface Product {
//     id:          number;
//     title:       string;
//     price:       number;
//     description: string;
//     category:    string;
//     image:       string;
// }
const get_products = async (): Promise<Product[]> => {
  const data = await fetch(`https://fakestoreapi.com/products`
    //, {
    //cache: 'force-cache'
    //next: {revalidate: 5}
    //} 
).then(resp => resp.json());

  const products = data.map( (prod: { id: number; title: string; price: number; description: string; category: string; image: string; }) => ({
    id: prod.id,
    title: prod.title,
    price: prod.price,
    description: prod.description,
    category: prod.category,
    image: prod.image,
  }));

  return products;
};



//export default async function ProductsRoot(props: ProductsProps) {
export default async function ProductsPage() {  

  //const data = await get_products();
  const products: Product[] = await get_products();


  return(


    <div className="flex flex-col">

      <span className="text-5xl my-2">Listado de Pokémons <small>estático</small></span>
      
      <ProductGrid products={ products } />

    </div>

    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    // {data.map((product) => (

  //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //   {data.map((product: Product) => (
  //     <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
  //       <div className="relative w-full h-48 sm:h-64">
  //         <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" 
  //           className="p-4 object-contain"
  //           sizes="(max-width: 768px) 100vw, 33vw"
  //         />
  //       </div>
  //       <div className="p-4">
  //         <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
  //         <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
  //         <div className="flex items-center justify-between">
  //           <span className="text-xl font-bold text-indigo-600">${product.price}</span>
  //           <span className="text-gray-500 text-sm">{product.category}</span>
  //         </div>
  //         <Link
  //             href={`/productos/${product.id}`}
  //             className="block mt-4 w-full text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
  //           > View Details
  //           </Link>
  //       </div>
  //     </div>
  //   ))}
  // </div>

  );
}

/*
Array.from({length: 200}).map( (v, i) =>  i+ 1 );
*/