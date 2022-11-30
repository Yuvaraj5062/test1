import styles from "./popup.module.scss";
const PopUp = ({
  Children,
  handleClose,
  setIsDelete,
  id,
  setEditDetail,
  title,
  type,
  message,
}) => {
  return (
    <div className={styles.popup} onClick={() => handleClose()}>
      <Children
        handleClose={() => handleClose()}
        setIsDelete={setIsDelete}
        id={id}
        setEditDetail={setEditDetail}
        type={type}
        message={message}
      />
    </div>
  );
};
export default PopUp;
