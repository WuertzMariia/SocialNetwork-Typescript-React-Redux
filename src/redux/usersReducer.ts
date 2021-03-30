import {ThunkAction} from 'redux-thunk';
import {ResultCodesEnum} from '../api/api';
import {AppStateType, InferActionTypes} from './redux_store';
import {usersApi} from '../api/usersApi';

type PhotosType = {
    small: string | null,
    large: string | null
}

export type UsersShortType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string | null,
    followed: boolean
}
export type InitialStateTypeUsersReducer = {
    users: Array<UsersShortType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isLoading: boolean,
    subscriptionProcessed: Array<number>,
    filter: {
        term: string,
        friend: null | boolean
    }

}

let initialState: InitialStateTypeUsersReducer = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0, //before axios.get
    currentPage: 1,
    isLoading: false,
    subscriptionProcessed: [],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}


export let usersReducer = (state = initialState, action: ActionType): InitialStateTypeUsersReducer => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }

        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }

        case 'SETCURRENTPAGE':

            return {
                ...state,
                currentPage: action.currentPage
            };
        case 'SETUSERS':
            return {
                ...state,
                users: action.users
            };
        case 'SETTOTALPAGESCOUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        case 'TOGGLEISLOADING':
            return {
                ...state,
                isLoading: action.isloading
            };
        case 'SUBSCRIPTIONPROCESSED': {

            return {
                ...state,
                subscriptionProcessed: action.being_processed ?
                    [...state.subscriptionProcessed, action.id] :
                    [...state.subscriptionProcessed.filter(id => id !== action.id)]
            }
        }

        case 'SETSEARCHFILTER': {
            return {
                ...state,
                filter: {...state.filter, term: action.filter.term, friend: action.filter.friend}
            }
        }

        default:
            return state;
    }
}

type ActionType = InferActionTypes<typeof actions>;
export let actions = {
    follow: (userId: number) => {
        return ({type: 'FOLLOW', userId} as const)
    },
    unfollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersShortType>) => ({type: 'SETUSERS', users} as const),
    toggleIsLoading: (isloading: boolean) => ({type: 'TOGGLEISLOADING', isloading} as const),
    subscriptionIsBeingProcessed: (being_processed: boolean, id: number) => ({
        type: 'SUBSCRIPTIONPROCESSED',
        being_processed,
        id
    } as const),
    setCurrentPageUsers: (currentPage: number) => ({type: 'SETCURRENTPAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SETTOTALPAGESCOUNT', totalUsersCount} as const),
    setFilter: (filter: { term: string, friend: boolean | null }) => ({type: 'SETSEARCHFILTER', filter} as const)
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const getUsers = (currentPage: number, pageSize: number, filter: { term: string, friend: boolean | null }): ThunksType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsLoading(true));
        dispatch(actions.setFilter(filter));
        dispatch(actions.setCurrentPageUsers(currentPage));
        let response = await usersApi.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsLoading(false));
        dispatch(actions.setUsers(response.items));

        dispatch(actions.setTotalUsersCount(response.totalCount));



    }
}

export const unsubscribe = (userID: number): ThunksType => {
    return async (dispatch) => {
        dispatch(actions.subscriptionIsBeingProcessed(true, userID));
        try {
            let response = await usersApi.deleteSubscription(userID)
            if (response === ResultCodesEnum.Success) {
                dispatch(actions.unfollow(userID));
            }
        } catch (error) {
            alert('error');
        }
        dispatch(actions.subscriptionIsBeingProcessed(false, userID));
    }
}

export const subscribe = (userID: number): ThunksType => {
    return async (dispatch) => {
        dispatch(actions.subscriptionIsBeingProcessed(true, userID));

        let response = await usersApi.getSubscription(userID)
        if (response === ResultCodesEnum.Success) {

            dispatch(actions.follow(userID));
        }
        dispatch(actions.subscriptionIsBeingProcessed(false, userID));
    }
}

type ThunkTypeFriends = ThunkAction<any, AppStateType, any, ActionType>

export const getAllUsersFriends = (currentPage: number, pageSize: number): ThunkTypeFriends => {
    return async (dispatch) => {

        dispatch(actions.toggleIsLoading(true));
        let response = await usersApi.getAllUsersFriendsApi(currentPage, pageSize)
        dispatch(actions.toggleIsLoading(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setCurrentPageUsers(currentPage));
        dispatch(actions.setTotalUsersCount(response.totalCount));

    }
}


export default usersReducer;