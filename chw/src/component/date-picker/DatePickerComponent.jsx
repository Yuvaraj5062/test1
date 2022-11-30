import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";
import styles from './datepickercomponent.module.scss'
import '../../styles/libraries.css'

import { useState } from 'react';
import { useEffect } from 'react';
import moment from "moment";
import { DropdownIcon } from '../svg-component';
import { colors } from '../constants/Colors';
const DatePickerComponent = ({ reference, startDate, setStartDate }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const years = range(1950, getYear(new Date()) + 1, 1);
  const [selyear, setSelyear] = useState(moment(new Date()).format("yyyy"))
  const [yeardropdown, setYearDropdown] = useState(false)
  const [month, setMonth] = useState(moment(new Date()).format("MMM"))
  const [flag, setFlag] = useState(false)
  const [monthdropdown, setMonthDropdown] = useState(false)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  // useEffect(() => {

  //   if (startDate) {
  //     let seldate = moment(startDate).format("DD")
  //     setStartDate('')
  //     if(month){
  //     let date = new Date(`${selyear}/${month}/${seldate}`)
  //     setStartDate(date)
  //     }
  //   }
  // }, [month, selyear, flag]);


const selectedDate=(date)=>{
  setFlag(!flag)
  if(month){
    if((String(selyear) === String(moment(new Date()).format("yyyy")) 
    && String(month) === String(moment(new Date()).format("MMM")))
    && moment(date).format("DD")>moment(new Date()).format("DD"))
    {
    }
    else{
      let seldate = moment(date).format("DD")
      setStartDate('')
     let modifiedDate = new Date(`${selyear}/${month}/${seldate}`)
    setStartDate(new Date(moment(modifiedDate).format("yyyy-MM-DD")))
    // setStartDate(modifiedDate)
    }
    }
}

  const handleMonth = () => {
    setYearDropdown(false)
    setMonthDropdown(!monthdropdown)
    setStartDate('')
  }
  const handleYear = () => {
    setYearDropdown(!yeardropdown)
    setMonthDropdown(false)
    setMonth('')
    setStartDate('')
  }

  // console.log("date",date)
  return (
    <DatePicker
      wrapperClassName={styles.datePicker}
      popperClassName={styles.datePick}
      ref={reference}
      dateFormat="dd-MM-yyyy"
      maxDate={String(selyear) === String(moment(new Date()).format("yyyy")) && String(month) === String(moment(new Date()).format("MMM")) && new Date()}
      showFourColumnMonthYearPicker
      placeholderText='Date of Birth'
      onChangeRaw={(e) => e.preventDefault()}
      onFocus={(e) => e.target.readOnly = true}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => (
        <div className={styles.datePickerContainer}>
          <span className={styles.dropdownArrow} onClick={() => handleYear()}>

            {selyear}
            <DropdownIcon
              fillColor={colors.secondaryBlur}
              customClass={[styles.expandIcon].join(" ")}
            // handleClick={() => setIsDropdown((prevState) => !prevState)}
            />
            {yeardropdown &&
              <span className={styles.dropdown}
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                {years.map(option => (
                  <span key={option} value={option} onClick={() => {
                    setSelyear(option)
                    handleYear()
                  }
                  }>
                    <span className={styles.options}>      {option} </span>
                  </span>
                ))}
              </span>
            }
          </span>


          <span className={styles.dropdownArrow} onClick={() => handleMonth()}>
            {month}
            <DropdownIcon
              fillColor={colors.secondaryBlur}
              customClass={[styles.expandIcon].join(" ")}
            // handleClick={() => setIsDropdown((prevState) => !prevState)}
            />
            {monthdropdown &&
              <span className={styles.dropdown} onClick={(e) => {
                e.stopPropagation();
              }}>
                {months.map((option, index) => (
                  <span key={option} value={option} onClick={() => {
                    setMonth(option)
                    handleMonth()
                  }
                  }>
                    {selyear != moment(new Date()).format("yyyy") ?
                      <span className={styles.options}>
                        {option}
                      </span>
                      : index + 1 <= moment(new Date()).format("M") && <span className={styles.options}>

                        {option}

                      </span>}

                    {/* <span className={styles.options}> {option} {month}{month>=moment(new Date()).format("MMM")}</span>
               */}
                  </span>
                ))}
              </span>
            }
          </span>




          {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button> */}
          {/* <select
            className={styles.selectDropdown}
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select> */}
          {/* <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select> */}

          {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button> */}
        </div>
      )}
      selected={startDate}
      onChange={(date) => {
        selectedDate(date)
        
      }}
    />
  );
};


export default DatePickerComponent