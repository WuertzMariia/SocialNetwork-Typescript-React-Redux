import React from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../../redux/redux_store";

let mapStateToProps = (state: AppStateType) => ({
    isAuthorized: state.auth.data.isAuth
})
type PropsType = ReturnType<typeof mapStateToProps>;

export function withAuthRedirectComponent<WCP>(Component: React.ComponentType<WCP>) {
class RedirectComponent extends React.Component<PropsType> {
    render () {
        let {isAuthorized, ...restProps} = this.props;
      if(!this.props.isAuthorized) {
          return <Redirect to='/login' />
      } return <Component  {...restProps as WCP} />
    } 
} 
let connectedAuthRedirectComponent = connect<PropsType, {}, WCP, AppStateType>(mapStateToProps)(RedirectComponent);

return connectedAuthRedirectComponent;
}


