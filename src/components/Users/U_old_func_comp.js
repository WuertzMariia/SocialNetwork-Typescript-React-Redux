import React from "react";
import s from './Users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';


const U_old = (props) => {
    if (props.usersPage.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then((response) => {

            props.setUsers(response.data.items);
        })
    }


    return (
        <div className={s.users_style}>
            <div>
                {props.usersPage.users.map(u => <div className={s.each_user}>
                    <div className={s.logo}>
                        <div><img className={s.img_class}
                                  src={u.photos.small != null ? u.photos.small : userPhoto}></img></div>
                        {u.followed ?
                            <button className={s.btn_foll} onClick={() => {
                                props.unfollow(u.id)
                            }} type="button">Unfollow</button> :
                            <button className={s.btn_foll} onClick={() => {
                                props.follow(u.id)
                            }} type="button">Follow</button>}

                    </div>

                    <div className={s.info_block}>
                        <div className={s.info_one}>
                            <div>{u.name}, {u.lastname}
                                <div>{u.status}</div>
                            </div>


                        </div>
                        <div className={s.country_city}>{u.country} {u.city}</div>
                    </div>


                </div>)}
            </div>

            <div className={s.button_style}>
                <button type="button">Show more</button>
            </div>
        </div>
    )
}

export default U_old; 