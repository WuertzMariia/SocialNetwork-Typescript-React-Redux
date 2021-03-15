import React from "react";
import Content from "./Content";
import {connect} from "react-redux";
import {getUserProfile, updateUserStatus, getCurrentUserStatus, UsersType, PostType} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirectComponent} from "../Redirect/withAuthRedirectComponent";
import {compose} from "redux";
import {savePhoto, setProfileData} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux_store";

type MapStateToPropsType = {
    profile: UsersType | null,
    status: string | null,
    authorized_userId: number,
    isAuth: boolean,
    userIdAuth: number
}

type MapDispatchToPropsType = {
    setProfileData: () => void,
    savePhoto: () => void,
    getUserProfile: (userId: number) => void,
    updateUserStatus: () => void,
    getCurrentUserStatus: (userId: number) => void,
    match: any,
    params: any,

}
class Content_Container extends React.Component<MapDispatchToPropsType&MapStateToPropsType> {
    refreshProfile() {
        let userIdAuthentic = this.props.match.params.userId;
        if (!userIdAuthentic && this.props.isAuth) {
            userIdAuthentic = this.props.authorized_userId;
        }
        this.props.getUserProfile(userIdAuthentic);
        this.props.getCurrentUserStatus(userIdAuthentic);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
        if (prevProps.match.params.userId != this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (<div>
            <Content userIdA={this.props.userIdAuth} savePhotoC={this.props.savePhoto}{...this.props}
                     isOwner={!this.props.match.params.userId} profile={this.props.profile} status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        </div>)
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state["profilePage"]["profile"],
    status: state["profilePage"]["status"],
    authorized_userId: state.auth.data.userId,
    isAuth: state.auth.data.isAuth,
    userIdAuth: state.auth.data.userId
});


export default compose(connect(mapStateToProps, {
        setProfileData,
        savePhoto,
        getUserProfile,
        updateUserStatus,
        getCurrentUserStatus
    }),
    withRouter,
    withAuthRedirectComponent)
(Content_Container)
