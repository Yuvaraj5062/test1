import React from 'react'
import VerticalTable from '../../../../component/vertical-table/VerticalTable'
import styles from './information.module.scss'
import { physicanInformationHeader, physicanInformationTableData } from '../../../../data/PhysicansInformation'
import CardHeader from '../../../../component/card-header/CardHeader'

const Information = () => {
  return (
    <div className={styles.informationCotainer}>
      <CardHeader cardTitle="Personal Information" />
      <VerticalTable  
        tableheading={physicanInformationHeader}
        tabledata={physicanInformationTableData}
        customClassTableContainer={styles.tableContainer}
      />
    </div>
  )
}

export default Information