import { Link } from "react-router-dom";

// hooks
import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Form, InputGroup, Button, Image, Table } from "react-bootstrap";

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// components
import ScrollToTopButton from "../components/ScrollToTopButton";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

const UserProducts = () => {
    const { user, setIsLinkClicked } = useOutletContext();
    const {
        setUserObjective,
        products,
        setProducts,
        categories,
        formatPrice,
        formatBytes,
    } = useContext(DataContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [image_url_preview, setImageUrlPreview] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const urlBaseServer = Config.get("URL_API");

    const productsByUser = products.filter(
        (product) => product.id_user === user.id_user
    );

    useEffect(() => {
        if (productsByUser.length > 0) {
            setUserObjective((prevState) => ({
                ...prevState,
                hasProducts: true,
            }));
        }
    }, [products]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Utilización de token para crear producto
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const formData = {
                id_user: user.id_user,
                name,
                price: parseInt(price),
                description,
                image_url,
                category,
                date_add: new Date().toISOString(),
            };
            // Solicitud para crear producto
            const response = await axios.post(
                `${urlBaseServer}products`,
                formData,
                config
            );
            const newProduct = response.data;
            // Agregar producto
            setProducts([...products, newProduct]);
            // Vaciar campos después de creación
            setName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setImageUrl("");
            setShowDetails(false);

            // Desplázate al inicio de la página
            window.scrollTo({ top: 0, behavior: "instant" });
        } catch (error) {
            console.error("Error creating a new product:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            // Utilización de token para eliminar producto
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Eliminar el producto utilizando productId
            await axios.delete(`${urlBaseServer}products/${productId}`, config);

            // Filtrar los productos para eliminar el producto eliminado
            const newProducts = products.filter(
                (product) => product.id_product !== productId
            );

            // Actualizar el estado con los productos restantes
            setProducts(newProducts);
        } catch (error) {
            console.error("Error deleting the product:", error);
        }
    };

    const setImageUrlAndPreview = (img_url) => {
        setImageUrl(img_url);
        const img = new window.Image();
        img.onload = () => {
            setImageUrlPreview({
                bytes_txt: formatBytes(img.src.length),
                resolution: img.width + "x" + img.height,
            });
        };
        img.onerror = () => {
            setImageUrl("");
        };
        img.src = img_url;
    };

    // Mapeo de categoría para transformar palabra Música por Musica en base de datos
    const mappedCategories = categories.map((cat) => ({
        ...cat,
        name: cat.name === "Música" ? "Musica" : cat.name,
    }));

    return (
        <>
            <section>
                <h1 className="">Mis Productos</h1>

                {productsByUser.length === 0 ? (
                    <p className="">
                        Crea tu primer producto y comienza a ganar dinero.
                    </p>
                ) : (
                    <p className="">
                        Este es el listado de tus productos publicados.
                    </p>
                )}
            </section>

            <section className="mb-4">
                <div className="text-end mb-4">
                    <Button
                        className="btn-primary border-0"
                        onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? (
                            <>
                                Cerrar{" "}
                                <i className="bi bi-chevron-compact-up"></i>
                            </>
                        ) : (
                            <>
                                Crear Producto{" "}
                                <i className="bi bi-chevron-compact-down"></i>
                            </>
                        )}
                    </Button>
                </div>
                {showDetails && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            className="mb-3"
                            placeholder="Nombre Producto"
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                placeholder="Precio sin punto"
                                type="number"
                                id="price"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />{" "}
                            <InputGroup.Text className="me-2">
                                CLP
                            </InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Select
                                className="form-control text-body-secondary"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required>
                                <option value="" disabled>
                                    Selecciona una categoría
                                </option>
                                {mappedCategories.map((cat) => (
                                    <option
                                        key={cat.category}
                                        value={cat.category}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                        <Form.Control
                            className="mb-3"
                            placeholder="URL Imagen"
                            type="text"
                            id="product_img"
                            name="product_img"
                            value={image_url}
                            onChange={(e) =>
                                setImageUrlAndPreview(e.target.value)
                            }
                            required
                        />
                        {image_url && (
                            <div className="d-flex">
                                <LazyLoadImage
                                    className="bg-white border border-1 rounded-3 mb-3 me-2"
                                    src={image_url}
                                    height={80}
                                />
                                <div className="d-flex flex-column">
                                    <span>
                                        <b>{image_url}</b>
                                    </span>
                                    <span>{image_url_preview.bytes_txt}</span>
                                    <span>{image_url_preview.resolution}</span>
                                </div>
                            </div>
                        )}

                        <Form.Control
                            className="mb-3"
                            placeholder="Descripción"
                            type="text"
                            id="desc"
                            name="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            className="btn-primary border-0 w-50">
                            Crear Producto
                        </Button>
                    </Form>
                )}
            </section>

            <section>
                <Table bordered hover size="sm" className="box-shadow">
                    <thead>
                        <tr className="text-center">
                            <th className="">Imagen</th>
                            <th className="">Producto</th>
                            <th className="">Precio</th>
                            <th className="">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsByUser.map((product) => (
                            <tr
                                key={product.id_product}
                                className="align-middle">
                                <td className="text-center">
                                    <LazyLoadImage
                                        src={product.image_url}
                                        width={80}
                                        height={80}
                                        className="bg-white border border-1 rounded-3 object-fit-cover"
                                    />
                                </td>
                                <td className="">
                                    {product.name}
                                </td>
                                <td className="text-center ">
                                    {formatPrice(product.price)}
                                </td>
                                <td className="text-center align-middle ">
                                    <Link
                                        to={`/producto/${product.id_product}`}>
                                        <i className="bi bi-search text-secondary fs-4 me-2"></i>
                                    </Link>
                                    <Link
                                        type="button"
                                        onClick={() =>
                                            handleDelete(product.id_product)
                                        }
                                        className="bg-transparent border-0 pt-0 m-0">
                                        <i className="bi bi-trash3 text-secondary fs-4 ms-2"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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

export default UserProducts;
