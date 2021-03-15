import React from "react";
import s from "./Users.module.css";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
onBtnPageClick : (p: number)=>void,
currentPage: number
}

let Paginator: React.FC<PropsType> = ({ totalUsersCount,
                                          pageSize,
                                          onBtnPageClick,currentPage }) => {
    let pages = Math.ceil(totalUsersCount / pageSize);
    let pagesArray: Array<number> = [];
    for (let i = 1; i < pages; i++) {
        pagesArray.push(i);
    }
    return (
        <div className={s.button_style}>
            {currentPage === 1 ? null : <button type="button" onClick={(event) => {
                onBtnPageClick(1)
            }}>

                <i className="fa fa-angle-double-left" aria-hidden="true"></i></button>}
            {currentPage <= 1 ? null : <button type="button" onClick={(event) => {
                onBtnPageClick(currentPage - 1)
            }}>{currentPage - 1}</button>}

            <button type="button" onClick={(event) => {
                onBtnPageClick(currentPage)
            }} className={s.selected}>{currentPage}</button>
            {currentPage === pages ? null : <button type="button" onClick={(event) => {
                onBtnPageClick(currentPage + 1)
            }}>{currentPage + 1}</button>}

            {currentPage === pages ? null : <button type="button" onClick={(event) => {
                onBtnPageClick(pages)
            }}>

                <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>}
        </div>
    )
}

export default Paginator;