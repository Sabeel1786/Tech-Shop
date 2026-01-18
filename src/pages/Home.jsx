import React from "react";
import HeroSliders from "../Components/HeroSliders";
import FeaturedProducts from "../Components/FeaturedProducts";
import TopProducts from "../Components/TopProducts";
import Footer from "../Components/Footer";

const Home = () => {
    return (
        <>
            <HeroSliders/>
            <FeaturedProducts />
            <TopProducts />
            <Footer/>
        </>
    )
}
export default Home