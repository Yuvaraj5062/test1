import { CloseIcon } from "../svg-component";
import styles from "./button.module.scss";
import { colors } from "../constants/Colors";
import Spinner from "../spinner/Spinner";
const Button = ({
  type,
  customclass,
  titleCustomclass,
  title,
  loader,
  handleClick,
  crossIcon,
  setSelectedButton,
  item,
  setButtonList,
  disabled,
}) => {
  const handleDelete = () => {
    setSelectedButton((names) => names.filter((name) => name !== item));
    setButtonList((names) => names.filter((name) => name !== item));
    handleClick();
  };
  return (
    <>
      {crossIcon ? (
        <button className={[styles.button, customclass].join(" ")} type={type}>
          <span className={titleCustomclass}>
            <span onClick={() => (handleClick ? handleClick() : {})}>
              {title}
            </span>

            {crossIcon && (
              <CloseIcon
                fillcolor={colors.white}
                handleClick={() => {
                  handleDelete();
                }}
              />
            )}
          </span>
        </button>
      ) : (
        <button
          className={[styles.button, customclass].join(" ")}
          disabled={disabled ? disabled : loader}
          type={type}
          onClick={() => (handleClick ? handleClick() : {})}
        >
          <span className={[styles.spinner, titleCustomclass].join(" ")}>
            {loader && <Spinner />}
            {title}
          </span>
        </button>
      )}
    </>
  );
};
export default Button;
