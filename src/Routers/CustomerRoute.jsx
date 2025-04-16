import React from 'react'
import { Navbar } from '../component/Navbar'
import { Routes,Route} from 'react-router-dom'
import { Home } from '../component/Home/Home'
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess'
import SearchPage from '../component/Home/SearchPage'

const CustomerRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/account/:register' element={<Home/>}/>
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
            <Route path='/search' element={<SearchPage/>}/>
        </Routes>
        <Auth/>
    </div>
  )
}

export default CustomerRoute