import styles from "./subheader.module.scss";
const SubHeader = ({ title }) => {
  return (
    <>
      <div className={styles.subHeaderMainContainer}>
        <span className={styles.title}> {title}</span>
      </div>
    </>
  );
};
export default SubHeader;
