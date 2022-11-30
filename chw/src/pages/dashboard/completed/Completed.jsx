import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MobileScreen from "../../../component/mobile/MobileScreen";
import Table from "../../../component/table/Table";
import { ScheduledHead } from "../../../data/DashboardData";
import MobileTableCard from "../../../component/mobile-table-card/MobileTableCard";
import {
  getCompletedList,
  setStatus,
} from "../../../redux/features/dashboard/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./completed.module.scss";
import Spinner from "../../../component/spinner/Spinner";
import ErrorMessage from "../../../component/error-message/ErrorMessage";
import { useNavigate } from "react-router-dom";
import ServerPagination from "../../../component/server-pagination/ServerPagination";
import Divider from "../../../component/divider/Divider";
const Completed = () => {
  const isMobile = MobileScreen();
  const dispatch = useDispatch();
  let completedAppointments = useSelector(
    (state) => state.Dashboard.completed || []
  );
  let loader = useSelector((state) => state.Dashboard.loading);
  const { auth } = useSelector((state) => state);
  let message = useSelector((state) => state.Dashboard.message);
  const [buttonValue, setButtonValue] = useState({
    status: "",
    id: "",
    appointmentId: "",
  });
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  //Pagination logic
  const [pageLimit, setPageLimit] = useState(10);

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
    currentPage !== completedAppointments.appointmentPaginationDTO.pages
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
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
  }, [buttonValue.status]);
  useEffect(() => {
    dispatch(
      getCompletedList({
        DoctorId: auth.user.userId,
        AppointmentStatus: "Completed",
        PageNumber: currentPage,
        PageSize: pageLimit,
        IsAscending: true,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getCompletedList({
        DoctorId: auth.user.userId,
        AppointmentStatus: "Completed",
        PageNumber: currentPage,
        PageSize: pageLimit,
        IsAscending: true,
      })
    );
  }, [pageLimit, currentPage]);

  return (
    <React.Fragment>
      {isMobile ? (
        <>
          {loader ? (
            <Spinner customClass={styles.loader} />
          ) : (
            <>
              {completedAppointments &&
              completedAppointments.appointmentResponseDTO &&
              completedAppointments.appointmentResponseDTO.length > 0 ? (
                completedAppointments.appointmentResponseDTO.map(
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
                        ButtonGroup={["file"]}
                        Messages={["Resume Appointment", "Report"]}
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
                  completedAppointments &&
                  completedAppointments.appointmentResponseDTO &&
                  completedAppointments.appointmentResponseDTO.length > 0
                    ? completedAppointments.appointmentResponseDTO
                    : []
                }
                ButtonGroup={["file"]}
                handleClick={setButtonValue}
                customClassTableContainer={
                  completedAppointments &&
                  completedAppointments.appointmentResponseDTO &&
                  completedAppointments.appointmentResponseDTO.length > 0
                    ? styles.tableCotainer
                    : styles.tableCotainer1
                }
              />
              {completedAppointments &&
              completedAppointments.appointmentResponseDTO &&
              completedAppointments.appointmentResponseDTO.length > 0 ? null : (
                <ErrorMessage message={message} />
              )}
            </>
          )}
        </>
      )}

      {completedAppointments &&
        completedAppointments.appointmentResponseDTO &&
        completedAppointments.appointmentResponseDTO.length > 0 &&
        (currentPage === 1 &&
        completedAppointments.appointmentResponseDTO.length < 10
          ? false
          : true) && (
          <>
            <Divider />
            <ServerPagination
              data={completedAppointments.appointmentPaginationDTO.pages}
              length={completedAppointments.appointmentPaginationDTO.rowCount}
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
export default Completed;
