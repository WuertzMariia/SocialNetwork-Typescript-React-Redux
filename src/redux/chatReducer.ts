import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionTypes} from './redux_store';
import {chatAPI, ChatData} from '../api/chatApi';
import {Dispatch} from 'redux';

let initialState = {
    messages: [] as ChatData[]
}

export type InitialStateType = typeof initialState;

let chatReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'chatApi/sn/setNewMessages': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        }
        default:
            return state;
    }
}
type ActionType = InferActionTypes<typeof actions>
const actions = {
    setMessages: (messages: ChatData[]) => ({type: 'chatApi/sn/setNewMessages', payload: {messages}} as const)
}
// Check if signed in
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionType>;
let _newMessageHandler: ((messages: ChatData[]) => void) | null = null;

const newMessageHandler = (dispatch: Dispatch) => (messages: ChatData[]) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages));
            return;
        }
    }
    return _newMessageHandler(messages);
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch, getState) => {
        chatAPI.start();
        chatAPI.subscribe(newMessageHandler(dispatch))

    };
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch, getState) => {
        chatAPI.stop();
        chatAPI.unsubscribe(newMessageHandler(dispatch))

    };
}

export const sendMessageThunk = (message: string): ThunkType => {
    return async (dispatch, getState) => {
        chatAPI.send(message);

    };
}
export default chatReducer;