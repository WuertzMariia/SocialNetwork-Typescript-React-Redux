import React, {useRef, useState} from 'react';
import {Button, Card, Checkbox, Input} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import "antd/dist/antd.css";
import s from './../TodoList.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux_store';
import {addNewSingleTask, deleteSingleTaskFromList, deleteWholeTaskFromBoard} from '../../../redux/todoListReducer';

type TodoListType = {
    taskName: string
}
export const TodoListTask: React.FC<TodoListType> = (props) => {

    let [inputElement,setInputElement] = useState("");
    const dispatch = useDispatch();
    let addNewTask = () => {

let value = inputElement;
if(!value || value.length === 0){
    return;
} dispatch(addNewSingleTask(inputElement, props.taskName));
            setInputElement("")

    }
    let deleteSingleTask = (el) => {
        dispatch(deleteSingleTaskFromList(el, props.taskName));
    };
    let deleteWholeTask = () => {
        dispatch(deleteWholeTaskFromBoard(props.taskName))
    }
    const myTask = useSelector((state: AppStateType) => {
        return state.todoList.tasks.filter(el => el.taskname === props.taskName)
    })
    const element = <FontAwesomeIcon onClick={deleteWholeTask} icon={faTrash}/>
    const smallelement = <FontAwesomeIcon icon={faTrash}/>
    const allSubTasks = myTask[0].tasksObject?.map(el => {
        return <p className={s.styleEachTask}>
            <div><Checkbox className={s.checkbox_style}><label className={s.checkedLabel}>{el}</label></Checkbox></div>
            <div onClick={() => deleteSingleTask(el)}>{smallelement}</div>
        </p>
    })

    return <div>
        <div className={s.eachTask}>
            <Card title={props.taskName} extra={element} bordered={false} style={{width: 300}}>

                <div><Input value={inputElement} onChange={(e) => setInputElement(e.target.value)} placeholder={'Title'}/></div>
                <Button onClick={addNewTask} type="primary">+</Button>
                <div className={s.smallTasks}>{allSubTasks}</div>
            </Card>
        </div>


    </div>

}