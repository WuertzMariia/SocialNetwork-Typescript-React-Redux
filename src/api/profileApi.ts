import {SetProfileDataType, UsersType} from "../redux/profileReducer";
import {instance, OftenResponseType, ResultCodesEnum} from "./api";

type PhotosType = {
    photos: {
        small: string,
        large: string
    }
}
type SetPhotoResponseType = {
    data: PhotosType,
    resultCode: ResultCodesEnum,
    messages: Array<string>
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

    savePhoto(file: File) {
        let formData = new FormData();
        formData.append("image", file);
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        return instance.put<SetPhotoResponseType>(`/profile/photo`, formData, config).then(response => {
            return response;
        })

    },

    setProfData(values: SetProfileDataType) {

        return instance.put<OftenResponseType>(`/profile`, values).then(response => {
            return response
        })
    }

}