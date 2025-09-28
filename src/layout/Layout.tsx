import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"


export default function Layout() {
  const {loadFromStorage} = useAppStore()
  useEffect(() => {
    loadFromStorage()  
  }, [])

  return (
    <>
        <Header />
        <main className="container mx-auto py-16">
            <Outlet />
        </main>
    </>
  )
}
