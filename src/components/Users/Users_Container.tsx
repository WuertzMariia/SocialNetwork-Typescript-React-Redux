import React from 'react';

import {
    getUsers,
    subscribe,
    unsubscribe,
    UsersShortType
} from "../../redux/usersReducer";
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../Redirect/withAuthRedirectComponent';
import {
    pageLoading,
    requestPage,
    requestUsers,
   subscriptionConfirm,
    totUsersCount,
    usersPageSize
} from "../../redux/selectors";
import {connect} from "react-redux";
import { AppStateType} from "../../redux/redux_store";
type MapStateToPropsType = {
    isLoading: boolean,
    pageSize: number,
    currentPage: number,
    usersPageUsers: Array<UsersShortType>,
    totalUsersCount: number,
    subscriptionProcessed: Array<number>
}
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void,
    subscribe: (userId: number) => void,
    unsubscribe: (userId: number) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersApiComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize); 

    }
    onBtnPageClick = (p: number) => {
        this.props.getUsers(p, this.props.pageSize);
    }

    render() {
        return <>
            <div>{this.props.isLoading ? <Preloader /> : 
            <Users
                usersPageUsers={this.props.usersPageUsers}
            pageSize={this.props.pageSize} 
            totalUsersCount={this.props.totalUsersCount} 
            currentPage={this.props.currentPage} 
            subscribe={this.props.subscribe}
            unsubscribe={this.props.unsubscribe}
            onBtnPageClick={this.onBtnPageClick}
            subscriptionProcessed={this.props.subscriptionProcessed}
            />}
            </div>
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        usersPageUsers:  requestUsers(state),
        pageSize: usersPageSize(state),
        totalUsersCount: totUsersCount(state),
        currentPage: requestPage(state),
        isLoading: pageLoading(state),
        subscriptionProcessed : subscriptionConfirm(state)
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userID) => { dispatch(followAC(userID)); },
//         unfollow: (userID) => { dispatch(unfollowAC(userID)) },
//         setUsers: (users) => { dispatch(setUsersAC(users)) },
//         setCurrentPageUsers: (pageNumber) => { dispatch(setCurrentPageAC(pageNumber)) },
//         setTotalUsersCount: (totalcount) => { dispatch(setTotalUsersCountAC(totalcount)) },
//         toggleIsLoading: (isloading) => {dispatch(isLoadingAC(isloading))}
//     }
// }




export default compose( connect(mapStateToProps, {
    getUsers,
    subscribe,
    unsubscribe
}), withAuthRedirectComponent)(UsersApiComponent);
