import { Outlet } from "react-router-dom"
import Banner from "../Components/Banner"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import CartSidebar from "../Components/CartSidebar"



const AppLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />
    <main className="min-h-screen">
        <Outlet />
    </main>

    <Footer />
    <CartSidebar />
    </>
  )
}

export default AppLayout
