import React, {useEffect, useRef} from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink, useHistory} from 'react-router-dom';
import Paginator from './Paginator';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
    filterSelector,
    requestPage,
    requestUsers,
    subscriptionConfirm,
    totUsersCount,
    usersPageSize
} from '../../redux/selectors';
import isEqual from 'lodash-es/isEqual';
import {getAllUsersFriends, getUsers, subscribe, unsubscribe} from '../../redux/usersReducer';
import * as queryString from 'querystring';

type UsersComponentType = {
    match: any
}

const Users: React.FC<UsersComponentType> = (props) => {


    const pageSize = useSelector(usersPageSize);
    const totalUsersCount = useSelector(totUsersCount);
    const currentPage = useSelector(requestPage);
    const subscriptionProcessed = useSelector(subscriptionConfirm);
    const filter = useSelector(filterSelector);
    const dispatch = useDispatch();
    const usersPageUsers = useSelector(requestUsers);
const history = useHistory();
//     useEffect(()=> {
// history.push({
//     pathname: '/users',
//     search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
// })
//     }, [filter, currentPage]);

    useEffect(()=> {
        const {search} = history.location;
        const parsed = queryString.parse(search.substr(1));
        console.log(parsed);
    })

    let useDeepEf = () => {
        const isFirst = useRef(true);
        const prevDev = useRef(usersPageUsers);

        useEffect(() => {
            const isSame = prevDev.current.every((obj, index) => isEqual(obj, usersPageUsers[index]));
            if (!isSame || usersPageUsers.length===0) {
                if (props.match.params.friends) {
                            dispatch(getAllUsersFriends(currentPage, pageSize));
                        } else {
                       dispatch(getUsers(currentPage, pageSize, filter));
                        }
            }
            isFirst.current = false;
            prevDev.current = usersPageUsers;
        }, [])
    }
useDeepEf();

    const onBtnPageClick = (p: number) => {
        if (props.match.params.friends) {
            dispatch(getAllUsersFriends(p, pageSize));
        } else {
            dispatch(getUsers(p, pageSize, filter));
        }

    }

    const onSearchBtnClick = (s: {
        term: string,
        friend: null | boolean
    }) => {
        dispatch(getUsers(1, pageSize, s));
    }
    const follow = (userId: number) => {
        dispatch(subscribe(userId));
    }

    const unfollow = (userId: number) => {
        dispatch(unsubscribe(userId));
    }

    let allUsers = usersPageUsers.map(u => <div className={s.each_user}>

        <div className={s.info_block}>
            <div className={s.info_one}>
                <div className={s.logo}>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img alt="users avatar" className={s.img_class}
                                 src={u.photos.small != null ? u.photos.small : userPhoto}></img>
                        </NavLink>
                    </div>
                    {u.followed ?
                        <button disabled={subscriptionProcessed.some(id => id === u.id)}
                                className={s.btn_foll} onClick={() => {
                            unfollow(u.id);
                        }} type="button">Unfollow</button> :
                        <button disabled={subscriptionProcessed.some(id => id === u.id)}
                                className={s.btn_foll} onClick={() => {
                            follow(u.id);
                        }} type="button">Follow</button>}
                </div>
                <div>
                    <NavLink className={s.link_style}
                             to={'/profile/' + u.id}>{u.name}</NavLink>
                    <div>{u.status}</div>
                </div>


            </div>

        </div>


    </div>)
    return (
        <div className={s.users_style}>
            <div><UsersSearchForm onSearchBtnClick={onSearchBtnClick}/></div>
            <div>
                {allUsers}
            </div>

            <div className={s.button_style}>
                <Paginator onBtnPageClick={onBtnPageClick} totalUsersCount={totalUsersCount} pageSize={pageSize}

                           currentPage={currentPage}/>
            </div>
            {/* <div className={s.button_style}>
                <PaginatorVersionTwo totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} onBtnPageClick={props.onBtnPageClick}
                                     currentPage={props.currentPage}/></div>*/}
        </div>
    )
}

const UsersSearchForm = (props: { onSearchBtnClick: (s: { term: string; friend: boolean | null }) => void }) => {
    interface Values {
        term: string,
        friend: string

    }

    let submitFunc = (
        values: Values,
        {setSubmitting}: FormikHelpers<Values>
    ) => {
        let filter: {
            term: string,
            friend: null | boolean
        } = {
            term: values.term,
            friend: values.friend === 'all' ? null : values.friend === 'friends' ? true : false
        }
        props.onSearchBtnClick(filter);

    }
    return <div>
        <Formik
            initialValues={{
                term: '',
                friend: 'all'
            }}
            onSubmit={submitFunc}
        >
            <Form>
                <div className={s.formStyle}>
                    <label htmlFor="searchField">Find new friends</label>
                    <Field id="searchField" name="term" placeholder=""/>
                    <Field as="select" name="friend">
                        <option value="all">All Users</option>
                        <option value="friends">Friends</option>
                        <option value="notFriends">Not Friends</option>
                    </Field>
                    <button type="submit">Search</button>
                </div>
            </Form>
        </Formik>
    </div>
}


export default Users; 