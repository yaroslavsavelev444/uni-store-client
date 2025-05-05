import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './ImageSlider.css'; // 💡 Подключаем CSS
import { API_URL } from '../../http/axios';
import "./ImageSlider.css";

export default function ImageSlider({ images = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="image-slider">
      <Swiper
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Autoplay, Navigation, Pagination]}
        className="main-swiper"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={`${API_URL}/${src}`}
              alt={`slide-${idx}`}
              className="main-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={Math.min(images.length, 5)}
        freeMode
        watchSlidesProgress
        modules={[Thumbs]}
        className="thumbs-swiper"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={`${API_URL}/${src}`}
              alt={`thumb-${idx}`}
              className="thumb-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}