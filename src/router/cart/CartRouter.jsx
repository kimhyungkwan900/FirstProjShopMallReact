import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from '../components/Cart/CartPage';

const CartRouter = () =>{
    <BrowserRouter>
        <Routes>
            <Route path='/cart' element={<CartPage/>}/>
        </Routes>
    </BrowserRouter>
};

export default CartRouter;