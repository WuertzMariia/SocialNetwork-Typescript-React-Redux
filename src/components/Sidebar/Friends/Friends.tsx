import React from 'react';
import {NavLink} from 'react-router-dom';
import c from './../Sidebar.module.css'
import s from './Friends.module.css'
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux_store';
import {getAllUsersFriends, UsersShortType} from '../../../redux/usersReducer';
import Preloader from '../../Preloader/Preloader';
import {getUsersFriends} from '../../../redux/sidebarReducer';


type FriendsPropsType = {
    friends: Array<UsersShortType>,
    friendsLoaded: boolean
}

type FriendsExtraType = {
    onFriendsBtnClick: () => void
}

type DispatchPropsType = {
    getUsersFriends: () => void,
    getAllUsersFriends: (currentPage: number, pageSize: number) => void
}
const Friends: React.FC<FriendsPropsType & FriendsExtraType> = (props) => {

    let friendsdata = props.friends.map(f => <div className={s.eachFriend}>
        {f.photos.small === null ? <img className={s.imageClass}
                                        src={'https://trikky.ru/wp-content/blogs.dir/1/files/2020/03/29/avatarka.jpg'}></img> :
            <img className={s.imageClass} src={f.photos.small}>
            </img>}
        <NavLink to={'/profile/' + f.id}>{f.name}</NavLink>
    </div>)
let pth = "friends";
    return <div className={c.sidebar_friends}>
        <h2><NavLink to={'/users/'+pth} onClick={props.onFriendsBtnClick}>Friends</NavLink></h2>
        <div className={s.friendsblock}>
            {props.friendsLoaded ? friendsdata : <Preloader/>}
        </div>
    </div>
};

class FriendsContainerC extends React.Component<FriendsPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.getUsersFriends();
    }

    onFriendsBtnClick = () => {
        this.props.getAllUsersFriends(1,5);
    }

    render() {
        return <div>
            <Friends
                onFriendsBtnClick={this.onFriendsBtnClick}
                friends={this.props.friends} friendsLoaded={this.props.friendsLoaded}/>
        </div>
    }
}

let mapStateToProps = (state: AppStateType) => {

    return {
        friends: state.sidebarPage.friends,
        friendsLoaded: state.sidebarPage.friendsLoaded
    }
}

let FriendsContainer = connect(mapStateToProps, {
    getUsersFriends,
    getAllUsersFriends
})(FriendsContainerC) as React.ComponentType;
export default FriendsContainer; 