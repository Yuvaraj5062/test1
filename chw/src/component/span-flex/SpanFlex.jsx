import React from 'react'
import styles from "./spanflex.module.scss";
const SpanFlex = ({title,subTitile,customTitleClass,customSubTitleClass}) => {
  return (
    <div className={[styles.spanFlexContainer].join(" ")}>
        <span className={[styles.title ,customTitleClass].join(' ')}>{title}</span>
        <span className={[styles.subTitle ,customSubTitleClass].join(' ')}>{subTitile}</span>
    </div>
  )
}

export default SpanFlex