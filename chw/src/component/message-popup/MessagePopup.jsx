import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button/Button";
import { ErrorIcon, PopupSuceessIcon } from "../svg-component";
import styles from "./messagepopup.module.scss";
const MessagePopup = ({ handleClose, type, message }) => {
  const [time, setTime] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setTime(2);
      handleClose();
    }, 2000);
  }, [time]);

  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
   
        <div className={styles.popupData}>
          {type ==="Successful"?<PopupSuceessIcon />:<ErrorIcon />}
          <span className={type ==="Successful"?styles.successTitle:styles.errorTitle}>{type}</span>
          <span className={styles.successMessage}>{message}</span>
          <Button
            title="ok"
            customclass={styles.okButton}
            handleClick={() => handleClose()}
          />
        </div>
      </div>
    </>
  );
};
export default MessagePopup;
