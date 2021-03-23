import React from 'react';

import {
    getAllUsersFriends,
    getUsers,
    subscribe,
    unsubscribe,
    UsersShortType
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import {compose} from 'redux';
import {withAuthRedirectComponent} from '../Redirect/withAuthRedirectComponent';
import {
    pageLoading,
    requestPage,
    requestUsers,
    subscriptionConfirm,
    totUsersCount,
    usersPageSize,
} from '../../redux/selectors';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux_store';
import {withRouter} from 'react-router-dom';

type MapStateToPropsType = {
    isLoading: boolean,
    pageSize: number,
    currentPage: number,
    usersPageUsers: Array<UsersShortType>,
    totalUsersCount: number,
    subscriptionProcessed: Array<number>,
    friends: Array<UsersShortType>
    match: any,
    filter: string
}
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number,filter: string ) => void,
    subscribe: (userId: number) => void,
    unsubscribe: (userId: number) => void,
    getAllUsersFriends: (currentPage: number, pageSize: number) => void,
    dataInitialization: () => void
}

class UsersApiComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    refreshPage() {
        let friends = this.props.match.params.friends;
        if (friends === 'friends') {
            this.props.getAllUsersFriends(this.props.currentPage, this.props.pageSize);
        } else {
            this.props.getUsers(this.props.currentPage, this.props.pageSize,this.props.filter);
        }
    }

    componentDidMount() {
        this.refreshPage();
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (prevProps.match.params.friends != this.props.match.params.friends) {
            this.refreshPage();
        }
    }

    onBtnPageClick = (p: number) => {
        if(this.props.match.params.friends) {
            this.props.getAllUsersFriends(p, this.props.pageSize);
        } else {
            this.props.getUsers(p, this.props.pageSize, this.props.filter);
        }

    }

    onSearchBtnClick = (s: string) => {
        this.props.getUsers(1, this.props.pageSize, s);
    }

    render() {

        return <>
            <div>{this.props.isLoading ? <Preloader/> :
                <Users
                    usersPageUsers={this.props.usersPageUsers}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    subscribe={this.props.subscribe}
                    unsubscribe={this.props.unsubscribe}
                    onBtnPageClick={this.onBtnPageClick}
                    subscriptionProcessed={this.props.subscriptionProcessed}
                    onSearchBtnClick={this.onSearchBtnClick}

                />}
            </div>
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        usersPageUsers: requestUsers(state),
        pageSize: usersPageSize(state),
        totalUsersCount: totUsersCount(state),
        currentPage: requestPage(state),
        isLoading: pageLoading(state),
        subscriptionProcessed: subscriptionConfirm(state),
        friends: state.sidebarPage.friends,
        filter: state.usersPage.filter.term
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


// @ts-ignore
let UsersContainer = compose(connect(mapStateToProps, {
    getUsers,
    subscribe,
    unsubscribe,
    getAllUsersFriends
}), withRouter, withAuthRedirectComponent)(UsersApiComponent) as React.ComponentType;

export default UsersContainer;
