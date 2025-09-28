import { useEffect, useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import ProductsCard from "../Components/ProductsCard"


export default function IndexPage() {
    const fetchProducts = useAppStore((state) => state.fetchProducts)
    const products = useAppStore((state) => state.filteredProducts)
    const hasProducts = useMemo(() => products?.length, [products])

    useEffect(() => {
      fetchProducts()
    }, [])

    return (
      <>
        {hasProducts ? (  
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
              {products?.map((product) => (
                  <ProductsCard
                    key={product.id}
                    product={product}
                  />
              ))}
            </div>
          ) : (
            <p className="my-10 text-center text-2xl text-[#598392]">
                No hay resultados aún, utiliza el formulario para buscar productos
            </p>
          )}
      </>
    )
}
