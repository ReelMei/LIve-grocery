import {Toaster} from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import AppLayout from './Pages/AppLayout'
import Home from './Pages/Home'
import Products from './Pages/Products'
import ProductPage from './Pages/ProductPage'
import SearchResults from './Pages/SearchResults'
import FlashDeals from './Pages/FlashDeals'
import Checkout from './Pages/Checkout'
import MyOrders from './Pages/MyOrders'
import OrderTracking from './Pages/OrderTracking'
import Addreses from './Pages/Addreses'
import ProtectedRoutes from './Components/ProtectedRoutes'

const App = () => {
  return (
    <>
      <Toaster position='top-right' toastOptions={{duration: 3000, style: {background: "#1B3022", color: "#fff", borderRadius: "12px", fontSize: "14px"}}}/>

      <Routes>
        {/* Auth pages - No Navbar/Footer */}
        <Route path ="/login" element={<Login />}/>

        {/* App pages - With Navbar/Footer */}
        <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />}/>
        <Route path='products' element={<Products />}/>
        <Route path='products/:id' element={<ProductPage />}/>
        <Route path='search' element={<SearchResults />}/>
        <Route path='deals' element={<FlashDeals />}/>

         {/* Protected Routes - Only accessible when logged in */}

        <Route element={<ProtectedRoutes />}>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='orders' element={<MyOrders/>}/>
          <Route path='orders/:id' element={<OrderTracking/>}/>
          <Route path='addresses' element={<Addreses/>}/>
        </Route>


        </Route>


      </Routes>
    </>
  )
}

export default App
