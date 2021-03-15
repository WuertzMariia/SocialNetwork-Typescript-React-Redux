import {authAPI, captchaAPI, loginAPI, ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";


const SETUSERSTATE = "soc_network_auth_set_user_auth_state";
const TOGGLELOGINLOADING = "soc_network_auth_toggle_is_loading_login";
const LOGIN_FAILED = "soc_network_auth_log_fail";
const GET_CAPTCHA_URL_SUCCESS = "soc_network_auth_received_captcha_url";

type DataType =
{
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,

    login_failed: boolean | null,
    captchaURL: null | string
}

type InitialStateType = {
    data:DataType ,
    isFetching: boolean
}

let initialState: InitialStateType = {

    data: {
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        login_failed: null,
        captchaURL: null // if null - captcha not required
    }  ,
    isFetching: false
}


let authReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case SETUSERSTATE: {

            return {
                ...state,
                data: action.payload
            }
        }
            ;
        case TOGGLELOGINLOADING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case LOGIN_FAILED : {
            return {
                ...state,
                data: {...state.data, login_failed: action.login_failed}
            }
        }
            ;
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                data: {...state.data, captchaURL: action.captchaURL}
            }
        }
            ;
        default:
            return state;
    }
}
type ActionType = SetAuthUserDataType | ToggleIsLoadingLoginType | ToggleFailedLoginType |SetCaptchaUrlType
type SetAuthUserDataPayloadType = {
    userId: number | null, email: string | null, login: string | null, isAuth: boolean, login_failed: boolean |null, captchaURL: string | null
}
type SetAuthUserDataType = {
    type: typeof SETUSERSTATE,
    payload: SetAuthUserDataPayloadType
}

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, login_failed: boolean |null, captchaURL: string|null): SetAuthUserDataType => ({
    type: SETUSERSTATE,
    payload: {userId, email, login, isAuth, login_failed, captchaURL}
});
type ToggleIsLoadingLoginType = {
    type: typeof TOGGLELOGINLOADING,
    isFetching: boolean
}
const toggleIsLoadingLogin = (isFetching: boolean): ToggleIsLoadingLoginType => ({type: TOGGLELOGINLOADING, isFetching});

type ToggleFailedLoginType = {
    type: typeof LOGIN_FAILED,
    login_failed: boolean
}

const toggle_failed_login = (login_failed: boolean): ToggleFailedLoginType => ({type: LOGIN_FAILED, login_failed});

type SetCaptchaUrlType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaURL: string
}
const setCaptchaURL = (captchaURL: string): SetCaptchaUrlType => ({type: GET_CAPTCHA_URL_SUCCESS, captchaURL});

// Check if signed in
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionType>
export const singInProcessCheck = (): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsLoadingLogin(true));
        let response = await authAPI.getLoginData()
        dispatch(toggleIsLoadingLogin(false));
        if (response.resultCode === ResultCodesEnum.Success ) {
            let {id, email, login} = response.data;
            let captchaURL = null;
            dispatch(setAuthUserData(id, email, login, true, false, captchaURL));
        } else console.log("error no login")
    }

};
// sign me in
export type ValuesType= {
    login: string,
    password: string,
    remember_me: any
    captcha: null | string
}
export const singInLogin = (values: ValuesType): ThunkType => {
    return async (dispatch, getState) => {
        if (!values.remember_me) {
            values = {...values, remember_me: false};
        }
        let response = await loginAPI.signInData(values)
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(singInProcessCheck());
        } else {
            if (response.resultCode === ResultCodeForCaptcha.CaptchaError) {
                dispatch(getCaptchaURL());
            }
            dispatch(toggle_failed_login(true));
        }
    }
};

export const singOutLogin = () : ThunkType=> {
    return async (dispatch , getState) => {
        let response = await loginAPI.signOutData();
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false, null, null));
        } else {
            console.log("no sign out")
        }
    }
};

export const getCaptchaURL = (): ThunkType => {
    return async (dispatch ,getState) => {
        const response = await captchaAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaURL(captchaUrl));
    }
}

export default authReducer; 