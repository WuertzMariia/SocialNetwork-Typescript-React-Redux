import { Dispatch } from "react";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {ResultCodesEnum, usersApi} from "../api/api";
import { AppStateType } from "./redux_store";

const FOLLOW = "follow";
const UNFOLLOW = "unfollow";
const SETUSERS = "set_users";
const SETCURRENTPAGE = "set_current_page";
const SETTOTALPAGESCOUNT = "setTotalUsersCount";
const TOGGLEISLOADING = "toggle_is_loading";
const SUBSCRIPTIONPROCESSED = "while_subscription_is_being_processed";
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
type InitialStateType = {
    users: Array<UsersShortType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isLoading: boolean,
    subscriptionProcessed: Array<number>
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0, //before axios.get
    currentPage: 1,
    isLoading: false,
    subscriptionProcessed: []
}


let usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
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
            ;
        case UNFOLLOW: {
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
            ;
        case SETCURRENTPAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SETUSERS:
            return {
                ...state,
                users: action.users
            };
        case SETTOTALPAGESCOUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        case TOGGLEISLOADING:
            return {
                ...state,
                isLoading: action.isloading
            };
        case SUBSCRIPTIONPROCESSED: {

            return {
                ...state,
                subscriptionProcessed: action.being_processed ?
                    [...state.subscriptionProcessed, action.id] :
                    [...state.subscriptionProcessed.filter(id => id !== action.id)]
            }
        }
        default:
            return state;
    }
}

type ActionType = FollowType | UnfollowType | SetUsersType | ToggleIsLoadingType | subscriptionIsBeingProcessedType |
    SetCurrentPageUsersType |SetTotalUsersCountType;
type FollowType = {
    type: typeof FOLLOW,
    userId: number
}
const follow = (userId: number): FollowType => {
    return ({type: FOLLOW, userId})
};
type UnfollowType = {
    type: typeof UNFOLLOW,
    userId: number
}
const unfollow = (userId: number): UnfollowType => ({type: UNFOLLOW, userId});

type SetUsersType = {
    type: typeof SETUSERS,
    users: Array<UsersShortType>
}
const setUsers = (users: Array<UsersShortType>): SetUsersType => ({type: SETUSERS, users});

type ToggleIsLoadingType = {
    type: typeof TOGGLEISLOADING,
    isloading: boolean
}
const toggleIsLoading = (isloading: boolean): ToggleIsLoadingType => ({type: TOGGLEISLOADING, isloading});

type subscriptionIsBeingProcessedType = {
    type: typeof SUBSCRIPTIONPROCESSED,
    being_processed: boolean,
    id: number
}
const subscriptionIsBeingProcessed = (being_processed: boolean, id: number): subscriptionIsBeingProcessedType => ({
    type: SUBSCRIPTIONPROCESSED,
    being_processed,
    id
});
type SetCurrentPageUsersType = {
    type: typeof SETCURRENTPAGE,
    currentPage: number
}
export const setCurrentPageUsers = (currentPage: number): SetCurrentPageUsersType => ({type: SETCURRENTPAGE, currentPage});
type SetTotalUsersCountType = {
    type: typeof SETTOTALPAGESCOUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SETTOTALPAGESCOUNT, totalUsersCount});

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const getUsers = (currentPage: number, pageSize: number): ThunksType => {
    return async (dispatch, getState) => {

        dispatch(toggleIsLoading(true));
        let response = await usersApi.getUsers(currentPage, pageSize)
        dispatch(toggleIsLoading(false));
        dispatch(setUsers(response.items));
        dispatch(setCurrentPageUsers(currentPage));
        dispatch(setTotalUsersCount(response.totalCount));

    }
}

export const unsubscribe = (userID: number) : ThunksType => {
    return async (dispatch) => {
        dispatch(subscriptionIsBeingProcessed(true, userID));
        try {
            let response = await usersApi.deleteSubscription(userID)
            if (response === ResultCodesEnum.Success) {
                dispatch(unfollow(userID));
            }
        } catch (error) {
            alert("error");
        }
        dispatch(subscriptionIsBeingProcessed(false, userID));
    }
}

export const subscribe = (userID: number) : ThunksType => {
    return async (dispatch) => {
        dispatch(subscriptionIsBeingProcessed(true, userID));
        try {
            let response = await usersApi.getSubscription(userID)
            if (response === ResultCodesEnum.Success) {

                dispatch(follow(userID));
            }
        } catch (error) {
            alert("error");
        }
        dispatch(subscriptionIsBeingProcessed(false, userID));
    }
}

export default usersReducer; 