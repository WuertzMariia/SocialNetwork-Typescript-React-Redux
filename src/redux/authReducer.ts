import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";
import {authAPI, loginAPI} from "../api/authApi";
import {captchaAPI} from "../api/captchaApi";

let initialState= {

    data: {
        userId: null as number |null,
        email: null as string | null,
        login: null as string |null,
        isAuth: false,
        login_failed: null as null | boolean,
        captchaURL: null as string |null// if null - captcha not required
    }  ,
    isFetching: false
}

export type InitialStateType = typeof initialState;

let authReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case "soc_network_auth_set_user_auth_state": {

            return {
                ...state,
                data: action.payload
            }
        }
            ;
        case "soc_network_auth_toggle_is_loading_login": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "soc_network_auth_log_fail" : {
            return {
                ...state,
                data: {...state.data, login_failed: action.login_failed}
            }
        }
            ;
        case "soc_network_auth_received_captcha_url": {
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
type ActionType = InferActionTypes<typeof actions>
const actions = {
    setAuthUserData:  (userId: number | null, email: string | null, login: string | null, isAuth: boolean, login_failed: boolean |null, captchaURL: string|null) => ({
        type: "soc_network_auth_set_user_auth_state",
        payload: {userId, email, login, isAuth, login_failed, captchaURL}
    } as const),
    toggleIsLoadingLogin:  (isFetching: boolean) => ({type: "soc_network_auth_toggle_is_loading_login", isFetching}as const),
    toggle_failed_login:  (login_failed: boolean) => ({type: "soc_network_auth_log_fail", login_failed}as const),
    setCaptchaURL:  (captchaURL: string) => ({type: "soc_network_auth_received_captcha_url", captchaURL}as const  )
}


// Check if signed in
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionType>;

export const singInProcessCheck = (): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsLoadingLogin(true));
        let response = await authAPI.getLoginData()
        dispatch(actions.toggleIsLoadingLogin(false));
        if (response.resultCode === ResultCodesEnum.Success ) {
            let {id, email, login} = response.data;
            let captchaURL = null;
            dispatch(actions.setAuthUserData(id, email, login, true, false, captchaURL));
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
            dispatch(actions.toggle_failed_login(true));
        }
    }
};

export const singOutLogin = () : ThunkType=> {
    return async (dispatch , getState) => {
        let response = await loginAPI.signOutData();
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false, null, null));
        } else {
            console.log("no sign out")
        }
    }
};

export const getCaptchaURL = (): ThunkType => {
    return async (dispatch ,getState) => {
        const response = await captchaAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(actions.setCaptchaURL(captchaUrl));
    }
}

export default authReducer; 