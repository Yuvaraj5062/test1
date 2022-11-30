import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Sidbar from "../../component/sidebar/Sidebar";
import styles from "./main.module.scss";
import Footer from "../../component/footer/Footer";
import MobileScreen from "../../component/mobile/MobileScreen";
import { useNavigate } from "react-router-dom";
const Main = ({ children }) => {
  const isMobile = MobileScreen();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(isMobile ? false : true);
  useEffect(() => {
    setSidebar(isMobile ? false : true);
  }, [isMobile]);
    useEffect(()=>{
      window.addEventListener('unload', handleLogout);
   })

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainSideBarContent}>
        {sidebar && <Sidbar setSidebar={setSidebar} sidebar={sidebar} />}
        {/* {!isMobile && <div className={styles.sideBarRightContent}></div>} */}
      </div>
      <div className={styles.mainContent}>
        <Header setSidebar={setSidebar} sideBar={sidebar} />
        <div className={styles.children}>{children}</div>
        <Footer customClass={styles.footer} />
      </div>
    </div>
  );
};

export default Main;
