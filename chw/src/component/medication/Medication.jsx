import React, { useState, useRef, useEffect } from "react";
import { DropdownIcon } from "../svg-component";
import styles from "./medication.module.scss";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedication,
  getState,
  getStateByName,
} from "../../redux/features/common/actions";
const Medication = ({
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
  setSelectedStateId,
  selectedStateId,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  let records = useSelector((state) => state.Common || []);
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
    dispatch(getMedication());
  }, []);

  const handleStateChange = (item) => {
    if (name === "medication") {
      handelChange(item.medicineName);
      setSelectedStateId(item.medicineId);
    }
  };

  return (
    <div
      className={[styles.textfieldContainer, customclassContainer].join(" ")}
      ref={ref}
      // onClick={() => setIsDropdown((prevState) => !prevState)}
    >
      <label className={[styles.label, customclass].join(" ")}>{label}</label>
      <input
        type={type}
        className={[styles.inputType, customclassInputType].join(" ")}
        placeholder={placeholder}
        value={value ? value : ""}
        onClick={() => setIsDropdown((prevState) => !prevState)}
        // onChange={(e) => handelChange(e.target.value.trimLeft())}
      />
      <DropdownIcon
        fillColor={colors.secondaryBlur}
        customClass={[styles.expandIcon, customIcon].join(" ")}
      />
      {/* } */}
      {isDropdown && name === "medication" && records.medication.length > 0 && (
        <div className={[styles.dropdown, customDropdownClass].join(" ")}>
          {records.medication.length > 0 &&
            records.medication.map((item, index) => {
              return (
                <div
                  key={index}
                  className={[customClassItem, styles.dropdownItem].join(" ")}
                  onClick={() => {
                    handleStateChange(item);
                    setIsDropdown((prevState) => !prevState);
                  }}
                >
                  {item.medicineName}
                </div>
              );
            })}
        </div>
      )}

      {errors && <span className={styles.error}>{errors}</span>}
    </div>
  );
};

export default Medication;
