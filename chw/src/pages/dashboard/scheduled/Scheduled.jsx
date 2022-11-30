import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../component/error-message/ErrorMessage";
import MobileTableCard from "../../../component/mobile-table-card/MobileTableCard";
import MobileScreen from "../../../component/mobile/MobileScreen";
import Spinner from "../../../component/spinner/Spinner";
import Table from "../../../component/table/Table";
import { ScheduledHead } from "../../../data/DashboardData";
import {
  getScheduled,
  setStatus,
  deleteAppointment,
} from "../../../redux/features/dashboard/actions";
import styles from "./scheduled.module.scss";
import PopUp from "../../../component/popup/PopUp";
import ServerPagination from "../../../component/server-pagination/ServerPagination";
import DeletePopup from "../../../component/delete-popup/DeletePopup";
import Divider from "../../../component/divider/Divider";
const Scheduled = () => {
  const dispatch = useDispatch();
  let scheduledAppointments = useSelector(
    (state) => state.Dashboard.scheduled || []
  );
  const { auth } = useSelector((state) => state);
  let loader = useSelector((state) => state.Dashboard.loading);
  let message = useSelector((state) => state.Dashboard.message);
  const isMobile = MobileScreen();
  const [buttonValue, setButtonValue] = useState({
    status: "",
    id: "",
    appointmentId: "",
  });
  const [flag, setFlag] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const navigate = useNavigate();
  //Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = (offset, ref) => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
    ref.current.scrollLeft += offset;
  };
  const handleNext = (offset, ref) => {
    ref.current.scrollLeft += offset;
    currentPage !== scheduledAppointments.appointmentPaginationDTO.pages
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  //when icon click
  useEffect(() => {
    if (buttonValue.status === "play") {
      dispatch(
        setStatus({
          AppointmentId: buttonValue.appointmentId,
          Status: "InProgress",
          UpdatedBy: auth.user.userId,
        })
      );
      navigate("/physicians", { state: { ailmentId: buttonValue.id } });
      setButtonValue({ status: "", id: "", appointmentId: "" });
    }

    if (buttonValue.status === "delete") {
      setPopup(true);

      if (isDelete) {
        dispatch(
          deleteAppointment({
            AppointmentId: buttonValue.appointmentId,
            UpdatedBy: auth.user.userId,
          })
        );
       
        setPopup(false);
      }
      setIsDelete(false);
    }
  }, [buttonValue.status, buttonValue.id, isDelete]);

  useEffect(() => {
    dispatch(
      getScheduled({
        DoctorId: auth.user.userId,
        AppointmentStatus: "Scheduled",
        PageNumber: currentPage,
        PageSize: pageLimit,
        IsAscending: true,
      })
    );
  }, []);
  //pagination

  useEffect(() => {
    dispatch(getScheduled({
        DoctorId: auth.user.userId,
        AppointmentStatus: "Scheduled",
        PageNumber: currentPage,
        PageSize: pageLimit,
        IsAscending: true,
      })
    );
    if(scheduledAppointments.appointmentResponseDTO && scheduledAppointments.appointmentResponseDTO.length===0){
      dispatch(getScheduled({
        DoctorId: auth.user.userId,
        AppointmentStatus: "Scheduled",
        PageNumber: currentPage-1,
        PageSize: pageLimit,
        IsAscending: true,
      })
    );
    setCurrentPage(currentPage-1)
    }
  }, [pageLimit, currentPage, message]);
  const handlePopupClose = () => {
    setTimeout(() => {
      setPopup(!popup);
      setButtonValue({ status: "", id: "", appointmentId: "" });
    }, 0);
  };
  
  // console.log("scheduledAppointments.appointmentResponseDTO.length",scheduledAppointments.appointmentResponseDTO.length)
  return (
    <React.Fragment>
      {popup && (
        <PopUp
          setIsDelete={setIsDelete}
          Children={DeletePopup}
          handleClose={() => handlePopupClose()}
        />
      )}
      {isMobile ? (
        <>
          {loader ? (
            <Spinner customClass={styles.loader} />
          ) : (
            <>
              {scheduledAppointments &&
              scheduledAppointments.appointmentResponseDTO &&
              scheduledAppointments.appointmentResponseDTO.length > 0 ? (
                scheduledAppointments.appointmentResponseDTO.map(
                  (item, index) => {
                    return (
                      <MobileTableCard
                        key={index}
                        data={item}
                        flag={flag}
                        setFlag={setFlag}
                        index={index}
                        value={value}
                        setValue={setValue}
                        setButtonValue={setButtonValue}
                        ButtonGroup={["play", "file", "delete"]}
                        Messages={["Start Appointment", "Report", "Delete"]}
                      />
                    );
                  }
                )
              ) : (
                <ErrorMessage message={message} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {loader ? (
            <Spinner customClass={styles.loader} />
          ) : (
            <>
              <Table
                tableheading={ScheduledHead}
                tabledata={
                  scheduledAppointments &&
                  scheduledAppointments.appointmentResponseDTO &&
                  scheduledAppointments.appointmentResponseDTO.length > 0
                    ? scheduledAppointments.appointmentResponseDTO
                    : []
                }
                ButtonGroup={["play", "file", "delete"]}
                handleClick={setButtonValue}
                customClassTableContainer={
                  scheduledAppointments &&
                  scheduledAppointments.appointmentResponseDTO &&
                  scheduledAppointments.appointmentResponseDTO.length > 0
                    ? styles.tableCotainer
                    : styles.tableCotainer1
                }
              />

              {scheduledAppointments &&
              scheduledAppointments.appointmentResponseDTO &&
              scheduledAppointments.appointmentResponseDTO.length > 0 ? null : (
                <ErrorMessage message={message} />
              )}
            </>
          )}
        </>
      )}
      {scheduledAppointments &&
        scheduledAppointments.appointmentResponseDTO &&
        scheduledAppointments.appointmentResponseDTO.length > 0 &&
        (currentPage === 1 &&
        scheduledAppointments.appointmentResponseDTO.length < 10
          ? false
          : true) && (
          <>
            <Divider />
            <ServerPagination
              data={scheduledAppointments.appointmentPaginationDTO.pages}
              length={scheduledAppointments.appointmentPaginationDTO.rowCount}
              handlePaginate={(item) => handlePaginate(item)}
              active={currentPage}
              handlePrevious={(offset, ref) => handlePrevious(offset, ref)}
              handleNext={(offset, ref) => handleNext(offset, ref)}
              // limit={pageLimit}
              dropDownValues={[10, 20, 30]}
              setPageLimit={setPageLimit}
              pageLimit={pageLimit}
            />
          </>
        )}
    </React.Fragment>
  );
};

export default Scheduled;
