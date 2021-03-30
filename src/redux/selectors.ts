import {AppStateType} from "./redux_store";


export const requestUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const usersPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const totUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const requestPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const pageLoading = (state: AppStateType) => {
    return state.usersPage.isLoading;
}

export const subscriptionConfirm = (state: AppStateType) => {
    return state.usersPage.subscriptionProcessed;
}

 export const filterSelector = (state: AppStateType) => {
    return state.usersPage.filter
 }