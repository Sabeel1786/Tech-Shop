import React, { useState } from "react";
import Footer from "../Components/Footer";
import Advantages from "../Components/Advantages";
import { useParams } from "react-router-dom";
import productsData from "../assets/data/productsData";
import Dstyle from "../Components/productDetails.module.css"
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
    const [activeImage, setActiveImage] = useState(null);

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

                        {product.images.map((image, index) => (
                            <div className={Dstyle.previewImg} key={index} onClick={() => setActiveImage(image)}>
                                <img src={image} alt={product.title} />
                            </div>
                        ))}

                    </div>

                    <div className={Dstyle.DetailMiddle}>
                        <img src={activeImage || product.images[0]} alt={product.title} />
                    </div>


                    <div className="DetailRight">
                        {
                            <div className="Text">
                                <p className="Title">{product.title}</p>
                                <p className="Info">{product.info}</p>
                                <div className="Rating">
                                    {
                                        [...Array(product.rateCount)].map((_, i) => (
                                            <FaStar key={i} color="red" />
                                        ))
                                    }
                                </div>
                                <hr></hr>
                                <div className="prices">
                                    
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <Advantages />
            <Footer />
        </>
    );
};

export default ProductDetails;
