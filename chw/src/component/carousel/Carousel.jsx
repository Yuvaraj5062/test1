import { useEffect, useRef, useState } from "react";
import styles from "./carousel.module.scss";
import { ElipseIcon } from "../svg-component";
import CarouselItem from "../carousel/carousel-items/CarouselItem";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide < slides.length - 1 ? currentSlide + 1 : 0
      );
    }, 5000);

    return () => clearInterval(slideInterval + 1);
  }, []);
  const prev = () => {
    const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    setCurrentSlide(index);
  };

  const next = () => {
    const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(index);
  };
  return (
    <div className={styles.Carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(${-currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <CarouselItem slide={slide.img} key={index} prev={prev} next={next} />
        ))}
      </div>
      <div className={styles.text}>
        <div className={styles.iconContainer}>
          <div onClick={prev} className={styles.button}>
            <ElipseIcon className={styles.leftarrow} />
          </div>
          <div onClick={next} className={styles.button}>
            <ElipseIcon className={styles.leftarrow} />
          </div>
          <div onClick={next} className={styles.button}>
            <ElipseIcon className={styles.leftarrow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
