import React from "react";
import { CloseIcon, ImageIcon } from "../svg-component";
import styles from "./uploadbox.module.scss";
import { colors } from "../constants/Colors";
const UploadBox = ({
  files,
  name,
  index,
  setValidationValue,
  setFiles,
  setImgList,
  imgList,
  customClass,
}) => {
  setValidationValue(Object.keys(files).length);
  const handleFile = () => {
    setFiles({ ...files, [name]: null });
    setImgList([
      ...imgList.slice(0, index),
      ...imgList.slice(index + 1, imgList.length),
    ]);
    // setImgList({...imgList,[name]:null})
  };
  return (
    <div className={[styles.boxContainer, customClass].join(" ")}>
      {files[name] ? (
        <>
          <img
            src={URL.createObjectURL(files[name])}
            alt="profile pic"
            className={styles.profileImage}
          />
          <CloseIcon
            handleClick={() => handleFile()}
            fillcolor={colors.white}
            height={3}
            width={3}
            customClass={styles.crossIcon}
          />
        </>
      ) : (
        <ImageIcon customClass={styles.headerIcon} />
      )}
    </div>
  );
};

export default UploadBox;
