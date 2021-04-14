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
import {Button} from 'antd';

type UsersComponentType = {
    match: any
}

const Users: React.FC<UsersComponentType> = (props) => {


    const pageSize = useSelector(usersPageSize);
    const totalUsersCount = useSelector(totUsersCount);
    const subscriptionProcessed = useSelector(subscriptionConfirm);
    const dispatch = useDispatch();
    const usersPageUsers = useSelector(requestUsers);
    const history = useHistory();
    const prevDev = useRef(usersPageUsers);
    let currentPage = useSelector(requestPage);
    let filter = useSelector(filterSelector);
    useEffect(() => {


        let actualPage = currentPage;
        let actualFilter = filter;
        const {search} = history.location;
        const parsed = queryString.parse(search.substr(1)) as {
            term: string,
            page: string,
            friend: string
        };
        if (!!parsed.page) {
            actualPage = +parsed.page
        }

        if (!!parsed.term) {
            actualFilter = {...actualFilter, term: parsed.term as string};

        }
        if (!!parsed.friend) {
            actualFilter = {
                ...actualFilter,
                friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false
            };

        }

        const isSame = prevDev.current.every((obj, index) => isEqual(obj, usersPageUsers[index]));
        if (!isSame || usersPageUsers.length === 0) {
            if (props.match.params.friends) {
                dispatch(getAllUsersFriends(actualPage, pageSize));
            } else {
                dispatch(getUsers(actualPage, pageSize, actualFilter));
            }
        }
        const query: any = {};
        if (!!filter.term) {
            query.term = filter.term;
        }
        if (filter.friend != null) {
            query.friend = filter.friend
        }
        query.page = currentPage;
        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${String(currentPage)}`
        })
        prevDev.current = usersPageUsers;
    }, [])

    // const didMount = useRef(false);
    // useEffect(() => {
    //     const query: any = {};
    //     if (!!filter.term) {
    //         query.term = filter.term;
    //     }
    //     if (filter.friend != null) {
    //         query.friend = filter.friend
    //     }
    //     query.page = currentPage;
    //     if (didMount.current) {
    //         history.push({
    //             pathname: '/users',
    //             search: queryString.stringify(query)
    //             // search: `?term=${filter.term}&friend=${filter.friend}&page=${String(currentPage)}`
    //         })
    //     } else {
    //         didMount.current = true;
    //     }
    //     return () => {
    //         didMount.current = false;
    //
    //     }
    // }, [filter, currentPage]);


    const onBtnPageClick = (p: number) => {
        if (props.match.params.friends) {
            dispatch(getAllUsersFriends(p, pageSize));
        } else {
            dispatch(getUsers(p, pageSize, filter));
            history.push({
                pathname: '/users',
                search: `?term=${filter.term}&friend=${filter.friend}&page=${String(p)}`
            })
        }

    }

    const onSearchBtnClick = (s: {
        term: string,
        friend: null | boolean
    }) => {
        dispatch(getUsers(1, pageSize, s));
        history.push({
            pathname: '/users',
            search: `?term=${s.term}&friend=${s.friend}&page=${String(1)}`
        })
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
                            <img style={{maxWidth: '50px'}} alt="users avatar" className={s.img_class}
                                 src={u.photos.small != null ? u.photos.small : userPhoto}></img>
                        </NavLink>
                    </div>
                    {u.followed ?
                        <Button disabled={subscriptionProcessed.some(id => id === u.id)}
                                className={s.btn_foll} onClick={() => {
                            unfollow(u.id);
                        }} type={'default'}>Unfollow</Button> :
                        <Button disabled={subscriptionProcessed.some(id => id === u.id)}
                                className={s.btn_foll} onClick={() => {
                            follow(u.id);
                        }} type={'default'}>Follow</Button>}
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

const UsersSearchForm = React.memo((props: { onSearchBtnClick: (s: { term: string; friend: boolean | null }) => void }) => {

    let filter = useSelector(filterSelector);

    interface Values {
        term: string,
        friend: 'true' | 'false' | 'null'

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
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onSearchBtnClick(filter);

    }
    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{
                term: filter.term,
                friend: String(filter.friend) as 'true' | 'false' | 'null'
            }}
            onSubmit={submitFunc}
        >
            <Form>
                <div className={s.formStyle}>
                    <label htmlFor="searchField">Find new friends</label>
                    <Field id="searchField" name="term" type="text" placeholder=""/>
                    <Field as="select" name="friend">
                        <option value="null">All Users</option>
                        <option value="true">Friends</option>
                        <option value="false">Not Friends</option>
                    </Field>
                    <button type="submit">Search</button>
                </div>
            </Form>
        </Formik>
    </div>
})


export default Users; 