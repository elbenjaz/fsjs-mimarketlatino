// hooks
import { useContext, useEffect, useState } from "react";

// react-bootstrap
import { Row, Col } from "react-bootstrap";

// context
import { DataContext } from "../context/DataContext";

// components
import ProductsFilters from "../components/ProductsFilters";
import Product from "../components/Product";


const Products = () => {
  const { title, products, filterOrderLimitProducts } = useContext(DataContext);
  const [filter, setFilter] = useState({
    category : "",
    price    : [0, 100000],
    order    : "name_asc",
    text     : "",
  });

  useEffect(() => {
    document.title = `${title} - Products`;
  }, []);

  const productsFiltered = filterOrderLimitProducts(products, filter);

  return (
    <>
      <section className="d-flex flex-column flex-lg-row justify-content-lg-end align-items-center">
        <nav className="p-4 pt-0 p-lg-2 d-flex flex-wrap justify-content-center justify-content-lg-end">
          <ProductsFilters filter={filter} setFilter={setFilter} />
        </nav>
      </section>

      <section>
      {!productsFiltered.length && <div className="text-center my-4">No hay productos para la búsqueda 🙁</div>}

        <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4">
          {productsFiltered.map((product) => (
            <Col key={product.id_product}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </section></>
  );
};

export default Products;
