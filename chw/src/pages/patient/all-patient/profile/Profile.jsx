import React, { useState } from 'react'
import Divider from '../../../../component/divider/Divider';
import ImageRound from '../../../../component/image-round/ImageRound';
import SpanFlex from '../../../../component/span-flex/SpanFlex';
import styles from "./profile.module.scss";
import defaultUpload from '../../../../assets/images/defaultUpload.png'
import UploadFile from '../../../../component/upload-file/UploadFile';
const Profile = () => {
    const [img, setImg] = useState({
        value: '',
        message: ""
    })
    return (
        <div className={styles.profileContainer}>
            <div className={styles.ProfileContant}>
                <ImageRound path={defaultUpload}
                    customClass={styles.profileImage}
                />
                {/* <UploadFile 
                selectedFileText=""
                customImageClass={styles.profileImage}
                type="button"
                setImg={setImg}
                img={img} 
                imgClick={true}/> */}

                <SpanFlex title="Bini jets" subTitile="physician"
                    customTitleClass={styles.profileName} customSubTitleClass={styles.profilesubTitle} />
            </div>
            <div className={styles.profileDiscription}>
                Lorem ipsum dolor sit, consectetur adipisicing Delectus repudiandae eveniet harum.
            </div>
            <Divider customClass={styles.outerDividerClass} />
            <div className={styles.profileFooter}>
                <SpanFlex title={4500} subTitile="Operations" customTitleClass={styles.title} customSubTitleClass={styles.subTitle} />
                <Divider customClass={styles.dividerClass} />
                <SpanFlex title={100} subTitile="Hospitals" customTitleClass={styles.title} customSubTitleClass={styles.subTitle} />
                <Divider customClass={styles.dividerClass} />
                <SpanFlex title={10000} subTitile="Patients" customTitleClass={styles.title} customSubTitleClass={styles.subTitle} />
            </div>

        </div>
    )
}

export default Profile