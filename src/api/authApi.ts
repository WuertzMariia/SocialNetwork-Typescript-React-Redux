import {instance, OftenResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseType = {
    id: number, email: string, login: string
}


type SignInResponseType = {
     userId: number
}
type ResponseType<D = {}, RC=ResultCodesEnum>={ // types default with =
    data: D,
    messages: Array<string>,
    resultCode: RC
}

type SignInDataType = {
    login: string,
    password: string,
    remember_me: any
    captcha: null | string
}

export const authAPI = {
    getLoginData() {

        return instance.get<ResponseType<MeResponseType>>("auth/me").then(response => {

            return response.data
        });
    }

}


export const loginAPI = {
    signInData(values: SignInDataType) {
        return instance.post<ResponseType<SignInResponseType,ResultCodeForCaptcha | ResultCodesEnum>>(`auth/login`, {
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