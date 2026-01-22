import React  from "react";
import Footer from "../Components/Footer"
import { useSelector } from "react-redux";
import { increaseItems, removeItem, addToCart, removeFromCart } from "../Redux/CartSlice"
import { useDispatch } from "react-redux";
import Cstyle from "../Components/Cart.module.css"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";




const Cart = () => {
    const cart = useSelector((item) => {
        return item.cart
        console.log(cart);
    })
    const dispatch = useDispatch()

    const increaseHandler = (props) => {
        dispatch(increaseItems(props))
    }
    const decreamentHandler = (props) => {
        dispatch(removeItem(props))
    }
    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity
    }, 0);

    const RemoveFromcart = (props) => {
        dispatch(removeFromCart(props))
    }
    return (
        <>
            <div className={Cstyle.CartContainer}>
                <div className={Cstyle.leftCart}>
                    {
                        cart.length > 0 ? cart.map((CartData) => (
                            <div className={Cstyle.cartCards} key={CartData.id}>
                                <img src={CartData.images[0]} alt={CartData.title} />
                                <div className={Cstyle.CartText}>
                                    <div className="cartTitleCont"><p className="C-Cont">{CartData.title} {CartData.info}</p></div>
                                    <div className="DeleteItem" onClick={() => RemoveFromcart(CartData)}><FaTrash /></div>
                                    <div className={Cstyle.price}>
                                        <div className={Cstyle.new}>₹{CartData.finalPrice}</div>
                                        <div className={Cstyle.old}>₹{CartData.originalPrice}</div>
                                    </div>
                                    <div className={Cstyle.AddRemovebtn}>
                                        <button className={Cstyle.Addbtn} onClick={() => increaseHandler(CartData)}>+</button>
                                        <span>{CartData.quantity}</span>
                                        <button className={Cstyle.Removebtn} onClick={() => decreamentHandler(CartData)}>-</button>
                                    </div>
                                </div>

                            </div>
                        )) : (<div className={Cstyle.emptyCart}>
                            <div className={Cstyle.cartIcon}>🛒</div>
                            <h2>Your Cart is Empty</h2>
                            <Link to="/allproducts">
                                <button className={Cstyle.shopBtn}>Start Shopping</button>
                            </Link>
                        </div>)
                    }

                </div>
                <div className={Cstyle.rightCart}>
                    <h1>Order Summary ({totalItems} items) </h1>
                    <div>
                        <p>Original Price <span className={Cstyle.original}>: ₹{cart.reduce((total, item) => {
                            return total = total + (item.quantity * item.originalPrice)
                        }, 0)}</span></p>
                        <p>Discount : <span className={Cstyle.discount}>-₹{cart.reduce((total, item) => {
                            return total = total + ((item.originalPrice - item.finalPrice) * item.quantity)
                        }, 0)}</span></p>
                        <p>Delivery : <span className={Cstyle.delivery}>free</span></p>
                        <hr></hr>
                        <p className={Cstyle.totalPrice}>Total Price <span> : ₹{cart.reduce((total, item) => {
                            return total = total + (item.quantity * item.finalPrice)
                        }, 0)}</span></p>
                    </div>
                    <button className={Cstyle.btn}>CheckOut</button>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Cart