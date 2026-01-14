import React, { useEffect, useState } from "react";
import productsData from "../assets/data/productsData";

const TopProducts = () => {
    const [topData, setTopdata] = useState([])

    useEffect(() => {
        setTopdata(productsData)
    }, [])

    const filteredData = (prod) => {
        if (prod !== "All") {
            const data = productsData.filter(item => item.category === prod)
            setTopdata(data)
        } else {
            setTopdata(productsData)
        }
    }
    return (
        <div>
            <div className="container">
                <div className="Toptitle">
                    <h1>Top Products</h1>
                </div>
                {
                    ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"].map((prod, i) => (
                        <div className="filterClick" key={i}>
                            <button onClick={() => filteredData(prod)}>{prod}</button>
                        </div>
                    ))
                }
                {
                    topData.length > 0 ? (topData.map((Tdata, index) => (
                        <div className="TopCards" key={index}>
                            <div className="Tcards" >
                                <img src={Tdata.images[0]} alt={Tdata.title} />
                                <div className="Tcont">
                                   
                                </div>

                            </div>
                        </div>
                    ))

                    ) : (<h1>Loading...</h1>)
                }
            </div>
        </div>
    )
}
export default TopProducts