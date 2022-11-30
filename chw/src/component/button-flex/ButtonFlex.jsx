import React from 'react'
import styles from "./buttonflex.module.scss";
const ButtonFlex = ({
    title,customclass,titleCustomclass,title1,customclass1,mainContainer,
    titleCustomclass1,handleClick,handleClick1,type}) => {
  return (
    <div className= {[styles.buttonFlexContainer, mainContainer].join(" ")}>
        <button
          className={[styles.button, customclass].join(" ")}
        //   disabled={loader}
          type={type}
          onClick={() => (handleClick ? handleClick() : {})}
        >
          <span className={[styles.spinner, titleCustomclass].join(" ")}>
            {/* {loader && <Spinner />} */}
            {title}
          </span>
        </button>
        <button
          className={[styles.button, customclass1].join(" ")}
          type={type}
          onClick={() => (handleClick1 ? handleClick1() : {})}
        >
          <span className={[styles.spinner, titleCustomclass1].join(" ")}>
            {/* {loader && <Spinner />} */}
            {title1}
          </span>
        </button>
        </div>
  )
}

export default ButtonFlex