import { jwtDecode } from "jwt-decode";
// hooks
import { useState, useContext, useEffect } from "react";
import { Link, Outlet, useParams, useNavigate, useLocation } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container, Row, Col, Accordion, Image } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// components
import NavigationTrail from "../components/NavigationTrail";
import ProductSlider from "../components/ProductSlider";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

const UserProfile = () => {
  const { logout } = useContext(AuthContext);
  const { userObjective } = useContext(DataContext);
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); 
  const urlBaseServer = Config.get("URL_API");
    const { title } = useContext(DataContext);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Mi Perfil`;
    }, []);

    // Gamificación Mi Market Latino
    const filledStarsCount =
        Object.values(userObjective).filter(Boolean).length;
    const stars = Array.from({ length: 5 }, (_, index) => (
        <i
            key={index}
            className={`bi bi-star-fill text-primary me-1 ${
                index < filledStarsCount ? "" : "opacity-25"
            }`}></i>
    ));

    // Apertura del menú en móviles
    const [open, setOpen] = useState(false);
    const handleLinkClick = () => {
        setOpen(false);
        setIsLinkClicked(true);
    };

    // Product slider sorting
    const sortByDateDesc = (products) => {
      return products
          .slice()
          .sort((a, b) => b.date_add.localeCompare(a.date_add));
  };

  // Obtén el ID del usuario desde la URL
  const { id_user } = useParams();

  // Usuario logeado con email basado en el ID de la URL
  const userWithEmail = async () => {
    const token = sessionStorage.getItem("access_token");
    // No tiene token almacenado, de vuelta al home
    if (!token) {
      console.error("No access token available.");
      navigate('/');
      return;
    }

    try {
      // Decodificar el token para obtener el id_user del usuario logueado
      const decodedToken = jwtDecode(token);
      const loggedInUserId = decodedToken.id_user;

      if (!id_user) {
        console.error("No user ID provided in the URL.");
        return;
      }

      // Si el ID del usuario logueado es diferente al ID en la URL, o si no hay sesión activa, de vuelta al home
      if (String(loggedInUserId) !== id_user) {
        navigate('/');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${urlBaseServer}users/${id_user}`, config);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        navigate('/'); // Si no encontró el usuario, de vuelta al home
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate('/'); // Redirige en caso de error al obtener los datos del usuario
    }
  };

  useEffect(() => {
    userWithEmail();
  }, [id_user]);

  useEffect(() => {
    // Restablecer isLinkClicked cuando el usuario navega directamente a "Mi Perfil"
    if (location.pathname === `/mi-perfil/${user.id_user}`) {
      setIsLinkClicked(false);
    }
  }, [location, user.id_user]);


  useEffect(() => {
    if (location.state?.from === "/inicia-sesion") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);
  
  return (
    user && (
      <Container fluid className="bg-body-secondary">
        <section className="px-5 pt-4">
          <NavigationTrail
            paths={[
              {
                text: "Inicio",
                to: "/",
              },
              {
                text: "Mi Perfil",
              },
            ]}></NavigationTrail>
        </section>
        <Row className="mx-1 mx-lg-0 py-2 gap-4 justify-content-center">
          <Col className="col-12 col-lg-3 rounded-4 box-shadow bg-white p-2">
            <section className="d-flex flex-row flex-lg-column justify-content-lg-center align-items-lg-center gap-4">
              <div style={{ width: "100px", height: "100px" }}>
                {user && user.avatar_url ? (
                  <LazyLoadImage
                    src={user.avatar_url}
                    width={100}
                    className="rounded-circle"
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center w-100 h-100 rounded-circle bg-body-secondary">
                    <i className="bi bi-camera fs-1"></i>
                  </div>
                )}
              </div>
              <div className="text-center mt-2">
                <h2 className="fs-6 ">
                  {user.firstname} {user.lastname}
                </h2>
                {user.email}
                <br />
                {stars}
              </div>
            </section>
            <section>
              <Accordion
                className="d-md-none py-2"
                activeKey={open ? "0" : ""}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    onClick={() => setOpen(!open)}>
                    Menú Mi Perfil
                  </Accordion.Header>
                  <Accordion.Body className="d-flex flex-column">
                    <Link
                      to="mis-datos"
                      onClick={handleLinkClick}
                      className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                      <i className="bi bi-person text-white me-2"></i>
                      Mis Datos
                    </Link>
                    <Link
                      to="mis-favoritos"
                      onClick={handleLinkClick}
                      className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                      <i className="bi bi-heart text-white me-2"></i>
                      Mis Favoritos
                    </Link>
                    <Link
                      to="mis-productos"
                      onClick={handleLinkClick}
                      className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                      <i className="bi bi-box2-heart text-white me-2"></i>
                      Mis Productos
                    </Link>
                    <Link
                      to="mis-compras"
                      onClick={handleLinkClick}
                      className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                      <i className="bi bi-bag text-white me-2"></i>
                      Mis Compras
                    </Link>
                    <Link
                      to="mis-ventas"
                      onClick={handleLinkClick}
                      className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                      <i className="bi bi-cash-coin text-white me-2"></i>
                      Mis Ventas
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        handleLinkClick();
                        logout();
                        navigate("/");
                      }}
                      className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                      <i className="bi bi-box-arrow-right text-white me-2"></i>
                      Cerrar Sesión
                    </Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="d-none d-md-flex flex-md-column align-items-center">
                <hr className="border-2 border-secondary w-100" />
                <Link
                  to="mis-datos"
                  onClick={() => setIsLinkClicked(true)}
                  className="btn btn-secondary text-white box-shadow w-75 my-2">
                  <i className="bi bi-person text-white me-2"></i>
                  Mis Datos
                </Link>
                <Link
                  to="mis-favoritos"
                  onClick={() => setIsLinkClicked(true)}
                  className="btn btn-secondary text-white box-shadow w-75 my-2">
                  <i className="bi bi-heart text-white me-2"></i>
                  Mis Favoritos
                </Link>
                <Link
                  to="mis-productos"
                  onClick={() => setIsLinkClicked(true)}
                  className="btn btn-secondary text-white box-shadow w-75 my-2">
                  <i className="bi bi-box2-heart text-white me-2"></i>
                  Mis Productos
                </Link>
                <Link
                  to="mis-compras"
                  onClick={() => setIsLinkClicked(true)}
                  className="btn btn-secondary text-white box-shadow w-75 my-2">
                  <i className="bi bi-bag text-white me-2"></i>
                  Mis Compras
                </Link>
                <Link
                  to="mis-ventas"
                  onClick={() => setIsLinkClicked(true)}
                  className="btn btn-secondary text-white box-shadow w-75 my-2">
                  <i className="bi bi-cash-coin text-white me-2"></i>
                  Mis Ventas
                </Link>
                <Link
                  to="mis-ventas"
                  onClick={() => {
                    handleLinkClick();
                    logout();
                    navigate("/");
                  }}
                  className="d-lg-none btn btn-secondary text-white box-shadow w-75 my-2">
                  <i className="bi bi-box-arrow-right text-white me-2"></i>
                  Cerrar Sesión
                </Link>
              </div>
            </section>
          </Col>
          <Col className="col-12 col-lg-8 rounded-4 box-shadow bg-body-tertiary p-4">
            {!isLinkClicked ? (
              <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="">¡Hola {user.firstname}!</h1>
                <p className="">
                  Este es tu dashboard. Navega por el menú,
                  cumple los objetivos,
                  <br /> gana estrellas y accede a beneficios
                  exclusivos.
                </p>
              </div>
            ) : (
              <Outlet context={{ user, setIsLinkClicked }} />
            )}
          </Col>
        </Row>
        <section>
          <h3 className="text-center mt-5 cursor default">
            Productos que podrían interesarte
          </h3>
          <ProductSlider sortBy={sortByDateDesc} />
        </section>
      </Container>
    )
  );
};

export default UserProfile;
