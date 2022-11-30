import React from "react";
import MobileScreen from "../../component/mobile/MobileScreen";
import StatCard from "../../component/stat-card/StatCard";
import Tab from "../../component/tab/Tab";
import styles from "./dashboard.module.scss";
import { TabData } from "../../data/Tabdata";
import { ClinicalStaffCardData } from "../../data/ClinicalStaffCardData";
import ClinicalStaffCard from "../../component/clinical-staff-card/ClinicalStaffCard";
const Dashboard = ({ children }) => {
  const isMobile = MobileScreen();
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <StatCard
          percentege={80}
          value={500}
          subTitle="Total Appointment"
          background={`linear-gradient(to top, #089BAB 80%, #CCFAFF 0%)`}
        />
        <StatCard
          percentege={20}
          value={5000}
          subTitle="Completed Operations"
          background={`linear-gradient(to top, #FF8D38 20%,  #FFDBC0 0%)`}
        />
        <StatCard
          percentege={70}
          value={1200}
          subTitle="New Patients"
          background={`linear-gradient(to top,  #DC3545 70%,#FFD3D8 0%)`}
        />
        <StatCard
          percentege={90}
          value={6500}
          subTitle="Total Earning"
          background={`linear-gradient(to top,  #08AB5D 90%,#CCFFD1 0%)`}
        />
      </div>
      <div className={styles.dashboardBody}>
        <div className={styles.dashboardBodyLeft}>
          <Tab tabs={TabData} />
          {!isMobile && children}
        </div>

        {isMobile && children}

        <div className={styles.dashboardBodyRight}>
          <ClinicalStaffCard data={ClinicalStaffCardData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
