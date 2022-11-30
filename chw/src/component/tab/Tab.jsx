import React,{useRef, useState} from 'react'
import Divider from '../divider/Divider';
import styles from "./tab.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import MobileScreen from '../mobile/MobileScreen';
const Tab = ({tabs,customClass}) => {
    const isMobile = MobileScreen()
    const activePage = Object.values(useParams())[0];
    const scrollEle = useRef(null)
   // const [value, setValue] = useState(activePage.split("/")[1]);
    const navigate = useNavigate();
    const handleClick=(item)=>{
      console.log("item",item)
      if(item==="/"){
      scrollEle.current.scrollLeft -= 80
      }else{
        scrollEle.current.scrollLeft += 120
      }
        navigate("/dashboard"+item)
    }
  return (
    <div className={styles.tabContainer}>
    <div className={styles.tabSubContainer} ref={scrollEle}>
        {tabs.map((item, index) => {
                    return (
                        <div key={index} className={"/"+activePage.split("/")[0]===item.navLink ? styles.activeTab:styles.deactiveTab} 
                        onClick={()=>{handleClick(item.navLink)}}>{item.name}</div>
                    );
                })}
                 
        </div>
        
     {!isMobile&&   <Divider/>}
        </div>

  )
}

export default Tab