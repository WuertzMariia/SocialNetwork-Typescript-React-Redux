import React, {Ref, useEffect, useRef, useState} from 'react';
import {Button, Input} from 'antd';
import {ChatData} from '../../api/chatApi';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessageThunk, startMessagesListening, StatusType, stopMessagesListening} from '../../redux/chatReducer';
import {AppStateType} from '../../redux/redux_store';

export const ChatPage: React.FC = React.memo(() => {

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])

    let [message, setMessage] = useState('');
    const sendMessage = () => {
        if (!message) {
            return
        }
        dispatch(sendMessageThunk(message));
        setMessage('');
    }
    const status: StatusType = useSelector((state: AppStateType) => state.chat.status);
    return <div>
        <Chat/>
        <Input type={'text'} onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <Button type={'primary'} disabled={status != 'ready'} onClick={sendMessage}>Send</Button>
    </div>
})

const Chat: React.FC = React.memo(() => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesEndRef: Ref<any> = useRef<HTMLDivElement>(null);
    const [autoScrollStatus, setAutoScrollStatus] = useState(true);
    // useEffect(() => {
    //     let messageHandler = (e) => setMessages((prevState) => [...prevState, ...JSON.parse(e.data)]); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     ws?.addEventListener('message', messageHandler);
    //     return () => {
    //         ws?.removeEventListener('message', messageHandler)
    //     }
    // }, [ws])
    const messageStack = messages.map(each => <div><Message message={each}/></div>)
    useEffect(() => {
        if(autoScrollStatus) {
            messagesEndRef?.current.scrollIntoView();
        }

    }, [messageStack]);
    const scrollHanlder = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = event.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300)
        {
            !autoScrollStatus && setAutoScrollStatus(true);
        } else {
            autoScrollStatus && setAutoScrollStatus(false);
        }
    }
    return <div style={{overflow: 'auto', maxHeight: '350px'}} onScroll={scrollHanlder}>
        {messageStack}
        <div ref={messagesEndRef}/>
    </div>
})

const Message: React.FC<{ message: ChatData }> = React.memo((props) => {

    // @ts-ignore
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'flex-end'}}><img src={props.message.photo}/>
            <b>{props.message.userName}</b>
        </div>
        <div>{props.message.message}</div>
        <hr/>

    </div>
})