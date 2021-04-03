import React from 'react';
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux_store';
import {Link, NavLink} from 'react-router-dom';
import {singOutLogin} from '../../redux/authReducer';
import Preloader from '../Preloader/Preloader';


export const Header = () => {
    const {Header} = Layout;
    const isAuthorized = useSelector((state: AppStateType) => state.auth.data.isAuth);
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching);
    const login = useSelector((state: AppStateType) => state.auth.data.login);
    let dispatch = useDispatch();
    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={16}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to={'/users/'}>Users</Link></Menu.Item>
                </Menu>
            </Col>

            {isFetching ? <Preloader/> : <>
                {isAuthorized && <Col span={3}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        alignItems: 'baseline'
                    }}><Avatar size="large" style={{minWidth:"40px", minHeight:"20px"}} icon={<UserOutlined/>}/>  <p style={{color: 'white'}}>{login} </p></div>
                </Col>}
                {!isAuthorized && <Col span={3}></Col>}

                <Col span={4}>{isAuthorized ?
                    <> <Button type={'primary'} style={{marginTop: '15px'}} onClick={() => dispatch(singOutLogin())}>Sign
                        Out</Button> </> : <Button style={{marginTop: '15px'}} type={'primary'}><NavLink
                        to="/login">Login</NavLink></Button>}</Col></>}
        </Row>


    </Header>
}

