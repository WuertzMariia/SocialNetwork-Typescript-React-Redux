import React from 'react';
import c from './../Dialogs.module.css';

type PropsType = {
    message: string
}

export const Message: React.FC<PropsType> = (props) => {
    return (
        <div>
             <div className={c.message}>{props.message}</div>
        </div>
    )
}


