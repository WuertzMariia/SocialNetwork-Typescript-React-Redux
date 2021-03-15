import React from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

let mapStateToProps = (state) => ({
    isAuthorized: state.auth.data.isAuth
})


export const withAuthRedirectComponent = (Component) => {
class RedirectComponent extends React.Component {
    render () {
      if(!this.props.isAuthorized) {
          return <Redirect to='/login' />
      } return <Component {...this.props} />
    } 
} 
let connectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);
return connectedAuthRedirectComponent;
}


