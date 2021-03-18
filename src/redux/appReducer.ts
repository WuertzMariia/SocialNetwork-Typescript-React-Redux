import {singInProcessCheck} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";


let initialState = {
    initialized: false
}
type InitialStateType = typeof initialState;

export let appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'sn/app/init_app': {
            return {
                ...state,
                initialized: true,

            }
        }
        default:
            return state;
    }
}
type ActionType = InferActionTypes<typeof actions>
const actions = {
    initial_status: () => ({type: 'sn/app/init_app'} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionType>
export const initialization_App = ():ThunkType => {

    return async (dispatch) => {
        let response = await dispatch(singInProcessCheck());
      dispatch(actions.initial_status());

}}