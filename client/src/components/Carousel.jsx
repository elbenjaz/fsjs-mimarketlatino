import { useNavigate } from "react-router-dom";

// react-bootstrap
import { Carousel, Button } from 'react-bootstrap';

// lazyload
import { LazyLoadImage } from 'react-lazy-load-image-component';

// banners carousel
import Banner1 from "/assets/img/banners/banner1.jpg";
import Banner2 from "/assets/img/banners/banner2.jpg";
import Banner3 from "/assets/img/banners/banner3.jpg";
import Banner4 from "/assets/img/banners/banner4.jpg";

const CarouselHome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/productos');
  }

  return (
    <Carousel>
      <Carousel.Item>
        <LazyLoadImage src={Banner1} text="Mi Market Latino"  className="carousel-img" alt="Banner promocional 1"/>
        <Carousel.Caption className="carousel-caption">
          <h2 className="title fs-1">Bienestar</h2>
          <p>Date un tiempo y cuida tu salud. <br />Esencias y Aceites Naturales</p>
          <Button onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer" aria-label="Ver más">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <LazyLoadImage src={Banner2} text="Mi Market Latino"  className="carousel-img" alt="Banner promocional 1"/>
        <Carousel.Caption>
          <h2 className="title fs-2">Manualidades</h2>
          <p>Dile adiós al estrés con estos hobbies.  <br />Bordados y Pinturas.</p>
          <Button  onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer" aria-label="Ver más">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <LazyLoadImage src={Banner3} text="Mi Market Latino"  className="carousel-img" alt="Banner promocional 1"/>
        <Carousel.Caption>
          <h2 className="title fs-1">Música</h2>
          <p>
            Vive la pasión de la música. <br />
            Instrumentos, micrófonos y sintetizadores.
          </p>
          <Button onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer" aria-label="Ver más">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <LazyLoadImage src={Banner4} text="Mi Market Latino"  className="carousel-img" alt="Banner promocional 1"/>
        <Carousel.Caption>
          <h2 className="title fs-1 text-left text-black">Plantas</h2>
          <p className="text-black">
            Dale un toque selvático a tu hogar. <br />Planta de interior y exterior.
          </p>
          <Button onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer" aria-label="Ver más">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;