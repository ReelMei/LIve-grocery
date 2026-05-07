import { Outlet } from "react-router-dom"
import Banner from "../Components/Banner"
import Navbar from "../Components/Navbar"



const AppLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />
    <main className="min-h-screen">
        <Outlet />
    </main>
    <p>footer</p>
    <p>cartsidebar</p>
    </>
  )
}

export default AppLayout
