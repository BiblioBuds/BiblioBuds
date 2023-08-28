"use client"
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import style from './Carrusel.module.css'; // Asegúrate de importar los estilos CSS

const PromoCarousel = () => {
  const promoImages = [
    {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611834134i/7126.jpg",
        title: "The Count of Monte Cristo",
      },
      {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg",
        title: "One Hundred Years of Solitude",
      },
      {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409595968i/929.jpg",
        title: "Memoirs of a Geisha",
      },
  ];

  return (
    <div className={style.carouselContainer}>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000} // Cambia la velocidad de cambio de imagen si lo deseas
      >
        {promoImages?.map((item, index) => (
          <div key={index} className={style.carouselItem}>
          <div className={style.carouselImageContainer}>
            <img src={item.image} alt={`Promo ${index}`} className={style.carouselImage} />
            <div className={style.bookName}>{item.title}</div>
          </div>
          <div className={style.overlay}></div>
        </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromoCarousel;