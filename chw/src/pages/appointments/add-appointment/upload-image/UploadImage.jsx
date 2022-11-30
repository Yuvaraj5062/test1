import { useState } from "react";
import DragDropFile from "../../../../component/drag-drop/DragDropFile";
import styles from "./uploadimage.module.scss";
const UploadImage = ({
  customclasss,
  images,
  setImgList,
  imgList,
  customClass,
}) => {
  const [files, setFiles] = useState({});
  const [validationValue, setValidationValue] = useState(1);
  const dummyArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ];

  return (
    <>
      <div className={[styles.imageContainer, customclasss].join(" ")}>
        <div className={[styles.photos, images].join(" ")}>
          
         {dummyArray.map((item, index) => {
                return (
                  <DragDropFile
                    key={item}
                    name={"identitycard" + index}
                    index={index}
                    files={files}
                    setFiles={setFiles}
                    active={true}
                    filetype="PDF,PNG,JPEG,JPG max size upto 2MB"
                    setValidationValue={setValidationValue}
                    validationValue={validationValue}
                    setImgList={setImgList}
                    imgList={imgList}
                    customClass={customClass}
                  />
                );
              })}
        </div>
      </div>
    
    </>
  );
};
export default UploadImage;
