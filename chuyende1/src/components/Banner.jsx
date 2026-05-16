import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function Banner() {
  const mainImages = [
    "/src/assets/banner1.gif",
    "/src/assets/banner2.gif",
    "/src/assets/banner3.gif",
    "/src/assets/banner4.gif",
  ];

  const brandLogos = [
    "/src/assets/brand1.png",
    "/src/assets/brand2.png",
    "/src/assets/brand3.png",
    "/src/assets/brand4.png",
    "/src/assets/brand5.png",
    "/src/assets/brand6.png",
    "/src/assets/brand7.png",
    "/src/assets/brand8.png",
    "/src/assets/brand9.png",
    "/src/assets/brand10.png",
    "/src/assets/brand11.png",
    "/src/assets/brand12.png",
    "/src/assets/brand13.png",
    "/src/assets/brand14.png",
    "/src/assets/brand15.png",
    "/src/assets/brand16.png",
    "/src/assets/brand17.png",
    "/src/assets/brand18.png",
    "/src/assets/brand19.png",
    "/src/assets/brand20.png",
    "/src/assets/brand21.png",
    "/src/assets/brand22.png",
    "/src/assets/brand23.png",
    "/src/assets/brand24.png",
    "/src/assets/brand25.png",
    "/src/assets/brand26.png",
    "/src/assets/brand27.png",
    "/src/assets/brand28.png",
    "/src/assets/brand29.png",
    "/src/assets/brand30.png",
    "/src/assets/brand31.png",
    "/src/assets/brand32.png",
    "/src/assets/brand34.png",
    "/src/assets/brand35.png",
    "/src/assets/brand36.png",
    "/src/assets/brand37.png",
    "/src/assets/brand38.png",
  ];

  return (
    <div className="w-full space-y-6">
      {/* Banner chính */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {mainImages.map((src, index) => (
          <SwiperSlide key={index}>
            <a href="#" className="block cursor-pointer">
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Banner nhãn hàng */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
        }}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <a href="#" className="flex items-center justify-center h-16 px-2 cursor-pointer">
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-12 max-w-[120px] object-contain"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

export default Banner;
