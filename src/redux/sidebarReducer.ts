import {usersApi} from "../api/usersApi";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";
import {UsersShortType} from './usersReducer';

export type SidebarType = {
    path: string,
    name: string
}
export type FriendsType = {
    src: string,
    name: string
}
type InitialStateType = {
    sideb: Array<SidebarType>,
    friends:  Array<UsersShortType>,
    friendsLoaded: boolean
}

let initialState: InitialStateType = {
    sideb: [
        { path: "/profile", name: "Profile" },
        { path: "/messages", name: "Messages" },
        { path: "/news", name: "News" },
        { path: "/music", name: "Music" },
        { path: "/settings", name: "Settings" },
        { path: "/users", name: "Find more friends" }
    ],

    friends: [],
    friendsLoaded: false
};

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, any>;

let sidebarReducer =(state = initialState, action: ActionType) : InitialStateType => {
    switch(action.type){
        case 'SETUSERSFRIENDS':
            return {
                ...state,
                friends: action.friends
            };
        case 'LOADEDFRIENDS':
            return {
                ...state,
                friendsLoaded: true
            }
        default: return state
    }
    return state;
}

type ActionType = InferActionTypes<typeof actions>;
let actions = {
    unfollow: (userId: number) => ({type: 'UNFOLLOW', userId}as const),
    setUsers: (friends: Array<UsersShortType>) => ({type: 'SETUSERSFRIENDS', friends}as const),
    friendsLoadSuccess: () => ({type: "LOADEDFRIENDS"}as const)
}

export const getUsersFriends = (): ThunksType => {
    return async (dispatch, getState) => {
        let response = await usersApi.getUsersFriends()
        dispatch(actions.setUsers(response.items));
        dispatch(actions.friendsLoadSuccess());

    }
}

export default sidebarReducer; 