import React from "react";
import styles from "./displaybox.module.scss";

const DisplayBox = ({
    index,
    imgList,
    customClass,

}) => {

    return (
        <div className={[styles.boxContainer, customClass].join(" ")}>
            <img
                src={imgList[index].image}
                alt="profile pic"
                className={styles.profileImage}
            />
        </div>
    );
};

export default DisplayBox;
