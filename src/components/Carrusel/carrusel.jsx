import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from "../Carrusel/carrusel.module.css";


const PromoCarousel = () => {
    
  const promoImages = [
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611834134i/7126.jpg",
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg",
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409595968i/929.jpg",
    // Agrega aquí las rutas de tus imágenes promocionales
  ];

  return (
    <div className={style.carouselContainer}>
      {promoImages.map((image, index) => (
        <div key={index} className={style.carouselImageContainer}>
          <img src={image} alt={`Promo ${index}`} className={style.carouselImage} />
        </div>
      ))}
    </div>
  );
};
export default PromoCarousel;
