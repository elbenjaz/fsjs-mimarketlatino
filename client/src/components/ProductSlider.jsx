// hooks
import { useContext } from "react";

// swiper sources
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// context
import { DataContext } from '../context/DataContext'

// components
import Product from "./Product";


const ProductSlider = ({ sortBy }) => {
  const { products } = useContext(DataContext);
  const maxProductsOnSlide = 10;

  const sortedProducts = sortBy(products);

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      spaceBetween={10}
      navigation
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      className="p-5">
      {sortedProducts
        .slice(0, maxProductsOnSlide)
        .map((product) => (
          <SwiperSlide key={product.id_product}>
            <section
              className="product-card d-flex flex-column justify-content-between"
              data-id_product={product.id_product}>
              <div className="Products">
                <article className="d-flex flex-wrap justify-content-center">
                  <Product
                    key={product.id_product}
                    product={product}
                  />
                </article>
              </div>
            </section>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ProductSlider;
