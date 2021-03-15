import React, {Suspense} from "react";
import c from './App.module.css';
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'
import Music from './components/Music/Music';
import News from './components/News/News';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Content_Container from "./components/Content/Content_Container";
import Header_Container from "./components/Header/Header_Container";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initialization_App} from "./redux/appReducer";
import Preloader from "./components/Preloader/Preloader";
import store from "./redux/redux_store";


const Dialogs_Container = React.lazy(() => import("./components/Dialogs/Dialogs_Container"));
const UsersApiComponent = React.lazy(() => import("./components/Users/Users_Container"));

class App extends React.Component {
    componentDidMount = () => {

        this.props.initialization_App();
    }

    render() {
        if (!this.props.initialized_app) {
            return <Preloader/>
        }
        return (

            <div className={c.App}>
                <Header_Container/>
                <Sidebar/>
                
               
                <Route exact path={"/"} render={()=> <Redirect from={"/"} to={"/profile"} />} />
                <Route path="/profile/:userId?" render={() => <Content_Container/>}/>
                <Route path="/news" render={() => <News/>}/>
                <Route path="/music" render={() => <Music/>}/>
                <Suspense fallback={<Preloader/>}><Route path="/users" render={() => <UsersApiComponent/>}/></Suspense>
                <Suspense fallback={<Preloader/>}><Route path="/messages"
                                                         render={() => <Dialogs_Container/>}/></Suspense>
                <Route path="/login" render={() => <Login/>}/>
            
                <Footer/>

            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    state: state,
    initialized_app: state.appMain.initialized
})
let AppContainer = compose(withRouter, connect(mapStateToProps, {initialization_App}))(App);
const SocialNetworkApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialNetworkApp;
