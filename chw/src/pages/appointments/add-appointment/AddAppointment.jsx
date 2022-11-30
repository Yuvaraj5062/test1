import styles from "./addappointment.module.scss";
import SubHeader from "../../../component/subheader/SubHeader";
import Button from "../../../component/Button/Button";
import Divider from "../../../component/divider/Divider";
import TextField from "../../../component/TextField/TextField";
import { CalenderIcon } from "../../../component/svg-component";
import { useRef, useState, useEffect } from "react";
import { colors } from "../../../component/constants/Colors";
import SearchButtons from "../../../component/search-buttons/SearchButtons";
import DoctorDetail from "../../../component/doctor-details/DoctorDetail";
import UploadImage from "./upload-image/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/use-form/useForm";
import SearchDropdown from "../../../component/search-dropdown/SearchDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPatientById,
  getDoctorNamesList,
} from "../../../redux/features/appointments/actions";
import {
  getSymptomsList,
  setPatient,
  setPatientsMessages,
} from "../../../redux/features/patients/actions";
import scrollToTop from "../../../component/scroll-up/ScrollToTop";
import moment from "moment";
import StateDropdown from "../../../component/state-dropdown/StateDropdown";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import useScroll from "../../../hooks/useRefScroll/useRefScroll";
import DatePickerComponent from "../../../component/date-picker/DatePickerComponent";
import GenderDropDown from "../../../component/gender-dropdown/GenderDropDown";
import PopUp from "../../../component/popup/PopUp";
import MessagePopup from "../../../component/message-popup/MessagePopup";

