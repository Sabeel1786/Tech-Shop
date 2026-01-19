import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./navbar.css"
import { Link } from "react-router-dom";


const NavBar = () => {
    const [searchshow, setSearchShow] = useState(false)
    const [cartshow, setCartShow] = useState(false)
    const [personshow, setPersonShow] = useState(false)

    const hoverHandler = (param) => {
        if (param === 'search') setSearchShow(true)
        else if (param === "cart") setCartShow(true)
        else setPersonShow(true)
    }

    const leaveHandler = (param) => {
        if (param === "search") setSearchShow(false)
        else if (param === "cart") setCartShow(false)
        else setPersonShow(false)
    }

    return (
        <>
            <nav>
                <div className="navcontainer">
                    <div className="leftComp">
                        <Link to="/"><h1>Tech-Shop</h1></Link>
                    </div>
                    <div className="rightComp">
                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("search")} onMouseLeave={() => leaveHandler("search")}>
                            <FaSearch className="icon" />
                            {searchshow && <span className="info">search</span>}
                        </div>

                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("cart")} onMouseLeave={() => leaveHandler("cart")}>
                            <Link to="/cart"><FaShoppingCart className="icon" /></Link>
                            {cartshow && <span className="info">cart</span>}
                        </div>
                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("person")}  >
                            <FaUser className="icon" />
                            {personshow && <div className="loginInfo" onMouseLeave={() => leaveHandler("person")}>
                                <div className="loginbox">
                                    <p>Hello!</p>
                                    <p>Access account and manage orders</p>
                                    <div className="login-signup">
                                        <p className="Login">Login</p><span>/</span>
                                        <p className="signup">Signup</p>
                                    </div>
                                    <hr></hr>
                                    <p>Please Login</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default NavBar