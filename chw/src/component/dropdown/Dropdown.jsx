import styles from "./dropdown.module.scss";

const DropDown = ({
  dropdownItems,
  customClassForContent,
  customClassForItems,
  customClassForActiveItems,
  value,
  customclassItem,
}) => {
  return (
    <div className={[styles.dropdownContent, customClassForContent].join(" ")}>
      {dropdownItems.map((item, index) => {
        return (
          <p
            key={index}
            className={[
              [styles.dropdownItem, customclassItem].join(" "),
              index === value ? customClassForActiveItems : customClassForItems,
            ].join(" ")}
          >
            {item.title ? item.title : item}
          </p>
        );
      })}
    </div>
  );
};
export default DropDown;
