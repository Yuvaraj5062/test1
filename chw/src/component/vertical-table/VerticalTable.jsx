import styles from "./verticaltable.module.scss";


const VerticalTable = ({
  tableheading,
  tabledata,
  customClassTable,
  customClassTableContainer,
  customClassTableHead,
  customClassTh,
  customClassTd
 
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
          {tableheading.map((item, index) => (
            <tr className={customClassTableHead} key={index}>
              <th className={[styles.tableHeader, customClassTh].join(" ")}>  
                <TableHeader
                item={item}
                key={index}
              />
              </th>
              <td className={[styles.tablerow, customClassTd].join(" ")}>
                <TableRow
                  item={tabledata[0]}
                  key={index}
                  tableheading={item}
                  />
              </td>
            </tr>
          ))}




        </table>
      </div>
    </>
  );
};

const TableHeader = ({
  item,
  customClassTh,

}) => {
  return (
    <>
      {item.label}
    </>
  );
};
const TableRow = ({
  item,
  tableheading,
}) => {

  return (
    <>
      {item[`${tableheading.value}`]}
    </>
  );
};

export default VerticalTable;
