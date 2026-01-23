import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import productsData from "../assets/data/productsData";
import "./navbar.css";



const NavBar = () => {
    const [searchshow, setSearchShow] = useState(false)
    const [cartshow, setCartShow] = useState(false)
    const [personshow, setPersonShow] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchRef = useRef(null);
    const navigate = useNavigate();


    const [authType, setAuthType] = useState(null);


    const hoverHandler = (param) => {
        if (authType) return;

        if (param === 'search') setSearchShow(true)
        else if (param === "cart") setCartShow(true)
        else setPersonShow(true)
    }
    const leaveHandler = (param) => {
        if (authType) return;

        if (param === "search") setSearchShow(false)
        else if (param === "cart") setCartShow(false)
        else setPersonShow(false)
    }

    const cart = useSelector((item) => {
        return item.cart
    })

    const TotalItems = cart.reduce((total, item) => {
        return total + item.quantity
    }, 0)
    const filteredProducts = productsData.filter(prod =>
        prod.title.toLowerCase().includes(searchText.toLowerCase())
    );




    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
                setSearchText("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav>
                <div className="navcontainer">
                    <div className="leftComp">
                        <Link to="/"><h1>Tech-Shop</h1></Link>
                    </div>
                    <div className="rightComp">
                        <div
                            className="iconWrapper"
                            ref={searchRef}
                            onMouseEnter={() => hoverHandler("search")}
                            onMouseLeave={() => leaveHandler("search")}
                        >
                            <FaSearch
                                className="icon"
                                onClick={() => setSearchOpen(prev => !prev)}
                            />

                            {searchshow && <span className="info">search</span>}

                            {searchOpen && (
                                <div className="searchOverlay" onClick={() => setSearchOpen(false)}>
                                    <div className="searchPopup" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="text"
                                            placeholder="Search for product..."
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            autoFocus
                                        />

                                        {searchText && (
                                            <div className="searchResults">
                                                {filteredProducts.length ? (
                                                    filteredProducts.map(prod => (
                                                        <p
                                                            key={prod.id}
                                                            onClick={() => {
                                                                navigate(`/products/${prod.id}`);
                                                                setSearchOpen(false);
                                                                setSearchText("");
                                                            }}
                                                        >
                                                            {prod.title}
                                                        </p>
                                                    ))
                                                ) : (
                                                    <p className="noResult">No products found</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>


                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("cart")} onMouseLeave={() => leaveHandler("cart")}>
                            <Link to="/cart"><FaShoppingCart className="icon" /></Link>
                            {cartshow && <span className="info">cart</span>}
                            <div className="cartIcon">{TotalItems}</div>
                        </div>
                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("person")}  >
                            <FaUser className="icon" />
                            {personshow && <div className="loginInfo" onMouseLeave={() => leaveHandler("person")}>
                                <div className="loginbox">
                                    <p>Hello!</p>
                                    <p>Access account and manage orders</p>
                                    <div className="login-signup">
                                        <p className="Login" onClick={() => setAuthType("login")}>Login</p>
                                        <span>/</span>
                                        <p className="signup" onClick={() => setAuthType("signup")}>Signup</p>


                                    </div>
                                    <hr></hr>
                                    <p>Please Login</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                {authType === "login" && (
                    <div className="authOverlay" onClick={() => setAuthType(null)}>
                        <div className="authPopup dark" onClick={(e) => e.stopPropagation()}>

                            <span className="closeIcon" onClick={() => setAuthType(null)}>×</span>

                            <h2>Login</h2>
                            <p className="subText">
                                New to Tech-Shop ?{" "}
                                <span onClick={() => setAuthType("signup")}>Create an account</span>
                            </p>

                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />

                            <button className="loginBtn">Login</button>

                            <div className="divider">
                                <span>or login with</span>
                            </div>

                            <div className="socialBtns">
                                <button className="fb">Facebook</button>
                                <button className="google">Google</button>
                                <button className="twitter">Twitter</button>
                            </div>

                        </div>
                    </div>
                )}


                {authType === "signup" && (
                    <div className="authOverlay" onClick={() => setAuthType(null)}>
                        <div className="authPopup dark" onClick={(e) => e.stopPropagation()}>

                            <span className="closeIcon" onClick={() => setAuthType(null)}>×</span>

                            <h2>Signup</h2>
                            <p className="subText">
                                Already have an account ?{" "}
                                <span onClick={() => setAuthType("login")}>Login</span>
                            </p>

                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <input type="password" placeholder="Confirm Password" />

                            <button className="loginBtn">Signup</button>

                            <div className="divider">
                                <span>or login with</span>
                            </div>


                        </div>
                    </div>
                )}


            </nav>

        </>
    )
}
export default NavBar