import React, {useState} from "react";
import {totUsersCount} from "../../redux/selectors";
import s from "./Users.module.css";


let PaginatorVersionTwo = (props) => {
    let pages = Math.ceil(props.totalUsersCount / props.pageSize);
    let pagesArray = [];
    for (let i = 1; i < pages; i++) {
        pagesArray.push(i);
    }
    let portionSize = 4;

    let portionCount = Math.ceil(pages / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={s.button_style}>
            {portionNumber > 1 && <button type="button" onClick={(event) => {
                setPortionNumber(portionNumber - 1);
            }}><i className="fa fa-angle-double-left" aria-hidden="true"></i></button>}
            {pagesArray.filter(page => page >= leftPortionNumber && page <= rightPortionNumber)
                .map((page) => {
                    return (
                        <button type="button" onClick={(event) => {
                            props.onBtnPageClick(page)
                        }} key={page}
                                className={page === props.currentPage && s.selected}>{page}</button>
                    )
                })}


            {portionCount > portionNumber && <button type="button" onClick={(event) => {
                setPortionNumber(portionNumber + 1)
            }}><i className="fa fa-angle-double-right" aria-hidden="true"></i></button>}
        </div>
    )
}

export default PaginatorVersionTwo;