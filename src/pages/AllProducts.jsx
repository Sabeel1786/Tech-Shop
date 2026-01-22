import React, { useEffect, useState } from "react";
import Advantages from "../Components/Advantages"
import Footer from "../Components/Footer"
import Allstyle from "../Components/allproducts.module.css"
import ProductsData from "../assets/data/productsData"
import { sortMenu, brandsMenu, categoryMenu } from "../assets/data/filterBarData"
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const AllProducts = () => {
    const [brands, setBrands] = useState(brandsMenu);
    const [categories, setCategories] = useState(categoryMenu);
    const MIN_PRICE = 449;
    const MAX_PRICE = 19990;

    const [price, setPrice] = useState(MAX_PRICE);
    const dispatch = useDispatch()
    const [cartBtn, setCartBtn] = useState(null);
    const navigation = useNavigate()
    const [topData, setTopdata] = useState([])

    console.log(topData);
    

    useEffect(() => {
        setTopdata(ProductsData)
    }, [])

    const CartHandler = (param) => {
        console.log(param);
        setCartBtn(param.id)
        dispatch(addToCart(param))

        setTimeout(() => {
            setCartBtn(null)
        }, 2000)
    }

    const handleProducts = (id) => {
        navigation(`/products/${id}`)
    }
    const handleBrandChange = (id) => {
        setBrands((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    };
    const handleCategoryChange = (id) => {
        setCategories((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    };

    return (
        <>
            <div className={Allstyle.allProductsSection}>
                <div className={Allstyle.leftAllProd}>
                    <div className={Allstyle.sortby}>
                        <h3>Sort By</h3>
                        <hr className={Allstyle.line}></hr>
                        {
                            sortMenu.map((item) => (
                                <div className={Allstyle.sortcards} key={item.id}>
                                    <h5>{item.title}</h5>
                                </div>
                            ))
                        }
                    </div>
                    <div className={Allstyle.filterby}>
                        <div className={Allstyle.filterBox}>
                            <h2 className={Allstyle.filterTitle}>Filter By</h2>
                            <hr className={Allstyle.line}></hr>
                            <div className={Allstyle.section}>
                                <h3>Brands</h3>
                                {brands.map((item) => (
                                    <label key={item.id} className={Allstyle.option}>
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => handleBrandChange(item.id)}
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className={Allstyle.section}>
                                <h3>Category</h3>
                                {categories.map((item) => (
                                    <label key={item.id} className={Allstyle.option}>
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => handleCategoryChange(item.id)}
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        <div className={Allstyle.price}>
                            <div className={Allstyle.priceBox}>
                                <h3 className={Allstyle.priceTitle}>Price</h3>

                                <p className={Allstyle.priceValue}>₹{price.toLocaleString()}</p>

                                <input
                                    type="range"
                                    min={MIN_PRICE}
                                    max={MAX_PRICE}
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className={Allstyle.priceRange}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className={Allstyle.rightAllProd}>
                    <div className={Allstyle.Allcards}>
                        {
                            ProductsData.length > 0 ? (ProductsData.map((Tdata) => (

                                <div className={Allstyle.Tcards} key={Tdata.id} >
                                    <img src={Tdata.images[0]} alt={Tdata.title} onClick={() => handleProducts(Tdata.id)} />
                                    <div className={Allstyle.Tcont}>
                                        <div className={Allstyle.Rating}>
                                            {
                                                [...Array(Tdata.rateCount)].map((_, i) => (
                                                    <FaStar key={i} color="red" />
                                                ))
                                            }
                                        </div>
                                        <h1>{Tdata.title}</h1>
                                        <h3>{Tdata.info}</h3>
                                        <hr />
                                        <div className={Allstyle.price}>
                                            <div className={Allstyle.new}>₹{Tdata.finalPrice}</div>
                                            <div className={Allstyle.old}>₹{Tdata.originalPrice}</div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => CartHandler(Tdata)}>
                                            {
                                                cartBtn === Tdata.id ? <p className="successCart">Added</p> : "Add to Cart"
                                            }
                                        </button>

                                    </div>

                                </div>

                            ))

                            ) : (<h1>Loading...</h1>)
                        }
                    </div>
                </div>

            </div>
            <Advantages />
            <Footer />
        </>
    )
}
export default AllProducts