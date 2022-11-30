import { useState } from "react";
import DisplayBox from "./displayBox";
import styles from "./imagebox.module.scss";
const ImageBox = ({
  customclasss,
  images,
  imgList,
  customClass,
  
}) => {
  

  return (
    <>
      <div className={[styles.imageContainer, customclasss].join(" ")}>
        <div className={[styles.photos, images].join(" ")}>
         {imgList.length>0 &&
           imgList.map((item,index) => {
                      return( 
                      <DisplayBox
                       index={index}
                      imgList={imgList}
                      customClass={customClass}
                    />);
                    })} 
         
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default ImageBox;
