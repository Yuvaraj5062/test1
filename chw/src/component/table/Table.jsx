import styles from "./table.module.scss";
import { colors } from "../constants/Colors";
import defaultUpload from '../../assets/images/defaultUpload.png'
import {
  DropdownIcon,
  DeleteIcon,
  PdfIcon,
  PlayOffIcon,
  PlayOn,
} from "../svg-component";
import moment from "moment";
const Table = ({
  tableheading,
  tabledata,
  customClassTable,
  customClassTableContainer,
  customClassTableHead,
  customClassTh,
  customClassTableRow,
  customClassTableRow1,
  customClassTd,
  customClassTd1,
  ButtonGroup,
  handleClick,
  dropdown,
  setDropdownValue
}) => {
  return (
    <>
      <div
        className={[styles.tableContainer, customClassTableContainer].join(" ")}
      >
        <table
          className={[styles.table, customClassTable].join(" ")}
          cellSpacing={0}
        >
          <thead>
            <tr className={customClassTableHead}>
              {tableheading.map((item, index) => (
                <TableHeader
                  item={item}
                  key={index}
                  customClassTh={customClassTh}
                  ButtonGroup={ButtonGroup}
                  handleClick={handleClick}
                  dropdown={dropdown}
                  setDropdownValue={setDropdownValue}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {tabledata.map((item, index) => (
              <TableRow
                item={item}
                tableheading={tableheading}
                key={index}
                customClassTableRow={customClassTableRow}
                customClassTableRow1={customClassTableRow1}
                customClassTd={customClassTd}
                 id={item.id}
                customClassTd1={customClassTd1}
                ButtonGroup={ButtonGroup}
                handleClick={handleClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const TableHeader = ({
  item,
  customClassTh,
  ButtonGroup,
  dropdown,
  handleClick,
  setDropdownValue
}) => {
  const handelDropdown = (value) => {
    handleClick(false);
     setDropdownValue(value);
  };

  return (
    <th className={[styles.tableHead,customClassTh].join(" ")}>
      {ButtonGroup.includes("past") && item.value === "fullName" ? (
        <div className={styles.popupParent} onClick={() => handleClick(!dropdown)}>
          {item.label}
          <DropdownIcon
            fillColor={colors.thursaryDark}
            customClass={dropdown ? styles.icon1 : styles.icon}
          />
          {dropdown && (
            <div className={styles.popup}>
              <p onClick={() => handelDropdown("Encounter")}>Encounter</p>
              <p onClick={() => handelDropdown("Appointment")}>Appointment</p>
            </div>
          )}
        </div>
      ) : (
        item.label
      )}
    </th>
  );
};
const TableRow = ({
  item,
  ButtonGroup,
  tableheading,
  customClassTableRow,
  customClassTd,
  handleClick,
  

}) => {
  //   const handlePlay = () => {
  //   //  setisToggled1(!isToggled1);
  //   console.log("okay bro")
  //    handleClick(10)
  // ;
  return (
    <tr className={[customClassTableRow, styles.tableRow].join(" ")}>
      {tableheading.map((tableheadingitem, index) => {
        return (
          <td
            className={[customClassTd, styles.tableRowData].join(" ")}
            key={index}
          >
            {tableheadingitem.label === "Actions" ? (
              <>
                {ButtonGroup.includes("play") && (
                  <PlayOffIcon
                    customClass={styles.playIcon}
                    fillColor={colors.primaryMediumDark}
                    handleClick={() => handleClick({status:"play",id:item[`${tableheadingitem.value}`],appointmentId:item[`${tableheadingitem.delvalue}`]})}
                  />
                )}
                  {ButtonGroup.includes("inprogress") && (
                  <PlayOn
                    customClass={styles.playIcon}
                    fillColor={colors.primaryMediumDark}
                    handleClick={() => handleClick({status:"play",id:item[`${tableheadingitem.value}`],appointmentId:item[`${tableheadingitem.delvalue}`]})}
               
                  />
                )}
                {ButtonGroup.includes("file") && (
                  <PdfIcon
                    customClass={styles.pdfIcon}
                    fillColor={colors.primaryMediumDark}
                    handleClick={() => handleClick({status:"file",id:item[`${tableheadingitem.value}`]})}
               
                  />
                )}
                {ButtonGroup.includes("delete") && (
                  <DeleteIcon
                    fillColor={colors.red}
                    handleClick={() => handleClick({status:"delete",appointmentId:item[`${tableheadingitem.delvalue}`]})}
               
                  />
                )}
              </>
            ) : //  item[`${tableheadingitem.value}`]
              tableheadingitem.value === "image" ? (
                <img className={styles.image} src={item[`${tableheadingitem.value}`]?item[`${tableheadingitem.value}`]:defaultUpload} alt="user" />
              ):
              tableheadingitem.label === "Date"  ? (
                item[`${tableheadingitem.value}`] &&
                moment(item[`${tableheadingitem.value}`]).format("DD-MM-yyyy")
              )
              // :
              // tableheadingitem.label === "Timing"  ? (
              //   item[`${tableheadingitem.value}`] &&
              //   moment(item[`${tableheadingitem.value}`]).format("HH:MM")
              // )
               : (
                item[`${tableheadingitem.value}`]
                
              )}
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
