import React from "react";
import HeroSliders from "../Components/HeroSliders";
import FeaturedProducts from "../Components/FeaturedProducts";
import TopProducts from "../Components/TopProducts";
import Footer from "../Components/Footer";
import Advantages from "../Components/Advantages";

const Home = () => {
    return (
        <>
            <HeroSliders/>
            <FeaturedProducts />
            <TopProducts />
            <Advantages/>
            <Footer/>
        </>
    )
}
export default Home