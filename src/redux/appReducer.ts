import {singInProcessCheck} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";

const INITILIZATION_SUCCESFULL: string = "init_app";

type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
}

export let appReducer = (state = initialState, action: InitializationSuccessType): InitialStateType => {
    switch (action.type) {
        case INITILIZATION_SUCCESFULL: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}
type InitializationSuccessType = {
    type: typeof INITILIZATION_SUCCESFULL
}
const initial_status = () : InitializationSuccessType => ({type: INITILIZATION_SUCCESFULL});
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, InitializationSuccessType>
export const initialization_App = ():ThunkType => {

    return async (dispatch) => {
        let response = await dispatch(singInProcessCheck());
      dispatch(initial_status());

}}