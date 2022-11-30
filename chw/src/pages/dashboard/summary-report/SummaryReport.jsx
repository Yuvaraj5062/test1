import React, { useEffect } from 'react'
import SummaryCard from '../../../component/summary-card/SummaryCard'
import styles from "./summaryreport.module.scss";
import SubHeader from "../../../component/subheader/SubHeader";
import {
     PatientInfoHeader, PhysicianInfoHeader,
    AppointmentsInfoHeader, MedicationInfoHeader
} from "../../../data/SummaryData";
import {
    getSummaryList
} from "../../../redux/features/appointments/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../../../component/spinner/Spinner';
import ErrorMessage from '../../../component/error-message/ErrorMessage';
import config from '../../../config/config'
import { openPdf, setStatus } from '../../../redux/features/dashboard/actions';
import { useLocation, useNavigate } from 'react-router-dom';
const SummaryReport = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate();
    const { auth } = useSelector((state) => state)
    let summaryReport = useSelector((state) => state.Appointments.summaryReport || '');
    let pdf=useSelector((state) => state.Dashboard.pdf || '');
    let loader = useSelector((state) => state.Appointments.loading);
    let message = useSelector((state) => state.Appointments.message || '');
    useEffect(() => {
        dispatch(getSummaryList(location.state && location.state.ailmentId));
        dispatch(openPdf(3))

    }, []);
    const handleClick = (data) => {

        console.log("file",pdf)
        const blob = new Blob([pdf], { type: 'application/pdf' });
        let file= new File([blob], "filename", { type: 'application/pdf' });
        let link = document.createElement('a');
         link.href = window.URL.createObjectURL(blob);
          let docName = pdf.split('.')[0];
         link.open = `${docName}.pdf`;
         link.click();
        if(data){
            navigate("/physicians", { state: { ailmentId: location.state && location.state.ailmentId } })
        }
        else{
        dispatch(setStatus({
            AppointmentId: summaryReport && summaryReport.appointmentResponseDTO.appointmentId,
            Status: 'Completed',
            UpdatedBy: auth.user.userId
          }))
        
        navigate("/dashboard", { state: { ailmentId: location.state && location.state.ailmentId } })
    }
}
    console.log("call pdf",pdf)
    return (
        <div className={styles.summaryReportContainer}>
            <SubHeader title="Summary Report" />
            {loader ?
                <Spinner customClass={styles.loader} />
                :
                <>
                    {message ?
                        <ErrorMessage message={message ? message : "No Records Found"} />
                        :
                        <>
                            {summaryReport && summaryReport.patientResponseDTO ?
                                <div className={styles.summaryReportCardContainer}>
                                    <SummaryCard
                                        headerText="Patient Information"
                                        customClassTh={styles.tablehead}
                                        customClassTableRow={styles.tableRow}
                                        customClassTableContainer={styles.tableContainer}
                                        customClassTd={styles.tableRow}
                                        tableHeader={PatientInfoHeader}
                                        customClass={styles.customClass}
                                        tableData={summaryReport && summaryReport.patientResponseDTO ? [summaryReport.patientResponseDTO] : []}
                                    />
                                    <SummaryCard
                                        headerText="Physician Information"
                                        tableHeader={PhysicianInfoHeader}
                                        customClass={styles.customClass}
                                        customClassTh={styles.tablehead}
                                        customClassTableRow={styles.tableRow}
                                        customClassTableContainer={styles.tableContainer}
                                        customClassTd={styles.tableRow}
                                        tableData={summaryReport && summaryReport.doctorNameResponseDTO ? [summaryReport.doctorNameResponseDTO] : []}
                                    />
                                    <SummaryCard
                                        headerText="Appointments Information"
                                        tableHeader={AppointmentsInfoHeader}
                                        customClassTh={styles.tablehead}
                                        customClassTableRow={styles.tableRow}
                                        customClassTableContainer={styles.tableContainer}
                                        customClassTd={styles.tableRow}
                                        tableData={summaryReport && summaryReport.appointmentResponseDTO ? [summaryReport.appointmentResponseDTO] : []}
                                        cardTitle="Summary Report"
                                        customClass={styles.customClass}

                                    />
                                </div>
                                : <ErrorMessage message="No Records Found" />
                            }
                            <div className={styles.summaryReportCardMedication}>
                                <>
                                    {summaryReport && summaryReport.patientMedicationResponseDTOs &&
                                        summaryReport.patientMedicationResponseDTOs.length > 0 ?
                                        summaryReport.patientMedicationResponseDTOs.map((item, index) => {
                                            return (
                                                <SummaryCard
                                                    key={index}
                                                    headerText="Medication"
                                                    tableHeader={MedicationInfoHeader}
                                                    tableData={[item]}
                                                    customClass={styles.customClass}
                                                    customClassTh={styles.tablehead}
                                                    customClassTableRow={styles.tableRow}
                                                    customClassTableContainer={styles.tableContainer}
                                                    customClassTd={styles.tableRow}
                                                />

                                            );
                                        })
                                        : null}
                                </>
                            </div>
                        </>
                    }
                </>
            }

            {summaryReport && summaryReport.patientResponseDTO &&
                <div className={styles.mainContainer}>
                    <button
                        className={styles.backButton}
                        type="button"
                        onClick={() => handleClick("back")}>
                        <span className={styles.title}>
                            Back
                        </span>
                    </button>
                    {/* <a href={`${config.default.openpdfurl}?AilmentId=${location.state && location.state.ailmentId}`} target='blank'>
                        */}
                        {/* <a href={pdf} target='blank'> */}
                     
                        <button
                            className={styles.encouterButton}
                            type="button"
                            onClick={() => handleClick()}
                        >
                            <span className={styles.title}>
                                End Encounter
                            </span>
                        </button>
                    {/* </a> */}
                </div>
            }
{/* <a href={pdf} target='blank'>open</a> */}

        </div>
    )
}

export default SummaryReport