import { Link } from "react-router-dom";
import { Fragment } from "react";

// hooks
import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-boostrap
import { Row, Col, Button } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// components
import ScrollToTopButton from "../components/ScrollToTopButton";

const UserSells = () => {
    const { setIsLinkClicked } = useOutletContext();
    const { setUserObjective, sells, getSells, formatPrice, formatDate } =
        useContext(DataContext);
    const [visibleDetailId, setVisibleDetailId] = useState(null);

    useEffect(() => {
        getSells();
    }, []);

    useEffect(() => {
        if (sells.length > 0) {
            setUserObjective((prevState) => ({ ...prevState, hasSells: true }));
        }
    }, [sells]);

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
                <h1 className="">Mis Ventas</h1>

                {sells.length === 0 ? (
                    <p className="">
                        Realiza tu primera venta y recibe una estrella.
                    </p>
                ) : (
                    <p className="">
                        Revisa el listado de tus ventas y fechas de abono.
                    </p>
                )}
            </section>
            <section>
                {sells.map((sell) => (
                    <div
                        key={sell.id_order}
                        className="bg-white rounded-4 box-shadow">
                        <Row className="row-cols-12 row-cols-lg-2 my-4 mx-0 p-3">
                            <Col className="col-12 col-lg-9 d-flex flex-row justify-content-between align-items-center gap-4 pt-2">
                                <p className="text-primary fw-bold ">
                                    <i className="bi bi-bag-check"></i> Orden #{" "}
                                    {sell.id_order}
                                </p>
                                <p className="">
                                    Vendido el {formatDate(sell.purchase_date)}
                                </p>
                            </Col>
                            <Col className="col-12 col-lg-3">
                                <Button
                                    className="btn-primary border-0"
                                    aria-label="Ver u ocultar detalles de la orden"
                                    onClick={() =>
                                        toggleDetails(sell.id_order)
                                    }>
                                    {visibleDetailId === sell.id_order
                                        ? "Ocultar Detalles"
                                        : "Ver Detalles"}
                                </Button>
                            </Col>
                        </Row>
                        {visibleDetailId === sell.id_order && (
                            <Row className="col-12 row-cols-lg-4 d-flex flex-row align-items-center justify-content-between">
                                {sell.products_details.map((product, index) => (
                                    <Fragment
                                        key={`${sell.id_order}-${product.id_product}`}>
                                        <Col className="col-12 col-lg-3 text-center">
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
                                                <p className="fw-bolder ">
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
                                                    Por abonar
                                                </p>
                                            </div>
                                        </Col>
                                        <Col className="col-12 col-lg-3 text-center">
                                            <small className="">
                                                Fecha de abono estimada
                                            </small>
                                            <p className="fw-bolder ">
                                                {addDaysToDate(
                                                    sell.purchase_date,
                                                    4
                                                )}
                                            </p>
                                        </Col>
                                    </Fragment>
                                ))}
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

export default UserSells;
