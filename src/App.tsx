import React, {Suspense} from 'react';
import Music from './components/Music/Music';
import News from './components/News/News';
import {BrowserRouter, NavLink, Redirect, Route, withRouter} from 'react-router-dom';
import Content_Container from './components/Content/Content_Container';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import Preloader from './components/Preloader/Preloader';
import store, {AppStateType} from './redux/redux_store';
import {initialization_App} from './redux/appReducer';
import 'antd/dist/antd.css';
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import FriendsContainer from './components/Sidebar/Friends/Friends';
import {Header} from './components/Header/Header';
import {ChatPage} from './components/Chat/ChatPage';

const UsersPageContainer = React.lazy(() => import('./components/Users/Users_Container'));
const DialogsPageContainer = React.lazy(() => import('./components/Dialogs/Dialogs_Container'));
const {SubMenu} = Menu;
const {Content, Sider} = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initialization_App: () => void
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount = () => {

        this.props.initialization_App();
    }

    render() {
        if (!this.props.initialized_app) {
            return <Preloader/>
        }
        return (
            <div><Layout>
                <Header/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0,}}
                        >

                            <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile" style={{}}>
                                <Menu.Item key="1"><NavLink to={'/profile'}>My Profile</NavLink></Menu.Item>
                                <Menu.Item key="2"><NavLink to={'/messages'}>Messages</NavLink></Menu.Item>
                                <Menu.Item key="3"><NavLink to={'/chat'}>Chat</NavLink></Menu.Item>
                                {/*<Menu.Item key="4">option4</Menu.Item>*/}
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users" style={{}}>
                                <Menu.Item key="5"><NavLink to={'/users/'}>Find new Friends</NavLink></Menu.Item>
                                {/*<Menu.Item key="6"><NavLink to={'/users/' + 'friends'}*/}
                                {/*                            onClick={() => getAllUsersFriends(1, 5)}>My*/}
                                {/*    Friends</NavLink></Menu.Item>*/}
                                {/*<Menu.Item key="7">option7</Menu.Item>*/}
                                {/*<Menu.Item key="8">option8</Menu.Item>*/}
                            </SubMenu>
                            {/*<SubMenu key="sub3" icon={<NotificationOutlined/>} title="Dialogs" style={{}}>*/}
                            {/*    <Menu.Item key="9">Messages</Menu.Item>*/}
                            {/*    <Menu.Item key="10">option10</Menu.Item>*/}
                            {/*    <Menu.Item key="11">option11</Menu.Item>*/}
                            {/*    <Menu.Item key="12">option12</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            <div><FriendsContainer/></div>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div>
                                <Route exact path={'/'} render={() => <Redirect from={'/'} to={'/profile'}/>}/>
                                <Route path="/profile/:userId?" render={() => <Content_Container/>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Suspense fallback={<Preloader/>}>
                                    <Route path={'/users/:friends?'}
                                           render={() => <UsersPageContainer/>}/>
                                </Suspense>
                                <Suspense fallback={<Preloader/>}>
                                    <Route path="/messages"
                                           render={() => <DialogsPageContainer/>}/>
                                </Suspense>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="/chat" render={() => <ChatPage/>}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>,
            </div>
            // <div className={c.App}>

            //     <Sidebar/>
            //

            //     <Route exact path={"/"} render={()=> <Redirect from={"/"} to={"/profile"} />} />
            //     <Route path="/profile/:userId?" render={() => <Content_Container/>}/>
            //     <Route path="/news" render={() => <News/>}/>
            //     <Route path="/music" render={() => <Music/>}/>
            //     <Suspense fallback={<Preloader/>}><Route path={'/users/:friends?/:'+pathWithPage+'?'} render={() => <UsersContainer/>}/></Suspense>
            //     <Suspense fallback={<Preloader/>}><Route path="/messages"
            //                                              render={() => <Dialogs_Container/>}/></Suspense>
            //     <Route path="/login" render={() => <Login/>}/>
            //     <Route path={"*"} render={()=> <div>
            //         <div>404 Not Found</div>
            //
            //         </div>}/>

            //
            // </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    state: state,
    initialized_app: state.appMain.initialized,
    currentPage: state.usersPage.currentPage
})

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initialization_App}))(App);
const SocialNetworkApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialNetworkApp;
