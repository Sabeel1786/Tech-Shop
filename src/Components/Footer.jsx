import React from "react";
import {footMenu,footSocial} from "../assets/data/footerData"
import style from "./footer.module.css"

const Footer = () => {
    const [menu] = footMenu
    return (
        <>
            <div className={style.footerContainer}>
                <div className="leftCont">
                    <h1 className="Flogo">Tech Shop</h1>
                    <p>Subscribe to our alerts to receive early discount offers, and new products info.</p>
                    <input type="text" placeholder="Email Address*" />
                    <button className="btn btn-danger">Subscribe</button>
                </div>
                <div className="rightCont">
                    {
                        footMenu.map((data)=>(
                            <div className="Ftitle" key={data.id}>
                                <h2>{data.title}</h2>
                                {
                                    data.menu.map((Tdata)=>(
                                        <div className="Fcont" key={Tdata.id}>
                                            <h4>{Tdata.link}</h4>
                                        </div>
                                    ))
                                }
                            </div>

                        ))
                    }
                </div>
                <div className="bottomCont"></div>
            </div>
        </>
    )
}
export default Footer