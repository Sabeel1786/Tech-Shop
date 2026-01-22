import React, { useEffect, useState } from "react";
import productsData from "../assets/data/productsData";
import { FaStar } from "react-icons/fa";
import "./topProducts.css"
import { GoArrowRight } from "react-icons/go";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const TopProducts = () => {
    const navigation = useNavigate()
    const [topData, setTopdata] = useState([])
    const [active, setActive] = useState("All");
    const dispatch = useDispatch()
    const [cartBtn, setCartBtn] = useState(null);


    useEffect(() => {
        setTopdata(productsData)
    }, [])


    const filteredData = (prod) => {
        setActive(prod);

        if (prod !== "All") {
            const data = productsData.filter(item => item.category === prod);
            setTopdata(data);
        } else {
            setTopdata(productsData);
        }
    };

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
    return (
        <div>
            <div className="Topcontainer">
                <div className="Toptitle">
                    <h1>Top Products</h1>
                </div>

                <div className="btn-filter">
                    {["All", "Headphones", "Earbuds", "Earphones", "Neckbands"].map((prod, i) => (
                        <div className="filterClick" key={i}>
                            <button
                                className={active === prod ? "active" : ""}
                                onClick={() => filteredData(prod)}
                            >
                                {prod}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="Topmain">
                    {
                        topData.length > 0 ? (topData.slice(0, 11).map((Tdata) => (

                            <div className="Tcards" key={Tdata.id} >
                                <img src={Tdata.images[0]} alt={Tdata.title} onClick={() => handleProducts(Tdata.id)} />
                                <div className="Tcont">
                                    <div className="Rating">
                                        {
                                            [...Array(Tdata.rateCount)].map((_, i) => (
                                                <FaStar key={i} color="red" />
                                            ))
                                        }
                                    </div>
                                    <h1>{Tdata.title}</h1>
                                    <h3>{Tdata.info}</h3>
                                    <hr />
                                    <div className="price">
                                        <div className="new">₹{Tdata.finalPrice}</div>
                                        <div className="old">₹{Tdata.originalPrice}</div>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => CartHandler(Tdata)}>
                                        {
                                            cartBtn === Tdata.id ? <p className="successCart">Added</p> : "Add to Cart"
                                        }
                                    </button>

                                </div>

                            </div>

                        ))

                        ).concat(<Link to="/allproducts" key="browse">
                            <div className="browse" >
                                <h2>Browse All Products
                                    <GoArrowRight className="arrow" /></h2>
                            </div>
                        </Link>) : (<h1>Loading...</h1>)
                    }
                </div>

            </div>
        </div>
    )
}
export default TopProducts