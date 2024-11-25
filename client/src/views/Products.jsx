// hooks
import { useContext, useEffect } from "react";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container } from "react-bootstrap";

// components
import ProductsComponent from "../components/Products";
import NavigationTrail from "../components/NavigationTrail";

const Products = () => {
    const { title } = useContext(DataContext);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Tienda`;
    }, []);

    return (
        <>
            <Container fluid className="bg-body-secondary">
                <section className="px-5 pt-4">
                    <NavigationTrail
                        paths={[
                            {
                                text: "Inicio",
                                to: "/",
                            },
                            {
                                text: "Productos",
                               
                            },
                        ]} />
                </section>
                <ProductsComponent />
            </Container>
        </>
    );
};

export default Products;
