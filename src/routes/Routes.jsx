import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Product_page from '../pages/Product_page'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

export const Routes = () => {
  return (
    <>
        <ReactRoutes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/Product_page' element={<Product_page/>}/>
        </ReactRoutes>
    
    </>
  )
}

export default Routes