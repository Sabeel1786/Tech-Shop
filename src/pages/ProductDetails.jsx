import React from "react";
import Footer from "../Components/Footer";
import Advantages from "../Components/Advantages";
import { useParams } from "react-router-dom";
import productsData from "../assets/data/productsData";
import Dstyle from "../Components/productDetails.module.css"

const ProductDetails = () => {
    const { id } = useParams();

    const product = productsData.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return <h1>Product Not Found 😴</h1>;
        
    }

    console.log(product);
    
    return (
        <>
            <div className="DetailesContainer">
                <div className={Dstyle.DetailedBox}>

            
                    <div className={Dstyle.DetailLeft}>
                        {product.images.map((img, index) => (
                            <img key={index} src={img} alt={product.title} />
                        ))}
                    </div>

                    
                    <div className="DetailMiddle">
                        
                    </div>

                    
                    <div className="DetailRight">
                       
                    </div>

                </div>
            </div>

            <Advantages />
            <Footer />
        </>
    );
};

export default ProductDetails;
