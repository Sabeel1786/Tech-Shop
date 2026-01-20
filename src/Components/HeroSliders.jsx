import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Productdata from "../assets/data/productsData"
import "./hero.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeroSliders = () => {
    const navigation = useNavigate()
    const [slideData, setData] = useState([])

    useEffect(() => {
        const filteredData = Productdata.filter(prod => Object.keys(prod).includes("heroImage")
        )
        setData(filteredData)
    }, [])

    const handleProducts = (id) => {
        navigation(`/products/${id}`)
    }

    return (
        <>
            {
                slideData.length > 0 ? (
                    <div className="slider">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            slidesPerView={1}
                            slidesPerGroup={1}
                            loop={true}
                            autoplay={{ delay: 2000 }}
                            pagination={{ clickable: true }}
                            navigation
                        >
                            {
                                slideData.map((user, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="backtext"><h1>{user.type}</h1></div>
                                        <div className="cards">
                                            <div className="leftData">
                                                <h3>{user.title}</h3>
                                                <h1>{user.tagline}</h1>
                                                <div className="value">
                                                    <div className="new"><p>₹{user.finalPrice}</p></div>
                                                    <div className="old"><p>₹{user.originalPrice}</p></div>
                                                </div>
                                                <button className="btn btn-danger" onClick={() => handleProducts(user.id)}>Shop Now</button>
                                            </div>

                                            <div className="rightData">
                                                <img src={user.heroImage} alt={user.title} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    </div>) : (<h1>Loading...</h1>)
            }

        </>
    )
}
export default HeroSliders