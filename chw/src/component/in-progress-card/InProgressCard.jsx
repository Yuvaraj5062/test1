import Divider from "../divider/Divider";
import SearchButtons from "../search-buttons/SearchButtons";
import TextField from "../TextField/TextField";
import styles from "./inprogresscard.module.scss";
const InProgressCard = ({ title }) => {
  return (
    <>
      <div className={styles.problemIdentificationContainer}>
        <div className={styles.title}>{title}</div>
        <Divider customClass={styles.divider} />
        <SearchButtons
          placeholderText="Hypert"
          custominputClass={styles.buttonInput}
          buttons={[
            "Hypertension",
            "Diabetes",
            "Fever",
            "Alphaviruses",
            "Hypertension",
            "Diabetes",
            "Fever",
            "Alphav",
            "Hypertension",
            "Diabetes",
            "Fever",
            "Alphaviruses",
          ]}
        />
        {/* <div className={styles.noteTitle}>Note</div> */}
        <TextField
          type="text"
          label="Note "
          placeholder="type your note"
          customclass={styles.mobileNumberInputField}
          customclassInputType={styles.input1}
        />
      </div>
    </>
  );
};
export default InProgressCard;
