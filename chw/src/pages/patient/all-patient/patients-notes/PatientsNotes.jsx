import React from 'react'
import styles from './patientsnotes.module.scss'
import CardHeader from '../../../../component/card-header/CardHeader'
import SpanFlex from '../../../../component/span-flex/SpanFlex'
import Button from '../../../../component/Button/Button'
const PatientsNotes = () => {
    return (
        <div className={styles.patientNotesContainer}>
            <CardHeader cardTitle="Patients Notes" customeDividerClass={styles.dividerClass} />
            <div className={styles.ptientsNotesBody}>
                <SpanFlex title="Treatment was good!" subTitile="Eye Test" />
                <Button
                    title="Open"
                    type="button"
                    customclass={styles.openButton}
                />
            </div>
            <div className={styles.ptientsNotesBody}>
                <SpanFlex title="Treatment was good!" subTitile="Eye Test" />
                <Button
                    title="Open"
                    type="button"
                    customclass={styles.openButton}
                />
            </div>
            <div className={styles.ptientsNotesBody}>
                <SpanFlex title="Treatment was good!" subTitile="Eye Test" />
                <Button
                    title="Close"
                    type="button"
                    customclass={styles.closeButton}
                />
            </div>
            <div className={styles.ptientsNotesBody}>
                <SpanFlex title="Treatment was good!" subTitile="Eye Test" />
                <Button
                    title="Close"
                    type="button"
                    customclass={styles.closeButton}
                />
            </div>
            <div className={styles.ptientsNotesBody}>
                <SpanFlex title="Treatment was good!" subTitile="Eye Test" />
                <Button
                    title="Close"
                    type="button"
                    customclass={styles.closeButton}
                />
            </div>
            <div className={styles.ptientsNotesBody}>
                <SpanFlex title="Treatment was good!" subTitile="Eye Test" />
                <Button
                    title="Close"
                    type="button"
                    customclass={styles.closeButton}
                />
            </div>
        </div>
    )
}

export default PatientsNotes