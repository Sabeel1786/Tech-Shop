import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";

const Routings = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/productDetails" element={<ProductDetails/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>
            </Routes>
        </>
    )
}
export default Routings