import React, { useState } from 'react'
import Profile from './profile/Profile'
import styles from './allpatient.module.scss'
import Speciality from './speciality/Speciality'
import Information from './profile-information/Information'
import Schedule from './schedule/Schedule'
import PatientsNotes from './patients-notes/PatientsNotes'
import CardHeader from '../../../component/card-header/CardHeader'
import Table from '../../../component/table/Table'
import { physicanEducationHeader, physicanEducationTableData } from "../../../data/PhysicansInformation";
import DragDropFile from '../../../component/drag-drop/DragDropFile'
const AllPatient = () => {
  const [imgList, setImgList] = useState([])
  const [files, setFiles] = useState({});
  const [validationValue,setValidationValue]=useState(1)
  const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 
    18, 19, 20, 21, 22, 23, 24, 25, 26,27,28]
  return (
    <div className={styles.allPatientContainer}>
      {/* <Profile/>
      <Speciality />
      <Information />
      <Schedule /> */}
      {/* <PatientsNotes /> */}
      {/* <div className={styles.educationContainer}>
            <CardHeader cardTitle="Education" />
            <Table
          tableheading={physicanEducationHeader}
          tabledata={physicanEducationTableData}
          ButtonGroup={[]}
          // handleClick1={setPlay}
          // handleClick2={setFile}
        />
      </div> */}
      {/* <div className={styles.educationContainer}>
            <CardHeader cardTitle="Experience" />
            <Table
          tableheading={physicanEducationHeader}
          tabledata={physicanEducationTableData}
          ButtonGroup={[]}
          // handleClick1={setPlay}
          // handleClick2={setFile}
        />
      </div> */}
      {/* <div className={styles.photosContainer}>
            <CardHeader cardTitle="Photos" />
            <div className={styles.photos}>
            {dummyArray.map((item, index) => {
            return (
              <DragDropFile
              key={item}
                name={"identitycard"+index}
                index={index}
                files={files}
                setFiles={setFiles}
                active={true}
                filetype='PDF,PNG,JPEG,JPG max size upto 2MB'
                setValidationValue={setValidationValue}
                validationValue={validationValue}
                setImgList={setImgList}
                imgList={imgList}
              />
            )
          })}
            </div>
      </div> */}

    </div>
  )
}

export default AllPatient