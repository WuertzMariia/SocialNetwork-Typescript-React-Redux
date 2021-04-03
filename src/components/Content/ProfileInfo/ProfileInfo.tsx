import React, {useState} from "react";
import Preloader from "../../Preloader/Preloader";
import c from './ProfileInfo.module.css'
import ProfileStatusWithHook from "./ProfileStatusHook";
import userPhoto from "../../../assets/images/user.png";
import {ProfileForm} from "./ProfileInfoForm";

import {UsersType} from "../../../redux/profileReducer";
import {Button, Input, message, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
type PropsTypeContentInfo = {
    userIdA: number,
    setProfileData: (values: UsersType)=> void,
    savePhotoC: (file: string)=> void,
    profile: UsersType| null,
    isOwner: boolean,
    status:string | null,
    updateUserStatus: (status: string) => void
}


const ProfileInfo: React.FC<PropsTypeContentInfo> = (props) => {
    // const uploadFoto = (file:any) => {
    //
    //     props.savePhotoC(file);
    //     // if (e.target.files.length) {
    //     //
    //     // }
    // }

    const uploadFoto = (e: any) => {
        if (e.target.files.length) {
            props.savePhotoC(e.target.files[0]);
        }
    }

    let [editMode, setEditMode] = useState(false);

    let activEditMode = () => {
        setEditMode(true);
    }
    let deactivEditMode = (values: any) => {
        setEditMode(false);
        props.setProfileData(values);
    }



    if (!props.profile) {
        return <Preloader/>
    }

    return <div className={c.main}>
        <h4>{props.profile.fullName}</h4>
        <ProfileStatusWithHook status={props.status} updateUserStatus={props.updateUserStatus}/>
        <div><img style={{width: "15%"}} title="userPhoto" alt="userPhoto"
                  src={props.profile.photos.small || userPhoto}/></div>
        {props.isOwner &&
        <div><label htmlFor={"file"}><p className={c.btn}>Upload new photo</p></label>
            <input  type={"file"} id={"file"} name={"file"} onChange={uploadFoto}/></div>}

        {!editMode ? <ProfileOfMainUser activEditMode={activEditMode} isOwner={props.isOwner}
                                        profile={props.profile}/>
            : <ProfileForm userIdA={props.userIdA} deactivEditMode={deactivEditMode} isOwner={props.isOwner}
                           profile={props.profile}/>
        }
    </div>
}

export default ProfileInfo;



type ProfileMainUserType = {
    activEditMode: ()=> void,
    isOwner: boolean,
profile: UsersType
}

const ProfileOfMainUser: React.FC<ProfileMainUserType> = (props) => {
    return (
        <div>

            <div>
                {props.profile.lookingForAJob && <p>I am open to work! Please feel free to contact me</p>}
                <p>My job preferences: {props.profile.lookingForAJobDescription}</p>
                <p>My dream job: {props.profile.lookingForAJobDescription}</p>
                <p>About me: {props.profile.aboutMe}</p>
            </div>
            <div>
                <h5>Contacts</h5>
                <ul>

                    <li>Facebook: {props.profile.contacts.facebook}</li>
                    <li>Github: {props.profile.contacts.github}</li>
                    <li>Instagram: {props.profile.contacts.instagram}</li>
                    <li>MainLink: {props.profile.contacts.mainLink}</li>
                    <li>Twitter: {props.profile.contacts.twitter}</li>
                    <li>VK: {props.profile.contacts.vk}</li>
                    <li>Website: {props.profile.contacts.website}</li>
                    <li>Youtube: {props.profile.contacts.youtube}</li>
                </ul>
                {props.isOwner && <Button type={"primary"} onClick={props.activEditMode}>edit</Button>}
            </div>
        </div>
    )
}