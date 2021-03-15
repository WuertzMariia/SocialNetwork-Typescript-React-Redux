import React from "react";
import FriendsContainer from "./Friends/Friends";
import c from './Sidebar.module.css'
import {AppStateType} from "../../redux/redux_store";
import MenuContainer from "./Menu/Menu";

const Sidebar = () => {

    return (<div className={c.sidebar}>
        <MenuContainer />
        <FriendsContainer />
{/*       <Friends friends={props.state.sidebarPage.friends}/>*/}
        </div>
    )
}

export default Sidebar;