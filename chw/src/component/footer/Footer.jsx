import styles from "./footer.module.scss";
const Footer = ({ customClass }) => {
  return (
    <div className={[styles.footerComponent, customClass].join(" ")}>
      <div className={styles.footerLeft}>
        <span className={styles.footerLeftText}>Privacy Policy</span>
        <span className={styles.footerLeftText}>Terms of Use</span>
      </div>
      <div className={styles.footerRight}>
        Copyright 2022 <span className={styles.xray}>CHW</span> All Rights
        Reserved.
      </div>
    </div>
  );
};

export default Footer;
