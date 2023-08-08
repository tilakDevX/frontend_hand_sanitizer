import React from 'react'
 import Home from '../Pages/Home'
 import Product from '../Pages/Product'
import  {Route , Routes} from "react-router-dom"
import Login1 from '../Pages/Login1'
import SignUp from '../Pages/Signup'
import Checkout from "../Pages/Checkout"
import Cart from "../Pages/Cart"
const AllRoutes = () => {
  return (

    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}  ></Route>
        <Route path='/login' element={<Login1/>}  ></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/cart' element={<Cart></Cart>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>

    </div>

  )
}

export default AllRoutes