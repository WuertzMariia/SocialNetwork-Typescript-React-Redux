import React from "react";
import { NavLink } from "react-router-dom";
import c from './../Sidebar.module.css'
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux_store";
import {SidebarType} from "../../../redux/sidebarReducer";

type SideBarPropsType = {
    sidebar: Array<SidebarType>
}

const Menu: React.FC<SideBarPropsType> = (props) => {
    let sidebardata = props.sidebar.map((s:SidebarType) => <div className={c.item}><NavLink to={s.path} activeClassName={c.activeLink}>{s.name}</NavLink></div> );
    return (<div className={c.sidebar}>
        {sidebardata}
        </div>
    )
} 
let mapStateToProps = (state: AppStateType) => ({
    sidebar: state.sidebarPage.sideb
})

const MenuContainer = connect(mapStateToProps)(Menu);

export default MenuContainer;