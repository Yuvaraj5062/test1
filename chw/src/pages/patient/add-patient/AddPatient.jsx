import React, { useState, useEffect, useRef } from "react";
import Button from "../../../component/Button/Button";
import Divider from "../../../component/divider/Divider";
import SearchButtons from "../../../component/search-buttons/SearchButtons";
import TextField from "../../../component/TextField/TextField";
import UploadFile from "../../../component/upload-file/UploadFile";
import styles from "./addpatient.module.scss";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { CalenderIcon } from "../../../component/svg-component";
import { colors } from "../../../component/constants/Colors";
import "../../../styles/libraries.css";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/use-form/useForm";
import { getSymptomsList, setPatient, setPatientsMessages, } from "../../../redux/features/patients/actions";
import SearchDropdown from "../../../component/search-dropdown/SearchDropdown";
import scrollToTop from "../../../component/scroll-up/ScrollToTop";
import DatePickerComponent from "../../../component/date-picker/DatePickerComponent";
import StateDropdown from "../../../component/state-dropdown/StateDropdown";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import GenderDropDown from "../../../component/gender-dropdown/GenderDropDown";
import PopUp from "../../../component/popup/PopUp";
import MessagePopup from "../../../component/message-popup/MessagePopup";
const AddPatient = () => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dateRef = useRef(null);
  const [buttons, setButtons] = useState([]);
  const [slectedButton, setSelectedButton] = useState([]);
  const [newButton, setNewButton] = useState([]);
  let records = useSelector((state) => state.Patient || []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [img, setImg] = useState({ value: "", message: "" });
  const [fPhonVal, setFPhonVal] = useState("");
  const [secPhonVal, setSecPhonVal] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidSecPhone, setIsValidSecPhone] = useState(false);
  const [countryIso, setCoutryIso] = useState();
  const [popup, setPopUp] = useState(false);
  let NewErrr = "please enter  phone number";
  const [selectedStateId, setSelectedStateId] = useState();
  const [selectedCountryId, setSelectedCountryId] = useState();
  const [selectedCityId, setSelectedCityId] = useState();
  const dispatch = useDispatch();
  const { handleSubmit, handleChange, data, errors, setData, setErrors } =
    useForm({
      //ref: ref,
      validations: {
        address: {
          required: { value: true, message: "Please enter your address", },
        },
        email: {
          required: { value: true, message: "Please enter your email id", },
          pattern: {
            value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: "Please enter valid email id",
          },
        },
      },
      isSubmit: isSubmit,
      setIsSubmit: setIsSubmit,
      onSubmit: () => handleSubmitForm(data),
    });
  const handleSubmitForm = (data) => {
    scrollToTop();
    let isOk = true;
    if (!fPhonVal) {
      isOk = false;
      setIsValidPhone(true);
    }
    if (fPhonVal) {
      if (!isPossiblePhoneNumber(fPhonVal)) {
        isOk = false;
        setIsValidPhone(true);
        NewErrr = "please enter a valid phone number";
      }
      else if (fPhonVal.length < 13 && countryIso==="IN") {
        isOk = false;
        setIsValidPhone(true);
        NewErrr = "please enter a valid phone number";
      }
    }
    if (secPhonVal) {
      if (!isPossiblePhoneNumber(secPhonVal)) {
        isOk = false;
        setIsValidSecPhone(true);
        NewErrr = "please enter a valid phone number";
      } else if (secPhonVal.length < 13 && countryIso==="IN") {
        isOk = false;
        setIsValidSecPhone(true);
        NewErrr = "please enter a valid phone number";
      }
    }

    const payload = {
      //AilmentId: 0,
      patientRequestDTO: {
        // patientId: 0,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: startDate,
        email: data.email,
        mobileNo: fPhonVal,
        alternateMobileNo: secPhonVal,
        address: data.address,
        streetLandMark: data.landmark,
        countryId: selectedCountryId,
        stateId: selectedStateId,
        cityId: selectedCityId,
        // state: state,
        // city: city,
        pincode: data.pinCode,
        image: img.value,
        imagePath: "string",
        isActive: true,
        isDelete: false,
        createdBy: auth.user.userId,
      },
      symptomRequestDTOs: slectedButton, //array of object
      ailmentImageRequestDTOs: [], //array of object
    };

    if (firstName && lastName && startDate && state && city) {
      if (isOk) {
        dispatch(setPatient(payload));
      }
    }
    // setTimeout(() => {
    //   dispatch(setPatientsMessages());
    //   if (records.status === 200) {
    //     navigate("/appointments/add-appointment", {
    //       state: {
    //         ailmentId: records.patient.ailmentId,
    //         patientId: records.patient.patientId,
    //       },
    //     });
    //   }
    // }, 2000);
  };

  useEffect(() => {
    dispatch(getSymptomsList(0));
  }, []);
  useEffect(() => {
    if (records.status === 200 && isSubmit) {
      setPopUp(true)
    }
    else if (records.status === 417 && isSubmit) {
      setPopUp(true)
    }

    setTimeout(() => {
      dispatch(setPatientsMessages());
      if (records.status === 200 && isSubmit) {
        navigate("/appointments/add-appointment", {
          state: {
            ailmentId: records.patient.ailmentId,
            patientId: records.patient.patientId,
          },
        });
      }
    }, 2000);

    // dispatch(setPatientsMessages());

  }, [records.status]);
  const handleDatePicker = () => {
    dateRef.current.setOpen(true);
  };
  const handleReset = () => {
    scrollToTop();
    setErrors({});
    setData({});
    setStartDate("")
    setData({
      gender: "",
      state: "",
      city: "",
      mobileNumber: "",
      alternateContact: "",
      pinCode: "",
      address: "",
      landmark: "",
      email: "",
    });
    setFirstName();
    setLastName();
    setState();
    setCountry();
    setCity();
    setImg({ value: "", message: "" });
    setIsSubmit(false);
  };

  const firstPhoneChange = (e) => {
    setIsValidPhone(false);
    setFPhonVal(e);
    handleChange("mobileNumber");
  };

  const secPhoneChange = (e) => {
    setIsValidSecPhone(false);
    handleChange("alternateContact");
    if (e) {
      setSecPhonVal(e);
    } else if (e === undefined) {
      setSecPhonVal("");
    }
  };
  const handlePopupClose = () => {
    setPopUp(!popup);
  };

  return (
    <div className={styles.addPatientContainer}>
      {popup && (
        <PopUp
          Children={MessagePopup}
          handleClose={() => handlePopupClose()}
          type={records.status === 200?"Successful":"Unsuccessful"}
          message={records.message}
        />
      )}
      <div className={styles.addPatientBody}>
        <div className={styles.addPatientFileUpload}>
          <div className={styles.addPatientFileUploadTitle}>
            Add New Patient
          </div>
          <Divider />
          <UploadFile
            selectedFileText=""
            buttonStyle={styles.fileInputBtn}
            buttonText="File Upload"
            customClass={styles.addPatientFileUploadFile}
            customImageClass={styles.imageClass}
            type="button"
            customError={styles.imgError}
            setImg={setImg}
            img={img}
          />
          {/* {!img.value && isSubmit &&
             <span className={styles.error}>Please upload image</span>
          } */}
        </div>
        <div className={styles.addPatientForm}>
          <div className={styles.addPatientFormTitle}>Patient Information</div>
          <Divider />
          <div className={styles.form}>
            {/* <span
              className={
                records.status === 200
                  ? styles.responseMessage
                  : styles.responseErrorMessage
              }
            >
              {records.message}
            </span> */}
            <div className={styles.addPatientType}>
              <SearchDropdown
                type="text"
                label="First Name"
                placeholder="First Name"
                customclass={styles.firstNameInputField}
                customclassInputType={
                  !firstName && isSubmit ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainer}
                name="firstName"
                value={firstName}
                handelChange={setFirstName}
                setLastName={setLastName}
                errors={
                  firstName
                    ? firstName.length < 2 &&
                    isSubmit &&
                    "Please enter more than one character your first name"
                    : isSubmit && "Please enter or select your first name"
                }
              />
              <SearchDropdown
                type="text"
                label="Last Name"
                placeholder="Last Name"
                customclass={styles.firstNameInputField}
                setLastName={setLastName}
                customclassInputType={
                  !lastName && isSubmit ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainer}
                name="lastName"
                value={lastName}
                handelChange={setLastName}
                errors={
                  lastName
                    ? lastName.length < 2 &&
                    isSubmit &&
                    "Please enter more than one character your last name"
                    : isSubmit && "Please enter or select your last name"
                }
              />
            </div>
            <div className={styles.addPatientType}>

              <GenderDropDown
                type="text"
                label="Gender"
                placeholder="Select Gender"
                customclass={styles.firstNameInputField}
                customIcon={styles.icon}
                customclassContainer={styles.customclassContainerDrodown}
                customclassInputType={
                  !gender && isSubmit ? styles.inputError : styles.input
                }
                customDropdownClass={styles.customDropdown}
                value={gender}
                readOnly={true}
                handelChange={setGender}
                errors={!gender && isSubmit && "Please select Gender"}
              />

              <div className={styles.datePickerContainerMain}>
                <span className={styles.label}>Date of Birth</span>
                <div
                  className={
                    !startDate && isSubmit
                      ? styles.datePickerContainerError
                      : styles.datePickerContainer
                  }
                >
                  <DatePickerComponent
                    reference={dateRef}
                    startDate={startDate}
                    setStartDate={setStartDate}
                  />
                  <CalenderIcon
                    fillColor={colors.secondaryBlur}
                    handleClick={() => handleDatePicker()}
                    customClass={styles.iconContainer}
                  />
                </div>
                {!startDate && isSubmit && (
                  <span className={styles.error}>
                    Please select date of birth
                  </span>
                )}
              </div>
              <TextField
                type="text"
                label="Email"
                placeholder="Email"
                customclass={styles.firstNameInputField}
                customclassInputType={
                  errors.email ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainerDrodown}
                name="email"
                value={data.email}
                handelChange={handleChange("email")}
                errors={errors.email}
              />
            </div>
            <div className={styles.addPatientType}>
              <TextField
                type="text"
                label="Address"
                placeholder="Address"
                customclass={styles.firstNameInputField}
                customclassInputType={
                  errors.address ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainer}
                name="address"
                value={data.address}
                handelChange={handleChange("address")}
                errors={errors.address}
              />
              <TextField
                type="text"
                label="Street / Landmark"
                placeholder="Street / Landmark"
                customclass={styles.firstNameInputField}
                customclassInputType={
                  errors.landmark ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainer}
                name="landmark"
                value={data.landmark}
                handelChange={handleChange("landmark")}
                errors={errors.landmark}
              />
            </div>
            <div className={styles.addPatientType}>
              <StateDropdown
                type="text"
                label="Country"
                placeholder="Select Country"
                // countryIso={countryIso}
                setCoutryIso={setCoutryIso}
                customclass={styles.firstNameInputField}
                customclassInputType={
                  !country && isSubmit ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainerDrodown}
                customDropdownClass={styles.customDropdown}
                name="country"
                value={country}
                handelChange={setCountry}
                setSelectedStateId={setSelectedStateId}
                selectedStateId={selectedStateId}
                setSelectedCountryId={setSelectedCountryId}
                selectedCountryId={selectedCountryId}
                setCity={setCity}
                setSelectedCityId={setSelectedCityId}
                setState={setState}
                errors={!country && isSubmit && "Please select country"}
              />
              <StateDropdown
                type="text"
                label="State"
                placeholder="Select State"
                // countryCode={countryCode}
                customclass={styles.firstNameInputField}
                customclassInputType={
                  !state && isSubmit ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainerDrodown}
                customDropdownClass={styles.customDropdown}
                name="state"
                value={state}
                handelChange={setState}
                setSelectedStateId={setSelectedStateId}
                selectedStateId={selectedStateId}
                setSelectedCountryId={setSelectedCountryId}
                selectedCountryId={selectedCountryId}
                setSelectedCityId={setSelectedCityId}
                setCity={setCity}
                errors={!state && isSubmit && "Please select state"}
              />
              <StateDropdown
                type="text"
                label="Town/City"
                placeholder="Select Town/City"
                // countryCode={countryCode}
                customclass={styles.firstNameInputField}
                customDropdownClass={styles.customDropdown}
                setSelectedCountryId={setSelectedCountryId}
                selectedCountryId={selectedCountryId}
                setSelectedCityId={setSelectedCityId}
                customclassInputType={
                  !city && isSubmit ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainerDrodown}
                name="city"
                value={city}
                handelChange={setCity}
                setCity={setCity}
                // customIcon={styles.customIcon}
                setSelectedStateId={setSelectedStateId}
                selectedStateId={selectedStateId}
                errors={!city && isSubmit && "Please select town/city"}
              />
            </div>
            <div className={styles.addPatientType}>
              <TextField
                type="text"
                label="Pin code"
                placeholder="Pin code"
                customclass={styles.firstNameInputField}
                customclassInputType={
                  errors.pinCode ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainerDrodown}
                name="pinCode"
                value={data.pinCode}
                handelChange={handleChange("pinCode")}
                errors={errors.pinCode}
              />
              <TextField
                type="tel"
                label="Primary Number"
                placeholder="Primary Number"
                countryIso={countryIso}
                customclass={styles.firstNameInputField}
                customclassContainer={styles.customclassContainerDrodown}
                customclassInputType={
                  errors.mobileNumber ? styles.inputError : styles.input
                }
                name="mobileNumber"
                value={fPhonVal}
                handelChange={firstPhoneChange}
                errors={
                  !fPhonVal && isSubmit
                    ? "Please enter Primary number"
                    : isValidPhone
                      ? NewErrr
                      : null
                }
              />
              <TextField
                type="tel"
                label="Secondary Number"
                placeholder="Secondary Number"
                countryIso={countryIso}
                customclass={styles.firstNameInputField}
                customclassInputType={
                  errors.alternateContact ? styles.inputError : styles.input
                }
                customclassContainer={styles.customclassContainerDrodown}
                name="alternateContact"
                value={secPhonVal}
                handelChange={secPhoneChange}
                errors={isValidSecPhone ? NewErrr : null}
              />
            </div>
            <div className={styles.medicalHistory}>Symptoms </div>
            {records.symptoms.length > 0 ? (
              <SearchButtons
                placeholderText="search"
                custominputClass={styles.input}
                buttons={buttons.length > 0 ? buttons : records.symptoms}
                setButtonList={setButtons}
                slectedButton={slectedButton}
                setSelectedButton={setSelectedButton}
                newButton={newButton}
                setNewButton={setNewButton}
              />
            ) : (
              <SearchButtons
                placeholderText="search"
                custominputClass={styles.input}
                buttons={buttons.length > 0 ? buttons : records.symptoms}
                setButtonList={setButtons}
                slectedButton={slectedButton}
                setSelectedButton={setSelectedButton}
                newButton={newButton}
                setNewButton={setNewButton}
              />
            )}
            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                title="Add New Patient"
                customclass={styles.submitButton}
                handleClick={() => {
                  handleSubmit();
                }}
                loader={records.loading}
              />
              <Button
                type="button"
                title="Reset"
                customclass={styles.resetButton}
                handleClick={() => handleReset()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
