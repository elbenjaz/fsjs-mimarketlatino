// resources
import reinsurances_icon1 from "/assets/img/reinsurance_icons/reinsurance_icons-01.svg";
import reinsurances_icon2 from "/assets/img/reinsurance_icons/reinsurance_icons-02.svg";
import reinsurances_icon3 from "/assets/img/reinsurance_icons/reinsurance_icons-03.svg";
import reinsurances_icon4 from "/assets/img/reinsurance_icons/reinsurance_icons-04.svg";

// react-bootstrap
import { Row, Col, Image } from "react-bootstrap"

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Reinsurances = () => {
  return (
    <section>
      <Row className="row-cols-1 row-cols-md-3 row-cols-lg-6 text-center justify-content-center mx-4 gap-3 mx-lg-0">
        <Col className="bg-white rounded-4 box-shadow py-2 reinsurance">
          <article>
            <LazyLoadImage
              src={reinsurances_icon1}
              className="reinsurance_icons"
              alt="Ícono carro de compras"
            />
            <h5 className="reinsurance_texts mt-2 ">Compra Rápida</h5>
          </article>
        </Col>
        <Col className="bg-white rounded-4 box-shadow py-2 reinsurance">
          <article>
            <LazyLoadImage
              src={reinsurances_icon2}
              className="reinsurance_icons"
              alt="Ícono avión de papel"
            />
            <h5 className="reinsurance_texts mt-2 ">Envío Seguro</h5>
          </article>
        </Col>
        <Col className="bg-white rounded-4 box-shadow py-2 reinsurance">
          <article>
            <LazyLoadImage
              src={reinsurances_icon3}
              className="reinsurance_icons"
              alt="Ícono escudo"
            />
            <h5 className="reinsurance_texts mt-2 ">Sitio Protegido</h5>
          </article>
        </Col>
        <Col className="bg-white rounded-4 box-shadow py-2 reinsurance">
          <article>
            <LazyLoadImage
              src={reinsurances_icon4}
              className="reinsurance_icons"
              alt="Ícono listón"
            />
            <h5 className="reinsurance_texts mt-2 ">Garantía</h5>
          </article>
        </Col>
      </Row>
    </section>
  );
};

export default Reinsurances;
