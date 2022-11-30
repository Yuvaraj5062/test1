import React from "react";
import Divider from "../divider/Divider";
import { MoreIcon } from "../svg-component";
import styles from "./clinicalstaffcard.module.scss";
import { colors } from "../constants/Colors";
import Button from "../Button/Button";
const ClinicalStaffCard = ({ data }) => {
  return (
    <div className={styles.clinicalStaffCardCatainer}>
      <span className={styles.clinicalStaffCardHeader}>
        Clinical Staff List
      </span>
      <Divider customClass={styles.clinicalStaffCardDivider} />
      <div className={styles.clinicalStaffMainRow}>
        {data.map((item, index) => {
          return (
            <div key={index} className={styles.clinicalStaffMainRowChild}>
              <div className={styles.clinicalStaffMainRowLeft}>
                <img
                  src={item.img}
                  alt="clinical staff"
                  className={styles.headerImage}
                />
                <div className={styles.nameContainer}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.subTitle}>{item.subTitle}</div>
                </div>
              </div>
              <MoreIcon fillColor={colors.primaryLight} />
            </div>
          );
        })}
        {data.length > 4 && (
          <Button
            title="View All Clinical Staff"
            customclass={styles.viewButton}
          />
        )}
      </div>
    </div>
  );
};

export default ClinicalStaffCard;
