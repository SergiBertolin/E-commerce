import { useAppStore } from "../stores/useAppStore"
import type { Product } from "../types"

type ProductsDetailsProps = {
    product: Product
}

export default function ProductsCard({ product } : ProductsDetailsProps) {
    
    const { addToCart, favoriteExist, handleClickFavorite } = useAppStore()

    const isFavorite = favoriteExist(product.id)

    return (
        <div className="relative border shadow-lg rounded-xl">
            <button
                type="button"
                onClick={() => handleClickFavorite(product)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            >
                {isFavorite ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="red">
                        <path d="M12 21s-11-6-11-12.6C1 4 4.5 3 6.5 3 9 3 11 5 12 6.5 13 5 15 3 17.5 3c2 0 5.5 1 5.5 5.4C23 15 12 21 12 21Z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                        <path fill="none" stroke="red" strokeWidth="2" d="M1 8.4C1 4 4.5 3 6.5 3 9 3 11 5 12 6.5 13 5 15 3 17.5 3c2 0 5.5 1 5.5 5.4C23 15 12 21 12 21S1 15 1 8.4Z"/>
                    </svg>
                )}
            </button>
        
            <div className="overflow-hidden">
                <img 
                    src={product.images[0]}
                    alt={`Imagen de ${product.title}`}
                />
            </div>

            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{product.title} - {product.price}$</h2>
                <button
                    type="button"
                    className="bg-[#aec3b0] hover:bg-[#598392] mt-5 w-full p-3 font-bold text-white text-lg rounded-xl"
                    onClick={() => addToCart(product)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}