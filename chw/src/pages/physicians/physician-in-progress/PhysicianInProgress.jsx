import { useState } from "react";
import Button from "../../../component/Button/Button";
import Divider from "../../../component/divider/Divider";
import SubHeader from "../../../component/subheader/SubHeader";
import TextField from "../../../component/TextField/TextField";
import styles from "./physicianinprogress.module.scss";
import DatePicker from "react-datepicker";

import {
  AfterMealIcon,
  AfternoonIcon,
  BeforeMealIcon,
  CalenderIcon,
  DotButtonIcon,
  DropdownOpenIcon,
  EveningIcon,
  MorningIcon,
  ViewIcon,
} from "../../../component/svg-component";
import { colors } from "../../../component/constants/Colors";
import { useRef } from "react";
import { useEffect } from "react";
import DropDown from "../../../component/dropdown/Dropdown";
import PopUp from "../../../component/popup/PopUp";
import PrescribeMedicinePopup from "./prescribe-medicine-popup/PrescribeMedicinePopup";
import useForm from "../../../hooks/use-form/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getInprogressDataByName } from "../../../redux/features/physicians/actions";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import SymptomsData from "../../../component/symptoms-data/SymptomsData";
import {
  postInprogressProblemDiagnosis,
  addUpadteMedication,
  getPhysiciansDescriptionList,
  getDiagnosisList,
  clearPhysicansMessages,
  getMedicationDetail,
} from "../../../redux/features/physicians/actions";
import PhysiciansDescription from "../../../component/physicians-description/PhysiciansDescription";
import Medication from "../../../component/medication/Medication";
import Diagnosis from "../../../component/diagnosis/Diagnosis";
import useScroll from "../../../hooks/useRefScroll/useRefScroll";
import ImageBox from "../../../component/image-box/ImageBox";
import MessagePopup from "../../../component/message-popup/MessagePopup";

