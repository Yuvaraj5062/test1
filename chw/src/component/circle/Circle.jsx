import React from 'react'
import styles from './circle.module.scss'
const Circle = ({customClass}) => {
  return (
    <div className={[styles.circleContainer,customClass].join(" ")}></div>
  )
}

export default Circle