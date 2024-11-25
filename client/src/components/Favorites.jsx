// hooks
import { useContext } from "react";

// react-bootstrap
import { Button } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// notifications
import Swal from "sweetalert2";

const Favorites = ({ productId }) => {
    const Auth = useContext(AuthContext);
    const { favorites, addFavorite, removeFavorite } = useContext(DataContext);
    const isFavorite = favorites.some(
        (favorite) => favorite.id_product === productId
    );

    // add and remove favorites
    const handleFavorite = async () => {
      if (Auth.userIsLoggedIn) {
          try {
              if (isFavorite) {
                  await removeFavorite(productId);
                  Swal.fire("Removido", "El producto ha sido removido de tus favoritos.", "success");
              } else {
                  await addFavorite(productId);
                  Swal.fire("Agregado", "El producto ha sido agregado a tus favoritos.", "success");
              }
          } catch (error) {
              Swal.fire("Error", "Ha ocurrido un error al modificar tus favoritos.", "error");
          }
      } else {
          Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Debes iniciar sesión para guardar favoritos",
          });
      }
    };

    return (
        <Button
            variant="link"
            className="p-0 border-0 bg-transparent favorite"
            aria-label="Marcar o desmarcar de Favoritos"
            onClick={handleFavorite}>
            {isFavorite ? (
                <i className="bi bi-suit-heart-fill text-primary fs-3"></i>
            ) : (
                <i className="bi bi-suit-heart text-primary fs-3"></i>
            )}
        </Button>
    );
};

export default Favorites;
