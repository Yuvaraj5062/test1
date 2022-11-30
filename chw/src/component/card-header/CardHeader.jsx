import React from 'react'
import Divider from '../divider/Divider'
import styles from './cardheader.module.scss'
const CardHeader = ({cardTitle,customClass,customeDividerClass}) => {
  return (
    <>
    <div className={[styles.cardTitle, customClass].join(" ")}>
    {cardTitle}
</div>
<Divider customClass={customeDividerClass}/>
</>
  )
}

export default CardHeader