// hooks
import { useContext } from "react";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

// components
import NavigationTrail from "../components/NavigationTrail";
import CartEmpty from "../components/CartEmpty";
import CartDetails from "../components/CartDetails";
import ProductSlider from "../components/ProductSlider";

const Cart = () => {
    // Obtiene los datos del carrito desde el contexto
    const { cart } = useContext(DataContext);

    // Orden product slider
    const sortByDateAsc = (products) => {
        return products.slice().sort(() => Math.random() - 0.5);
    };

    // window.scrollTo({ top: 0, behavior: "instant" });

    return (
        <Container fluid className="bg-body-secondary">
            <section className="px-5 pt-4">
                <NavigationTrail
                    paths={[
                        {
                            text: "Inicio",
                            to: "/",
                        },
                        {
                            text: "Carrito",
                        },
                    ]}></NavigationTrail>
            </section>
            <section className="d-flex justify-content-center pb-4">
                <Row className="bg-white rounded-4 box-shadow mx-1 mx-lg-4 py-5 w-100">
                    <Col>
                        {cart.items.length > 0 ? (
                            <CartDetails />
                        ) : (
                            <CartEmpty />
                        )}
                    </Col>
                </Row>
            </section>
            <section>
                {cart.items.length > 0 ? (
                    <h3 className="text-center mb-3 mt-3 ">
                        También podría interesarte
                    </h3>
                ) : (
                    <h3 className="text-center mb-3 mt-3 ">
                        Revisa nuestros productos y agrégalos a tu carrito
                    </h3>
                )}
                <ProductSlider sortBy={sortByDateAsc} />
            </section>
        </Container>
    );
};

export default Cart;
