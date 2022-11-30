import styles from "./error.module.scss";
import error from "../../assets/images/error.png";
import React from 'react'
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  const handleSubmit=()=>{
    navigate("/dashboard")
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <img src={error} className={styles.errorImage} />
        <span className={styles.message}>Oops! Something Went Wrong.</span>
        <div className={styles.textContainer}>
          <span className={styles.Text}>
            We can't seem to find the page you are looking for
          </span>
          <span className={styles.goBackText} onClick={()=>handleSubmit()}>Go Back</span>
        </div>
      </div>
    </>
  );
};
export default Error;

















