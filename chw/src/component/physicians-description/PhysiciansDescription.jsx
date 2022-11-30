import React from "react";
import { CloseIcon, SearchFiledIcon, SearchIcon } from "../svg-component";
import styles from "./physiciansdescription.module.scss";
import { colors } from "../../component/constants/Colors";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import Divider from "../divider/Divider";
import {  useSelector } from 'react-redux';
const PhysiciansDescription = ({
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
  // const [defaultButtons, setDefaultButtons] = useState(records);
  let records = useSelector((state) => state.Patient.symptoms || []);
  
  const handleSelect = (data) => {
    if (slectedButton.some((item) => item.problemName === data.problemName)) {
      setSelectedButton((names) =>
        names.filter((name) => name.problemName !== data.problemName)
      );
    } else {
      setSelectedButton((state) => [
        ...state,
        {
          problemId: data.problemId ? data.problemId : 0,
          problemName: data.problemName,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trimLeft()) {
      if (buttons.some((item) => item.problemName.toLowerCase() === e.target.value.toLowerCase())) {
        if (!slectedButton.some((item) => item.problemName === e.target.value))
        
          setSelectedButton((state) => [
            ...state,
            {
              problemId: 0,
              problemName: e.target.value,
            },
          ]);
      } else { 
        setNewButton((state) => [
          ...state,
          {
            problemId: 0,
            problemName: e.target.value,
          },
        ]);

        setButtonList((state) => [
          ...buttons,
          {
            problemId: 0,
            problemName: e.target.value,
          },
        ]);
        if(slectedButton){
        setSelectedButton((state) => [
          ...state,
          {
            problemId: 0,
            problemName: e.target.value,
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
              title={item.problemName}
              type="button"
              customclass={
                slectedButton &&
                slectedButton.some(
                  (data) => data.problemName === item.problemName
                )
                  ? styles.selectedButtons
                  : styles.buttons
              }
              titleCustomclass={styles.titleCustomclass}
              handleClick={() => handleSelect(item)}
              crossIcon={  newButton.some(
                (data) => data.problemName === item.problemName
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




export default PhysiciansDescription;
