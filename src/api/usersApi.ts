import {instance, OftenResponseType} from "./api";
import {profileAPI} from "./profileApi";

type UsersGetResponseType = {
    items: Array<{
        id: number,
        name: string,
        status: string,
        photos: {
            small: string,
            large: string
        },
        followed: boolean
    }>,
    totalCount: number,
    error: string
}
export const  usersApi = {
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