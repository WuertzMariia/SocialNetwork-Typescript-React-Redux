
import {MessagesReceivedSubscribersTape, StatusChangedSubscribersTape} from './chatApi';

export type ChatData = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}

let wsChannel: WebSocket| null = null;
let subscribers = {
    'message-received' : [] as MessagesReceivedSubscribersTape[],
    'status-changed': [] as StatusChangedSubscribersTape[]
}

let openHandler = () => {
    subscribers['status-changed'].forEach(s => s('ready'));
}
const closeHandler = ()=> {
setTimeout(createChannel, 2000);
subscribers['status-changed'].forEach((s=> s('pending')))
console.log("new attempt to create websocket channel.")
}
const messageHandler = (e)=> {
subscribers['message-received'].forEach(s => s(JSON.parse(e.data)))
}

const errorHandler = ()=> {
    subscribers['status-changed'].forEach(s=> s('error'));

}

const createChannel = () => {
    wsChannel?.removeEventListener('open', openHandler);
    wsChannel?.removeEventListener('close', closeHandler);
    wsChannel?.removeEventListener('message', messageHandler);
    wsChannel?.removeEventListener('error', errorHandler);
    wsChannel?.close();
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

    wsChannel?.addEventListener('open', openHandler);
    wsChannel?.addEventListener('close', closeHandler);
    wsChannel?.addEventListener('message', messageHandler);
    wsChannel?.addEventListener('error', errorHandler);
}
type eventsNames = 'message-received' | 'status-changed';

export const chatAPI = {
    subscribe (event: eventsNames, callback: MessagesReceivedSubscribersTape | StatusChangedSubscribersTape) {
        // @ts-ignore
        subscribers[event].push(callback);

    },
    unsubscribe(event: eventsNames, callback: MessagesReceivedSubscribersTape | StatusChangedSubscribersTape) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(s => s != callback)
    },
    stop() {
        wsChannel?.removeEventListener('open', openHandler);
        wsChannel?.removeEventListener('close', closeHandler);
        wsChannel?.removeEventListener('message', messageHandler);
        wsChannel?.removeEventListener('error', errorHandler);
        wsChannel?.close();
    },
    start() {
        createChannel();
    },
    send (message: string) {
        wsChannel?.send(message);
    }
}
