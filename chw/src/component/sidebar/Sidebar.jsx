import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ChwLogo, CloseIcon, DropdownIcon } from "../svg-component";
import logo1 from "../../assets/images/logo1.png";
import { colors } from "../constants/Colors";
import { routeData } from "../../data/RouteData";
import MobileScreen from "../mobile/MobileScreen";
import { useRef } from "react";
import { useSelector } from "react-redux";
const Sidebar = ({ sidebar, setSidebar }) => {
  const isMobile = MobileScreen();
  const { auth } = useSelector((state) => state);
  const activePage = Object.values(useParams())[0];
  const [value, setValue] = useState(activePage.split("/")[0]);
  const [childValue, setChildValue] = useState(
    activePage.split("/").length > 1
      ? activePage.split("/")[0] + "/" + activePage.split("/")[1]
      : activePage.split("/")[0]
  );
  const [flag, setFlag] = useState(activePage.split("/")[0]);
  const [selectIcon, setSelectIcon] = useState(true);
  const ref = useRef();
  const ref1 = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setChildValue(
      activePage.split("/").length > 1
        ? activePage.split("/")[0] + "/" + activePage.split("/")[1]
        : activePage.split("/")[0]
    );
    setFlag(activePage.split("/")[0]);
    setValue(activePage.split("/")[0]);
    // if(auth.user && activePage ==="/"){
    //   navigate('/dashboard')
    // }
  }, [activePage]);
  const handleSideBar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (sidebar && ref.current && !ref.current.contains(e.target)) {
        handleSideBar();
        //closeDropdown();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [sidebar, handleSideBar]);

  // /closeDropdown
  const handleNavigate = (item, dropdown) => {
    setValue(item.split("/")[0]);
    navigate(item);
    if (!dropdown && isMobile) {
      handleSideBar();
    }
  };
  const handleChildNavigate = (item) => {
    setChildValue(item);
    navigate(item);
    if (isMobile) {
      handleSideBar();
    }
  };

  const handleClose = () => {
    setFlag("");
    setSelectIcon(false);
  };
  const handleOpen = (name) => {
    setFlag(name);
    setSelectIcon(true);
  };

  return (
    <div className={styles.sidebarContainer} ref={isMobile ? ref : ref1}>
      <div className={styles.sidebarHeader}>
        <ChwLogo customClass={styles.logo1} />
        {isMobile && (
          <CloseIcon fillcolor={colors.white} handleClick={handleSideBar} />
        )}
      </div>
      {routeData.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.role.includes(auth.user.roleName) ? (
              <div
                key={index}
                className={
                  item.navigate === value
                    ? styles.activeLinkBox
                    : styles.deactiveLinkBox
                }
              >
                <div
                  className={styles.sideBarLink}
                  onClick={() => {
                    flag === item.navigate
                      ? selectIcon
                        ? handleClose()
                        : handleOpen(item.navigate)
                      : handleOpen(item.navigate);
                    handleNavigate(item.navigate, item.dropdown);
                  }}
                >
                  <div className={styles.linkIconTitle}>
                    <item.icon
                      flag={true}
                      fillColor={
                        item.navigate === value ? colors.blue : colors.white
                      }
                    />
                    <span className={styles.linkName}> {item.title} </span>
                  </div>

                  {item.dropdown && (
                    <DropdownIcon
                      fillColor={
                        item.navigate === value ? colors.blue : colors.white
                      }
                      customClass={
                        item.navigate === value && flag === item.navigate
                          ? styles.icon
                          : ""
                      }
                    />
                  )}
                </div>
                {selectIcon && item.dropdown && flag === item.navigate && (
                  <>
                    {item.children.map((item, index) => {
                      return (
                        <div
                          key={item.navigate}
                          className={
                            item.navigate === childValue
                              ? styles.sideBarActiveChildren
                              : styles.sideBarDeactiveChildren
                          }
                          onClick={() => {
                            handleChildNavigate(item.navigate, index);
                          }}
                        >
                          <item.icon
                            flag={item.navigate === childValue ? true : false}
                            fillColor={
                              item.navigate === childValue
                                ? colors.blue
                                : colors.secondaryDark
                            }
                          />
                          <span className={styles.childLinkName}>
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Sidebar;
