import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './appReducer';
import chatReducer from './chatReducer';

let reducers = combineReducers(
    {
        profilePage: profileReducer,
        messagesPage: dialogsReducer,
        sidebarPage: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        appMain: appReducer,
            chat: chatReducer
    }
)

type ReducersType = typeof reducers;
export type AppStateType = ReturnType<ReducersType>;
//
// type PropertiesType<T> = T extends{[key: string]: infer U} ? U : never; // обьект {[ключ: строка] : верни значение} ? верни тип   U если выполнено условие обьект иначе ничего
// export type InferActionTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesType<T>>;


export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
export default store; 