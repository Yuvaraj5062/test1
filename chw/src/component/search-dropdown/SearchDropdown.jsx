import React, { useState, useRef, useEffect } from "react";
import { DropdownIcon } from "../svg-component";
import styles from "./searchdropdown.module.scss";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getFirstNamesList,
  getLastNamesList,
} from "../../redux/features/patients/actions";
import { getPatienByName, getDoctorNamesList } from '../../redux/features/appointments/actions'
const SearchDropdown = ({
  customclassContainer,
  customclass,
  label,
  customclassInputType,
  placeholder,
  type,
  value,
  handelChange,
  errors,
  customClassItem,
  name,
  customIcon,
  customDropdownClass,
  setPatientData,
  setLastName

}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  let records = useSelector((state) => state.Patient || []);
  const [firstNames, setFirstNames] = useState([]);
  const [lastNames, setLastNames] = useState([]);
  const ref = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkIfisDropdownedOutside = (e) => {
      if (isDropdown && ref.current && !ref.current.contains(e.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfisDropdownedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfisDropdownedOutside);
    };
  }, [isDropdown]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (name === "firstName") {    
        if(value&&value.length>1){
          // dispatch(getFirstNamesList(''));
          dispatch(getFirstNamesList(value));
          if(records.patientFirstNames.length>0){
            setFirstNames(records.patientFirstNames);
          }else{
            setFirstNames([]);
          }
          
          dispatch(getLastNamesList(value));
          setLastNames(records.patientLastNames);
        }else{
           dispatch(getLastNamesList(''));
           setLastNames(records.patientLastNames);
        }
      }  
      // Send Axios request here
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [value]);
  useEffect(() => {
    if(records.patientFirstNames.length>0){
      setFirstNames(records.patientFirstNames);
    }else{
      setFirstNames([]);
    }
  }, [records.patientFirstNames]);
  useEffect(() => {
    setLastNames(records.patientLastNames);
  }, [records.patientLastNames]);

  const handleLastNameChange = (item) => {
    dispatch(getPatienByName(item.patientId))
    handelChange(item.lastName)
    if(setPatientData){ setPatientData(item.patientId)}
  }
  const handleFirstNameChange = (item) => {
    dispatch(getLastNamesList(item));
    handelChange(item.firstName)
    setLastNames(records.patientLastNames);
    setLastName('')
  }
  return (
    <div
      className={[styles.textfieldContainer, customclassContainer].join(" ")}
      ref={ref}
      onClick={() => setIsDropdown((prevState) => !prevState)}
    >
      <label className={[styles.label, customclass].join(" ")}>{label}</label>
      <input
        type={type}
        className={[styles.inputType, customclassInputType].join(" ")}
        placeholder={placeholder}
        value={value ? value : ""}
        onChange={(e) => handelChange(e.target.value.trimLeft())}
      />
      {/* {data.length > 0 && */}
      <DropdownIcon
        fillColor={colors.secondaryBlur}
        customClass={[styles.expandIcon, customIcon].join(" ")}
      // handleClick={() => setIsDropdown((prevState) => !prevState)}
      />
      {/* } */}
      {isDropdown && name === "firstName" && firstNames.length > 0 && (
        <div className={[styles.dropdown, customDropdownClass].join(" ")}>
          {firstNames.map((item, index) => {
            return (
              <div
                key={index}
                className={[customClassItem, styles.dropdownItem].join(" ")}
                onClick={() => handleFirstNameChange(item)}
              >
                {item.firstName}
              </div>
            );
          })}
        </div>
      )}
      {isDropdown && name === "lastName" && lastNames.length > 0 && (
        <div className={[styles.dropdown, customDropdownClass].join(" ")}>
          {lastNames.map((item, index) => {
            return (
              <div
                key={index}
                className={[customClassItem, styles.dropdownItem].join(" ")}
                onClick={() => handleLastNameChange(item)}
              >
                {item.lastName}
              </div>
            );
          })}
        </div>
      )}

      {errors && <span className={styles.error}>{errors}</span>}
    </div>
  );
};

export default SearchDropdown;
