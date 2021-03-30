import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": ""
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error= 1
}
export enum ResultCodeForCaptcha {
    CaptchaError = 10
}

export type OftenResponseType = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    data: {}
}



