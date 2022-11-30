import styles from "./uploadfile.module.scss";
import { useState, useRef, useEffect } from "react";
import defaultUpload from '../../assets/images/defaultUpload.png'
import Button from "../Button/Button";
import ImageRound from "../image-round/ImageRound";
const UploadFile = ({
  buttonStyle,
  browseContent,
  browseFile,
  selectedFileText,
  customClass,
  customImageClass,
  imgClick,
  customError,
  img,
  setImg,
}) => {
  const hiddenFileInput = useRef(null);
  const [selectFile,setSelectFile]=useState('')
  const [image, setImage] = useState();
  const getBase64 = file => {
    return new Promise(resolve => {
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

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {    
    setSelectFile()
    if (image) {
      let strings = image.split(",");
      switch (strings[0]) {//check image's extension
        case "data:image/jpeg;base64":
          setImg({
            value: image,
            message: ""
          })
          break;
        case "data:image/png;base64":
          setImg({
            value: image,
            message: ""
          })
          break;
        case "data:image/jpg;base64":
          setImg({
            value: image,
            message: ""
          })
          break;
        default:
          //write error messages here
          break;
      }
    }
  }, [image,selectFile])
  return (
    // onClick={() => handleClick()}
    <div className={[styles.uploadContainer, customClass].join(" ")} >
      {/*
       <img src={img.value?img.value:defaultUpload} alt="logo" className={customImageClass} />
       
       */}
      <ImageRound path={img.value ? img.value : defaultUpload}
        customClass={customImageClass}
        imgClick={imgClick ? imgClick : false}
        handleClick={() => handleClick()}
         hiddenFileInput={hiddenFileInput} 
        />
      {!imgClick && <Button title="File Upload" customclass={buttonStyle}
        titleCustomclass={styles.titleCustomclass}
        handleClick={() => handleClick()} />
      }
      <input
        type="file"
        // accept="image/*"
        accept=".jpeg, .jpg, .png"
        ref={hiddenFileInput}
        style={{ display: "none" }}
        onChange={async (e) => {
          e.preventDefault()
          if (e.target.files[0]) {
             setSelectFile( e.target.files[0].name)
            let base64 = await getBase64(e.target.files[0]);
            e.target.value=null
            setImage(base64)
          }
        }
        }
      />
      {/* {img.message && <span className={customError}>{img.message}</span>}   */}
      {!imgClick && <span className={customError}>Only .jpg .png .jpeg allowed</span>

      }</div>
  );
};

export default UploadFile;