const AddAppointment = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [buttons, setButtons] = useState([]);
  const [slectedButton, setSelectedButton] = useState([]);
  let patientDetail = useSelector(
    (state) => state.Appointments.patientDetail || []
  );
  let doctorDetail = useSelector(
    (state) => state.Appointments.doctorNames || []
  );
  let patientMessage = useSelector((state) => state.Patient || []);
  let symptoms = useSelector((state) => state.Patient.symptoms || []);
  const dateRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [patientData, setPatientData] = useState(false);
  // const [updatedAlimentId, setUpdatedAlimentId] = useState()
  const [imgList, setImgList] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [fPhonVal, setFPhonVal] = useState("");
  const [secPhonVal, setSecPhonVal] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidSecPhone, setIsValidSecPhone] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState();
  const [executeScroll, elRef] = useScroll();
  const [newButton, setNewButton] = useState([]);
  const [countryIso, setCoutryIso] = useState();
  const [country, setCountry] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState();
  const [selectedCityId,setSelectedCityId]=useState();
  const [gender, setGender] = useState("");
  const [popup, setPopUp] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (patientDetail) {
      setFirstName(patientDetail.firstName);
      setLastName(patientDetail.lastName);
      setState(patientDetail.stateName);
      setFPhonVal(patientDetail.mobileNo);
      setSecPhonVal(patientDetail.alternateMobileNo);
      setSelectedButton(
        patientDetail.patientSymptomResponseDTOs
          ? patientDetail.patientSymptomResponseDTOs
          : []
      );
      setButtons(symptoms);
      if (patientDetail.dob) {
        setStartDate(new Date(moment(patientDetail.dob).format("yyyy-MM-DD")));
      }
      setGender(patientDetail.gender);
      setCity(patientDetail.cityName)
      setSelectedCityId(patientDetail.cityId)
      setSelectedCountryId(patientDetail.countryId)
      setSelectedStateId(patientDetail.stateId)
      setCountry(patientDetail.countryName)
      setData({
        mobileNumber: patientDetail.mobileNo,
        alternateContact: patientDetail.alternateMobileNo,
        address: patientDetail.address,
        landmark: patientDetail.streetLandMark,
        pinCode: patientDetail.pincode,
        email: patientDetail.email,
      });
    }
  }, [patientDetail]);

  const { handleSubmit, handleChange, handleFocus, data, errors, setData } =
    useForm({
      //ref: ref,

      validations: {
        address: {
          required: { value: true, message: "Please enter your address", },
        },
        email: {
          required: { value: true, message: "Please enter your email id", },
          pattern: { value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: "Please enter valid email id", },
        },
      },
      isSubmit: isSubmit,
      setIsSubmit: setIsSubmit,
      onSubmit: () => handleSubmitForm(data),
    });

  const handleSubmitForm = (data) => {
    scrollToTop();
    executeScroll();
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
      } else if (fPhonVal.length < 13 && countryIso==="IN") {
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
      AilmentId: patientData ? 0 : location.state && location.state.ailmentId,
      patientRequestDTO: {
        patientId: patientData
          ? patientData
          : location.state && location.state.patientId,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: startDate,
        email: data.email,
        mobileNo: fPhonVal,
        alternateMobileNo: secPhonVal,
        address: data.address,
        streetLandMark: data.landmark,
        countryId:selectedCountryId,
        stateId:selectedStateId,
        cityId:selectedCityId,
        // state: state,
        // city: city,
        pincode: data.pinCode,
        isActive: true,
        isDelete: false,
        createdBy: auth.user.userId,
      },
      symptomRequestDTOs: slectedButton, //array of object
      ailmentImageRequestDTOs: imgList,
    };

    if (firstName && lastName && startDate && state && city) {
      if (firstName.length > 2 && lastName.length > 2)
        if (isOk) {
          dispatch(setPatient(payload));
        }
    }
    // setPatientData(false);
    setTimeout(() => {
      // console.log("patientMessage",patientMessage)
      // setUpdatedAlimentId(patientMessage && patientMessage.patient.ailmentId)
      dispatch(setPatientsMessages());
    }, 3000);
  };
  const handleDatePicker = () => {
    dateRef.current.setOpen(true);
  };
  useEffect(() => {
    dispatch(getPatientById(location.state && location.state.ailmentId));
    dispatch(getSymptomsList(0));
    dispatch(getDoctorNamesList());
    // setPatientData(false);
  }, []);
  const NewErrr = "please enter a valid phone number";

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

  const handleEditClose = () => {
    setPopUp(!popup);
  };

  useEffect(() => {
    if (patientMessage.status === 200) {
      setPopUp(true);
    }
  }, [patientMessage.status]);
  return (
    <>
      <div className={styles.mainContainer}>
        {popup && (
          <PopUp
            Children={MessagePopup}
            handleClose={() => handleEditClose()}
            type={patientMessage.status === 200?"Successful":"Unsuccessful"}
            message="Patient Details Saved Successfully"
          />
        )}
        <SubHeader title="Book Appointment" />
        <div className={styles.patientFormContainer} ref={elRef}>
          <div className={styles.detailHeader}>
            <span className={styles.patientDetailTitle}>Patient Details</span>
            <Button
              title=" Add New Patient"
              customclass={styles.addnewPatientButton}
              handleClick={() => {
                navigate("/patient/add-patient");
              }}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.form}>
            {/* {isSubmit && (
              <span
                className={
                  patientMessage.status === 200
                    ? styles.responseMessage
                    : styles.responseErrorMessage
                }
              >
                {patientMessage.message}
              </span>
            )} */}
            <div className={styles.textfieldContainer}>
              <SearchDropdown
                type="text"
                label="First Name"
                placeholder="First Name"
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customIcon={styles.icon}
                customclassContainer={styles.customclassContainerDrodown}
                name="firstName"
                value={firstName}
                customDropdownClass={styles.dropDown}
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
                customclassInputType={styles.input}
                customIcon={styles.icon}
                customclassContainer={styles.customclassContainerDrodown}
                name="lastName"
                value={lastName}
                customDropdownClass={styles.dropDown}
                handelChange={setLastName}
                setLastName={setLastName}
                setPatientData={setPatientData}
                errors={
                  lastName
                    ? lastName.length < 2 &&
                    isSubmit &&
                    "Please enter more than one character your last name"
                    : isSubmit && "Please enter or select your last name"
                }
              />
            </div>
            <div className={styles.addAppointmentData}>
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
                handelChange={setGender}
                errors={!gender && isSubmit && "Please select Gender"}
              />
              <div className={styles.datePickerContainerMain}>
                <div className={styles.label}>Date of Birth</div>
                <div className={styles.datePickerContainer}>
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
                customclass={styles.maleInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainerDrodown1}
                type="text"
                label="Email"
                placeholder="Email"
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
                name="address"
                value={data.address}
                handelChange={handleChange("address")}
                errors={errors.address}
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainer}
              />
              <TextField
                type="text"
                label="Street / Landmark"
                placeholder="Street / Landmark"
                name="landmark"
                value={data.landmark}
                handelChange={handleChange("landmark")}
                errors={errors.landmark}
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainer}
              />
            </div>
            <div className={styles.addAppointmentData}>
              <StateDropdown
                type="text"
                label="Country"
                placeholder="Select Country"
                // countryIso={countryIso}
                setCoutryIso={setCoutryIso}

                customclassInputType={
                  !country && isSubmit ? styles.inputError : styles.input
                }
                customclass={styles.firstNameInputField}
                customIcon={styles.icon}
                customclassContainer={styles.customclassContainerDrodown}
                customDropdownClass={styles.customDropdown}
                name="country"
                value={country}
                handelChange={setCountry}
                setSelectedStateId={setSelectedStateId}
                selectedStateId={selectedStateId}
                setSelectedCountryId={setSelectedCountryId}
                selectedCountryId={selectedCountryId}
                setSelectedCityId={setSelectedCityId}
                setCity={setCity}
                setState={setState}
                errors={!country && isSubmit && "Please select country"}
              />
              <StateDropdown
                type="text"
                label="State"
                placeholder="Select State"
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customIcon={styles.icon}
                customclassContainer={styles.customclassContainerDrodown}
                customDropdownClass={styles.customDropdown}
                setSelectedCityId={setSelectedCityId}
                name="state"
                value={state}
                handelChange={setState}
                setSelectedStateId={setSelectedStateId}
                selectedStateId={selectedStateId}
                errors={!state && isSubmit && "Please select state"}
                setCity={setCity}
              />
              <StateDropdown
                type="text"
                label="Town/City"
                placeholder="Select Town/City"
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customIcon={styles.icon}
                setSelectedCityId={setSelectedCityId}
                customclassContainer={styles.customclassContainerDrodown}
                customDropdownClass={styles.customDropdown}
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
            <div className={styles.addAppointmentData}>
              <TextField
                type="text"
                label="Pin code"
                placeholder="Pin code"
                name="pinCode"
                value={data.pinCode}
                handelChange={handleChange("pinCode")}
                errors={errors.pinCode}
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainer}
              />
              <TextField
                type="tel"
                countryIso={countryIso}
                label="Mobile Number"
                placeholder="Mobile Number"
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainerDrodown}
                name="mobileNumber"
                value={fPhonVal}
                handelChange={firstPhoneChange}
                errors={
                  !fPhonVal && isSubmit
                    ? "Please enter mobile number"
                    : isValidPhone
                      ? NewErrr
                      : null
                }
              />
              <TextField
                type="tel"
                countryIso={countryIso}
                label="Alternate Number"
                placeholder="Alternate Number"
                customclass={styles.firstNameInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainerDrodown}
                name="alternateContact"
                value={secPhonVal}
                handelChange={secPhoneChange}
                errors={isValidSecPhone ? NewErrr : null}
              />


            </div>
            <div className={styles.medicalHistory}>Symptoms</div>
            {symptoms.length > 0 ? (
              <SearchButtons
                placeholderText="Add Symptoms"
                custominputClass={styles.buttonInput}
                buttons={buttons.length > 0 ? buttons : symptoms}
                setButtonList={setButtons}
                slectedButton={slectedButton}
                setSelectedButton={setSelectedButton}
                customSearch={styles.search}
                newButton={newButton}
                setNewButton={setNewButton}
              />
            ) : (
              <SearchButtons
                placeholderText="Add Symptoms"
                custominputClass={styles.buttonInput}
                buttons={buttons.length > 0 ? buttons : symptoms}
                setButtonList={setButtons}
                slectedButton={slectedButton}
                setSelectedButton={setSelectedButton}
                customSearch={styles.search}
                newButton={newButton}
                setNewButton={setNewButton}
              />
            )}
            <div className={styles.photoTitle}>Photos</div>
            <UploadImage
              customClass={styles.imageContainer}
              imgList={imgList}
              setImgList={setImgList}
              images={styles.photos}
            />
            <div className={styles.buttonContainer}>
              <Button
                title=" Submit"
                customclass={styles.submitButton}
                handleClick={() => {
                  handleSubmit();
                }}
              // handleClick={() => handleMedicine()}
              />
              {/* <Button title=" Reset" customclass={styles.resetButton} /> */}
            </div>
          </div>
        </div>
        <DoctorDetail
          doctorData={doctorDetail.length > 0 ? doctorDetail : []}
          ailmentId={location.state && location.state.ailmentId}
        // patientData={patientData}
        />
      </div>
    </>
  );
};

export default AddAppointment;
