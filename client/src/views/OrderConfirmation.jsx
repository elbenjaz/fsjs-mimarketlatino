// hooks
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container } from "react-bootstrap";

// utils
import Config from "../utils/Config";

const OrderConfirmation = () => {
    const { formatPrice, formatDate, title } = useContext(DataContext);
    const { userIsLoggedIn } = useContext(AuthContext);

    const [ orders, setOrders ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Confirmación`;
    }, []);

    // Obtiene la última orden del usuario
    useEffect(() => {
        const fetchOrders = async () => {
            if (userIsLoggedIn) {
                const token = sessionStorage.getItem("access_token");
                const urlBaseServer = Config.get("URL_API");
                try {
                    const response = await axios.get(`${urlBaseServer}orders/purchases`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data.length > 0) {
                        // Como las órdenes vienen ordenadas descendentemente, la más reciente es la primera.
                        const lastOrder = response.data[0]; // Cambiado para tomar el primer elemento
                        setOrders([lastOrder]); // Actualiza el estado para incluir solo la última orden
                    } else {
                        // Manejo del caso en que no hay órdenes
                        console.log('No hay órdenes para mostrar.');
                    }
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchOrders();
    }, [userIsLoggedIn]);

    // Redirige al home después de 10 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Usa navigate para redirigir al home
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!orders.length) {
        return <p>No se encontraron órdenes.</p>;
    }

    return (
        <>
            <Container className="col-lg-6 col-md-8 text-center mx-auto py-5 mt-5">
                <h1 className="py-3 cursor default">¡Gracias por tu compra!</h1>
                <p className="">Tu pedido ha sido recibido y está siendo procesado. Ahora serás redirigido a la página principal.</p>
                
                {orders && orders.map((order, index) => (
                    <div key={index} className="my-4">
                        <p className=""><b>Número de Orden:</b> {order.id_order}</p>
                        <p className=""><b>Fecha:</b> {formatDate(order.purchase_date)}</p>
                        <div className="border-top w-50 mx-auto my-4">
                            <p className="mt-3 "><b>Total:</b> {formatPrice(order.total_price)}</p>
                        </div>
                    </div>
                ))}
            </Container>
        </>
    );
};

export default OrderConfirmation;