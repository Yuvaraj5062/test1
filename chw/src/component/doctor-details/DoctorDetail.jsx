import { useEffect, useRef, useState } from "react";
import { colors } from "../constants/Colors";
import Divider from "../divider/Divider";
import { AlaramClockIcon, CalenderIcon } from "../svg-component";
import styles from "./doctordetail.module.scss";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppointments,
  setAppointmentsMessages,
} from "../../redux/features/appointments/actions";
import { useNavigate } from "react-router-dom";
import "../../styles/libraries.css";
import moment from "moment";
import SelectDoctorDropDown from "../select-doctor/SelectDoctorDropDown";
import PopUp from "../popup/PopUp";
import MessagePopup from "../message-popup/MessagePopup";
const DoctorDetail = ({ doctorData, ailmentId }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const { auth } = useSelector((state) => state);
  const [isSubmit, setIsSubmit] = useState(false);
  let doctorMessage = useSelector((state) => state.Appointments || []);
  let patientAilmentId = useSelector(
    (state) => state.Patient.patient.ailmentId || ""
  );
  // const [loader, setLoader] = useState(false);
  let loader = useSelector((state) => state.Appointments.loading || "");
  const [time, setTime] = useState();
  const dispatch = useDispatch();
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const [doctor, setDoctor] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [popup, setPopUp] = useState(false);
  const handleDatePicker = () => {
    dateRef.current.setOpen(true);
  };
  const handleTimePicker = () => {
    timeRef.current.setOpen(true);
  };

  const handleSubmitForm = (data) => {

    setIsSubmit(true);
    if (date && time && doctor) {
      //  setLoader(true);
      const payloadData = {
        appointmentId: 0,
        ailmentId: patientAilmentId ? patientAilmentId : ailmentId, //patientAilmentId
        doctorId: doctorId,
        appointmentDate: moment(date).format("DD-MMM-yyyy"),
        appointmentTime: moment(time).format("HH:00 a"),
        createdBy: auth.user.userId,
      };

      dispatch(setAppointments(payloadData));
      // setTimeout(() => {
      //   dispatch(setAppointmentsMessages());
      // }, 3000);
    }
  };

  // useEffect(() => {
  //   if (doctorMessage.status === 200) {
  //     navigate("/patient/add-patient");
  //   }
  // }, [doctorMessage.status]);


  useEffect(() => {
    if (doctorMessage.status === 200 && isSubmit) {
      setPopUp(true)
    }
    else if (doctorMessage.status === 417 && isSubmit) {
      setPopUp(true)
    }

    setTimeout(() => {

      if (doctorMessage.status === 200 && isSubmit) {
        navigate("/patient/add-patient");
      }
      dispatch(setAppointmentsMessages());
    }, 2000);
  }, [doctorMessage.status]);
  const handleReset = () => {
    // setData({ doctor: "" });
    setTime("");
    setDate("");
    setDoctorId("");
    setDoctor("");
    setIsSubmit(false);
  };

  const handlePopupClose = () => {
    setPopUp(!popup);
  };

  return (
    <>
      <div className={styles.container}>
        {popup && (
          <PopUp
            Children={MessagePopup}
            handleClose={() => handlePopupClose()}
            type="Successful"
            message={doctorMessage.message}
          />
        )}
        <span className={styles.doctorDetail}>Doctor Details</span>
        <Divider customClass={styles.divider} />
        {/* <span
          className={
            doctorMessage.status
              ? styles.responseMessage
              : styles.responseErrorMessage
          }
        >
          {" "}
          {doctorMessage.message}
        </span> */}

        {/* {message} */}
        <div className={styles.addAppointmentData}>

          <SelectDoctorDropDown
            type="text"
            label="Select Doctor"
            placeholder="Select Doctor"
            customclass={styles.firstNameInputField}
            customIcon={styles.icon}
            customclassContainer={styles.customclassContainerDrodown}
            customclassInputType={
              !doctor && isSubmit ? styles.inputError : styles.input
            }
            customDropdownClass={styles.customDropdown}
            setDoctorId={setDoctorId}
            value={doctor}
            readOnly={true}
            doctorData={doctorData}
            handelChange={setDoctor}

            errors={!doctor && isSubmit && "Please select doctor"}
          />
          <div className={styles.datePickerContainerMain}>
            <div className={styles.label}>Date of Appointment</div>
            <div className={styles.datePickerContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                ref={dateRef}
                selected={date}
                onChange={(date) => {
                  setDate(date);
                  setTime();
                }}
                dateFormat="dd-MMMM-yyyy"
                onFocus={(e) => (e.target.readOnly = true)}
                minDate={new Date()}
                showFourColumnMonthYearPicker
                placeholderText="Appointment Date"
                onChangeRaw={(e) => e.preventDefault()}
              />
              <span className={styles.iconContainer}>
                <CalenderIcon
                  customClass={styles.icon}
                  fillColor={colors.secondaryBlur}
                  handleClick={() => handleDatePicker()}
                />
              </span>
            </div>
            {!date && isSubmit && (
              <span className={styles.error}>
                Please select date of appointment
              </span>
            )}
          </div>
          <div className={styles.datePickerContainerMain}>
            <div className={styles.label}>Time of Appointment</div>
            <div className={styles.datePickerContainer}>
              <DatePicker
                wrapperClassName={styles.datePicker}
                popperClassName={styles.datePick}
                selected={date && time}
                onChange={(time) => setTime(time)}
                showTimeSelect
                showTimeSelectOnly
                ref={timeRef}
                readonly={date ? false : true}
                timeIntervals={60}
                timeCaption="Time"
                placeholderText="Appointment Time"
                minTime={
                  date < new Date() &&
                  setHours(
                    setMinutes(new Date(), 0),
                    moment(new Date()).add(1, "hours").format("HH")
                  )
                }
                maxTime={
                  date < new Date() && setHours(setMinutes(new Date(), 30), 20)
                }
                dateFormat="h:mm aa"
                onFocus={(e) => (e.target.readOnly = true)}
                onChangeRaw={(e) => e.preventDefault()}
              />
              <span className={styles.iconContainer}>
                <AlaramClockIcon
                  fillColor={colors.secondaryBlur}
                  customClass={styles.icon}
                  handleClick={() => handleTimePicker()}
                />
              </span>
            </div>
            {!time && isSubmit && (
              <span className={styles.error}>
                Please select appointment time
              </span>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            title=" Submit"
            customclass={styles.submitButton}
            handleClick={() => handleSubmitForm()}
            loader={loader}
            disabled={patientAilmentId || ailmentId ? false : true}
          />
          <Button
            title=" Reset"
            type="button"
            customclass={styles.resetButton}
            handleClick={() => handleReset()}
          />
        </div>
      </div>
    </>
  );
};
export default DoctorDetail;
