import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./navbar.css"


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
                        <h1>Tech-Shop</h1>
                    </div>
                    <div className="rightComp">
                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("search")} onMouseLeave={() => leaveHandler("search")}>
                            <FaSearch className="icon" />
                            {searchshow && <span className="info">search</span>}
                        </div>

                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("cart")} onMouseLeave={() => leaveHandler("cart")}>
                            <FaShoppingCart className="icon" />
                            {cartshow && <span className="info">cart</span>}
                        </div>
                        <div className="iconWrapper" onMouseEnter={() => hoverHandler("person")} onMouseLeave={() => leaveHandler("person")} >
                            <FaUser className="icon" />
                            {personshow && <span className="info">login/sign up</span>}
                        </div>
                    </div>
                </div>
            </nav>
            
        </>
    )
}
export default NavBar