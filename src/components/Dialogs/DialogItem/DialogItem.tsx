import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './DialogItem.module.css';

type PropsType = {
    name: string,
    src: string,
    id: string
}
const DialogItem: React.FC<PropsType> = (props) => {
  
    let path="/messages" + props.id ;
 return (
     <div className={c.style_item}>
          <div className={c.item}><NavLink to={path}>{props.name}</NavLink></div>
          <img src={props.src}></img>
     </div>
 )
}

export default DialogItem;