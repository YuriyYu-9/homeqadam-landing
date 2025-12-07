import { useContext } from "react";
import Container from "../layouts/Container";
import { specialists } from "../assets/data/specialists";
import { LangContext } from "../i18n/context";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

export default function HeroGallery() {
  const { dict } = useContext(LangContext);

  return (
    <section className="pt-20 pb-16 bg-white">
      <Container>
        <p className="mb-8 text-xl font-semibold text-center text-blue-600 md:text-2xl">
          {dict.hero.top}
        </p>

        <div className="flex flex-col items-center gap-10 md:flex-row">
          {/* LEFT TEXT BLOCK */}
          <div className="w-full md:w-5/12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              {dict.hero.title}
            </h2>
            <p className="mb-4 text-sm text-gray-600 md:text-base">
              {dict.hero.text1}
            </p>
            <p className="text-sm text-gray-600 md:text-base">
              {dict.hero.text2}
            </p>
          </div>

          {/* RIGHT GALLERY BLOCK */}
          <div className="w-full md:w-7/12">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              navigation
              loop
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false },
                768: { slidesPerView: 2.5, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
              }}
            >
              {specialists.map((s) => (
                <SwiperSlide key={s.id}>
                  <div className="flex flex-col items-center overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-lg">
                    
                    {/* ADAPTIVE IMAGE */}
                    <div className="flex items-center justify-center w-full p-4 bg-white">
                      <img
                        src={s.image}
                        alt={dict.specialists[s.key]}
                        className="object-contain w-full h-auto  max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-72"
                      />
                    </div>

                    {/* TITLE */}
                    <div className="p-4 text-lg font-semibold text-center">
                      {dict.specialists[s.key]}
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>

      {/* SWIPER BUTTONS */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            width: 28px !important;
            height: 28px !important;
            color: #1d4ed8 !important;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px !important;
            font-weight: bold;
          }
        `}
      </style>
    </section>
  );
}
