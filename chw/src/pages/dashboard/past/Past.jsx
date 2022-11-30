import React, { useEffect, useState } from 'react'
import Table from '../../../component/table/Table'
import { pastHeader } from '../../../data/DashboardData'
import MobileScreen from '../../../component/mobile/MobileScreen';
import MobileTableCard from '../../../component/mobile-table-card/MobileTableCard'
import { getPastList } from '../../../redux/features/dashboard/actions';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../../component/error-message/ErrorMessage';
import Spinner from '../../../component/spinner/Spinner';
import styles from './past.module.scss'
import ServerPagination from '../../../component/server-pagination/ServerPagination';
import Divider from '../../../component/divider/Divider';
const Past = () => {
  const isMobile = MobileScreen()
  const dispatch = useDispatch();
  let pastAppointments = useSelector((state) => state.Dashboard.past || []);
  const { auth } = useSelector((state) => state)
  let loader = useSelector((state) => state.Dashboard.loading);
  let message = useSelector((state) => state.Dashboard.message);
  const [dropdown, setDropdown] = useState(false)
  const [dropdownValue, setDropdownValue] = useState("Past")
  const [value, setValue] = useState(1)
  const [pageLimit, setPageLimit] = useState(10);
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
    currentPage !== pastAppointments.appointmentPaginationDTO.pages
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };



  useEffect(() => {
    dispatch(getPastList({
      DoctorId: auth.user.userId, AppointmentStatus: dropdownValue,
      PageNumber: currentPage, PageSize: pageLimit, IsAscending: true
    }))
  }, [pageLimit, currentPage, message, dropdownValue]);




  return (

    <React.Fragment>
      {isMobile ? (
        <>
          {loader ?
            <Spinner customClass={styles.loader} />
            :
            <>
              {pastAppointments && pastAppointments.appointmentResponseDTO
                &&
                pastAppointments.appointmentResponseDTO.length > 0 ? pastAppointments.appointmentResponseDTO.map((item, index) => {
                  return (
                    <MobileTableCard key={index} data={item} flag={dropdown}
                      setFlag={setDropdown} index={index} value={value}
                      setValue={setValue}
                      setButtonValue={setDropdownValue}
                      ButtonGroup={["past"]}
                      Messages={["Encounter", "Appointment",]} />
                  );
                })
                : <ErrorMessage message={message} />}
            </>
          }
        </>
      ) : (
        <>
          {loader ?
            <Spinner customClass={styles.loader} />
            :
            <>
              <Table
                tableheading={pastHeader}
                tabledata={pastAppointments && pastAppointments.appointmentResponseDTO &&
                  pastAppointments.appointmentResponseDTO.length > 0 ? pastAppointments.appointmentResponseDTO : []}
                ButtonGroup={["past"]}
                setDropdownValue={setDropdownValue}
                dropdown={dropdown}
                handleClick={setDropdown}
                customClassTableContainer={pastAppointments && pastAppointments.appointmentResponseDTO &&
                  pastAppointments.appointmentResponseDTO.length > 0 ? styles.tableCotainer : styles.tableCotainer1}
              />
              {pastAppointments && pastAppointments.appointmentResponseDTO &&
                pastAppointments.appointmentResponseDTO.length > 0 ? null
                :
                <ErrorMessage message={message}
                />
              }
            </>
          }</>
      )}
      
        {pastAppointments && 
          pastAppointments.appointmentResponseDTO && 
          pastAppointments.appointmentResponseDTO.length > 0 
           &&
           (currentPage===1 && pastAppointments.appointmentResponseDTO.length < 10 ?
            false:true) &&
           (
          <>
            <Divider />
            <ServerPagination
              data={pastAppointments.appointmentPaginationDTO.pages}
              length={pastAppointments.appointmentPaginationDTO.rowCount}
              handlePaginate={(item) => handlePaginate(item)}
              active={currentPage}
              handlePrevious={(offset, ref) => handlePrevious(offset, ref)}
              handleNext={(offset, ref) => handleNext(offset, ref)}
              // limit={pageLimit}
              dropDownValues={[10, 20, 30]}
              setPageLimit={setPageLimit}
              pageLimit={pageLimit}
            />
          </>)}
    </React.Fragment>
  )
}
export default Past