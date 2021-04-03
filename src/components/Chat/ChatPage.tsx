import React, {useEffect, useState} from 'react';
import {Button, Input} from 'antd';
import {ChatData} from '../../api/chatApi';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessageThunk, startMessagesListening, stopMessagesListening} from '../../redux/chatReducer';
import {AppStateType} from '../../redux/redux_store';

export const ChatPage: React.FC = () => {
    // const [ws, setWS] = useState<WebSocket | null>(null);
    //
    // useEffect(() => {
    //     let wsChannel: WebSocket;
    //     let closeHandler = () => {
    //         console.log('close ws and reconnect');
    //         setTimeout(createChannel, 5000);
    //
    //     }
    //
    //     function createChannel() {
    //
    //             wsChannel?.removeEventListener('close', closeHandler);
    //             wsChannel?.close();
    //
    //         wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    //         wsChannel.addEventListener('close', closeHandler)
    //         setWS(wsChannel);
    //     }
    //
    //     createChannel();
    //     return () => {
    //         wsChannel.removeEventListener('close', closeHandler);
    //         wsChannel.close();
    //     }
    //
    // }, []);
    // useEffect(() => {
    //     let openHandler = () => {
    //         setReadyStatus('ready')
    //
    //     };
    //     ws?.addEventListener('open', openHandler)
    //     return () => {
    //         ws?.removeEventListener('open', openHandler)
    //     }
    // }, [ws]);

   let dispatch = useDispatch();
   useEffect(()=> {
       dispatch(startMessagesListening());
       return () => {
           dispatch(stopMessagesListening());
       }
   },[])

     let [message, setMessage] = useState('');
    // let [isReady, setReadyStatus] = useState<'pending' | 'ready'>('pending');
    // const sendMessage = () => {
    //     if (!message) {
    //         return;
    //     }
    //     ws?.send(message);
    //     setMessage('');
    // }
const sendMessage = () => {
       if(!message) {
           return
       }
       dispatch(sendMessageThunk(message));
       setMessage("");
}
    return <div>
        <Chat />
        <Input type={'text'} onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <Button type={'primary'}  onClick={sendMessage}>Send</Button>
    </div>
}

const Chat: React.FC = () => {

    // let [messages, setMessages] = useState<ChatData[]>([]);
    let messages = useSelector((state:AppStateType) => state.chat.messages);

    // useEffect(() => {
    //     let messageHandler = (e) => setMessages((prevState) => [...prevState, ...JSON.parse(e.data)]);
    //     ws?.addEventListener('message', messageHandler);
    //     return () => {
    //         ws?.removeEventListener('message', messageHandler)
    //     }
    // }, [ws])

    let messageStack = messages.map(each => <div><Message message={each}/></div>)
    return <div style={{overflow: 'scroll', maxHeight: '350px'}}>
        {messageStack}

    </div>
}

const Message: React.FC<{ message: ChatData }> = (props) => {

    // @ts-ignore
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'flex-end'}}><img src={props.message.photo}/>
            <b>{props.message.userName}</b>
        </div>
        <div>{props.message.message}</div>
        <hr/>

    </div>
}