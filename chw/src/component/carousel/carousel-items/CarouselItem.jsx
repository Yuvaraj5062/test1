// import { ElipseIcon } from "../svg-component";
import styles from "./carouselitem.module.scss";
// import { SliderData } from "./sliderdata";

const CarouselItem = ({ slide, prev, next }) => {
  return (
    <>
      <div className={styles.carouselItem}>
        <img src={slide} alt="" className={styles.img} />
        <div className={styles.text}>
          <span className={styles.order}>Manage your orders</span>
          <span className={styles.established}>
            It is long established fact that a reader will be
          </span>
          <span className={styles.established1}>
            distracted by the readable content.
          </span>

          {/* <div className={styles.iconContainer}>
      <div onClick={prev} className={styles.button}>
      <ElipseIcon className={styles.leftarrow} />
         </div>
         <div onClick={next} className={styles.button}>
          <ElipseIcon className={styles.leftarrow} />
        </div>
        <div onClick={next} className={styles.button}>
         <ElipseIcon className={styles.leftarrow} />
       </div>
    </div>   */}
        </div>
      </div>
    </>
  );
};
export default CarouselItem;
