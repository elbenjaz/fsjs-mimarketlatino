// hooks
import { createContext, useEffect, useState } from "react";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// axios
import axios from "axios";

// toastify
import { Slide, toast } from "react-toastify";

// resources
import logoActive from "/assets/img/logo_icons/logoActive.svg";

// data
import categories from "../data/categories";

// utils
import Config from "../utils/Config";

const DataProvider = ({ children }) => {
    const title = "Mi Market Latino";

    const urlBaseServer = Config.get("URL_API");
    const url_products = urlBaseServer + "products";
    const url_users = urlBaseServer + "users";
    const url_favorites = urlBaseServer + "favorites";
    // const url_orders = urlBaseServer + "orders";
    const url_purchases = urlBaseServer + "orders/purchases";
    const url_sells = urlBaseServer + "orders/sells";

    // Preinicializado
    const localStorageCart = () => {
        try {
            return JSON.parse(localStorage.getItem("cart"));
        } catch (e) {
            localStorage.removeItem("cart");
        }
    };
    const defaultCart = {
        items: [],
        total_items: 0,
        total_price: 0,
    };

    // Estados
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [sells, setSells] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(localStorageCart() || defaultCart);
    const [loading, setLoading] = useState(true);
    const [userObjective, setUserObjective] = useState({
        hasInfo: false,
        hasProducts: false,
        hasPurchases: false,
        hasSells: false,
        hasFavorites: false,
    });

    // category
    const getCategory = (category, attr) => {
        const index = categories.findIndex((c) => c.category === category);
        if (index === -1) {
            return false;
        }
        return categories[index][attr] || null;
    };

    // users
    const getUser = async (userId) => {
        if (!userId) return; // Previene la ejecución si no hay un userId válido

        setLoadingUser(true);
        try {
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${url_users}/${userId}`, config);
            setUser(response.data);
        } catch (error) {
            console.error("Error getting user:", error);
            setError("No se pudo cargar la información del usuario.");
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    // favorites

    // get favorites
    const getFavorites = async () => {
      try {
          const token = sessionStorage.getItem("access_token");
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          };

          const response = await axios.get(
            `${url_favorites}/`,
              config
          );
          const favorites = response.data;
          setFavorites(favorites);
      } catch (error) {
          console.error("Error fetching favorites:", error);
      }
  };

    // add favorite
    const addFavorite = async (productId) => {
        try {
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const data = {
                id_product: productId,
            };
            const response = await axios.post(
                `${url_favorites}/`,
                data,
                config
            );
            const favoritesAdded = response.data;
            setFavorites([...favorites, favoritesAdded]);
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };

    // remove favorite
    const removeFavorite = async (productId) => {
      try {
          const token = sessionStorage.getItem("access_token");
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          };
          await axios.delete(`${url_favorites}/${productId}`, config);
          const favoritesRemain = favorites.filter(
              (favorite) => favorite.id_product !== productId
          );
          setFavorites(favoritesRemain);
      } catch (error) {
          console.error("Error deleting favorite:", error);
      }
  };

    // purchases
    const getPurchases = async () => {
        try {
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${url_purchases}`, config);
            const purchases = response.data;
            setPurchases(purchases);
        } catch (error) {
            console.error("Error getting purchases:", error);
        }
    };
    // sells
    const getSells = async () => {
        try {
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${url_sells}`, config);
            const sells = response.data;
            setSells(sells);
        } catch (error) {
            console.error("Error getting sells:", error);
        }
    };

    // products
    const getProductsAPI = () => {
        axios
            .get(url_products)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error trying to get data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        getProductsAPI();
        document.title = title;
    }, []);

    // cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // *** CART STUFF ***
    const cart_max_items = 10;
    const addToCart = (product) => {
            if (cart.total_items >= cart_max_items) {
                feedback(`¡El carrito está lleno!`, "error");
                return false;
            }

            let newCart = { ...cart };

            const index = newCart.items.findIndex(
                (item) => item.id_product === product.id_product
            );

            if (index === -1) {
                newCart.items = [...newCart.items, { ...product, quantity: 1 }];
            } else {
                newCart.items[index].quantity++;
            }

            newCart.total_price += product.price;
            newCart.total_items++;

            setCart(newCart);

            feedback(<>Agregado al carrito: <b>{product.name}</b></>, "success");
        },
        removeFromCart = (product) => {
            let newCart = { ...cart };

            const index = newCart.items.findIndex(
                (item) => item.id_product === product.id_product
            );

            if (index === -1) {
                return false;
            }

            if (newCart.items[index].quantity === 1) {
                newCart.items.splice(index, 1);
            } else {
                newCart.items[index].quantity--;
            }

            newCart.total_price -= product.price;
            newCart.total_items--;

            setCart(newCart);

            feedback(<>Quitado del carrito: <b>{product.name}</b></>, "error");
        },
        getQuantityFromCart = (product) => {
            const index = cart.items.findIndex(
                (item) => item.id_product === product.id_product
            );

            return index === -1 ? 0 : cart.items[index].quantity;
        },
        confirmCart = () => {},
        emptyCart = () => {
            setCart(defaultCart);
            localStorage.removeItem("cart");
        },
        feedback = (text, type) => {
            toast.dismiss();

            if (typeof toast[type] === "function") {
                toast[type](text, {
                    hideProgressBar: true,
                    transition: Slide,
                    bodyClassName: `Feedback-${type}`,
                });
            }
        };

    const [shippingCost, setShippingCost] = useState(() => {
        // Intenta obtener el shippingCost desde localStorage o establece 0 si no existe
        const savedShippingCost = localStorage.getItem("shippingCost");
        return savedShippingCost ? JSON.parse(savedShippingCost) : 0;
    });

    const [totalToPayPlusShipping, setTotalToPayPlusShipping] = useState(0);

    // // Inicializa el orderID desde localStorage si existe; de lo contrario, genera uno nuevo
    // const [orderID, setOrderID] = useState(() => {
    //     const savedOrderID = localStorage.getItem("orderID");
    //     return savedOrderID || uuidv4();
    // });

    // // Efecto para guardar orderID en localStorage cuando cambia
    // useEffect(() => {
    //     localStorage.setItem("orderID", orderID);
    // }, [orderID]);

    // Efecto para guardar shippingCost en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("shippingCost", JSON.stringify(shippingCost));
    }, [shippingCost]);

    // Efecto para calcular el total a pagar incluyendo el costo de envío
    useEffect(() => {
        setTotalToPayPlusShipping(cart.total_price + shippingCost);
    }, [cart.total_price, shippingCost]);

    // const startNewOrder = () => {
    //     const newOrderID = uuidv4();
    //     setOrderID(newOrderID);
    //     // Opcionalmente, reinicia otros estados aquí
    //     // setTotalToPay(0);
    //     // setShippingCost(0);
    //     // Asegúrate de limpiar o reiniciar cualquier otro estado relevante aquí
    //     // Por ejemplo, si mantienes un estado para los items del carrito, deberías reiniciarlo también
    // };

    // UTILIDADES
    const filterOrderLimitProducts = (products, filter, limit) => {
        //filter
        let filtered = products.filter((product) => {
            const matchByCategory = filter.category
                ? product.category === filter.category
                : true;

            const matchByPrice = filter.price
                ? Number(product.price) >= Number(filter.price[0]) &&
                  Number(product.price) <= Number(filter.price[1])
                : true;

            const matchByText = () => {
                if (Number(filter.text)) {
                    return Number(product.id_product) === Number(filter.text);
                }

                const includes = (text) =>
                    text
                        .toString()
                        .toLowerCase()
                        .includes(filter.text.trim().toLowerCase());

                return includes(product.name) || includes(product.description);
            };

            return matchByCategory && matchByPrice && matchByText();
        });

        //order
        switch (filter.order) {
            case "name_asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "price_asc":
                filtered.sort((a, b) => Number(a.price) - Number(b.price));
                break;

            case "price_desc":
                filtered.sort((a, b) => Number(b.price) - Number(a.price));
                break;

            case "date_add_desc":
                filtered.sort((a, b) => b.date_add.localeCompare(a.date_add));
                break;
        }

        //limit
        if (limit) {
            filtered = filtered.slice(0, Math.min(limit, filtered.length));
        }

        return filtered;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(price);
    };

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const formatBytes = (bytes) => {
        if (!bytes) {
            return "0 Bytes";
        }

        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <LazyLoadImage src={logoActive} width={60} className="loading" />
                    <h4 className="text-purple mt-2">Cargando Productos</h4>
                </div>
            </div>
        );
    }

    return (
        <DataContext.Provider
            value={{
                title,
                products,
                setProducts,
                filterOrderLimitProducts,
                cart,
                setCart,
                getQuantityFromCart,
                addToCart,
                removeFromCart,
                confirmCart,
                emptyCart,
                shippingCost,
                setShippingCost,
                totalToPayPlusShipping,
                categories,
                getCategory,
                userObjective,
                setUserObjective,
                orders,
                setOrders,
                favorites,
                setFavorites,
                formatPrice,
                formatDate,
                formatBytes,
                user,
                setUser,
                getFavorites,
                addFavorite,
                removeFavorite,
                purchases,
                getPurchases,
                sells,
                getSells,
            }}>
            {children}
        </DataContext.Provider>
    );
};

export const DataContext = createContext();
export default DataProvider;
