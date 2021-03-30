import {instance, OftenResponseType} from './api';
import {profileAPI} from './profileApi';

export type ArrayOfUsers = {
    id: number,
    name: string,
    status: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    followed: boolean
}

type UsersGetResponseType = {
    items: Array<ArrayOfUsers>,
    totalCount: number,
    error: string
}
export const usersApi = {
    getUsers(currentPage: number, pageSize = 10, s="", friend: null | boolean = null) {
        return instance.get<UsersGetResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${s}` + (friend === null ? "" : `&friend=${friend}`)).then(response => {
            return response.data
        })
    },
    getUsersFriends() {
        let pcount = 6;
        return instance.get<UsersGetResponseType>(`users?friend=true&count=${pcount}&page=5`).then(response => {
            return response.data
        })
    },
    getAllUsersFriendsApi(currentPage = 1, pageSize = 10) {
        return instance.get<UsersGetResponseType>(`users?friend=true&page=${currentPage}&count=${pageSize}`).then(response => {
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

        console.log('Obsolete API. Use profileAPI.getUserProfile instead');
        return profileAPI.getUserProfile(userId);
    },

    getSearchedTerms (s: string) {
        return instance.get<UsersGetResponseType>(`users?term=${s}`).then(response => {
            return response.data
        })
    }

}