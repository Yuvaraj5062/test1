import React from 'react'
import CardHeader from '../../../../component/card-header/CardHeader'
import Circle from '../../../../component/circle/Circle'
import SpanFlex from '../../../../component/span-flex/SpanFlex'
import styles from './speciality.module.scss'
const Speciality = () => {
    return (
        <div className={styles.specialityContainer}>
            <CardHeader cardTitle="Speciality" />
            <div className={styles.specialityBody}>
                <div className={styles.specialityRow}>
                    <Circle customClass={styles.circle1} />
                    <SpanFlex title="professional" subTitile="Certified Skin Treatment" />
                </div>
                <div className={styles.specialityRow}>
                    <Circle customClass={styles.circle2} />
                    <SpanFlex title="Certified" subTitile="Cold Laser Operation" />
                </div>
                <div className={styles.specialityRow}>
                    <Circle customClass={styles.circle3} />
                    <SpanFlex title="Medication Laser" subTitile="Hair Lose Product" />
                </div>
            </div>
        </div>
    )
}

export default Speciality