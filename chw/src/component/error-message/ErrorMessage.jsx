import React from 'react'
import styles from './errormessage.module.scss'
const ErrorMessage = ({message}) => {
  return (
    <div className={styles.errorMessageContainer} >
        <span className={styles.errorMessage}>{message}</span>
    </div>
  )
}

export default ErrorMessage