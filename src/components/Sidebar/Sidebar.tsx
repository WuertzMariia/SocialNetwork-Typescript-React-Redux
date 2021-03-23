import React from 'react';
import FriendsContainer from './Friends/Friends';
import c from './Sidebar.module.css'
import MenuContainer from './Menu/Menu';

const Sidebar = () => {

    return (<div className={c.sidebar}>
            <div><MenuContainer/></div>
            <div><FriendsContainer/></div>
        </div>
    )
}

export default Sidebar;