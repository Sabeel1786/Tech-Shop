import React from "react";
import Advantages from "../Components/Advantages"
import Footer from "../Components/Footer"

const AllProducts = () =>{
    return(
        <>
        <div className="allProductsSection">
            <div className="leftAllProd"></div>
            <div className="rightAllProd"></div>

        </div>
        <Advantages/>
        <Footer/>
        </>
    )
}
export default AllProducts