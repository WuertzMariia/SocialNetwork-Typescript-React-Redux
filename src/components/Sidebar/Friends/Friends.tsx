import React from "react";
import {NavLink} from "react-router-dom";
import c from './../Sidebar.module.css'
import s from './Friends.module.css'
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux_store";
import {FriendsType} from "../../../redux/sidebarReducer";
type FriendsPropsType = {
    friends: Array<FriendsType>
}
const Friends: React.FC<FriendsPropsType> = (props) => {
    // @ts-ignore
    let friendsdata = props.friends.map(f => <div>
        <img className={s.imageClass} src={f.src}>
        </img>
        <NavLink to="/#">{f.name}</NavLink>
    </div>)

    return <div className={c.sidebar_friends}>
        <h2>Friends</h2>
        <div className={s.friendsblock}>
            {friendsdata}
        </div>
    </div>
};
let mapStateToProps = (state: AppStateType) => ({
    friends: state.sidebarPage.friends
});

const FriendsContainer = connect(mapStateToProps,{})(Friends);
export default FriendsContainer;