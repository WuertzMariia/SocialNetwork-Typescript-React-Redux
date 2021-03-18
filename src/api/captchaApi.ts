import {instance} from "./api";

type GetCaptchaUrlType = {
    url: string
}
export const captchaAPI = {
    getCaptchaUrl() {

        return instance.get<GetCaptchaUrlType>("/security/get-captcha-url").then(response => {

            return response
        });
    }

}