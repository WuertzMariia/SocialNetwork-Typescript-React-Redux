import React from "react";
import c from './Content.module.css'
import MyPostsContainer from "./MyPosts/MyPosts_Container";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {UsersType} from "../../redux/profileReducer";

export type PropsTypeContent = {
    userIdA: number,
    setProfileData: (values: UsersType)=> void,
    savePhotoC: (file: string)=> void,
    profile: UsersType| null,
    isOwner: boolean,
    status:string | null,
    updateUserStatus: (status: string) => void
}
const Content: React.FC<PropsTypeContent> = (props) => {

    
    return <div className={c.profile}>
        <ProfileInfo userIdA={props.userIdA} setProfileData={props.setProfileData} savePhotoC={props.savePhotoC} profile={props.profile} isOwner={props.isOwner} status={props.status} updateUserStatus={props.updateUserStatus}/>
        <MyPostsContainer/>
        </div>
}

export default Content;