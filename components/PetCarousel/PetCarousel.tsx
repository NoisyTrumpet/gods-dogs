import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PetCard } from "../PetCard";
import { Page_Flexiblecontent_Blocks_PetCarousel } from "graphql";
import { useRef, useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

export interface PetCarouselProps
  extends Page_Flexiblecontent_Blocks_PetCarousel {
  className?: string;
}

const PetCarousel = ({ className, variant, title, pets }: PetCarouselProps) => {
  const [loaded, setLoaded] = useState(false);

  const swiperRef = useRef<SwiperCore>();
  const isFeatured = variant === "featured";
  const slidesPerView = isFeatured ? 1 : 4;

  const carouselWrapper = isFeatured
    ? `variant-${variant} ${className} relative px-2 bg-primary-light`
    : `variant-${variant} ${className} relative px-2 my-10`;

  const swiperWrapper = isFeatured
    ? `relative block w-full pb-10 md:px-20 md:pb-0`
    : `relative block w-full pb-5 md:px-20 md:pb-0`;

  const responsiveBreakpoints = isFeatured
    ? {}
    : {
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1300: {
          slidesPerView: 4,
        },
      };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <div className={carouselWrapper}>
          <h3>{title}</h3>
          <div
            className={`container relative mx-auto flex flex-col md:flex-row md:px-4`}
          >
            <button
              className={`absolute bottom-5 left-1/3 z-10 md:bottom-auto md:top-1/2 md:left-0`}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <img
                src="/arrow.svg"
                width="76"
                height="28"
                alt="Previous Slide"
                style={{ transform: "rotate(180deg)" }}
              />
            </button>
            <div className={swiperWrapper}>
              <Swiper
                breakpoints={responsiveBreakpoints}
                slidesPerView={slidesPerView}
                slidesPerGroup={slidesPerView}
                loop={true}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {pets?.map((pet) => (
                  <SwiperSlide
                    key={pet?.id}
                    className={!isFeatured ? "pb-20 md:pb-0" : ""}
                  >
                    <PetCard variant={variant ? variant : "basic"} pet={pet} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button
              className={`absolute bottom-5 right-1/3 z-10 md:bottom-auto md:top-1/2 md:right-0`}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img src="/arrow.svg" width="76" height="28" alt="Next Slide" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetCarousel;
