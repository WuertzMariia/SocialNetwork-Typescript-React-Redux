import axios from 'axios';
import {ValuesType} from "../redux/authReducer";
import {SetProfileDataType, UsersType} from "../redux/profileReducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "e8349719-ae81-4d3f-972e-206990f2d8c6"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error= 1
}
export enum ResultCodeForCaptcha {
    CaptchaError = 10
}
type GetCaptchaUrlType = {
    url: string
}

type SignInDataType = {
    login: string,
    password: string,
    remember_me: any
    captcha: null | string
}

type SignInResponseType = {
    resultCode: ResultCodeForCaptcha | ResultCodesEnum,
    messages: Array<string>,
    data: {userId: number}
}

type MeResponseType = {
    data: {id: number, email: string, login: string},
    resultCode: ResultCodesEnum,
    messages: Array<string>
}
type PhotosType = {
    photos: {
        small:string,
        large: string
    }
}
type SetPhotoResponseType = {
    data: PhotosType,
    resultCode: ResultCodesEnum,
    messages: Array<string>
}
type OftenResponseType = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    data: {}
}
type UsersGetResponseType = {
    items: Array<{id: number,
    name: string,
    status: string,
    photos: {
        small: string,
        large: string
    },
    followed: boolean}> ,
    totalCount: number,
    error: string
}


export const usersApi = {
    getUsers(currentPage: number, pageSize = 10) {
        return instance.get<UsersGetResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },

    getSubscription(id: number) {
        return instance.post<OftenResponseType>(`follow/${id}`).then(response => {
            return response.data.resultCode
        })
    },

    deleteSubscription(id: number) {

        return instance.delete<OftenResponseType>(`follow/${id}`).then(response => {
            return response.data.resultCode
        })
    },

    getUserProfile(userId: number) {

        console.log("Obsolete API. Use profileAPI.getUserProfile instead");
        return profileAPI.getUserProfile(userId);
    }

}

export const profileAPI = {
    getUserProfile(userId: number) {

        return instance.get<UsersType>(`profile/${userId}`).then(response => {
            return response.data
        })
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`).then(response => {
            return response.data
        })
    },

    updateUserStatus(status: string) {
        return instance.put<OftenResponseType>(`/profile/status`, {status: status}).then(response => {
            return response.data
        })
    },

    savePhoto(file: string) {
        let formData = new FormData();
        formData.append("image", file);
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        return instance.put<SetPhotoResponseType>(`/profile/photo`, formData, config).then(response => {
            return response;
        })

    },

    setProfData(values:SetProfileDataType) {

        return instance.put<OftenResponseType>(`/profile`, values).then(response => {
            return response
        })
    }

}



export const authAPI = {
    getLoginData() {

        return instance.get<MeResponseType>("auth/me").then(response => {

            return response.data
        });
    }

}


export const captchaAPI = {
    getCaptchaUrl() {

        return instance.get<GetCaptchaUrlType>("/security/get-captcha-url").then(response => {

            return response
        });
    }

}

export const loginAPI = {
    signInData(values: SignInDataType) {
        return instance.post<SignInResponseType>(`auth/login`, {
            email: values.login,
            password: values.password,
            rememberMe: values.remember_me[0],
            captcha: values.captcha
        }).then(response => {
            return response.data
        })
    },

    signOutData() {
        return instance.delete<OftenResponseType>(`auth/login`).then(response => {
            return response
        });
    }
}
