import {ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";
import {usersApi} from "../api/usersApi";
import {profileAPI} from "../api/profileApi";



type ContactsType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null,
    youtube: string | null,
    mainLink: string | null
}
type PhotosType = {
    small: string | null,
    large: string | null,
}
export type UsersType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    aboutMe: string
    contacts: ContactsType,
    photos: PhotosType

}
export type PostType = {
    post: string,
    id: number
}
export type InitialStateProfileType = {
    posts: Array<PostType>,
    profile: UsersType | null,
    isFetching: boolean,
    status: string | null
}
let initialState: InitialStateProfileType = {

    posts: [
        {post: "Hello", id: 1},
        {post: "how are you", id: 2},
        {post: "i am fine", id: 3},
        {post: "i am fine", id: 4},
        {post: "i am fine", id: 5}
    ],
    profile: null as null |UsersType,
    isFetching: false,
    status: 'My dream is to become a good Frontend Developer'
}

let profileReducer = (state = initialState, action:ActionType) => {
    switch (action.type) {

        case "sn/profile/add_post" : {

            return {
                ...state,
                posts: [...state.posts, {post: action.new_post, id: 6}]
            }
        }
            ;
        case "sn/profile/delete_post": {
            return {
                ...state,
                posts: [...state.posts.filter(item => {
                    return item.id !== action.id
                })]
            }
        }
        case "sn/profile/setUserProfile" : {
            return {
                ...state,
                profile: action.profile
            }
        }
            ;
        case "sn/profile/set_new_profile_photo": {

            return {
                ...state,
                profile: {...state.profile, photos: action.file}

            }
        }
        case "sn/profile/page_is_loading": {
            return {
                ...state,
                isFetching: action.isLoading,
            }
        }
            ;
        case "sn/profile/user_status_update": {
            return {
                ...state,
                status: action.status
            }
        }
            ;
        case "sn/profile/set_user_status": {

            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

type ActionType = InferActionTypes<typeof actions>;
export const actions = {

    actioncreatorAddPost: (new_post: string) => ({type: "sn/profile/add_post", new_post} as const),
    setUserProfile: (profile: UsersType) => ({type: "sn/profile/setUserProfile", profile} as const),
    toggleIsLoading: (isLoading: boolean) => ({type: "sn/profile/page_is_loading", isLoading} as const),
    deletePost: (id: number) => ({type: "sn/profile/delete_post", id} as const),
    updatingUserStatus: (status: string) => ({type: "sn/profile/user_status_update", status} as const),
    setUserStatus: (status: string) => ({type: "sn/profile/set_user_status", status} as const),
    savePhotoSuccess: (file: PhotosType) => ({type: "sn/profile/set_new_profile_photo", file} as const)
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, any, ActionType>
export const getCurrentUserStatus = (userId: number): ThunksType => {
    return async (dispatch, getState) => {
        const response = await profileAPI.getUserStatus(userId);
        dispatch(actions.setUserStatus(response));

    }
}

export const getUserProfile = (userId: number): ThunksType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsLoading(true));
        const response = await usersApi.getUserProfile(userId)
        dispatch(actions.toggleIsLoading(false));
        dispatch(actions.setUserProfile(response));

    }
}

export const updateUserStatus = (status:string): ThunksType => {
    return async (dispatch, getState) => {
        try {
            const response = await profileAPI.updateUserStatus(status)
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.updatingUserStatus(status));
            }
        }
        catch (error) {

            alert ("error"); 
        }
    }
}

type ThunksTypeShort = ThunkAction<any, AppStateType, any, ActionType>
export const addNewPost = (values: string): ThunksTypeShort => {
    return (dispatch) => {
        dispatch(actions.actioncreatorAddPost(values));
    }
}

export const savePhoto = (file: File): ThunksType => {
    return async (dispatch, getState) => {
        const response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
        }
    }
}
export type SetProfileDataType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    aboutMe: string
    contacts: ContactsType
}
export const setProfileData = (values: SetProfileDataType): ThunksType => {
    return async (dispatch, getState) => {
        const userId= getState().auth.data.userId;
        const response = await profileAPI.setProfData(values);
        if (response.data.resultCode === ResultCodesEnum.Success) {
if(userId){
    dispatch(getUserProfile(userId));
}

        }
    }
}

export default profileReducer; 