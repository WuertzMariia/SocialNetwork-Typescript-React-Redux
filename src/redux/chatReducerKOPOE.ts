import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionTypes} from './redux_store';
import {chatAPI, ChatData} from '../api/chatApi';
import {Dispatch} from 'redux';

export type StatusType = 'pending' | 'ready' | 'error';
let initialState = {
    messages: [] as ChatData[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState;

let chatReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'chatApi/sn/setNewMessages': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        };
        case 'chatApi/sn/statusCondition': {
            return {
                ...state,
                status: action.status
            }
        };
        default:
            return state;
    }
}
type ActionType = InferActionTypes<typeof actions>
const actions = {
    setMessages: (messages: ChatData[]) => ({type: 'chatApi/sn/setNewMessages', payload: {messages}} as const),
    statusCondition: (status: StatusType) => ({type: 'chatApi/sn/statusCondition', status} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionType>;

export const sendMessageThunk = (message: string): ThunkType => {
    return async (dispatch, getState) => {
        chatAPI.send(message);

    };
}
export default chatReducer;