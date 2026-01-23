import React, { useEffect, useState } from "react";
import Advantages from "../Components/Advantages";
import Footer from "../Components/Footer";
import Allstyle from "../Components/allproducts.module.css";
import ProductsData from "../assets/data/productsData";
import { sortMenu, brandsMenu, categoryMenu } from "../assets/data/filterBarData";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const AllProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MIN_PRICE = 449;
    const MAX_PRICE = 19990;

    const [brands, setBrands] = useState(brandsMenu);
    const [categories, setCategories] = useState(categoryMenu);
    const [sortBy, setSortBy] = useState(null);
    const [price, setPrice] = useState(MAX_PRICE);
    const [cartBtn, setCartBtn] = useState(null);


    const handleProducts = (id) => {
        navigate(`/products/${id}`);
    };

    const CartHandler = (product) => {
        setCartBtn(product.id);
        dispatch(addToCart(product));
        setTimeout(() => setCartBtn(null), 2000);
    };

    const handleBrandChange = (id) => {
        setBrands((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleCategoryChange = (id) => {
        setCategories((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };


    const activeBrands = brands
        .filter((b) => b.checked)
        .map((b) => b.label);

    const activeCategories = categories
        .filter((c) => c.checked)
        .map((c) => c.label);

    const filteredProducts = ProductsData.filter((product) => {
        const brandMatch =
            activeBrands.length === 0 ||
            activeBrands.some(
                (b) =>
                    b.toLowerCase() ===
                    product.brand?.toLowerCase()
            );

        const categoryMatch =
            activeCategories.length === 0 ||
            activeCategories.includes(product.category);

        const priceMatch = product.finalPrice <= price;

        return brandMatch && categoryMatch && priceMatch;
    });



    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "Latest") return b.id - a.id;

        if (sortBy === "Featured")
            return (b.featured || 0) - (a.featured || 0);

        if (sortBy === "Top Rated") return b.rateCount - a.rateCount;

        if (sortBy === "Price(Lowest First)")
            return a.finalPrice - b.finalPrice;

        if (sortBy === "Price(Highest First)")
            return b.finalPrice - a.finalPrice;

        return 0;
    });
    // check if any filter or sort is active
    const isFilterApplied =
        sortBy !== null ||
        brands.some((b) => b.checked) ||
        categories.some((c) => c.checked) ||
        price !== MAX_PRICE;

    // clear all filters
    const clearAllFilters = () => {
        setSortBy(null);
        setPrice(MAX_PRICE);

        setBrands((prev) =>
            prev.map((item) => ({ ...item, checked: false }))
        );

        setCategories((prev) =>
            prev.map((item) => ({ ...item, checked: false }))
        );
    };

    return (
        <>
            <div className={Allstyle.allProductsSection}>

                <div className={Allstyle.leftAllProd}>
                    {isFilterApplied && (
                        <button
                            className={Allstyle.clearFiltersBtn}
                            onClick={clearAllFilters}
                        >
                            Clear Filters
                        </button>
                    )}

                    <div className={Allstyle.sortby}>
                        <h3>Sort By</h3>
                        <hr className={Allstyle.line} />
                        {sortMenu.map((item) => (
                            <div
                                key={item.id}
                                className={`${Allstyle.sortcards} ${sortBy === item.title
                                    ? Allstyle.activeSort
                                    : ""
                                    }`}
                                onClick={() => setSortBy(item.title)}
                            >
                                <h5>{item.title}</h5>
                            </div>
                        ))}
                    </div>


                    <div className={Allstyle.filterby}>
                        <div className={Allstyle.filterBox}>
                            <h2 className={Allstyle.filterTitle}>Filter By</h2>
                            <hr className={Allstyle.line} />


                            <div className={Allstyle.section}>
                                <h3>Brands</h3>
                                {brands.map((item) => (
                                    <label
                                        key={item.id}
                                        className={`${Allstyle.option} ${item.checked
                                            ? Allstyle.activeFilter
                                            : ""
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() =>
                                                handleBrandChange(item.id)
                                            }
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                ))}
                            </div>


                            <div className={Allstyle.section}>
                                <h3>Category</h3>
                                {categories.map((item) => (
                                    <label
                                        key={item.id}
                                        className={`${Allstyle.option} ${item.checked
                                            ? Allstyle.activeFilter
                                            : ""
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() =>
                                                handleCategoryChange(item.id)
                                            }
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        <div className={Allstyle.price}>
                            <div className={Allstyle.priceBox}>
                                <h3 className={Allstyle.priceTitle}>Price</h3>
                                <p className={Allstyle.priceValue}>
                                    ₹{price.toLocaleString()}
                                </p>
                                <input
                                    type="range"
                                    min={MIN_PRICE}
                                    max={MAX_PRICE}
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                    }
                                    className={Allstyle.priceRange}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={Allstyle.rightAllProd}>
                    <div className={Allstyle.Allcards}>
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div
                                    className={Allstyle.Tcards}
                                    key={product.id}
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        onClick={() =>
                                            handleProducts(product.id)
                                        }
                                    />

                                    <div className={Allstyle.Tcont}>
                                        <div className={Allstyle.Rating}>
                                            {[...Array(product.rateCount)].map(
                                                (_, i) => (
                                                    <FaStar key={i} color="red" />
                                                )
                                            )}
                                        </div>

                                        <h1>{product.title}</h1>
                                        <h3>{product.info}</h3>
                                        <hr />

                                        <div className={Allstyle.price}>
                                            <div className={Allstyle.new}>
                                                ₹{product.finalPrice}
                                            </div>
                                            <div className={Allstyle.old}>
                                                ₹{product.originalPrice}
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                CartHandler(product)
                                            }
                                        >
                                            {cartBtn === product.id
                                                ? "Added"
                                                : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2>No Products Found</h2>
                        )}
                    </div>
                </div>
            </div>

            <Advantages />
            <Footer />
        </>
    );
};

export default AllProducts;
