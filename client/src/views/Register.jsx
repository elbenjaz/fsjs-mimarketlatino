// hooks
import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// components
import { GoogleLogin } from "@react-oauth/google";
import NavigationTrail from "../components/NavigationTrail";

// notifications
import Swal from "sweetalert2";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Register = () => {
    const { title } = useContext(DataContext);
    const { registerWithEmail, loginWithGoogle, userIsLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const navigate = useNavigate();
    const location = useLocation();

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Registro`;
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
        const { firstname, lastname, email, password, passwordConfirm } = user;
        if (
            !firstname ||
            !lastname ||
            !email ||
            !password ||
            !passwordConfirm
        ) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Por favor, introduce un email válido.",
            });
            return;
        }
        if (password !== passwordConfirm) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Las contraseñas no coinciden",
            });
            return;
        }
        try {
          await registerWithEmail(user);
          window.scrollTo({ top: 0, behavior: "instant" });
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const GoogleLoginOnSuccess = async (data) => {
        try {
            const { credential } = data;
            await loginWithGoogle(credential);
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
        <Container fluid className="bg-body-secondary">
            <section className="px-5 pt-4">
                <NavigationTrail
                    paths={[
                        {
                            text: "Inicio",
                            to: "/",
                        },
                        {
                            text: "Regístrate",
                        },
                    ]}></NavigationTrail>
            </section>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className="col-12 col-md-6 bg-white box-shadow rounded-4 p-4">
                    <h1 className="">Crear cuenta</h1>
                    <p className="">
                        Para que puedas acceder a tu perfil, ver tus compras y
                        favoritos!
                    </p>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="registerName"
                                    name="firstname"
                                    value={user.firstname}
                                    placeholder="Nombre"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={user.lastname}
                                    placeholder="Apellido"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="email"
                                    id="registerEmail"
                                    name="email"
                                    value={user.email}
                                    placeholder="E-mail"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    id="registerPassword"
                                    name="password"
                                    value={user.password}
                                    placeholder="Contraseña"
                                    onChange={handleUser}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="passwordConfirm"
                                    value={user.passwordConfirm}
                                    placeholder="Confirma contraseña"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <div className="d-flex">
                                <div className="w-100">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        aria-label="Crear cuenta"
                                        className="w-100">
                                        Crear Cuenta
                                    </Button>
                                </div>

                                <div className="w-100 ms-2">
                                    <NavLink
                                        to="/inicia-sesion">
                                        <Button
                                            type="button" 
                                            variant="secondary"
                                            aria-label="Cancelar la creación de cuenta"
                                            className="w-100">
                                            Cancelar
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>

                            </Form>
                    </section>

                    <hr/>
                    <section className="d-flex flex-column justify-content-center align-items-center">
                        <p className="">o Registrarse con</p>
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

export default Register;
