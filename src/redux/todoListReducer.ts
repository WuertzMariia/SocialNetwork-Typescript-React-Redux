import {AppStateType, InferActionTypes} from './redux_store';
import {ThunkAction} from 'redux-thunk';
//
// export type SingleTaskType = {
//     taskname: string,
//     tasksObject : null | Array<string>
// }
//
// type InitialStateTodoListType = {
//     tasks: Array<SingleTaskType>
// }

let initialState = {
    tasks: [
        {taskname: 'Studium', tasksObject: ['Geometrie', 'Digitale Signalverarbeitung', 'Programmierung']},
        {taskname: 'React Web Development', tasksObject: ['Storybook', 'Saga', 'WebSocket']},
        {taskname: 'Haus', tasksObject: ['Aufräumen', 'Mit Lisa spielen', 'Fernsehen']},
        {taskname: 'Arbeit', tasksObject: ['JS', 'React', 'Redux']}

   ]
}

type InitialStateTodoListType = typeof initialState;

let todoListReducer = (state = initialState, action: ActionType): InitialStateTodoListType => {

    switch (action.type) {
        case 'socNetw/todoList/AddNewMainTask': {
            return {
              ...state,
                tasks: [...state.tasks, {taskname: action.name, tasksObject: []}]
            }
        };


        case 'socNetw/todoList/AddNewSingleTask': {
            return <InitialStateTodoListType>{
                ...state,
                tasks: state.tasks.map(el => {
                    if (el.taskname === action.currentTaskName) {
                        el.tasksObject.push(action.newTaskObject);
                    }
                    return el;
                })

            }
        };
        case 'socNetw/todoList/DeleteNewMainTask': {
            return <InitialStateTodoListType>{
                ...state,
                tasks: state.tasks.map(el => {
                    debugger
                    if (el.taskname === action.currentTaskName) {
                        const index = el.tasksObject.indexOf(action.name);
                        if (index > -1) {
                            el.tasksObject.splice(index, 1);

                        }
                    }
                    return el;
                })

            }
        };
        case 'socNetw/todoList/DeleteWholeTask': {
            return {
                ...state,
                tasks: [...state.tasks.filter(el => el.taskname != action.currentTaskName)]
            }
        }
        default:
            return state;
    }
}

type ActionType = InferActionTypes<typeof actions>
let actions = {
    addMainTask: (name: string) => ({type: 'socNetw/todoList/AddNewMainTask', name} as const),
    addSingleTask: (newTaskObject: string, currentTaskName: string) => ({
        type: 'socNetw/todoList/AddNewSingleTask',
        newTaskObject,
        currentTaskName
    } as const),
    deleteSingleTask: (name: string, currentTaskName: string) => ({type: 'socNetw/todoList/DeleteNewMainTask', name, currentTaskName} as const),
    deleteWholeTaskFromBoard: (currentTaskName: string) => ({type: 'socNetw/todoList/DeleteWholeTask', currentTaskName} as const)
}

type ThunkType = ThunkAction<any, AppStateType, any, ActionType>;


export const addNewMainTask = (name: string) => {
    return (dispatch: any) => {
        dispatch(actions.addMainTask(name));
    }
}

export const addNewSingleTask = (name: string, currentTaskName: string) => {
    return (dispatch: any) => {
        dispatch(actions.addSingleTask(name, currentTaskName));
    }
}

export const deleteSingleTaskFromList = (el: string, currentTaskName: string) => {
    return (dispatch: any) => {
        dispatch(actions.deleteSingleTask(el, currentTaskName));
    }
}

export const deleteWholeTaskFromBoard = (currentTaskName: string) => {
    return (dispatch: any) => {
        dispatch(actions.deleteWholeTaskFromBoard(currentTaskName));
    }
}
export default todoListReducer;