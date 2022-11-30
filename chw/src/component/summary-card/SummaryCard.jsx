import React from 'react'
import Divider from '../divider/Divider';
import Table from '../table/Table';
import styles from "./summarycard.module.scss";

const SummaryCard = ({ headerText,tableHeader,tableData,customClass ,
    customClassTh,customClassTableRow,customClassTableContainer,customClassTd}) => {
    return (
        <div className={[styles.summaryCardContainer,customClass].join(" ")}>
            <div className={styles.summaryCardHeader}>
                {headerText}
            </div>
            <Divider />
            <Table
             tableheading={tableHeader}
             tabledata={tableData}
             customClassTh={customClassTh}
             customClassTableContainer={customClassTableContainer}
            //  customClassTableRow={styles.tableRow}
             customClassTd={customClassTd}
             ButtonGroup={[]}  
        />
        
        </div>
    )
}

export default SummaryCard