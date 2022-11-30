import styles from "./serverpagination.module.scss";
import { useEffect, useRef, useState } from "react";
import MobileScreen from "../mobile/MobileScreen";
import Button from "../../component/Button/Button";
import { colors } from "../constants/Colors";
import { DropdownIcon } from "../svg-component";
const ServerPagination = ({
  data,
  dropDownValues,
  pageLimit,
  setPageLimit,
  handlePaginate,
  active,
  handlePrevious,
  handleNext,
  length,
  limit,
  customClass
}) => {
  const [startData, setStartdata] = useState(0);
  const [endData, setEndData] = useState(0);
  const pages = [];
  for (let i = 1; i <= data; i++) {
    pages.push(i);
  }
  useEffect(() => {
    let end = active * pageLimit;
    end >= length ? setEndData(length) : setEndData(end);
    let start =
      endData % pageLimit === 0
        ? pageLimit - 1
        : endData - ((endData % pageLimit) - 1);
    setStartdata(start);
  }, [active, endData]);
  //[active, endData, length, data.length])
  const ref = useRef();
  const [dropdown, setDropdown] = useState();

  const isMobile = MobileScreen();
  const handleCloseDropdown = () => {
    setDropdown(false);
  };
  // useEffect(() => {
  //     console.log("useEffet")
  //     const checkIfClickedOutside = (e) => {
  //         if (dropdown && ref.current && !ref.current.contains(e.target)) {
  //             handleCloseDropdown();
  //         }
  //     };
  //     document.addEventListener("mousedown", checkIfClickedOutside);
  //     return () => {
  //         document.removeEventListener("mousedown", checkIfClickedOutside);
  //     };
  // }, [handleCloseDropdown]);

  const handleOpenDropdown = () => {
    setDropdown(true);
  };
  const handleSetValue = (item) => {
    setPageLimit(item);
  };

  return (
    <div className={[styles.paginationContainer, customClass].join(" ")}>
      {!isMobile && (
        <div className={styles.pageRange}>
          <div
            className={styles.pageDropdown}
            ref={ref}
            onClick={() =>
              dropdown ? handleCloseDropdown() : handleOpenDropdown()
            }
          >
            <span className={styles.pageLimit}>{pageLimit}</span>
            <DropdownIcon
              fillColor={colors.secondaryBlur}
              customClass={styles.icon}
            />
            {dropdown && (
              <div className={[styles.dropdownContent].join(" ")}>
                {dropDownValues.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSetValue(item)}
                      className={[[styles.dropdownItem].join(" ")].join(" ")}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <span className={styles.pagenationText}>
            Showing {endData} from {length} data{" "}
          </span>
        </div>
      )}
      <div className={styles.paginationPagesContainer}>
        <Button
          handleClick={() => handlePrevious(-50, ref)}
          title="Previous"
          customclass={styles.previousBtn}
          titleCustomclass={styles.titlePrevious}
        />
        <div className={styles.paginationScroll} ref={ref}>
          {pages.map((item, index) => {
            return (
              <span
                key={index}
                className={
                  item === active ? styles.activePage : styles.pageNumber
                }
                onClick={() => handlePaginate(item)}
              >
                {item}
              </span>
            );
          })}
        </div>
        <Button
          handleClick={() => handleNext(+50, ref)}
          title="Next"
          customclass={styles.nextBtn}
          titleCustomclass={styles.titleNext}
        />
      </div>
    </div>
  );
};
export default ServerPagination;
