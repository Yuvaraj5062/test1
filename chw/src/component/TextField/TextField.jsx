import styles from "./textfield.module.scss";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

const TextField = ({
  customclassContainer,
  customclass,
  label,
  customclassInputType,
  placeholder,
  type,
  options,
  customClassDropdown,
  value,
  handelChange,
  errors,
  object,
  disabled,
  inputRef,
  customPlaceholder,
  countryIso
}) => {
  return (
    <div
      className={[styles.textfieldContainer, customclassContainer].join(" ")}
    >
      <label className={[styles.label, customclass].join(" ")}>{label}</label>
      {type === "select" ? (
        object ? (
          <select
            className={[
              value ? styles.selectedtype : styles.type,
              customClassDropdown,
            ].join(" ")}
            ref={inputRef}
            value={value}
            onChange={handelChange}
          >
            <option
              value=""
              className={[styles.placeholderText, customPlaceholder].join(" ")}
            >
              Select {label}
            </option>
            {options.map((item, index) => {
              return (
                <option
                  onClick={() => handelChange(item.doctorId)}
                  key={index}
                  value={item.doctorId}
                >
                  {item.fullName}
                </option>
              );
            })}
          </select>
        ) : (
          <select
            className={[
              value ? styles.selectedtype : styles.type,
              customClassDropdown,
            ].join(" ")}
            ref={inputRef}
            value={value}
            onChange={handelChange}
            disabled={disabled ? disabled : false}
          >
            <option
              value=""
              className={[styles.placeholderText, customPlaceholder].join(" ")}
            >
              Select {label}
            </option>
            {options.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        )
      ) : type !== "tel" ? (
        <input
          ref={inputRef}
          type={type}
          className={[styles.inputType, customclassInputType].join(" ")}
          placeholder={placeholder}
          value={value}
          onChange={handelChange}
          disabled={disabled ? disabled : false}
        />
      ) : (
        <PhoneInput
          className={styles.checkinput}
          international
          defaultCountry={countryIso?countryIso:"IN"}
          countryCallingCodeEditable={false}
          placeholder={placeholder}
          value={value}
          onChange={(e)=>{handelChange(e)}}
        />
      )}
      {errors && <span className={styles.error}>{errors}</span>}
    </div>
  );
};
export default TextField;
