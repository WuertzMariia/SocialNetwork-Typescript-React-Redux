import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";

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



let dialogsReducer = (state = initialState, action: ActionTypes): InitialStateDialogsType=> {


    switch(action.type) {

        case "sn/dialogs/add_message" :
        {
            return {
            ...state,
            messag: [...state.messag, {mess: action.message}]
        }
    };

       default: return state; 
    }
}
type ActionTypes = InferActionTypes<typeof actions>;
const actions = {
 actioncreatorAddMessage: (message: string)=> ({ type: "sn/dialogs/add_message", message })
}

type ThunkType = ThunkAction<any, AppStateType, any, ActionTypes>
export const sendMessage = (message: string): ThunkType => {
    return (dispatch: any) => {
        dispatch(actions.actioncreatorAddMessage(message));
    }
}

export default dialogsReducer; 