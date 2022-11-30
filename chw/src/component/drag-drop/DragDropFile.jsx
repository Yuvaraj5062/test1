import { useState } from "react";
import { useEffect, useRef } from "react";
import { colors } from "../constants/Colors";

// import { Upload } from '../../svg-components';
import MobileScreen from "../mobile/MobileScreen";
import { ImageIcon, MailIcon } from "../svg-component";
import UploadBox from "./UploadBox";
import styles from "./dragdropfile.module.scss";
const DragDropFile = ({
  name,
  files,
  setFiles,
  active,
  index,
  validationValue,
  setValidationValue,
  setImgList,
  imgList,
  filetype,
  customClass,
  readonly
}) => {
  const hiddenFileInput = useRef(null);
  const drop = useRef(null);
  const [click, setClick] = useState(false);
  const [image, setImage] = useState();
  const handleFileChange = (e, item) => {
    setFiles({ ...files, [item]: e.target.files[0] });
  };
  const onUpload = (selectedFile, item) => {
    setFiles({ ...files, [item]: selectedFile });
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setClick(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setClick(false);
    if (index <= validationValue) {
      const { files } = e.dataTransfer;
      if (files && files.length) {
        onUpload(files[0], name);
      }
    }
  };
  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
    drop.current.addEventListener("dragenter", handleDragEnter);
    drop.current.addEventListener("dragleave", handleDragLeave);

    // return () => {
    //     drop.current.removeEventListener("dragover", handleDragOver);
    //     drop.current.removeEventListener("drop", handleDrop);
    //     drop.current.removeEventListener("dragenter", handleDragEnter);
    //     drop.current.removeEventListener("dragleave", handleDragLeave);
    // };
  }, [handleDrop]);

  const handleClick = () => {
    hiddenFileInput.current.click();
    setClick(!click);
  };
  const isMobile = MobileScreen();
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    if (image) {
      let strings = image.split(",");
      switch (
        strings[0] //check image's extension
      ) {
        case "data:image/jpeg;base64":
          setImgList([...imgList, { ["image"]: image }]);
          break;
        case "data:image/png;base64":
          setImgList([...imgList, { ["image"]: image }]);
          break;
        case "data:image/jpg;base64":
          setImgList([...imgList, { ["image"]: image }]);
          break;
        default:
          //write error messages here
          break;
      }
    }
  }, [image]);

  return (
    <div
      className={
        active
          ? click
            ? styles.dragDropFileContainerActiveClick
            : styles.dragDropFileContainerActive
          : styles.dragDropFileContainerDeactive
      }
      ref={drop}
    >
      <span
        className={styles.clickToUpload}
        onClick={() =>
          index <= validationValue && !files[name] ? 
          !readonly && handleClick() : {}
        }
      >
        {/* Click here to Upload   */}
        <UploadBox
          setFiles={setFiles}
          files={files}
          name={name}
          index={index}
          setValidationValue={setValidationValue}
          setImgList={setImgList}
          imgList={imgList}
          customClass={customClass}
        />
      </span>
      {!isMobile && (
        <span className={styles.dragDrop}>{/* or drag and drop */}</span>
      )}
      {/* <div className={styles.validFileTypes}>{filetype}</div> */}

      <input
        type="file"
        accept=".jpeg, .jpg, .png"
        ref={hiddenFileInput}
        // onChange={handleFileChange}
        // onChange={(e) => handleFileChange(e, name)}
        onChange={async (e) => {
          if (e.target.files[0]) {
            //  setSelectFile( e.target.files[0].name)
            let base64 = await getBase64(e.target.files[0]);
            handleFileChange(e, name);
            setImage(base64);
          }
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};
export default DragDropFile;
