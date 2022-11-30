import Button from "../Button/Button";
import styles from "./symptomsdata.module.scss";
const SymptomsData = ({ symptomsList }) => {
  return (
    <>
      <div className={styles.mainData}>
        {symptomsList.map((item, index) => {
          return (
            <Button
              key={index}
              title={item.symptomName}
              customclass={styles.hypertensionButton}
              type="button"
            />
          );
        })}
      </div>
    </>
  );
};
export default SymptomsData;
