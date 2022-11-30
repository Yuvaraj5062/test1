import React from "react";
import Table from "../../../component/table/Table";
import { useEffect, useState } from "react";
import {
  inProgressHeader,
  inProgressTableData,
  ScheduledHead,
} from "../../../data/DashboardData";
import MobileScreen from "../../../component/mobile/MobileScreen";
import MobileTableCard from "../../../component/mobile-table-card/MobileTableCard";
import { getInProgressList } from "../../../redux/features/dashboard/actions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../component/error-message/ErrorMessage";
import Spinner from "../../../component/spinner/Spinner";
import styles from "./inprogress.module.scss";
import ServerPagination from "../../../component/server-pagination/ServerPagination";
import { useNavigate } from "react-router-dom";
import Divider from "../../../component/divider/Divider";
const InProgress = () => {
  const isMobile = MobileScreen();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let inprogressAppointments = useSelector(
    (state) => state.Dashboard.inProgress || []
  );
  let loader = useSelector((state) => state.Dashboard.loading);
  let message = useSelector((state) => state.Dashboard.message);
  const { auth } = useSelector((state) => state);
  const [buttonValue, setButtonValue] = useState({
    status: "",
    id: "",
    appointmentId: "",
  });
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState(1);

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
    currentPage !== inprogressAppointments.appointmentPaginationDTO.pages
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  useEffect(() => {
    if (buttonValue.status === "play") {
      navigate("/physicians", { state: { ailmentId: buttonValue.id } });
      setButtonValue({ status: "", id: "", appointmentId: "" });
    }
  }, [buttonValue.status]);

  useEffect(() => {
    dispatch(
      getInProgressList({
        DoctorId: auth.user.userId,
        AppointmentStatus: "InProgress",
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
              {inprogressAppointments &&
              inprogressAppointments.appointmentResponseDTO ? (
                inprogressAppointments.appointmentResponseDTO.map(
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
                        ButtonGroup={["play", "file"]}
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
                  inprogressAppointments &&
                  inprogressAppointments.appointmentResponseDTO &&
                  inprogressAppointments.appointmentResponseDTO.length > 0
                    ? inprogressAppointments.appointmentResponseDTO
                    : []
                }
                ButtonGroup={["inprogress", "file"]}
                handleClick={setButtonValue}
                customClassTableContainer={
                  inprogressAppointments &&
                  inprogressAppointments.appointmentResponseDTO &&
                  inprogressAppointments.appointmentResponseDTO.length > 0
                    ? styles.tableCotainer
                    : styles.tableCotainer1
                }
              />

              {inprogressAppointments &&
              inprogressAppointments.appointmentResponseDTO &&
              inprogressAppointments.appointmentResponseDTO.length >
                0 ? null : (
                <ErrorMessage message={message} />
              )}
            </>
          )}
        </>
      )}

      {inprogressAppointments &&
        inprogressAppointments.appointmentResponseDTO &&
        inprogressAppointments.appointmentResponseDTO.length > 0 &&
        (currentPage === 1 &&
        inprogressAppointments.appointmentResponseDTO.length < 10
          ? false
          : true) && (
          <>
            <Divider />
            <ServerPagination
              data={inprogressAppointments.appointmentPaginationDTO.pages}
              length={inprogressAppointments.appointmentPaginationDTO.rowCount}
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

export default InProgress;
