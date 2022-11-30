import React from "react";
import { CloseIcon, SearchFiledIcon, SearchIcon } from "../svg-component";
import styles from "./searchbuttons.module.scss";
import { colors } from "../../component/constants/Colors";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import Divider from "../divider/Divider";
import {  useSelector } from 'react-redux';
const SearchButtons = ({
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
    if (slectedButton.some((item) => item.symptomName === data.symptomName)) {
      setSelectedButton((names) =>
        names.filter((name) => name.symptomName !== data.symptomName)
      );
    } else {
      setSelectedButton((state) => [
        ...state,
        {
          symptomId: data.symptomId ? data.symptomId : 0,
          symptomName: data.symptomName,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trimLeft()) {
      if (buttons.some((item) => item.symptomName.toLowerCase() === e.target.value.toLowerCase())) {
        if (!slectedButton.some((item) => item.symptomName === e.target.value))
        
          setSelectedButton((state) => [
            ...state,
            {
              symptomId: 0,
              symptomName: e.target.value,
            },
          ]);
      } else {
      
        
        setNewButton((state) => [
          ...state,
          {
            symptomId: 0,
            symptomName: e.target.value,
          },
        ]);

        setButtonList((state) => [
          ...buttons,
          {
            symptomId: 0,
            symptomName: e.target.value,
          },
        ]);
        setSelectedButton((state) => [
          ...state,
          {
            symptomId: 0,
            symptomName: e.target.value,
          },
        ]);
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
            
            <Button
              key={index}
              title={item.symptomName}
              type="button"
              customclass={
                slectedButton &&
                slectedButton.some(
                  (data) => data.symptomName === item.symptomName
                )
                  ? styles.selectedButtons
                  : styles.buttons
              }
              titleCustomclass={styles.titleCustomclass}
              handleClick={() => handleSelect(item)}
              crossIcon={  newButton.some(
                (data) => data.symptomName === item.symptomName
              ) && buttons.includes(item)?true:false}
              slectedButton={slectedButton}
              setSelectedButton={setSelectedButton}
              setButtonList={setButtonList}
              item={item}
            />
        
            
          );
        })}
      </div>
    </div>
  );
};

export default SearchButtons;
