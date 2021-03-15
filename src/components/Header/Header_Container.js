
import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import Preloader from "../Preloader/Preloader";
import {singOutLogin} from "../../redux/authReducer";


class Header_Container extends React.Component {
  
    render () {
        return (<>
            {this.props.isFetching ? <Preloader /> : <Header {...this.props}/>}
            </>
        )
    }
}
let mapStateToProps = (state) =>( {
    login: state.auth.data.login,
    isFetching: state.auth.isFetching,
    isAuthorized: state.auth.data.isAuth

})
export default connect(mapStateToProps, {singOutLogin})(Header_Container);