const PhysicianInProgress = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const [executeScroll, elRef] = useScroll();
  const dispatch = useDispatch();
  const [newButton, setNewButton] = useState([]);
  const [newDiagnosisButton, setNewDiagnosisButton] = useState([]);
  let location = useLocation();
  const { auth } = useSelector((state) => state);
  let inprogressData = useSelector(
    (state) => state.Physicians.inprogressData || []
  );
  let medicationDetail = useSelector(
    (state) => state.Physicians.medicationDetail || []
  );
  let physiciansDescription = useSelector(
    (state) => state.Physicians.physiciansDescription || []
  );
  let problemDiagnosisMessage = useSelector(
    (state) => state.Physicians.problemDiagnosisMessage || ""
  );
  let medicationMessage = useSelector(
    (state) => state.Physicians.addUpdateMessage || ""
  );
  let status = useSelector((state) => state.Physicians.status || "");
  let diagnosisList = useSelector((state) => state.Physicians.diagnosis || []);
  const [editDetail, setEditDetail] = useState({
    type: "",
    patientMedicationId: "",
    meal: "",
    time: "",
    medication: "",
    medicineId: "",
  });
  const [startDate, setStartDate] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [selectMedicine, setSelectedMedicine] = useState();
  const [time, setTime] = useState(false);
  const [meal, setMeal] = useState(false);
  const [imgList, setImgList] = useState([]);
  const [symptomsList, setSystomList] = useState([]);
  const [problemButtons, setProblemButtons] = useState([]);
  const [slectedProblemButton, setSelectedProblemButton] = useState([]);
  const [diagnosisButtons, setDiagnosisButtons] = useState([]);
  const [slectedDiagnosisButton, setSelectedDiagnosisButton] = useState([]);
  const [day, setDay] = useState();
  const [medication, setMedication] = useState("");
  const [selectedStateId, setSelectedStateId] = useState();
  const [schedule, setSchedule] = useState(false);
  const [options, setOptions] = useState({
    selectedOptions: [],
  });
  const [popup, setPopUp] = useState(false);
  const [medictionLengthMessage, setMedicationLengthMessage] = useState();
  const [diagnosisNote, setDiagnosisNote] = useState("");
  const [problemNote, setProblemNote] = useState("");
  const [medicationValue, setMedicationValue] = useState(" ");
  const [isSubmit, setIsSubmit] = useState(false);
  const [messagePopup, setMessagePopUp] = useState(false);
  const handleEditClose = () => {
    dispatch(clearPhysicansMessages());
    setPopUp(!popup);
  };
  const handleMedicine = () => {
    setPopUp(!popup);
  };
  const handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;
    const { selectedOptions } = options;
    if (checked) {
      setOptions({
        selectedOptions: [...selectedOptions, value],
      });
    }

    if (!checked) {
      setOptions({
        selectedOptions: selectedOptions.filter((e) => e !== value),
      });
    }
  };
  const medicationData = [
    <span
      className={styles.dropdownItems}
      onClick={() => {
        setDropdown(false);
        setSelectedMedicine(["View", <ViewIcon />]);
      }}
    >
      <ViewIcon
        className={styles.countryImage}
        handleClick={() => handleMedicine()}
      />
      <span className={styles.dropdownText} onClick={() => handleMedicine()}>
        View
      </span>
    </span>,
  ];
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (time && ref1.current && !ref1.current.contains(e.target)) {
        setTime(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [time]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (schedule && ref2.current && !ref2.current.contains(e.target)) {
        setSchedule(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [schedule]);

  useEffect(() => {
    dispatch(
      getInprogressDataByName(location.state && location.state.ailmentId)
    );
    dispatch(getPhysiciansDescriptionList());
    dispatch(getDiagnosisList());
    dispatch(getMedicationDetail(location.state && location.state.ailmentId));
  }, []);

  useEffect(() => {
    setMedication(editDetail.medication);
    setMeal(editDetail.meal);
    options.selectedOptions = [];
    options.selectedOptions = editDetail.time.split(",");
  }, [editDetail.patientMedicationId, popup]);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleTime = () => {
    setTime(!time);
  };
  const handleSchedule = () => {
    setSchedule(!schedule);
  };

  const { data, errors, setData } = useForm();
  useEffect(() => {
    if (inprogressData) {
      if (inprogressData.dob) {
        setStartDate(new Date(moment(inprogressData.dob).format("yyyy-MM-DD")));
      }
      setImgList(
        inprogressData.ailmentImageResponseDTOs
          ? inprogressData.ailmentImageResponseDTOs
          : []
      );
      setSystomList(
        inprogressData.patientSymptomResponseDTOs
          ? inprogressData.patientSymptomResponseDTOs
          : []
      );
      setSelectedProblemButton(inprogressData.patientProblemResponseDTOs);
      setSelectedDiagnosisButton(inprogressData.patientDiagnosedResponseDTOs);
      setData({
        firstName: inprogressData.firstName,
        lastName: inprogressData.lastName,
        mobileNumber: inprogressData.mobileNo,
        gender: inprogressData.gender,
        email: inprogressData.email,
        address: inprogressData.address,
        age: inprogressData.age,
      });
    }
  }, [inprogressData && inprogressData.patientProblemResponseDTOs]);

  const handleSubmitData = () => {
    // executeScroll();
    const payload = {
      problemRequestDTO: slectedProblemButton,
      diagnosisRequestDTO: slectedDiagnosisButton,
      ailmentId: location.state && location.state.ailmentId,
      diagnosisNote: diagnosisNote,
      problemNote: problemNote,
      createdBy: auth.user.userId,
    };
    if (medicationDetail.length > 0) {
      dispatch(postInprogressProblemDiagnosis(payload));
      setTimeout(() => {
        dispatch(clearPhysicansMessages());
      }, 3000);
    } else {
      setMessagePopUp(true)
      setMedicationLengthMessage("Please add at least one medication");
    }
  };

  const handleMedicationSubmit = () => {
    setIsSubmit(true);
    let setTime = "";
    if (options) {
      for (let i = 0; i < options.selectedOptions.length; i++) {
        if (setTime) {
          setTime = setTime + "," + options.selectedOptions[i];
        } else {
          setTime = options.selectedOptions[i];
        }
      }
    }
    const payload = {
      patientMedicationId: editDetail.patientMedicationId
        ? editDetail.patientMedicationId
        : 0,
      ailmentId: location.state && location.state.ailmentId,
      medicineId: editDetail.medicineId
        ? editDetail.medicineId
        : selectedStateId,
      time: setTime,
      schedule: meal,
      note: medicationValue,
      createdBy: auth.user.userId,
    };
    if (medication && setTime && meal) {
      setMedicationLengthMessage();
      dispatch(addUpadteMedication(payload));
      setMedication("");
      setMeal("");
      setMedicationValue("");
      setIsSubmit(false);
      setEditDetail({
        type: "",
        patientMedicationId: "",
        meal: "",
        time: "",
        medication: "",
        medicineId: "",
      });
      setOptions({ selectedOptions: [] });
      setTimeout(() => {
        if (medicationDetail.length === 0) {
          dispatch(
            getMedicationDetail(location.state && location.state.ailmentId)
          );
        }
        dispatch(clearPhysicansMessages());
      }, 3000);
    }
  };

  useEffect(() => {
    if (status ) {
      setMessagePopUp(true)
    }
    setTimeout(() => {
      dispatch(clearPhysicansMessages());
    }, 3000);
  }, [status]);


  const handlePopupClose = () => {
    setMessagePopUp(!messagePopup);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {popup && (
          <PopUp
            Children={PrescribeMedicinePopup}
            handleClose={() => handleEditClose()}
            id={location.state && location.state.ailmentId}
            setEditDetail={setEditDetail}
          />
        )}
        {messagePopup && (
          <PopUp
            Children={MessagePopup}
            handleClose={() => handlePopupClose()}
            type={status === 200 ? "Successful" : "Unsuccessful"}
            message={problemDiagnosisMessage? problemDiagnosisMessage: medictionLengthMessage}
          />
        )}
        <SubHeader title="Physicians - In Progress" />
        <div className={styles.formContainer} ref={elRef}>
          <span className={styles.title}>Patients Details</span>
          <Divider customClass={styles.divider} />
          {problemDiagnosisMessage &&
            status === 200 &&
            navigate("/clinicalstaff", {
              state: { ailmentId: location.state && location.state.ailmentId },
            })}
          {/* <span
            className={
              problemDiagnosisMessage && status === 200
                ? styles.responseMessage
                : styles.responseErrorMessage
            }
          >
            {" "}
            {problemDiagnosisMessage
              ? problemDiagnosisMessage
              : medictionLengthMessage}
          </span> */}
          <div className={styles.addPatientType}>
            <TextField
              type="text"
              label="First Name"
              placeholder="First Name"
              value={data.firstName}
              customclass={styles.firstNameInputField}
              customclassInputType={styles.input}
              customclassContainer={styles.customclassContainer}
              name="firstName"
              disabled={true}
            />
            <TextField
              type="text"
              label="Last Name"
              placeholder="Last Name"
              value={data.lastName}
              disabled={true}
              customclass={styles.firstNameInputField}
              customclassInputType={styles.input}
              customclassContainer={styles.customclassContainer}
              name="lastName"
              errors={errors.lastName}
            />
          </div>

          <div className={styles.addPatientType}>
            <TextField
              type="text"
              label="Mobile No"
              value={data.mobileNumber}
              //  handelChange={handleChange("mobileNumber")}
              placeholder="Mobile No"
              customclass={styles.firstNameInputField}
              customclassInputType={styles.input}
              customclassContainer={styles.customclassContainer}
              name="mobileNumber"
              disabled={true}
            />
            <TextField
              type="text"
              label="Email"
              placeholder="Email"
              value={data.email}
              disabled={true}
              customclass={styles.firstNameInputField}
              customclassInputType={styles.input}
              customclassContainer={styles.customclassContainer}
              name="email"
            />
          </div>
          <div className={styles.mainData}>
            <div className={styles.main}>
              <TextField
                type="text"
                label="Gender"
                placeholder="Gender"
                value={data.gender}
                disabled={true}
                customclass={styles.mobileNumberInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainer}
                name="email"
              />

              <TextField
                type="text"
                label="Age"
                placeholder="Age"
                value={data.age}
                disabled={true}
                customclass={styles.mobileNumberInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.customclassContainer}
                name="email"
              />
              <div className={styles.datePickerContainerMain}>
                <div className={styles.label}>Date of Birth</div>
                <div className={styles.datePickerContainer}>
                  <DatePicker
                    wrapperClassName={styles.datePicker}
                    popperClassName={styles.datePick}
                    selected={startDate}
                    disabled={true}
                    onChangeRaw={(e) => e.preventDefault()}
                    dateFormat="dd-MMMM-yyyy"
                    placeholderText="Date Of Birth"
                    showFourColumnMonthYearPicker
                  />
                  <span className={styles.iconContainer}>
                    <CalenderIcon fillColor={colors.secondaryBlur} />
                  </span>
                </div>
              </div>

              <div className={styles.textareaContainer}>
                <label className={styles.addressTitle}>Address </label>
                <br />
                <textarea
                  name="Address"
                  disabled={true}
                  className={styles.textarea}
                  value={inprogressData && inprogressData.address}
                ></textarea>
              </div>
            </div>
            <div className={styles.photosData}>
              <div className={styles.photoTitle}>Photos</div>
              <ImageBox
                customclasss={styles.photocontainer}
                images={styles.photos}
                customClass={styles.box}
                imgList={imgList}
                setImgList={setImgList}
              />
            </div>
          </div>
          <Button title="Previous Reports" customclass={styles.button} />
        </div>
        <div className={styles.SymptomsContainer}>
          <div className={styles.SymptomsTitle}>Symptoms</div>
          <SymptomsData symptomsList={symptomsList} />
        </div>

        <SubHeader title="Problem Description" />
        <div className={styles.card}>
          <div className={styles.problemIdentificationContainer}>
            <div className={styles.title}> Problem Identification</div>
            <Divider customClass={styles.divider} />
            {physiciansDescription && physiciansDescription.length > 0 ? (
              <PhysiciansDescription
                placeholderText="search"
                custominputClass={styles.buttonInput}
                customClass={styles.class}
                buttons={
                  problemButtons.length > 0
                    ? problemButtons
                    : physiciansDescription
                }
                setButtonList={setProblemButtons}
                slectedButton={slectedProblemButton}
                setSelectedButton={setSelectedProblemButton}
                newButton={newButton}
                setNewButton={setNewButton}
              />
            ) : (
              <PhysiciansDescription
                placeholderText="search"
                custominputClass={styles.input}
                customClass={styles.class}
                buttons={
                  problemButtons.length > 0
                    ? problemButtons
                    : physiciansDescription
                }
                setButtonList={setProblemButtons}
                slectedButton={slectedProblemButton}
                setSelectedButton={setSelectedProblemButton}
                newButton={newButton}
                setNewButton={setNewButton}
              />
            )}
            <div className={styles.textareaContainer}>
              <label className={styles.addressTitle}>Note</label>
              <br />
              <textarea
                name="Problem Identification"
                className={styles.textarea}
                placeholder="type your note"
                value={problemNote}
                onChange={(e) => setProblemNote(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={styles.problemIdentificationContainer1}>
            <div className={styles.title}>Diagnosis</div>

            <Divider customClass={styles.divider} />
            {diagnosisList && diagnosisList.length > 0 ? (
              <Diagnosis
                placeholderText="search"
                custominputClass={styles.buttonInput}
                customClass={styles.class}
                buttons={
                  diagnosisButtons && diagnosisButtons.length > 0
                    ? diagnosisButtons
                    : diagnosisList
                }
                setButtonList={setDiagnosisButtons}
                slectedButton={slectedDiagnosisButton}
                setSelectedButton={setSelectedDiagnosisButton}
                newButton={newDiagnosisButton}
                setNewButton={setNewDiagnosisButton}
              />
            ) : (
              <Diagnosis
                placeholderText="search"
                custominputClass={styles.buttonInput}
                customClass={styles.class}
                buttons={
                  diagnosisButtons && diagnosisButtons.length > 0
                    ? diagnosisButtons
                    : diagnosisList
                }
                setButtonList={setDiagnosisButtons}
                slectedButton={slectedDiagnosisButton}
                setSelectedButton={setSelectedDiagnosisButton}
                newButton={newDiagnosisButton}
                setNewButton={setNewDiagnosisButton}
              />
            )}
            <div className={styles.textareaContainer}>
              <label className={styles.addressTitle}>Note</label>
              <br />
              <textarea
                name="Diagnosis"
                className={styles.textarea}
                placeholder="type your note"
                value={diagnosisNote}
                onChange={(e) => setDiagnosisNote(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={styles.problemIdentificationContainer2}>
            <div className={styles.titleContainer}>
              <span className={styles.title}>Medication</span>
              <div className={styles.headerMenu}>
                {dropdown && (
                  <DropDown
                    dropdownItems={medicationData}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                    selectMedicine={selectMedicine}
                    customclassItem={styles.item}
                    handleClick={() => handleDropdown()}
                  />
                )}
              </div>
              <span
                className={styles.dotButton}
                onClick={() => handleDropdown()}
              >
                <DotButtonIcon selectMedicine={selectMedicine} />
              </span>
            </div>
            <Divider customClass={styles.divider} />
            <div>
              <span
                className={
                  medicationMessage && status === 200
                    ? styles.responseMessage
                    : styles.responseErrorMessage
                }
              >
                {medicationMessage}
              </span>
              <Medication
                type="text"
                label="Select Medicine"
                placeholder="Select Medicine"
                customclass={styles.firstNameInputField}
                customDropdownClass={styles.customDropdown}
                customClassItem={styles.item}
                customclassInputType={
                  !medication && isSubmit ? styles.inputError : styles.input
                }
                errors={!medication && isSubmit && "Please select medicine"}
                customclassContainer={styles.customclassContainerDrodown}
                name="medication"
                value={medication}
                handelChange={setMedication}
                customIcon={styles.customIcon}
                setSelectedStateId={setSelectedStateId}
                selectedStateId={selectedStateId}
              />
            </div>
            <div className={styles.data}>
              <div className={styles.timedata} ref={ref1}>
                <span className={styles.time}>Time</span>
                <div
                  className={styles.dayContainer}
                  onClick={() => handleTime()}
                  ref={ref1}
                >
                  
                     {options.selectedOptions.map((item,index)=>{
                      return(
                        <span className={styles.morning} key={index}>
                          {item.substr(0,3)}
                          {index===1 && ","}
                          {index===2 && ","}
                          </span>
                      )
                     })}

                  <DropdownOpenIcon
                    fillcolor="#8F9493"
                    customClass={styles.dropdow}
                    day={day}
                  />
                </div>
                {options.selectedOptions.length === 1 && isSubmit && (
                  <span className={styles.error}> Please select time</span>
                )}
                {time && (
                  <>
                    <div className={styles.dayData}>
                      <div className={styles.innerData}>
                        <div className={styles.innerInfo}>
                          <span>
                            <MorningIcon fillColor={colors.secondaryLight} />
                          </span>
                          <span className={styles.morningtitle}>Morning</span>
                        </div>
                        <span className={styles.checkbox1}>
                          <input
                            type="checkbox"
                            checked={options.selectedOptions.includes(
                              "Morning"
                            )}
                            name={"option"}
                            value="Morning"
                            onChange={handleChangeCheckbox}
                          />
                        </span>
                      </div>
                      <Divider />
                      <div className={styles.innerData}>
                        <div className={styles.innerInfo}>
                          <span>
                            <AfternoonIcon fillColor={colors.secondaryLight} />
                          </span>
                          <span className={styles.morningtitle}>Afternoon</span>
                          <div className={styles.checkbox2}>
                            <input
                              type="checkbox"
                              name={"option"}
                              checked={options.selectedOptions.includes(
                                "Afternoon"
                              )}
                              value="Afternoon"
                              onChange={handleChangeCheckbox}
                            />
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div className={styles.innerData}>
                        <div className={styles.innerInfo}>
                          <span>
                            <EveningIcon fillColor={colors.secondaryLight} />
                          </span>
                          <span className={styles.morningtitle}>Evening</span>
                          <div className={styles.checkbox3}>
                            <input
                              type="checkbox"
                              checked={options.selectedOptions.includes(
                                "Evening"
                              )}
                              name={"option"}
                              value="Evening"
                              onChange={handleChangeCheckbox}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.scheduleData} ref={ref2}>
                <span className={styles.time}>Schedule</span>
                <div className={styles.dayContainer} onClick={handleSchedule}>
                  <span className={styles.morning}>{meal}</span>
                  <DropdownOpenIcon
                    fillcolor="#8F9493"
                    customClass={styles.dropdow}
                  />
                </div>
                {!meal && isSubmit && (
                  <span className={styles.error}>Please select meal</span>
                )}
                {schedule && (
                  <>
                    <div className={styles.dayData}>
                      <div
                        className={styles.innerData}
                        onClick={() => setMeal("Before Meal")}
                      >
                        <BeforeMealIcon fillColor={colors.secondaryLight} />
                        <span className={styles.morningtitle}>Before Meal</span>
                      </div>
                      <Divider />
                      <div
                        className={styles.innerData}
                        onClick={() => setMeal("After Meal")}
                      >
                        <AfterMealIcon
                          fillColor={colors.secondaryLight}
                          customClass={styles.afterIcon}
                        />
                        <span className={styles.morningtitle1}>After Meal</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.textareaContainer}>
              <label className={styles.addressTitle}>Note</label>
              <br />
              <textarea
                name="Medication"
                className={styles.textarea}
                placeholder="type your note"
                value={medicationValue}
                onChange={(e) => setMedicationValue(e.target.value)}
              ></textarea>
            </div>
            <Button
              title="Save"
              customclass={styles.clearButton}
              handleClick={handleMedicationSubmit}
            />
          </div>
        </div>
        <Button
          title="Continue"
          customclass={styles.continueButton}
          handleClick={() => handleSubmitData()}
        />
      </div>
    </>
  );
};
export default PhysicianInProgress;
