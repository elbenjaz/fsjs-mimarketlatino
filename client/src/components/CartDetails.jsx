import { Link, useNavigate } from "react-router-dom";

// hooks
import { useContext, useEffect, Fragment } from "react";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Button } from "react-bootstrap";

// notifications and lazyload images
import Swal from "sweetalert2";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CartDetails = () => {
  // Obtiene los datos del carrito desde el contexto
  const { cart, addToCart, removeFromCart, formatPrice, title } =
    useContext(DataContext);

  // Obtiene los datos del usuario desde el contexto
  const { userIsLoggedIn, setRedirectAfterLogin } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  // Cambia el título de la página
  useEffect(() => {
    document.title = `${title} - Carrito`;
  }, []);

  const handleCheckout = (event) => {
    if (!cart.items || cart.items.length === 0) {
      // Mostrar un mensaje al usuario
      Swal.fire("Ups...", "Tu carrito está vacío.", "error");
      // Cancelar la navegación
      event.preventDefault();
    } else if (!userIsLoggedIn) {
      // Si el usuario no ha iniciado sesión, desplazarse al inicio de sesión
      window.scrollTo({ top: 0, behavior: "instant" });
      setRedirectAfterLogin('/checkout');
      navigate('/inicia-sesion');
    } else {
      // Si el carrito no está vacío, desplazarse al inicio del checkout
      window.scrollTo({ top: 0, behavior: "instant" });
      navigate("/checkout");
    }
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <div className="row col-md-8 w-100 mx-0 d-flex flex-column justify-content-center align-items-center">
      <section>
        <h2 className=" text-center">Tu Carrito</h2>
        {cart.items?.map(
          (product, index) =>
            product && (
              <div key={index} className="d-flex flex-column py-4 border-bottom mb-2 d-md-none">
                <div className="d-flex flex-row mb-1">
                  <Link
                    to={`/producto/${product.id_product}`}
                    onClick={handleLinkClick}
                    className="text-decoration-none text-dark">
                    <LazyLoadImage
                      src={product.image_url}
                      alt={product.name}
                      className="rounded-2 object-fit-cover me-3"
                      width="100"
                      height="100"
                    />
                  </Link>
                  <div className="d-flex flex-column justify-content-start align-items-start fs-4">
                    <div><b>{product.name}</b></div>
                    <div>{formatPrice(product.price)}</div>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center bg-body-tertiary px-2 rounded-3">
                  <div className="w-100">Cant:
                    <Button
                      variant="danger"
                      aria-label="Disminuir cantidad"
                      onClick={() =>
                        removeFromCart(product)
                      }
                      className="btn-sm mx-3">
                      <i className="bi bi-dash"></i>
                    </Button>
                    {product.quantity}
                    <Button
                      variant="success"
                      aria-label="Aumentar cantidad"
                      onClick={() =>
                        addToCart(product)
                      }
                      className="btn-sm ms-3">
                      <i className="bi bi-plus"></i>
                    </Button></div>
                  <div className="d-flex flex-column-">
                    Subtotal: {product.price &&
                      product.quantity &&
                      formatPrice(
                        product.price *
                        product.quantity
                      )}
                  </div>
                </div>
              </div>
            )
        )}
      </section>
      <section className="d-none d-md-block">
        <table className="table table-border">
          <thead>
            <tr className="border-bottom">
              <th scope="col" className="py-3 ">
                Imagen
              </th>
              <th scope="col" className="py-3 ">
                Producto
              </th>
              <th scope="col" className="py-3  d-none d-md-table-cell">
                Precio
              </th>
              <th scope="col" className="py-3 ">
                Cantidad
              </th>
              <th scope="col" className="py-3 ">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.items?.map(
              (product, index) =>
                product && (
                  <tr
                    key={index}
                    className="border-bottom align-middle">
                    <td>
                      <Link
                        to={`/producto/${product.id_product}`}
                        onClick={handleLinkClick}
                        className="text-decoration-none text-dark">
                        <LazyLoadImage
                          src={product.image_url}
                          alt={product.name}
                          className="rounded-2 object-fit-cover"
                          width="80"
                          height="80"
                        />
                      </Link>
                    </td>
                    <td>{product.name}</td>
                    <td className="d-none d-md-table-cell ">
                      {formatPrice(product.price)}
                    </td>
                    <td className="col-3">
                      <Button
                        variant="danger"
                        aria-label="Disminuir cantidad"
                        onClick={() =>
                          removeFromCart(product)
                        }
                        className="btn-sm me-3">
                        <i className="bi bi-dash"></i>
                      </Button>

                      {product.quantity}

                      <Button
                        variant="success"
                        aria-label="Aumentar cantidad"
                        onClick={() =>
                          addToCart(product)
                        }
                        className="btn-sm ms-3">
                        <i className="bi bi-plus"></i>
                      </Button>
                    </td>
                    <td className="col-2 ">
                      {product.price &&
                        product.quantity &&
                        formatPrice(
                          product.price *
                          product.quantity
                        )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </section>
      <section>
        <p className="text-md-end text-center ">
          <b>Costo de Envío</b>: Gratis
        </p>
        <h2 className="text-md-end text-center ">
          Total: {formatPrice(cart.total_price)}
        </h2>

        <div className="d-flex justify-content-end">
          <Button
            onClick={handleCheckout}
            aria-label="Pagar pedido"
            className="col-lg-4 col-12 py-3 mt-2 btn-primary btn-lg fw-bold"
            style={{ cursor: "pointer" }}>
            Pagar Pedido
          </Button>
        </div>
      </section>
    </div >
  );
};

export default CartDetails;
