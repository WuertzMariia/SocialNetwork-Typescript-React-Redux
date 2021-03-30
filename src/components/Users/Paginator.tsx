import React from "react";
import s from "./Users.module.css";
import {useSelector} from 'react-redux';
import {filterSelector} from '../../redux/selectors';
import {getAllUsersFriends, getUsers} from '../../redux/usersReducer';

type PropsType = {
    totalUsersCount: number,
    onBtnPageClick: (p: number) => void
    pageSize: number,
currentPage: number,

}

let Paginator: React.FC<PropsType> = ({ totalUsersCount,
                                          pageSize,currentPage,...props }) => {
    let pages = Math.ceil(totalUsersCount / pageSize);
    let pagesArray: Array<number> = [];
    for (let i = 1; i < pages; i++) {
        pagesArray.push(i);
    }

    return (
        <div className={s.button_style}>
            {currentPage === 1 ? null : <button type="button" onClick={(event) => {
                props.onBtnPageClick(1)
            }}>

                <i className="fa fa-angle-double-left" aria-hidden="true"></i></button>}
            {currentPage <= 1 ? null : <button type="button" onClick={(event) => {
                props.onBtnPageClick(currentPage - 1)
            }}>{currentPage - 1}</button>}

            <button type="button" onClick={(event) => {
                props.onBtnPageClick(currentPage)
            }} className={s.selected}>{currentPage}</button>
            {currentPage === pages ? null : <button type="button" onClick={(event) => {
                props.onBtnPageClick(currentPage + 1)
            }}>{currentPage + 1}</button>}

            {currentPage === pages ? null : <button type="button" onClick={(event) => {
                props.onBtnPageClick(pages)
            }}>

                <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>}
        </div>
    )
}

export default Paginator;