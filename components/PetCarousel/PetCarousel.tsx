import { AnimatePresence, motion } from "framer-motion";
import { PetCard } from "../PetCard";
import { Animal, Page_Flexiblecontent_Blocks_PetCarousel } from "graphql";
import { useEffect, useState } from "react";
import useWindowWidth from "utilities/useWindowWidth";
export interface PetCarouselProps
  extends Page_Flexiblecontent_Blocks_PetCarousel {
  className?: string;
}

const PetCarousel = ({ className, variant, title, pets }: PetCarouselProps) => {
  const [loaded, setLoaded] = useState(false);
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const hasPets = pets && pets.length > 0;
  const windowWidth = useWindowWidth();
  const isFeatured = variant === "featured";

  function handleResize() {
    if (!isFeatured) {
      if (windowWidth.width !== undefined && windowWidth.width <= 768) {
        setSlidesPerView(1);
      } else if (windowWidth.width !== undefined && windowWidth.width < 1024) {
        setSlidesPerView(2);
      } else if (windowWidth.width !== undefined && windowWidth.width <= 1279) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    }
  }

  const carouselContainer = isFeatured
    ? `variant-${variant} ${className} relative px-2 bg-primary-light`
    : `variant-${variant} ${className} relative px-2 my-10`;

  const carouselWrapper = isFeatured
    ? `grid grid-cols-${slidesPerView} gap-6 relative w-full pb-10 md:px-20 md:pb-0`
    : `grid grid-cols-${slidesPerView} gap-6 relative w-full pb-5 md:px-20 md:pb-0`;

  const handleNext = () => {
    if (pets?.length && currentCarouselPage < pets.length - slidesPerView) {
      setCurrentCarouselPage(currentCarouselPage + slidesPerView);
    } else {
      setCurrentCarouselPage(0);
    }
  };

  const handlePrev = () => {
    if (currentCarouselPage > 0) {
      setCurrentCarouselPage(currentCarouselPage - slidesPerView);
    } else {
      setCurrentCarouselPage((pets?.length ?? 0) - slidesPerView);
    }
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    handleResize();
  }, [windowWidth.width]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentCarouselPage]);

  return (
    <>
      {loaded && hasPets && (
        <div className={carouselContainer}>
          <h3>{title}</h3>
          <div
            className={`container relative mx-auto flex flex-col md:flex-row md:px-4`}
          >
            <motion.button
              onClick={handlePrev}
              className={`absolute bottom-5 left-1/3 z-10 md:bottom-auto md:top-1/2 md:left-0`}
              aria-label="Previous Slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src="/arrow.svg"
                width="76"
                height="28"
                alt="Previous Slide"
                style={{ transform: "rotate(180deg)" }}
              />
            </motion.button>
            <div className={carouselWrapper}>
              <AnimatePresence initial={false} mode="popLayout">
                {pets?.map((pet, index) => {
                  let active =
                    index >= currentCarouselPage &&
                    index < currentCarouselPage + slidesPerView;
                  return (
                    <motion.div
                      key={pet?.id}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.5,
                        layout: {
                          type: "spring",
                          bounce: 0.5,
                          duration: 0.5,
                        },
                      }}
                      className={`pb-20 md:pb-0 ${active ? "flex " : "hidden"}`}
                    >
                      <PetCard
                        variant={variant ? variant : "basic"}
                        pet={pet as Animal}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={handleNext}
              className={`absolute bottom-5 right-1/3 z-10 md:bottom-auto md:top-1/2 md:right-0`}
              aria-label="Next Slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img src="/arrow.svg" width="76" height="28" alt="Next Slide" />
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetCarousel;
