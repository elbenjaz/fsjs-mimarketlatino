import { NavLink, useNavigate } from "react-router-dom";

// hooks
import { useState, useContext, useEffect } from "react";

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// components
import NavigationTrail from "../components/NavigationTrail";
import { GoogleLogin } from "@react-oauth/google";

// notifications
import Swal from "sweetalert2";

window.scrollTo({ top: 0, behavior: "instant" });

const Login = () => {
    const navigate = useNavigate();
    const { loginWithEmail, loginWithGoogle, userIsLoggedIn, setUserIsLoggedIn } = useContext(AuthContext);

    const { title } = useContext(DataContext);
    const [user, setUser] = useState({
        email    : "jlo@mimarketlatino.com",
        password : "1234",
    });

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Inicia Sesión`;
    }, []);

    // Si ya estás logueado, te vas al home
    useEffect(() => {
        if (userIsLoggedIn) {
            navigate('/');
        }
    }, [userIsLoggedIn, navigate]);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.email || !user.password) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }

        try {
          await loginWithEmail(user);
          // remove navigate for checkout with email
          setUserIsLoggedIn(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Email y/o contraseña incorrecta."
            });
        }
    };

    const GoogleLoginOnSuccess = async (data) => {
        try {
            const { credential } = data;
            await loginWithGoogle(credential);
            setUserIsLoggedIn(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Error al intentar iniciar sesión con Google."
            });
        }
    };
    
    const GoogleLoginOnFailure = () => {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al intentar iniciar sesión con Google."
        });
    };

    return (
        <Container fluid className="bg-body-secondary ">
            <section className="px-5 pt-4">
                <NavigationTrail
                    paths={[
                        {
                            text: "Inicio",
                            to: "/",
                        },
                        {
                            text: "Inicia Sesión",
                        },
                    ]}></NavigationTrail>
            </section>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className="col-12 col-md-6 bg-white box-shadow rounded-4 p-4">
                    <h1 className="">Inicia Sesión</h1>
                    <p className="">
                        Iniciando sesión podrás acceder a tu perfil, revisar tus
                        compras y ventas ¡y crear productos!
                    </p>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="fs-6 ps-1 ps-lg-3">
                                    E-mail
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleUser}
                                    placeholder="tuemail@mail.com"
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="fs-6 ps-1 ps-lg-3">
                                    Contraseña
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleUser}
                                    placeholder="Tu contraseña"
                                    required
                                />
                            </InputGroup>

                            <div className="d-flex">
                                <div className="w-100">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        aria-label="Iniciar sesión"
                                        className="w-100 me-2">
                                        Iniciar sesión
                                    </Button>
                                </div>

                                <div className="w-100 ms-2">
                                    <NavLink
                                        to="/registro">
                                        <Button
                                            type="button"
                                            aria-label="Registrarse"
                                            variant="secondary"
                                            className="w-100">
                                            Registrarse
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>
                            <p className=" mt-2">
                                <small>No te puedes olvidar de tu contraseña.</small>
                            </p>
                        </Form>
                    </section>
                    <hr/>
                    <section className="d-flex flex-column justify-content-center align-items-center">
                        <p className="">o Iniciar sesión con</p>
                        <GoogleLogin
                            onSuccess={GoogleLoginOnSuccess}
                            onFailure={GoogleLoginOnFailure}
                        />
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
