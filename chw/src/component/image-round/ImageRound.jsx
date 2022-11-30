import React from 'react'
import { EditIcon } from '../svg-component';
import styles from "./imageround.module.scss";
import { colors } from '../constants/Colors';
const ImageRound = ({ path, customClass, imgClick,handleClick }) => {
//  const handleImgClick=()=>{
//   hiddenFileInput.current.click();
//  }
  return (
    <>
      <div className={[styles.boxContainer].join('')}>
        <img src={path} alt="logo" className={customClass} onClick={()=>handleClick()} />
        {imgClick && 
          <EditIcon 
          fillColor={colors.white} 
          customClass={styles.crossIcon}
          handleClick={() => handleClick()}/>

        
        }
      </div>

    </>
  )
}

export default ImageRound