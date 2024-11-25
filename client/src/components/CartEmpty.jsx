const CartEmpty = () => {
    return (
        <>
            <section className="d-flex flex-column justify-content-center mx-1 mx-lg-0 py-2 px-4 text-center">
                <h2>Tu carrito está vacío</h2>
                <p><i className="bi bi-tag fs-5 me-2"></i>Compra ahora y consigue el envío
                gratis ¡por tiempo limitado!</p>
            </section>
        </>
    );
};

export default CartEmpty;
