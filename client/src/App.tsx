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
import AdminLayout from './Pages/admin/AdminLayout'
import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminProducts from './Pages/admin/AdminProducts'
import AdminProductForm from './Pages/admin/AdminProductForm'
import AdminOrders from './Pages/admin/AdminOrders'
import AdminDeliveryPartners from './Pages/admin/AdminDeliveryPartners'
import DeliveryLogin from './Pages/delivery/DeliveryLogin'
import DeliveryLayout from './Pages/delivery/DeliveryLayout'
import DeliveryDashboard from './Pages/delivery/DeliveryDashboard'

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

        {/* Admin Pages  */}
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
           <Route path='products' element={<AdminProducts />} />
            <Route path='products/new' element={<AdminProductForm />} />
             <Route path='products/:id/edit' element={<AdminProductForm />} />
              <Route path='orders' element={<AdminOrders />} />
               <Route path='delivery-partners' element={<AdminDeliveryPartners />} />
        </Route>


           {/* Delivery Partner Pages  */}
           <Route path='/delivery/login' element={<DeliveryLogin />} />
           <Route path='/delivery' element={<DeliveryLayout />} >
           <Route index element={<DeliveryDashboard />}/>

           </Route>



      </Routes>
    </>
  )
}

export default App
