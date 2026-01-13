import React, { useEffect, useState } from "react";
import featuredProd from "../assets/data/productsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./featured.css"

const FeaturedProducts = () => {

    const [featuredData, setFeaturedData] = useState([])

    useEffect(() => {
        const filtered = featuredProd.filter(prod => prod.tag === "featured-product")
        console.log(filtered);
        
        setFeaturedData(filtered)
        console.log(featuredData);
        
    }, [])
    return (
        <>
            {  
                featuredData.length > 0 ? (
                    <div className="Fsliders">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 2000 }}
                            pagination={{ clickable: true }}
                            navigation
                        >
                            {
                                featuredData.map((user, i) => (
                                    < SwiperSlide key={i}>
                                        <div className="Fcards">
                                            <h1>Featured Products</h1>
                                            <h3>{user.title}</h3>
                                            <img src={user.images[0]} alt={user.title} />
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

        </>
    )
}
export default FeaturedProducts