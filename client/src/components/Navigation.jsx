import { NavLink, useNavigate } from "react-router-dom";

// hooks
import { useContext, useState, useEffect } from "react";

// react-bootstrap
import { Container, Nav, Navbar, NavDropdown, Offcanvas, Image } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// resources
import logoActive from "/assets/img/logo_icons/logoActive.svg";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";
import { jwtDecode } from "jwt-decode";

function Navigation() {
  const { cart } = useContext(DataContext);
  const { logout, userIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();
  const urlBaseServer = Config.get("URL_API");

  const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");

  // Desplazarse al inicio de la página
  const handleLinkClick = () => {
    setShowOffcanvas(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Obtener usuario
  const fetchUser = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        const decoded = jwtDecode(token); // Decodifica el token para obtener el id del usuario
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${urlBaseServer}users/${decoded.id_user}`, config);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      fetchUser();
    }
  }, [userIsLoggedIn]);


  return (
    <>
      <Navbar
        key="md"
        expand="md"
        className="sticky-top bg-secondary shadow-lg"
        variant="dark">
        <Container fluid>
          <Navbar.Brand
            className="title fs-4 text-white d-flex align-items-center"
            href="/"
            onClick={handleLinkClick}>
            <LazyLoadImage src={logoActive} width={50} className="me-3" alt="Logo Mi Gente Latino"/>
            <h1>Mi Gente Latino</h1>
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setShowOffcanvas(true)}
            aria-controls="offcanvasNavbar-expand-md"
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Menú
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-secondary">
              <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 gap-3">
                <NavLink
                  className={activeClass}
                  to="/productos"
                  onClick={handleLinkClick}>
                  Productos
                </NavLink>
                {!userIsLoggedIn && (
                  <>
                    <NavLink
                      className={activeClass}
                      to="/inicia-sesion"
                      onClick={handleLinkClick}>
                      Iniciar Sesión
                    </NavLink>

                    <NavLink
                      className={activeClass}
                      to="/registro"
                      onClick={handleLinkClick}>
                      Registrarse
                    </NavLink>
                  </>
                )}
                {userIsLoggedIn && (
                <div className="d-flex flex-column d-lg-none justify-content-center align-items-center gap-3">
                <NavLink
                  className={activeClass}
                  to={`/mi-perfil/${user.id_user}`}
                  onClick={handleLinkClick}>
                  Mi Perfil
                </NavLink>
                <NavLink
                  className="inactive"
                  to="/"
                  onClick={logout}>
                  Cerrar sesión
                </NavLink>
                </div>
                )}
                {userIsLoggedIn && user && (
                  <div className="d-none d-lg-flex flex-column flex-lg-row">
                    {user.firstname && user.avatar_url && (
                      <LazyLoadImage
                        src={user.avatar_url}
                        width={50}
                        className="img-fluid rounded-circle"
                      />
                    )}
                    <NavDropdown title={`Hola, ${user.firstname || ''}`} id="basic-nav-dropdown">
                      <NavDropdown.Item
                        className="nav-dropdown-item py-2"
                        onClick={() => {
                          handleLinkClick();
                          navigate(`/mi-perfil/${user.id_user}`);
                        }}>
                        <i className="bi bi-person-fill"></i> Mi Perfil
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="nav-dropdown-item py-2"
                        onClick={() => {
                          handleLinkClick();
                          logout();
                          navigate("/");
                        }}>
                        <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <NavLink
            className={`text-white fs-5 me-2 me-lg-5`}
            aria-label="Ir al carrito de compras"
            to="/carrito"
            onClick={handleLinkClick}>
            <i className="bi bi-cart4 fs-4 position-relative">
              {cart.items.length > 0 ?
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                  style={{
                    fontSize: "0.6em",
                    padding: "0.25em 0.4em",
                  }}>
                  {cart.total_items}
                </span>
                : ""}
            </i>
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
