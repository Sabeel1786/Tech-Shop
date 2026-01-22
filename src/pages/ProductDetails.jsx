import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Advantages from "../Components/Advantages";
import { useNavigate, useParams } from "react-router-dom";
import productsData from "../assets/data/productsData";
import Dstyle from "../Components/productDetails.module.css"
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import reviewsData from "../assets/data/reviewsData";


const ProductDetails = () => {
    const navigation = useNavigate();
    const [activeImage, setActiveImage] = useState(null);
    const [pcartBtn, setPCartBtn] = useState(null);
    const dispatch = useDispatch()
    const [prodInfo, setProdInfo] = useState("Specifications")


    const { id } = useParams();

    const product = productsData.find(
        (item) => item.id === Number(id)
    );
    console.log(product);


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
    const handleProducts = (id) => {
        navigation(`/products/${id}`)
    }
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [id]);


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
                <div className={Dstyle.ReviewsPage}>
                    <div className={Dstyle.revHeadings}>
                        {["Specifications", "Overview", "Reviews"].map((item, i) => (
                            <div
                                key={i}
                                className={`${Dstyle.Headings} ${prodInfo === item ? Dstyle.prodInfo : ""
                                    }`}
                                onClick={() => setProdInfo(item)}
                            >
                                <h4>{item}</h4>
                            </div>
                        ))}
                    </div>
                    <div className={Dstyle.SpecificationSection}>
                        {
                            prodInfo === "Specifications" && (
                                <div className={Dstyle.specBox}>
                                    <div className={Dstyle.specData1}>
                                        <h3>Brand</h3>
                                        <h3>Model</h3>
                                        <h3>Generic Name</h3>
                                        <h3>Headphone Type</h3>
                                        <h3>Connectivity</h3>
                                        <h3>Microphone</h3>
                                    </div>
                                    <div className={Dstyle.specData2}>
                                        {

                                            <div key={product.id}>
                                                <h3>{product.brand}</h3>
                                                <h3>{product.title}</h3>
                                                <h3>{product.category}</h3>
                                                <h3>{product.type}</h3>
                                                <h3>{product.connectivity}</h3>
                                                <h3>Yes</h3>
                                            </div>

                                        }
                                    </div>
                                </div>
                            )}
                        {prodInfo === "Overview" && (
                            <div className={Dstyle.overviewBox}>
                                {
                                    <div key={product.id}>
                                        <h3>The <span>{product.title}</span> {product.info} {product.tagline}</h3>
                                        <ul>
                                            <li>Sound Tuned to Perfection</li>
                                            <li>Comfortable to wear</li>
                                            <li>Long Hours Playback Time</li>
                                        </ul>
                                        <h4>But the <span>{product.title} {product.info} </span>which offers you with the fabulous music experience by providing you with awesome sound
                                            quality that you can never move on from. Enjoy perfect felxible and
                                            mobility with amazing musical quality with these Headphones
                                            giving you truly awesome audio experience. It blends wiht exceptional
                                            sound quality and a range of smart features for an unrivalled
                                            listening experience.</h4>
                                    </div>
                                }
                            </div>
                        )}
                        {prodInfo === "Reviews" && (
                            <div className={Dstyle.RevBox}>
                                {
                                    reviewsData.map((users) => (
                                        <div className={Dstyle.reviewBox} key={users.id}>
                                            <h3>{users.name}</h3>
                                            <div className={Dstyle.stars}>
                                                {[...Array(users.rateCount)].map((_, i) => (
                                                    <FaStar key={i} color="red" />
                                                ))} | <p>{users.date}</p>
                                            </div>
                                            <p>{users.review}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className={Dstyle.realtedProductsBox}>
                    <h1 className={Dstyle.relatedTitle}>Related Products</h1>
                    <div className={Dstyle.realtedProducts}>
                        {
                            productsData
                                .filter(
                                    (items) =>
                                        items.category === product.category &&
                                        items.id !== product.id
                                )
                                .map((items) => (
                                    <div className={Dstyle.relatedBox} key={items.id}>
                                        <div className={Dstyle.Realtedcards}>
                                            <img src={items.images[0]} alt={items.title} onClick={() => handleProducts(items.id)} />

                                            <div className={Dstyle.Rcont}>
                                                <div className={Dstyle.Rating}>
                                                    {[...Array(items.rateCount)].map((_, i) => (
                                                        <FaStar key={i} color="red" />
                                                    ))}
                                                </div>

                                                <h1>{items.title}</h1>
                                                <h3>{items.info}</h3>

                                                <hr />

                                                <div className={Dstyle.price}>
                                                    <div className={Dstyle.new}>₹{items.finalPrice}</div>
                                                    <div className={Dstyle.old}>₹{items.originalPrice}</div>
                                                </div>

                                                <button
                                                    className={Dstyle.btn}
                                                    onClick={() => DCartHandler(items)}
                                                >
                                                    {pcartBtn === items.id ? (
                                                        <p className={Dstyle.RsuccessCart}>Added</p>
                                                    ) : (
                                                        "Add to Cart"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
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
