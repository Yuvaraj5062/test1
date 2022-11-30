import {
  
  AfternoonIcon1,
  BeforeAfterIcon,
  CloseIcon,
  EveningIcon1,
  MorningIcon1,
} from "../../../../component/svg-component";
import styles from "./prescribemedicinepopup.module.scss";
import Divider from "../../../../component/divider/Divider";
import Button from "../../../../component/Button/Button";
import {
  getMedicationDetail,
  setMedictionMessages,
  deleteMedicationRequest,
  clearPhysicansMessages,
} from "../../../../redux/features/physicians/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../../component/error-message/ErrorMessage";
import DeletePopup from "../../../../component/delete-popup/DeletePopup";
import PopUp from "../../../../component/popup/PopUp";
const PrescribeMedicinePopup = ({ id, handleClose, setEditDetail }) => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const [delId, setDelId] = useState();
  const { auth } = useSelector((state) => state);
  let message = useSelector((state) => state.Physicians.message || "");
  
  let medicationDetail = useSelector(
    (state) => state.Physicians.medicationDetail || []
  );
  useEffect(() => {
    dispatch(setMedictionMessages(""));
    dispatch(getMedicationDetail(id));
  }, []);

 

  const [deletePopup, setDeletePopup] = useState(false);
  const deleteClose = () => {
    setDeletePopup(!deletePopup);
  };
  const handleDelete = (item) => {
    setDelId(item.patientMedicationId);
    setIsDelete(false);
    setDeletePopup(!deletePopup);
  };
  const handleEdit = (item) => {
    setEditDetail({
      type: "",
      patientMedicationId: item.patientMedicationId,
      meal: item.schedule,
      time: item.time,
      medication: item.medicineName,
      medicineId: item.medicineId,
    });
    handleClose();
  };

  useEffect(() => {
    if (isDelete) {
      dispatch(
        deleteMedicationRequest({
          PatientMedicationId: delId,
          DeletedBy: auth.user.userId,
        })
      );
      setTimeout(() => {
        if (medicationDetail.length == 1) handleClose();
        dispatch(clearPhysicansMessages());
        dispatch(getMedicationDetail(id));
      }, 1000);
    }
  }, [isDelete]);

  return (
    <>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {deletePopup && (
          <PopUp
            Children={DeletePopup}
            handleClose={() => deleteClose()}
            setIsDelete={setIsDelete}
          />
        )}
        <div className={styles.mainContainer}>
          <div className={styles.titleContainer}>
            Prescribed Medicines
            <span className={styles.closeIcon}>
              <CloseIcon
                fillcolor="#3F414D"
                handleClick={() => handleClose()}
              />
            </span>
          </div>
        
          <Divider customClass={styles.divider} />
          {medicationDetail.length > 0 ? (
            <div className={styles.cardData}>
              {medicationDetail.map((item, index) => {
                return (
                  <div className={styles.card}>
                    <span className={styles.title}>{item.medicineName}</span>
                    <div className={styles.scrollContainer}>
                      {item.time.split(",").map((item, index) => {
                        return (
                          <>
                            <div className={styles.morninngContainer}>
                              {item === "Morning" && (
                                <div className={styles.mainData}>
                                  <MorningIcon1
                                    customClass={styles.background}
                                  />
                                  <span className={styles.title}>{item}</span>
                                </div>
                              )}
                              {item === "Afternoon" && (
                                <div className={styles.mainData}>
                                  <AfternoonIcon1
                                    customClass={styles.background}
                                  />
                                  <span className={styles.title}>{item}</span>
                                </div>
                              )}
                              {item === "Evening" && (
                                <div className={styles.mainData}>
                                  <EveningIcon1
                                    customClass={styles.background}
                                  />
                                  <span className={styles.title}>{item}</span>
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className={styles.morninngContainer}>
                      <BeforeAfterIcon customClass={styles.background} />
                      <span className={styles.title}>{item.schedule}</span>
                    </div>
                    <Divider customClass={styles.divider} />
                    <div className={styles.buttoncontainer}>
                      <Button
                        title="Edit"
                        customclass={styles.editButton}
                        handleClick={() => handleEdit(item)}
                      />
                      <Button
                        title="Delete"
                        customclass={styles.deleteButton}
                        handleClick={() => handleDelete(item)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <ErrorMessage message={message} />
          )}
        </div>
      </div>
    </>
  );
};
export default PrescribeMedicinePopup;
