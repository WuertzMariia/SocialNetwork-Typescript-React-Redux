import React from 'react';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import {pageLoading,} from '../../redux/selectors';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

type UsersPageType = {
    match: any,
}

const UsersPage: React.FC<UsersPageType> = (props) => {
    const isLoading = useSelector(pageLoading);
    return (<div>{isLoading ? <Preloader/> :
        <Users
            {...props}
        />}
    </div>)
}

let UsersContainer = withRouter(UsersPage);
export default UsersContainer;

// OLD CLASS COMP CONTAINER
// type MapStateToPropsType = {
//     isLoading: boolean,
//     pageSize: number,
//     currentPage: number,
//     match: any,
//     filter: { term: string, friend: boolean | null }
// }
// type MapDispatchToPropsType = {
//     getUsers: (currentPage: number, pageSize: number, filter: { term: string, friend: boolean | null }) => void,
//     subscribe: (userId: number) => void,
//     unsubscribe: (userId: number) => void,
//     getAllUsersFriends: (currentPage: number, pageSize: number) => void,
//     dataInitialization: () => void
// }
// class UsersApiComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
//     refreshPage() {
//         let friends = this.props.match.params.friends;
//         if (friends === 'friends') {
//             let filter = {
//                 term: this.props.filter.term,
//                 friend: true
//             }
//             this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
//         } else {
//             this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
//         }
//     }
//
//     componentDidMount() {
//         this.refreshPage();
//     }
//
//     componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
//         if (prevProps.match.params.friends != this.props.match.params.friends) {
//             this.refreshPage();
//         }
//     }
//
//
//
//     render() {
//
//         return <>
//             <div>{this.props.isLoading ? <Preloader/> :
//                 <Users
//                     // subscribe={this.props.subscribe}
//                     // unsubscribe={this.props.unsubscribe}
//                     {...this.props}
//                 />}
//             </div>
//         </>
//     }
// }

// let mapStateToProps = (state: AppStateType) => {
//     return {
//         pageSize: usersPageSize(state),
//         currentPage: requestPage(state),
//         isLoading: pageLoading(state),
//         filter: filterSelector(state)
//     }
// }
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
// let UsersContainer = compose(connect(mapStateToProps, {
//     getUsers,
//     subscribe,
//     unsubscribe,
//     getAllUsersFriends
// }), withRouter, withAuthRedirectComponent)(UsersApiComponent) as React.ComponentType;


