import { Link } from "react-router-dom";

import { useContext } from "react";

// react-bootstrap
import { Row, Col, Badge } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// resources
import logoWhite from "/assets/img/logo_icons/logoWhite.svg";

// context
import { AuthContext } from "../context/AuthContext";

import Config from '../utils/Config';

const Footer = () => {
  const { user, userIsLoggedIn } = useContext(AuthContext);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    };

    return (
        <>
            <footer className="container-fluid text-white p-0 bg-primary">
                <section>
                    <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4 px-4 pt-4">
                        <Col className="text-center d-md-none d-lg-block pt-4">
                            <LazyLoadImage
                                src={logoWhite}
                                className="logoFooter"
                                alt="Ícono del logo"
                            />
                            <p className="title fs-5 ">Mi Market Latino</p>
                        </Col>
                        <Col className="pt-4">
                            <Badge className="bg-secondary fs-6 text-white mb-2 ">
                                Enlaces Útiles
                            </Badge>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        to={userIsLoggedIn ? `/mi-perfil/${user.id_user}` : '/inicia-sesion'}
                                        className="text-decoration-none"
                                        onClick={scrollToTop}>
                                        Mi cuenta
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        to="/productos"
                                        className="text-decoration-none mb-2"
                                        onClick={scrollToTop}>
                                        Los mejores productos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/preguntas-frecuentes"
                                        className="text-decoration-none mb-2"
                                        onClick={scrollToTop}>
                                        Preguntas frecuentes
                                    </Link>
                                </li>
                            </ul>
                            <section>
                                <Badge className="bg-secondary fs-6 text-white mb-2 ">
                                    Horario de atención
                                </Badge>
                                <ul>
                                    <li className="bg-primary border-0 ">
                                        Lunes a viernes <br />09:00 - 18:00 hrs.
                                    </li>
                                </ul>
                            </section>
                        </Col>
                        <Col className="pt-4">
                            <section>
                                {" "}
                                <Badge className="bg-secondary fs-6 text-white mb-2 ">
                                    Desarrolladores
                                </Badge>
                                <h6 className="text-uppercase fw-bolder ">
                                    Full Stack Javascript G37
                                </h6>
                            </section>
                            <ul className="list-unstyled">
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/JuanManuelJerezBaraona"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2 text-white "></i>
                                        Juan Manuel Jerez
                                    </a>
                                </li>
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/carolinalunasfarah"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Carolina Lunas
                                    </a>
                                </li>
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/vnasp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Valentina Muñoz
                                    </a>
                                </li>
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/elbenjaz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Benjamín Segura
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col className="pt-4">
                            <section>
                                {" "}
                                <Badge className="bg-secondary fs-6 text-white mb-2 ">
                                    Docentes
                                </Badge>
                                <h6 className="text-uppercase fw-bolder ">
                                    DesafioLATAM G37
                                </h6>
                            </section>
                            <ul className="list-unstyled">
                                <li className="bg-primary border-0 ">
                                    <LazyLoadImage
                                        src="../assets/img/desafiolatam.webp"
                                        width={20}
                                        className="rounded-1 me-2"
                                    />
                                    Fabián Pino
                                </li>
                                <li className="bg-primary border-0 ">
                                    <LazyLoadImage
                                        src="../assets/img/desafiolatam.webp"
                                        width={20}
                                        className="rounded-1 me-2"
                                    />
                                    Albamar Flores
                                </li>
                                <li className="bg-primary border-0 ">
                                    <LazyLoadImage
                                        src="../assets/img/desafiolatam.webp"
                                        width={20}
                                        className="rounded-1 me-2"
                                    />
                                    Francisco Marin
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </section>
                <section className="bg-secondary fw-bolder text-center mt-3 py-3 copyright">
                    <p className="mb-0 ">2024 - DesafíoLATAM</p>
                    <small className="">v{Config.get("VERSION")}</small>
                </section>
            </footer>
        </>
    );
};

export default Footer;
