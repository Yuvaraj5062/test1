import React from 'react'
import { SearchIcon } from '../svg-component';
import styles from "./search.module.scss";
import { colors } from '../constants/Colors';
const Search = ({ customClass, custominputClass, placeholderText }) => {
  return (
    <div className={styles.searchContainer}>
      
      <input type='text' placeholder={placeholderText} className={custominputClass} />    
    
       <SearchIcon fillColor={colors.primaryMediumDark} />
    </div>
  )
}

export default Search