import React from "react";
import {
  CalenderIcon,
  Delete,
  MoreIcon,
  Pdf,
  PhoneIcon,
  PlayIcon,
  PlayOn,
  TimerIcon,
} from "../svg-component";
import styles from "./mobiletablecard.module.scss";
import { colors } from "../constants/Colors";
import Divider from "../divider/Divider";
import moment from "moment";
import defaultUpload from "../../assets/images/defaultUpload.png";
const MobileTableCard = ({
  data,
  flag,
  setFlag,
  index,
  ButtonGroup,
  value,
  setValue,
  setButtonValue,
  Messages,
}) => {
  const handlePopup = () => {
    setFlag(!flag);
    setValue(index);
  };
  const handleSelectedValue = (status, item, appointmentId) => {
    if (item) {
      setButtonValue({
        status: status,
        id: item,
        appointmentId: item,
      });
    } else {
      setButtonValue(status);
    }
    setFlag(false);
  };

  return (
    <div className={styles.mobileTableContainer}>
      <div className={styles.mobileTableTopCard}>
        <div className={styles.mobileTableTopCardLeft}>
          <img
            src={data.image ? data.image : defaultUpload}
            className={styles.img}
          ></img>
          <div className={styles.nameContainer}>
            <div className={styles.nameContainerHeading}>{data.firstName}</div>
            <div className={styles.nameContainerSubHeading}>{data.gender}</div>
          </div>
        </div>
        <MoreIcon
          fillColor={colors.primaryLight}
          handleClick={() => handlePopup()}
        />
        {flag && value === index && (
          <div className={styles.popup}>
            {ButtonGroup.includes("play") && (
              <>
                <div
                  className={styles.popupContainer}
                  onClick={() =>
                    handleSelectedValue(
                      "play",
                      data.ailmentId,
                      data.appointmentId
                    )
                  }
                >
                  {Messages.includes("Start Appointment") ? (
                    <PlayIcon
                      fillColor={colors.thursaryLight}
                      customClass={styles.popupIcon}
                    />
                  ) : (
                    <PlayOn
                      fillColor={colors.thursaryLight}
                      customClass={styles.popupIcon}
                    />
                  )}
                  {/* Start Appointment */}
                  {Messages[0]}
                </div>
                <Divider />
              </>
            )}
            {ButtonGroup.includes("file") && (
              <>
                <div
                  className={styles.popupContainer}
                  onClick={() => handleSelectedValue(Messages[1])}
                >
                  <Pdf
                    fillColor={colors.thursaryLight}
                    customClass={styles.popupIcon}
                  />
                  {/* Report */}
                  {Messages[1]}
                </div>
                {ButtonGroup.length > 2 && <Divider />}
              </>
            )}
            {ButtonGroup.includes("delete") && (
              <div
                className={styles.popupContainer}
                onClick={() =>
                  handleSelectedValue("delete", data.appointmentId)
                }
              >
                <Delete
                  fillColor={colors.thursaryLight}
                  customClass={styles.popupIcon}
                />
                {/* Delete Appointment */}
                {Messages[2]}
              </div>
            )}

            {ButtonGroup.includes("past") && (
              <>
                <div
                  className={styles.popupContainer}
                  onClick={() => handleSelectedValue(Messages[0])}
                >
                  {Messages[0]}
                </div>
                <Divider />
                <div
                  className={styles.popupContainer}
                  onClick={() => handleSelectedValue(Messages[1])}
                >
                  {Messages[1]}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.mobileTableBottonCard}>
        <div className={styles.mobileTableBottonCardChild}>
          <PhoneIcon
            fillColor={colors.secondaryBlur2}
            customClass={styles.iconClass}
          />
          {data.mobileNo}
        </div>
        <div className={styles.mobileTableBottonCardChild}>
          <CalenderIcon
            fillColor={colors.secondaryBlur2}
            customClass={styles.iconClass}
          />
          {data.appointmentDate &&
            moment(data.appointmentDate).format("DD-MM-yyyy")}
        </div>
        <div className={styles.mobileTableBottonCardChild}>
          <TimerIcon
            fillColor={colors.secondaryBlur2}
            customClass={styles.iconClass}
          />
          {/* {data.appointmentTime && moment(data.appointmentTime).format("HH:MM")} */}
          {data.appointmentTime}
        </div>
      </div>
    </div>
  );
};

export default MobileTableCard;
