import React from "react";
import { CloseIcon } from "../svg-component";
import styles from "./deletepopup.module.scss";
import { colors } from "../constants/Colors";
import Divider from "../divider/Divider";
import ButtonFlex from "../button-flex/ButtonFlex";
const DeletePopup = ({ setIsDelete, handleClose }) => {
  const handleCancle = () => {
    handleClose();
  };
  const handleDelete = () => {
    setIsDelete(true);
    handleClose();
  };
  return (
    <div
      className={styles.deleteContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.titleContainer}>
        Are you Sure?
        <CloseIcon
          fillcolor={colors.black1}
          customClass={styles.closeIcon}
          handleClick={() => handleClose()}
        />
      </div>
      <Divider customClass={styles.divider} />
      <span className={styles.confirmationMessage}>
        Are you Sure you want to delete the Medication?
      </span>
      <ButtonFlex
        type="button"
        title="Cancel"
        customclass={styles.cancleButton}
        // titleCustomclass={}
        title1="Delete"
        customclass1={styles.deleteButton}
        // titleCustomclass1={}
        handleClick={() => handleCancle()}
        handleClick1={() => handleDelete()}
      />
    </div>
  );
};

export default DeletePopup;
