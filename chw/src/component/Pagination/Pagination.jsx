// import { Next, Previous } from '../../svg-components';
// import FilledButton from '../buttons/filledbutton/FilledButton';
import styles from './pagination.module.scss'
import { colors } from '../constants/Colors';
import { useEffect, useRef, useState } from 'react';
import MobileScreen from '../mobile/MobileScreen';
import Button from '../../component/Button/Button';
const Pagination = ({ data, itemsPerPage, handlePaginate, active, handlePrevious, handleNext, length, limit }) => {
    const [startData, setStartdata] = useState(0);
    const [endData, setEndData] = useState(0);
    const pages = [];
    console.log("data",data.length)
    for (let i = 1; i <= Math.ceil(data && data.length / itemsPerPage); i++) {
        pages.push(i);
    }
    useEffect(() => {
        let end = active * limit;
        end >= length ? setEndData(length) : setEndData(end);
        let start = endData % limit === 0 ? endData - (limit - 1) : endData - (endData % limit - 1);
        // start <= 0 ? setStartdata(end - 9) : setStartdata(start)
        setStartdata(start);
    }, [active, endData, length, data.length])
    const ref = useRef();
    const isMobile = MobileScreen()
    return (
        <div className={styles.paginationContainer}>
            {/* <div className={styles.pageRangeContainer}> */}
            {
                !isMobile && <span className={styles.pageRange}>Showing {startData}-{endData} from {length} data</span>
            }

            {/* </div> */}
            <div className={styles.paginationPagesContainer}>
                <Button handleClick={() => handlePrevious(-50, ref)} title="Previous" customclass={styles.previousBtn} titleCustomclass={styles.titlePrevious} />
                <div className={styles.paginationScroll} ref={ref}>
                    {
                        pages.map((item, index) => {
                            return (
                                <span key={index} className={item === active ? styles.activePage : styles.pageNumber} onClick={() => handlePaginate(item)}>{item}</span>
                            )
                        })
                    }
                </div>
                <Button  handleClick={() => handleNext(+50, ref)} title="Next" customclass={styles.nextBtn} titleCustomclass={styles.titleNext} />
            </div>
        </div>
    )
}
export default Pagination;