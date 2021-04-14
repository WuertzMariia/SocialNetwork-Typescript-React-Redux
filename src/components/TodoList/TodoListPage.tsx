import React, {useRef, useState} from 'react';
import {Button, Col, Input, Row} from 'antd';
import {AppStateType} from '../../redux/redux_store';
import {useDispatch, useSelector} from 'react-redux';
import {TodoListTask} from './TodoSingleTask/TodoListSingleTask';
import s from './TodoList.module.css';
import {addNewMainTask} from '../../redux/todoListReducer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export const TodoListPage = () => {
    const [mainInputElement, setMainInputElement] = useState("");
    let dispatch = useDispatch();
    let addNewTask = () => {
        if (!mainInputElement || mainInputElement.length === 0) {
            return;
        }
        dispatch(addNewMainTask(mainInputElement));
        setMainInputElement("");
    }

    const allTasks = useSelector((state: AppStateType) => {
        return state.todoList.tasks
    });


    const allTasksMap = allTasks.map(el => {
        return <TodoListTask taskName={el.taskname}/>
    })
    return <div>
        <Row gutter={16}>
            <Col span={12}><Input value={mainInputElement} onChange={(e) => setMainInputElement(e.target.value)} placeholder={'Title'}/></Col>
            <Col span={12}><Button onClick={addNewTask} type="primary">+</Button></Col>

        </Row>
        <div className={s.main}> {allTasksMap} </div>

    </div>

}