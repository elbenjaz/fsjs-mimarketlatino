// hooks
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col, Badge, Button } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// components
import Error404 from "./Error404";
import Favorites from "../components/Favorites";
import NavigationTrail from "../components/NavigationTrail";
import Reinsurances from "../components/Reinsurances";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

const Product = () => {
    const [user, setUser] = useState({});
    const urlBaseServer = Config.get("URL_API");
    const {
        title,
        products,
        addToCart,
        removeFromCart,
        confirmCart,
        getQuantityFromCart,
        formatPrice,
        getCategory,
    } = useContext(DataContext);
    const { id_product } = useParams();

    const product =
        products[
            products.findIndex(
                (product) => Number(product.id_product) === Number(id_product)
            )
        ];

    if (!product) {
        return <Error404 />;
    }

    useEffect(() => {
        document.title = `${title} - ${product.name}`;
    }, []);

    window.scrollTo({ top: 0, behavior: "instant" });

    return (
        <Container fluid className="bg-body-secondary ">
            <section className="px-5 pt-4">
                <NavigationTrail
                    paths={[
                        {
                            text: "Tienda",
                            to: "/productos",
                        },
                        {
                            text: product.name,
                        },
                    ]}></NavigationTrail>
            </section>
            <section className="d-flex justify-content-center pb-4 mx-lg-2">
                <Row className="row-cols-1 row-cols-md-3 bg-white rounded-4 box-shadow w-100">
                    <Col className="px-0 m-lg-2">
                        <LazyLoadImage
                            src={product.image_url}
                            width={350}
                            height={350}
                            className="object-fit-cover w-100 rounded-3 img-responsive"
                        />
                    </Col>
                    <Col className="col-12 d-flex d-lg-none bg-body-tertiary justify-content-between align-items-center py-2">
                        <h3>Cantidad</h3>
                        <div className="d-flex align-items-center my-2">
                            <Button
                                className="btn-remove mt-1"
                                aria-label="Disminuir cantidad"
                                onClick={() => removeFromCart(product)}>
                                <i className="bi bi-dash"></i>
                            </Button>
                            <span className="mx-4">
                                {getQuantityFromCart(product)}
                            </span>
                            <Button
                                variant="success"
                                className="mt-1"
                                aria-label="Aumentar cantidad"
                                onClick={() => addToCart(product)}>
                                <i className="bi bi-plus"></i>
                            </Button>
                        </div>
                    </Col>
                    <Col className="col-12 col-lg-4 ms-lg-4 pt-4">
                        <h1 className="">{product.name}</h1>
                                <p className="">
                                    Vendido por {product.seller_name}
                                </p>
                        <p className="">{product.description}</p>
                        <h2 className="fs-4 text-primary fw-bold ">
                            Precio: {formatPrice(product.price)}
                        </h2>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center pb-2">
                            <Badge
                                bg="success"
                                className="Category d-flex justify-content-center align-items-center fs-6"
                                data-category={product.category}>
                                {getCategory(product.category, "name")}
                            </Badge>
                            <Favorites productId={product.id_product} />
                        </div>
                    </Col>
                    <Col className="d-none col-lg-3 d-lg-flex flex-column align-items-center justify-content-start text-center pt-4">
                        <h3>Cantidad</h3>
                        <div className="d-flex align-items-center my-2">
                            <Button
                                variant="danger"
                                aria-label="Disminuir cantidad"
                                className="mt-1"
                                onClick={() => removeFromCart(product)}>
                                <i className="bi bi-dash"></i>
                            </Button>
                            <span className="mx-4">
                                {getQuantityFromCart(product)}
                            </span>
                            <Button
                                variant="success"
                                aria-label="Aumentar cantidad"
                                className="mt-1"
                                onClick={() => addToCart(product)}>
                                <i className="bi bi-plus"></i>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </section>
            <section className="py-4">
                <Reinsurances />
            </section>
        </Container>
    );
};

export default Product;
