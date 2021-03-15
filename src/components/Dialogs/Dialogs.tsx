import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import c from './Dialogs.module.css'
import {Message} from './Message/Message';
import DialogsFieldFormContainer from "./DialogsFieldForm";
import {InitialStateDialogsType} from "../../redux/dialogsReducer";


type PropsType = {
    messagesPage: InitialStateDialogsType
}

const Dialogs: React.FC<PropsType> = (props) => {

let dialogdata = props.messagesPage.dialog.map( d => <DialogItem name={d.name} id={d.id} src={d.src}/>);
let messagedata = props.messagesPage.messag.map(m => <Message message={m.mess} />);


    return (
        <div className={c.dialogs}>
           <div className={c.dialog_items}>
              {dialogdata}


           </div>
            <div className={c.style_dialogs}>
           <div className={c.messages}>
              {messagedata}
           </div>
           <div className={c.sendMessage}>
               <DialogsFieldFormContainer />
             {/* <textarea onChange={messAreaChange} className={c.textar} placeholder="your message" value={props.messagesPage.updatedTextArea}></textarea>
              <button type="button" onClick={addnewmessage}>Send &#9993;</button>*/}
           </div>
            </div>
        </div>
    )
}

export default Dialogs;