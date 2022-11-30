import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { colors } from "../constants/Colors";
import { DropdownIcon } from "../svg-component";
import styles from "./selectdoctordropdown.module.scss";
const SelectDoctorDropDown = ({
  customclassContainer,
  customclass,
  label,
  customclassInputType,
  placeholder,
  type,
  value,
  handelChange,
  customClassItem,
  customIcon,
  customDropdownClass,
  readOnly,
  doctorData,
  setDoctorId,
  errors,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const ref = useRef();
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
  //   const doctorData = [
  //     {
  //       title: "Select Doctor",
  //     },
  //     {
  //       title: "Test Doctor",
  //     },
  //     {
  //       title: "Other",
  //     },
  //   ];
  const handleDoctorDetails = (item) => {
    handelChange(item.fullName);
    setDoctorId(item.doctorId);
  };
  return (
    <>
      <div
        className={[styles.textfieldContainer, customclassContainer].join(" ")}
        ref={ref}
        onClick={() => setIsDropdown((prevState) => !prevState)}
      >
        <label className={[styles.label, customclass].join(" ")}>{label}</label>
        <input
          type={type}
          className={[
            value && value.length > 24
              ? styles.inputTypelength
              : styles.inputType,
            customclassInputType,
          ].join(" ")}
          placeholder={placeholder}
          value={value ? value : ""}
          onChange={(e) => handelChange(e.target.value)}
          readOnly={readOnly}
        />
        <DropdownIcon
          fillColor={colors.secondaryBlur}
          customClass={[styles.expandIcon, customIcon].join(" ")}
        />
        {isDropdown && (
          <div className={[styles.dropdown, customDropdownClass].join(" ")}>
            {doctorData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={[customClassItem, styles.dropdownItem].join(" ")}
                  onClick={() => handleDoctorDetails(item)}
                >
                  {item.fullName}
                </div>
              );
            })}

            {/* 
<option
                  onClick={() => handelChange(item.doctorId)}
                  key={index}
                  value={item.doctorId}
                >
                  {item.fullName}
                </option> */}
          </div>
        )}
        {errors && <span className={styles.error}>{errors}</span>}
      </div>
    </>
  );
};
export default SelectDoctorDropDown;
