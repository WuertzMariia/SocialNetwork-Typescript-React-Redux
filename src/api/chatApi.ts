import {StatusType} from '../redux/chatReducer';

export type ChatData = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}
let wsChannel: WebSocket | null = null;
type eventsNames = 'message-received' | 'status-changed';
export type MessagesReceivedSubscribersTape = (messages: ChatData[]) => void;
export type StatusChangedSubscribersTape = (status: StatusType) => void;

let notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status));
}
let subscribers = {
    'message-received' :  [] as MessagesReceivedSubscribersTape[],
    'status-changed' :  [] as StatusChangedSubscribersTape[]
}
let closeHandler = () => {
    console.log('close ws and reconnect');
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 5000);
}

let messageHandler = (e) => {
    const newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages));
};

let openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

let errorHandler = () => {
    console.log("some error has occured");
    notifySubscribersAboutStatus('error');

}

function createChannel() {

    wsChannel?.removeEventListener('close', closeHandler);
    wsChannel?.removeEventListener("message", messageHandler);
    wsChannel?.removeEventListener('open', openHandler);
    wsChannel?.removeEventListener('error', errorHandler);
    wsChannel?.close();
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending')
    wsChannel.addEventListener('close', closeHandler);
    wsChannel.addEventListener('open', openHandler);
    wsChannel.addEventListener('error', errorHandler);
    wsChannel.addEventListener("message", messageHandler);
}


export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['message-received']=[];
        subscribers['status-changed'] = [];
        wsChannel?.removeEventListener("message", messageHandler);
        wsChannel?.removeEventListener('close', closeHandler);
        wsChannel?.removeEventListener('open', openHandler);
        wsChannel?.removeEventListener('error', errorHandler);
        wsChannel?.close();
    },
    subscribe(eventname: eventsNames, callback: MessagesReceivedSubscribersTape | StatusChangedSubscribersTape) {
        // @ts-ignore
        subscribers[eventname].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventname] = subscribers[eventname].filter(s => s != callback)
        }
    },
    unsubscribe (eventname: eventsNames, callback: MessagesReceivedSubscribersTape | StatusChangedSubscribersTape) {
        // @ts-ignore
        subscribers[eventname] = subscribers[eventname].filter(s => s != callback)
    },

    send(message:string) {
        wsChannel?.send(message);
    }

}