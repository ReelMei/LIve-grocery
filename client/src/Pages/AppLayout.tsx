import { Outlet } from "react-router-dom"
import Banner from "../Components/Banner"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"



const AppLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />
    <main className="min-h-screen">
        <Outlet />
    </main>

    <Footer />
    <p>cartsidebar</p>
    </>
  )
}

export default AppLayout
