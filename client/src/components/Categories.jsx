// resources
import category_icon1 from "/assets/img/category_icons/category_icons-01.svg";
import category_icon2 from "/assets/img/category_icons/category_icons-02.svg";
import category_icon3 from "/assets/img/category_icons/category_icons-03.svg";
import category_icon4 from "/assets/img/category_icons/category_icons-04.svg";

// react-bootstrap
import { Row, Col } from "react-bootstrap"

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Categories = () => {
  return (
    <section>
      <Row className="row-cols-1 row-cols-md-3 row-cols-lg-6 text-center justify-content-center mx-4 gap-3 mx-lg-0">
        <Col className="rounded-5 box-shadow py-2 my-3 home_category_1">
          <article>
            <LazyLoadImage
              src={category_icon1}
              className="category_icons"
              alt="Ícono categoría música"
            />
            <h6 className="reinsurance_texts mt-2 text-white ">Música</h6>
          </article>
        </Col>
        <Col className="rounded-5 box-shadow py-2 my-3 home_category_2">
          <article>
            <LazyLoadImage
              src={category_icon2}
              className="category_icons"
              alt="Ícono categoría bienestar"
            />
            <h6 className="reinsurance_texts mt-2 text-white ">Bienestar</h6>
          </article>
        </Col>
        <Col className="rounded-5 box-shadow py-2 my-3 home_category_3">
          <article>
            <LazyLoadImage
              src={category_icon3}
              className="category_icons"
              alt="Ícono categoría plantas"
            />
            <h6 className="reinsurance_texts mt-2 text-white ">Plantas</h6>
          </article>
        </Col>
        <Col className="rounded-5 box-shadow py-2 my-3 home_category_4">
          <article>
            <LazyLoadImage
              src={category_icon4}
              className="category_icons"
              alt="Ícono categoría manualidades"
            />
            <h6 className="reinsurance_texts mt-2 text-white ">Manualidades</h6>
          </article>
        </Col>
      </Row>
    </section>
  );
};

export default Categories;
