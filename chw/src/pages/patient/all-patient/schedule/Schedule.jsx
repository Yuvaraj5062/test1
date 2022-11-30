import React from 'react'
import CardHeader from '../../../../component/card-header/CardHeader'
import SpanFlex from '../../../../component/span-flex/SpanFlex'
import styles from './schedule.module.scss'
const Schedule = () => {
    return (
        <div className={styles.scheduleContainer}>
            <CardHeader cardTitle="Schedule" customeDividerClass={styles.dividerClass} />
            <div className={styles.scheduleBody}>
                <SpanFlex title="Ruby saul (Blood Check)" subTitile="09:00 AM"   />
                <span className={styles.scheduleDay}>Today</span>
            </div>
            <div className={styles.scheduleBody}>
                <SpanFlex title="Ruby saul (Blood Check)" subTitile="09:00 AM"   />
                <span className={styles.scheduleDay}>Today</span>
            </div>
            <div className={styles.scheduleBody}>
                <SpanFlex title="Ruby saul (Blood Check)" subTitile="09:00 AM"   />
                <span className={styles.scheduleDay}>Today</span>
            </div>
            <div className={styles.scheduleBody}>
                <SpanFlex title="Ruby saul (Blood Check)" subTitile="09:00 AM"   />
                <span className={styles.scheduleDay}>Today</span>
            </div>
            <div className={styles.scheduleBody}>
                <SpanFlex title="Ruby saul (Blood Check)" subTitile="09:00 AM"   />
                <span className={styles.scheduleDay}>Today</span>
            </div>
            <div className={styles.scheduleBody}>
                <SpanFlex title="Ruby saul (Blood Check)" subTitile="09:00 AM"   />
                <span className={styles.scheduleDay}>Today</span>
            </div>
        </div>
    )
}

export default Schedule