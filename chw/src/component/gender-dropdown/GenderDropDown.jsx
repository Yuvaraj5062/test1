import { useEffect, useRef } from "react";
import { useState } from "react";
import { colors } from "../constants/Colors";
import { DropdownIcon } from "../svg-component";
import styles from "./genderdropdown.module.scss";
const GenderDropDown = ({
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
  const data = [
    {
      title: "Male",
    },
    {
      title: "Female",
    },
    {
      title: "Other",
    },
  ];
  const handleGender = (item) => {
    handelChange(item.title);
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
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={[customClassItem, styles.dropdownItem].join(" ")}
                  onClick={() => handleGender(item)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        )}

        {errors && <span className={styles.error}>{errors}</span>}
      </div>
    </>
  );
};
export default GenderDropDown;
