import {usersApi, profileAPI, ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";

const add_post = "add_post";
const SET_USER_PROFILE = "setUserProfile";
const TOGGLE_LOADING = "page_is_loading";
const UPDATE_USER_STATUS = "user_status_update";
const SET_USER_STATUS = "set_user_status"
const DELETE_POST = "delete_post";
const SET_PROFILE_PHOTO = "set_new_profile_photo";

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
    small: string|null,
    large: string |null
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

        case add_post : {

            return {
                ...state,
                posts: [...state.posts, {post: action.new_post, id: 6}]
            }
        }
            ;
        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter(item => {
                    return item.id != action.id
                })]
            }
        }
        case SET_USER_PROFILE : {
            return {
                ...state,
                profile: action.profile
            }
        }
            ;
        case SET_PROFILE_PHOTO: {

            return {
                ...state,
                profile: {...state.profile, photos: action.file}

            }
        }
        case TOGGLE_LOADING: {
            return {
                ...state,
                isFetching: action.isLoading,
            }
        }
            ;
        case UPDATE_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
            ;
        case SET_USER_STATUS: {

            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

type ActionType = AddPostACType |SetUserProfileType | ToggleIsLoadingType | DeletePostType | updatingUserStatus | SetUserStatusType | SavePhotoSuccessType
type AddPostACType ={
    type: typeof add_post,
    new_post: string
}
export const actioncreatorAddPost = (new_post: string) :AddPostACType => ({type: add_post, new_post});
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: UsersType
}
export const setUserProfile = (profile: UsersType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});
type ToggleIsLoadingType = {
    type: typeof TOGGLE_LOADING,
    isLoading: boolean
}
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingType => ({type: TOGGLE_LOADING, isLoading});
type DeletePostType = {
    type: typeof DELETE_POST,
    id: number
}
export const deletePost = (id: number): DeletePostType => ({type: DELETE_POST, id});
type updatingUserStatus = {
    type: typeof UPDATE_USER_STATUS,
    status: string
}
const updatingUserStatus = (status: string): updatingUserStatus => ({type: UPDATE_USER_STATUS, status});
type SetUserStatusType = {
    type: typeof SET_USER_STATUS,
    status: string
}
const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status});
type SavePhotoSuccessType = {
    type: typeof SET_PROFILE_PHOTO,
    file: PhotosType
}
const savePhotoSuccess = (file: PhotosType):SavePhotoSuccessType => ({type: SET_PROFILE_PHOTO, file})

type ThunksType = ThunkAction<Promise<void>, AppStateType, any, ActionType>
export const getCurrentUserStatus = (userId: number): ThunksType => {
    return async (dispatch, getState) => {
        const response = await profileAPI.getUserStatus(userId);
        dispatch(setUserStatus(response));

    }
}

export const getUserProfile = (userId: number): ThunksType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsLoading(true));
        const response = await usersApi.getUserProfile(userId)
        dispatch(toggleIsLoading(false));
        dispatch(setUserProfile(response));

    }
}

export const updateUserStatus = (status:string): ThunksType => {
    return async (dispatch, getState) => {
        try {
            const response = await profileAPI.updateUserStatus(status)
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(updatingUserStatus(status));
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
        dispatch(actioncreatorAddPost(values));
    }
}

export const savePhoto = (file: string): ThunksType => {
    return async (dispatch, getState) => {
        const response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
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