import { useMemo } from "react"
import ProductsCard from "../Components/ProductsCard"
import { useAppStore } from "../stores/useAppStore"


export default function FavoritosPage() {
    const { favorites } = useAppStore()
    const hasFavorites = useMemo(() => favorites.length, [favorites])

    return (
        <>
            <h1 className="text-6xl font-extrabold text-[#598392]">Favoritos</h1>

            {hasFavorites ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
                {favorites.map(product => (
                    <ProductsCard 
                        key={product.id}
                        product={product}
                    />
            ))}
            </div>                
            ) : (
               <p className="my-10 text-center text-2xl text-[#598392]">
                    Los productos favoritos aparecerán aquí
               </p> 
            )}

        </>
    )
}