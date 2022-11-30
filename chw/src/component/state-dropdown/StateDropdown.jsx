import React, { useState, useRef, useEffect } from "react";
import { DropdownIcon } from "../svg-component";
import styles from "./statedropdown.module.scss";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getCity,
  getState,
  getStateByName,
  getCityByName,
  getCountry,
  getCountryByName
} from "../../redux/features/common/actions";
const StateDropdown = ({
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
  setCity,
  // countryIso,
  setSelectedCountryId,
  selectedCountryId,
  setCoutryIso,
  setState,
  setSelectedCityId
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
    // dispatch(getState(selectedCountryId));
    dispatch(getCountry())
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (name === "country") {
        if (value &&value.length > 1) {
          dispatch(getCountryByName(value))

        }
        else {
          dispatch(getCountry(selectedCountryId))
        }
      }
      else if (name === "state") {
        if (value&& value.length > 1) {
          dispatch(getStateByName({ StateName: value, CountryId: selectedCountryId }))

        }
        else {
          dispatch(getState(selectedCountryId))
        }
      }
      else if (name === "city" && value) {
        if (value) {
          dispatch(
            getCityByName({ CityName: value, StateId: selectedStateId })
          );
        } else {
          dispatch(getCity(selectedStateId));
        }
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleStateChange = (item) => {
    if (name === "country") {
      setCoutryIso(item.iso)
      setSelectedCountryId(item.countryId);
      handelChange(item.countryName);
      setState('')
      setSelectedStateId('')
      dispatch(getState(item.countryId));

    }
    else if (name === "state") {
      setCity("");
      handelChange(item.stateName);
      setSelectedStateId(item.stateId);
      dispatch(getCity(item.stateId));
    } else if (name === "city") {
      handelChange(item.cityName);
      setSelectedCityId(item.cityId)
    }

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
        className={[
          value && value.length > 24
            ? styles.inputTypelength
            : styles.inputType,
          customclassInputType,
        ].join(" ")}
        placeholder={placeholder}
        value={value ? value : ""}
        onChange={(e) => handelChange(e.target.value.trimLeft())}
      // handelChange(e.target.value.trimLeft())}
      />

      <DropdownIcon
        fillColor={colors.secondaryBlur}
        customClass={[styles.expandIcon, customIcon].join(" ")}
      // handleClick={() => setIsDropdown((prevState) => !prevState)}
      />
      {/* } */}
      {isDropdown && name === "country" && records.country.length > 0 && (
        <div className={[styles.dropdown, customDropdownClass].join(" ")}>
          {records.country.length > 0 &&
            records.country.map((item, index) => {
              return (
                <div
                  key={index}
                  className={[customClassItem, styles.dropdownItem].join(" ")}
                  onClick={() => handleStateChange(item)}
                >
                  {item.countryName}
                </div>
              );
            })}
        </div>
      )}
      {isDropdown && name === "state" && records.state.length > 0 && (
        <div className={[styles.dropdown, customDropdownClass].join(" ")}>
          {records.state.length > 0 &&
            records.state.map((item, index) => {
              return (
                <div
                  key={index}
                  className={[customClassItem, styles.dropdownItem].join(" ")}
                  onClick={() => handleStateChange(item)}
                >
                  {item.stateName}
                </div>
              );
            })}
        </div>
      )}
      {isDropdown && name === "city" && records.city.length > 0 && (
        <div className={[styles.dropdown, customDropdownClass].join(" ")}>
          {records.city.length > 0 &&
            records.city.map((item, index) => {
              return (
                <div
                  key={index}
                  className={[customClassItem, styles.dropdownItem].join(" ")}
                  onClick={() => handleStateChange(item)}
                >
                  {item.cityName}
                </div>
              );
            })}
        </div>
      )}

      {errors && <span className={styles.error}>{errors}</span>}
    </div>
  );
};

export default StateDropdown;
