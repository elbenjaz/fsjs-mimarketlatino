import { Link } from "react-router-dom";
import { Fragment } from "react";

// hooks
import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// component
import ScrollToTopButton from "../components/ScrollToTopButton";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Row, Col, Button } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

const UserPurchases = () => {
    const { setIsLinkClicked } = useOutletContext();
    const {
        setUserObjective,
        purchases,
        getPurchases,
        formatPrice,
        formatDate,
    } = useContext(DataContext);
    const [visibleDetailId, setVisibleDetailId] = useState(null);

    useEffect(() => {
        getPurchases();
    }, []);

    useEffect(() => {
        if (purchases.length > 0) {
            setUserObjective((prevState) => ({
                ...prevState,
                hasPurchases: true,
            }));
        }
    }, [purchases]);

    const addDaysToDate = (dateStr, daysToAdd) => {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + daysToAdd);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses son 0-indexados
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const toggleDetails = (id) => {
        setVisibleDetailId(visibleDetailId === id ? null : id);
    };

    return (
        <>
            <section>
                <h1 className="">Mis Compras</h1>

                {purchases.length === 0 ? (
                    <p className="">
                        Realiza tu primera compra y recibe una estrella.
                    </p>
                ) : (
                    <p className="">
                        Revisa el listado de tus compras y fecha de entrega.
                    </p>
                )}
            </section>
            <section>
                {purchases.map((purchase) => (
                    <div
                        key={purchase.id_order}
                        className="bg-white rounded-4 box-shadow">
                        <Row className="row-cols-12 row-cols-lg-2 my-4 mx-0 p-3">
                            <Col className="col-12 col-lg-9 d-flex flex-row justify-content-between align-items-center gap-4 pt-2">
                                <p className="text-primary fw-bold ">
                                    <i className="bi bi-bag-check"></i> Orden #{" "}
                                    {purchase.id_order}
                                </p>
                                <p className="">
                                    Comprado el{" "}
                                    {formatDate(purchase.purchase_date)}
                                </p>
                                <p className="">
                                    Total {formatPrice(purchase.total_price)}
                                </p>
                            </Col>
                            <Col className="col-12 col-lg-3">
                                <Button
                                    className="btn-primary border-0"
                                    aria-label="Ver u ocultar detalles de la orden"
                                    onClick={() =>
                                        toggleDetails(purchase.id_order)
                                    }>
                                    {visibleDetailId === purchase.id_order
                                        ? "Ocultar Detalles"
                                        : "Ver Detalles"}
                                </Button>
                            </Col>
                        </Row>
                        {visibleDetailId === purchase.id_order && (
                            <Row className="col-12 row-cols-lg-4 d-flex flex-row align-items-center justify-content-between">
                                {purchase.products_details.map(
                                    (product, index) => (
                                        <Fragment
                                            key={`${purchase.id_order}-${product.id_product}`}>
                                            <Col
                                                key={index}
                                                className="col-12 col-lg-3 text-center">
                                            <LazyLoadImage
                                                src={product.image_url}
                                                width={90}
                                                height={90}
                                                className="rounded-2 object-fit-cover me-3"
                                            />
                                            </Col>
                                            <Col className="col-12 col-lg-3 text-center py-2">
                                                <Link
                                                    to={`/producto/${product.id_product}`}
                                                    className="text-decoration-none text-black">
                                                    <p className="fw-bolder">
                                                        {product.name}{" "}
                                                        <i className="bi bi-search"></i>
                                                    </p>
                                                </Link>
                                                <small className="">
                                                    Cantidad:{" "}
                                                    {product.product_quantity}
                                                    <br />
                                                    Subtotal:{" "}
                                                    {formatPrice(
                                                        product.unit_price *
                                                            product.product_quantity
                                                    )}
                                                </small>
                                            </Col>
                                            <Col className="col-12 col-lg-3 text-center py-2">
                                                <div>
                                                    <small className="">
                                                        Estado
                                                    </small>
                                                    <p className="text-primary fw-bolder ">
                                                        En tránsito
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col className="col-12 col-lg-3 text-center">
                                                <small className="">
                                                    Fecha de entrega estimada
                                                </small>
                                                <p className="fw-bolder ">
                                                    {addDaysToDate(
                                                        purchase.purchase_date,
                                                        4
                                                    )}
                                                </p>
                                            </Col>
                                        </Fragment>
                                    )
                                )}
                            </Row>
                        )}
                    </div>
                ))}
            </section>
            <section className="d-flex justify-content-end align-items-center mt-4">
                <Link
                    className="bg-transparent text-black border-0"
                    onClick={() => setIsLinkClicked(false)}>
                    <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
                </Link>
                <ScrollToTopButton />
            </section>
        </>
    );
};

export default UserPurchases;
