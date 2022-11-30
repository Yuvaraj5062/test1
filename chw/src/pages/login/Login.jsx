import React from "react";
import styles from "./login.module.scss";
import logo1 from "../../assets/images/logo1.png";
import doctor from "../../assets/images/doctor.png";
import SignIn from "../signin/SignIn";
import Carousel, { CarouselItem } from "../../component/carousel/Carousel";
import { ChwLogo } from "../../component/svg-component";
import { colors } from "../../component/constants/Colors";
const Login = () => {
  const slides = [
    {
      img: doctor,
    },
    {
      img: doctor,
    },
    {
      img: doctor,
    },
  ];
  return (
    <>
      <div className={styles.patientContainer}>
        <div className={styles.patient}>
          <div className={styles.maindoctor}>
            <ChwLogo customClass={styles.logo} />
            <div className={styles.caraouselMainContainer}>
              <div className={styles.signin}>
                <SignIn />
              </div>
              <div className={styles.caraouselContainer}>
                <Carousel slides={slides} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
