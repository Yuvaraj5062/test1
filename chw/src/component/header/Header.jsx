import React, { useEffect, useRef, useState } from "react";
import Search from "../search/Search";
import Dropdown from "../../component/dropdown/Dropdown";
import {
  DropdownIcon,
  NotificationIcon,
  MailIcon,
  MenuIcon,
  SearchIconMobileHeader,
} from "../svg-component";
import userImage from "../../assets/images/userImage.png";
import country1 from "../../assets/images/country1.png";
import styles from "./header.module.scss";
import { colors } from "../constants/Colors";
import MobileScreen from "../mobile/MobileScreen";
import { useSelector } from "react-redux";
const Header = ({ setSidebar, sidebar }) => {
  const isMobile = MobileScreen();
  const { auth } = useSelector((state) => state);
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(["English", country1]);
  const handleSideBar = () => {
    setSidebar(!sidebar);
  };
  const dropdownData = [
    <span
      className={styles.dropdownItems}
      onClick={() => {
        setDropdown(false);
        setSelectedCountry(["English", country1]);
      }}
    >
      <img src={country1} alt="country" className={styles.countryImage} />
      <span className={styles.dropdownText}>English</span>
    </span>,
    <span
      className={styles.dropdownItems}
      onClick={() => {
        setDropdown(false);
        setSelectedCountry(["Hindi", country1]);
      }}
    >
      <img src={country1} alt="country" className={styles.countryImage} />
      <span className={styles.dropdownText}>Hindi</span>
    </span>,
    <span
      className={styles.dropdownItems}
      onClick={() => {
        setDropdown(false);
        setSelectedCountry(["Chinese", country1]);
      }}
    >
      <img src={country1} alt="country" className={styles.countryImage} />
      <span className={styles.dropdownText}>Chinese</span>
    </span>,
  ];
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className={styles.headerContainer}>
      {isMobile ? (
        <div className={styles.headerLeftMobile}>
          <MenuIcon handleClick={handleSideBar} />
          <MailIcon
            fillColor={colors.primaryDark}
            customClass={styles.mobileIcon}
          />
        </div>
      ) : (
        <div className={styles.headerLeft}>
          <Search
            customClass={styles.headerSearchIcon}
            custominputClass={styles.headerSearchInput}
            placeholderText="Type here to Search"
          />
        </div>
      )}
      <div className={styles.headerRight}>
        {isMobile && <SearchIconMobileHeader />}
        <div
          className={styles.dropdownContainer}
          onClick={() => handleDropdown()}
        >
          <img
            src={selectedCountry[1]}
            alt="user"
            className={styles.countryImage}
          />
          {!isMobile && (
            <span className={styles.dropdownContent}>{selectedCountry[0]}</span>
          )}

          {!isMobile && (
            <DropdownIcon
              fillColor={colors.primaryDark}
              customClass={styles.icon}
            />
          )}
          <div className={styles.headerMenu} ref={ref}>
            {dropdown && (
              <Dropdown
                dropdownItems={dropdownData}
                customClassForContent={styles.dropdownListContent}
              />
            )}
          </div>
        </div>
        <NotificationIcon fillColor={colors.primaryDark} />
        <MailIcon
          fillColor={colors.primaryDark}
          customClass={styles.headerIcon}
        />
        <img src={userImage} alt="user" className={styles.headerImage} />
        {!isMobile && (
          <div className={styles.headerUserDetails}>
            <span className={styles.userName}>
              {/* {auth.user.userName} */}
              {auth.user.roleName}
              {/* Bini Jets */}
            </span>
            <span className={styles.userStatus}>Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
