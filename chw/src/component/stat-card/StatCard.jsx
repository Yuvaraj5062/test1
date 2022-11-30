import React from "react";
import styles from "./statcard.module.scss";
const StatCard = ({ percentege, value, subTitle, background }) => {
  return (
    <div className={styles.statCardContainer}>
      <div
        style={{
          background: background,
          width: "6px",
          borderRadius: "12px",
          margin: "15px",
        }}
      ></div>

      <div className={styles.statCardContainerDetails}>
        <span className={styles.cardTitle}>{value}</span>
        <div className={styles.cardSubTitle}>{subTitle}</div>
      </div>
    </div>
  );
};

export default StatCard;
