import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";

const add_message = "add_message";

type DialogType = {
    name: string,
    id: string,
    src: string,
}

type MessageType = {
    mess: string
}
export type InitialStateDialogsType = {
    dialog: Array<DialogType>,
    messag: Array<MessageType>
}
    let initialState: InitialStateDialogsType = {
        
            dialog: [
                { name: "Maria", id: "/1", src: "https://trikky.ru/wp-content/blogs.dir/1/files/2020/03/29/avatarka.jpg" },
                { name: "Nelii", id: "/2", src: "https://trikky.ru/wp-content/blogs.dir/1/files/2020/03/29/avatarka.jpg" },
                { name: "Vova", id: "/3", src: "https://trikky.ru/wp-content/blogs.dir/1/files/2020/03/29/avatarka.jpg" },
                { name: "Volodja", id: "/4", src: "https://trikky.ru/wp-content/blogs.dir/1/files/2020/03/29/avatarka.jpg" },
                { name: "Kostja", id: "/5", src: "https://trikky.ru/wp-content/blogs.dir/1/files/2020/03/29/avatarka.jpg" },
            ],

            messag: [
                { mess: "Hi" },
                { mess: "Hello" },
                { mess: "How are you" },
                { mess: "I am fine" }
            ],
    }



let dialogsReducer = (state = initialState, action: AddMessageACType): InitialStateDialogsType=> {


    switch(action.type) {

        case add_message :
        {
            return {
            ...state,
            messag: [...state.messag, {mess: action.message}]
        }
    };

       default: return state; 
    }
}
type AddMessageACType = {
    type: typeof add_message,
    message: string
}

export const actioncreatorAddMessage = (message: string) : AddMessageACType => ({ type: add_message, message });

type ThunkType = ThunkAction<any, AppStateType, any, AddMessageACType>
export const sendMessage = (message: string): ThunkType => {
    return (dispatch: any) => {
        dispatch(actioncreatorAddMessage(message));
    }
}

export default dialogsReducer; 