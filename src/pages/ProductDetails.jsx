import React, { useState } from "react";
import Footer from "../Components/Footer";
import Advantages from "../Components/Advantages";
import { useParams } from "react-router-dom";
import productsData from "../assets/data/productsData";
import Dstyle from "../Components/productDetails.module.css"
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";


const ProductDetails = () => {
    const [activeImage, setActiveImage] = useState(null);
    const [pcartBtn, setPCartBtn] = useState(null);
    const dispatch = useDispatch()

    const { id } = useParams();

    const product = productsData.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return <h1>Product Not Found 😴</h1>;

    }
    const DCartHandler = (param) => {
        console.log(param);
        setPCartBtn(param.id)
        dispatch(addToCart(param))

        setTimeout(() => {
            setPCartBtn(null)
        }, 1000)
    }

    console.log(product);

    return (
        <>
            <div className={Dstyle.DetailesContainer}>
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


                    <div className={Dstyle.DetailRight}>
                        {
                            <div className={Dstyle.Text}>
                                <p className={Dstyle.Title}>{product.title}</p>
                                <p className={Dstyle.Info}>{product.info}</p>
                                <div className={Dstyle.Rating}>
                                    {
                                        [...Array(product.rateCount)].map((_, i) => (
                                            <FaStar key={i} color="red" />
                                        ))
                                    }
                                    <div><p>| 1234 Ratings</p></div>
                                </div>
                                <hr></hr>
                                <div className={Dstyle.Value}>
                                    <div className={Dstyle.prices}>
                                        <div className={Dstyle.priceFlex}>
                                            <div className={Dstyle.new}>₹{product.finalPrice}</div>
                                            <div className={Dstyle.old}>₹{product.originalPrice}</div>
                                        </div>
                                        <div className={Dstyle.offerpriceBox}>
                                            <div className={Dstyle.offerFlex}>
                                                <p className={Dstyle.SavedPrice}>
                                                    You save : ₹{product.originalPrice - product.finalPrice}  ({Math.round(
                                                        ((product.originalPrice - product.finalPrice) / product.originalPrice) * 100
                                                    )}% OFF)
                                                </p>
                                                <p>(Inclusive of all taxes)</p>
                                            </div>
                                            <div className={Dstyle.instock}>
                                                <p><FaCheck /> In Stock</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <hr></hr>
                                <div className={Dstyle.offerDiscountBox}>
                                    <h2>Offers And Discounts</h2>
                                    <div className={Dstyle.PayBox}>
                                        <p>No cost EMI on Credit Crad</p>
                                        <p>Pay Later and Avail CashBack</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <button className="btn" onClick={() => DCartHandler(product)}>
                                    {
                                        pcartBtn === product.id ? <p className={Dstyle.successCart}>Added</p> : "Add to Cart"
                                    }
                                </button>
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
