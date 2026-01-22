import React, { useState } from "react";
import { footMenu, footSocial } from "../assets/data/footerData"
import style from "./footer.module.css"
import { FaChevronUp } from "react-icons/fa";


const Footer = () => {
    const [menu] = footMenu
    const [email, setEmail] = useState("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubscribe = () => {
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        alert("Subscribed successfully!");
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className={style.footerContainer}>
                <div className={style.footerDisplay}>
                    <div className={style.leftCont}>
                        <h1 className={style.Flogo}>Tech Shop</h1>
                        <p>Subscribe to our alerts to receive<br /> early discount offers, and new products<br /> info.</p>
                        <input
                            type="email"
                            placeholder="Email Address*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br></br>
                        <button className="btn" onClick={handleSubscribe}>
                            Subscribe
                        </button>

                    </div>
                    <div className={style.rightCont}>
                        {
                            footMenu.map((data) => (
                                <div className={style.Ftitle} key={data.id}>
                                    <h4 className={style.FTopTitle}>{data.title}</h4>
                                    {
                                        data.menu.map((Tdata) => (
                                            <div className={style.Fcont} key={Tdata.id}>
                                                <h4>{Tdata.link}</h4>
                                            </div>
                                        ))
                                    }
                                </div>

                            ))
                        }
                    </div>
                </div>
                <hr></hr>
                <div className={style.bottomCont}>
                    <div className={style.LeftBottomCont}>
                        <p>2025 | All Rights Reserved &copy;</p>
                    </div>
                    <div className={style.rightBottomCont}>
                        {
                            footSocial.map((social) => {
                                const Icon = social.icon
                                return (
                                    <div className={style.iconbox} key={social.id}>
                                        <Icon />
                                    </div>
                                )
                            })
                        }
                        <div className={style.scrollTopBtn} onClick={scrollToTop}>
                            <FaChevronUp />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer