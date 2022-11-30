import React from "react";
import { CloseIcon, SearchFiledIcon, SearchIcon } from "../svg-component";
import styles from "./diagnosis.module.scss";
import { colors } from "../../component/constants/Colors";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import Divider from "../divider/Divider";
import {  useSelector } from 'react-redux';
const Diagnosis = ({
  customClass,
  custominputClass,
  placeholderText,
  customSearch,
  buttons,
  setButtonList,
  slectedButton,
  setSelectedButton,
  newButton,
  setNewButton
}) => {
  
  const [seletedData, setSelectedData] = useState("");
  const handleSelect = (data) => {
    if (slectedButton.some((item) => item.diagnosisName === data.diagnosisName)) {
      setSelectedButton((names) =>
        names.filter((name) => name.diagnosisName !== data.diagnosisName)
      );
    } else {
      setSelectedButton((state) => [
        ...state,
        {
          diagnosisId: data.diagnosisId ? data.diagnosisId : 0,
          diagnosisName: data.diagnosisName,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trimLeft()) {
      if (buttons.some((item) => item.diagnosisName.toLowerCase() === e.target.value.toLowerCase())) {
        if (!slectedButton.some((item) => item.diagnosisName === e.target.value))
        
          setSelectedButton((state) => [
            ...state,
            {
              diagnosisId: 0,
              diagnosisName: e.target.value,
            },
          ]);
      } else {
      
        
        setNewButton((state) => [
          ...state,
          {
            diagnosisId: 0,
            diagnosisName: e.target.value,
          },
        ]);

        setButtonList((state) => [
          ...buttons,
          {
            diagnosisId: 0,
            diagnosisName: e.target.value,
          },
        ]);
        if(slectedButton){
        setSelectedButton((state) => [
          ...state,
          {
            diagnosisId: 0,
            diagnosisName: e.target.value,
          },
        ]);
      }
      }
      setSelectedData("");
    }
  };
  useEffect(() => {
    setButtonList(buttons);
  }, []);
  const handleReset = () => {
    setSelectedData("");
  };

  

  return (
    <div className={[styles.searchButtonsComponet, customClass].join(" ")}>
      <div className={[styles.searchField, customSearch].join(" ")}>
        <SearchFiledIcon fillColor={colors.secondaryBlur} />
        <input
          type="text"
          placeholder={placeholderText}
          value={seletedData}
          className={[styles.input, custominputClass].join(" ")}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSelectedData(e.target.value)}
        />

        <CloseIcon
          customClass={styles.closeButtonCustomClass}
          fillcolor={colors.secondaryBlur}
          handleClick={() => {
            handleReset();
          }}
        />
      </div>
      <Divider customClass={styles.divider} />
      <div className={styles.buttonsGroup}>
        {buttons.map((item, index) => {
      
          return (
            <React.Fragment key={index}>
            <Button
              // key={index}
              title={item.diagnosisName}
              type="button"
              customclass={
                slectedButton &&
                slectedButton.some(
                  (data) => data.diagnosisName === item.diagnosisName
                )
                  ? styles.selectedButtons
                  : styles.buttons
              }
              titleCustomclass={styles.titleCustomclass}
              handleClick={() => handleSelect(item)}
              crossIcon={  newButton.some(
                (data) => data.diagnosisName === item.diagnosisName
              ) && buttons.includes(item)?true:false}
              slectedButton={slectedButton}
              setSelectedButton={setSelectedButton}
              setButtonList={setButtonList}
              item={item}
            />
        
        </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};


export default Diagnosis;
