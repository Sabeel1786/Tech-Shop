import React from "react";
import servicesData from "../assets/data/servicesData";
import AdStyle from "./advantages.module.css"

const Advantages = () => {
    return (
        <>
            <div className={AdStyle.advantagesBox}>
                <h1 className={AdStyle.AdTitle}>Our Advantages</h1>

                <div className={AdStyle.servicesWrapper}>
                    {servicesData.map((data) => {
                        const Icon = data.icon;
                        return (
                            <div className={AdStyle.services} key={data.id}>
                                <div className={AdStyle.ico}>
                                    <Icon />
                                </div>
                                <div className={AdStyle.SerCont}>
                                    <h2>{data.title}</h2>
                                    <h3>{data.info}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
export default Advantages