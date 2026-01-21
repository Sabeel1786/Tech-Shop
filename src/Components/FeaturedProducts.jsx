import React, { useEffect, useState } from "react";
import featuredProd from "../assets/data/productsData";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation,Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./featured.css"

const FeaturedProducts = () => {
    const navigation = useNavigate()
    const [featuredData, setFeaturedData] = useState([])

    useEffect(() => {
        const filtered = featuredProd.filter(prod => Object.keys(prod).includes("tag"))
        setFeaturedData(filtered)

    }, [])
    const handleProducts = (id) => {
        navigation(`/products/${id}`)
    }
    return (
        <>
            <div className="main">
                <h1>Featured Products</h1>
                {
                    featuredData.length > 0 ? (
                        <div className="Fsliders">
                            <Swiper
                                centeredSlides={true}
                                slidesPerView={5}
                                loop={true}
                                spaceBetween={100}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                navigation
                                breakpoints={{
                                    0: {            // from 0px up
                                        slidesPerView: 2,
                                        centeredSlides: true,
                                    },
                                    768: {          // from 768px up (tablet)
                                        slidesPerView: 3,
                                    },
                                    1024: {         // from 1024px up (desktop)
                                        slidesPerView: 5,
                                    },
                                }}

                                pagination={{ clickable: true }}
                                modules={[Navigation, Pagination, Autoplay]}
                            >

                                {
                                    featuredData.map((user, i) => (
                                        < SwiperSlide key={i}>
                                            <div className="Fcards">
                                                <h3>{user.title}</h3>
                                                <img className="Fimage" src={user.images[0]} alt={user.title} onClick={() => handleProducts(user.id)}/>
                                                <div className="price">
                                                    <div className="new">₹{user.finalPrice}</div>
                                                    <div className="old">₹{user.originalPrice}</div>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                    ))

                                }


                            </Swiper>
                        </div >) : (<h1>Loading...</h1>)
                }
            </div>
        </>
    )
}
export default FeaturedProducts