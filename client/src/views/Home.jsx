// hooks
import React, { useContext, useEffect } from "react";

// components
import ProductSlider from "../components/ProductSlider";
import Reinsurances from "../components/Reinsurances";
import Categories from "../components/Categories";
import CarouselHome from "../components/Carousel"

// context
import { DataContext } from "../context/DataContext";

const Home = () => {
    const { title } = useContext(DataContext);

    const sortByDateDesc = (products) => {
        return products
            .slice()
            .sort((a, b) => b.date_add.localeCompare(a.date_add));
    };

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Home`;
    }, []);


    return (
        <>
            <header>
                <section className="hero-section">
                    <CarouselHome/>
                </section>
            </header>
            <main className="bg-body-secondary py-4">
                <section className="mt-3">
                    <Reinsurances />
                </section>
                <section className="mt-5 pt-3">
                    <h2 className="text-center ">Productos recién agregados</h2>
                    <ProductSlider sortBy={sortByDateDesc} />
                </section>
                <section className="mb-5">
                    <h2 className="text-center mb-5 ">Nuestras categorías</h2>
                    <Categories />
                </section>
            </main>
        </>
    );
};

export default Home;
