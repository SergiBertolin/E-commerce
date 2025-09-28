import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import Cart from "./Cart"

export default function Header() {
    const [searchFilter, setSearchFilter] = useState({
        product: '',
        category: '',
        minPrice: 0
    })

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])

    const { fetchCategories } = useAppStore()
    const { categories, searchProduct, searchCategory, searchPrice, resetFilters } = useAppStore()

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        resetFilters()
        /* Si quisiera validar el input y el select: 
        if(Object.values(search).includes('')) {
            console.log('Todos los campos son obligatorios')
            return
        } */
        if (searchFilter.product) 
            searchProduct({ productFiltered: searchFilter.product });
        if (searchFilter.category) 
            searchCategory({ categoryFiltered: searchFilter.category });
        if (searchFilter.minPrice) 
            searchPrice({ priceFiltered: searchFilter.minPrice });
    }
    
    const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchFilter({
            ...searchFilter,
            minPrice: Number(e.target.value)
        })
    }
    
    return (
    <header className="bg-[#aec3b0]">
        <div className="mx-auto container py-6">
            <nav className="flex items-center gap-10">
                <div className="flex justify-end w-full">
                    { isHome && (
                        <form 
                            className="flex-1 md:w-1/2 2xl:w-1/3 bg-white my-10 p-10 rounded-lg shadow grid grid-cols-2 gap-8 w-full"
                            onSubmit={handleSubmit}>
                            <div>
                                <label 
                                    htmlFor="category"
                                    className="text-[#598392] uppercase font-extrabold text-lg"
                                >Nombre de la categoria</label>
        
                                <select 
                                    name="category" 
                                    id="category"
                                    className="p-3 w-full rounded-lg focs:outline-none"
                                    onChange={handleChange}
                                    value={searchFilter.category}
                                >
                                    <option value="">-- Seleccione --</option>
                                    {categories.map(category => (
                                        <option value={category.slug} key={category.slug}>
                                            {category.slug}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label 
                                    htmlFor="product"
                                    className="text-[#598392] uppercase font-extrabold text-lg"
                                    >Nombre del producto</label>
                                    
        
                                <input 
                                    type="text" 
                                    name="product" 
                                    id="product"
                                    className="p-3 w-full rounded-lg focs:outline-none"
                                    placeholder="Nombre del producto"
                                    onChange={handleChange}
                                    value={searchFilter.product}
                                />
                            </div>
                            <div className="mx-auto col-span-2">
                                <label htmlFor="price">Precio a partir de: </label>
                                <input
                                    className="text-end"
                                    type="number" 
                                    id="precio"
                                    value={searchFilter.minPrice}
                                    min="0"
                                    max="40000"
                                    onChange={handleChangeMinPrice}
                                />
                                <span>$</span>
                            </div>
                            <input
                                type='submit'
                                value='Buscar Producto'
                                className='cursor-pointer bg-[#aec3b0] hover:bg-[#598392] text-white font-extrabold p-2 rounded-lg uppercase col-span-2'
                            />
                        </form>
                    )}
                    <div className="flex gap-6">
                        <Cart />
                        <NavLink 
                            to="/"
                            className={({isActive}) => 
                                isActive ? "text-black uppercase font-bold hover:text-[#598392]"
                            : "text-white uppercase font-bold hover:text-[#598392]"
                        }
                        >Inicio</NavLink>
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) => 
                                isActive ? "text-black uppercase font-bold hover:text-[#598392]"
                            : "text-white uppercase font-bold hover:text-[#598392]"
                        }
                        >Favoritos</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    </header>
  )
}
