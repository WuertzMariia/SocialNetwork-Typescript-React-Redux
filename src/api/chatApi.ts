export type ChatData = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}
let wsChannel: WebSocket | null = null;


let closeHandler = () => {
    console.log('close ws and reconnect');
    setTimeout(createChannel, 5000);
}

let messageHandler = (e) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages));
};

function createChannel() {

    wsChannel?.removeEventListener('close', closeHandler);
    wsChannel?.removeEventListener("message", messageHandler);
    wsChannel?.close();
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    wsChannel.addEventListener('close', closeHandler);
    wsChannel.addEventListener("message", messageHandler);
}

let subscribers = [] as Array<(messages: ChatData[]) => void>

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers=[];
        wsChannel?.removeEventListener("message", messageHandler);
        wsChannel?.removeEventListener('close', closeHandler);
        wsChannel?.close();
    },
    subscribe(callback: (messages: ChatData[]) => void) {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(s => s != callback)
        }
    },
    unsubscribe(callback: (messages: ChatData[]) => void) {
        subscribers = subscribers.filter(s => s != callback)
    },
    send(message:string) {
        wsChannel?.send(message);
    }

}