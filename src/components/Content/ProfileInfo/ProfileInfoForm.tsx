import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHook from "./ProfileStatusHook";
import {Field, Form} from "react-final-form";
import React from "react";
import s from './ProfileInfoForm.module.css';
import {UsersType} from "../../../redux/profileReducer";
import {Button} from 'antd';

type ProfileFormValuesType = {
    aboutMe: string
    userId: number,
    lookingForAJob: string,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string
    }
}

type ProfileFormType = {
    isOwner: boolean,
    userIdA: number,
    profile: UsersType
    deactivEditMode: (values: ProfileFormValuesType) => void
}

export const ProfileForm: React.FC<ProfileFormType> = (props) => {

    return (
        <div>
            <Form
                onSubmit={(values: ProfileFormValuesType) => {
                    props.deactivEditMode(values);
                }}
                initialValues={{
                    userId: props.userIdA,
                    aboutMe: props.profile.aboutMe,
                    lookingForAJob: props.profile.lookingForAJob,
                    lookingForAJobDescription: props.profile.lookingForAJobDescription,
                    fullName: props.profile.fullName,
                    contacts: {
                        github: props.profile.contacts.github,
                        vk: props.profile.contacts.vk,
                        facebook: props.profile.contacts.facebook,
                        instagram: props.profile.contacts.instagram,
                        twitter: props.profile.contacts.twitter,
                        website: props.profile.contacts.website,
                        youtube: props.profile.contacts.youtube,
                        mainLink: props.profile.contacts.mainLink
                    }
                }}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form className={s.main} onSubmit={handleSubmit}>
                        <h3>Edit your profile info</h3>
                        <div>
                            <label>Open to work</label>
                            <Field name={"lookingForAJob"} component={"input"} type={"checkbox"}/>
                        </div>
                        <div className={s.each_field}>
                            <label>My dream job</label>
                            <Field name={"lookingForAJobDescription"} component={"input"} type={"text"}
                                   placeholder={"Describe your dream job"}/>
                        </div>
                        <div className={s.each_field}>
                            <label>About me</label>
                            <Field name={"aboutMe"} component={"input"} type={"text"}
                            />
                        </div>

                        <div>
                            <Contacts name={"contacts"}/>

                        </div>
                        <div className="buttons">
                            <Button type="primary" onClick={handleSubmit} disabled={submitting || pristine}>
                                Submit
                            </Button>
                            <Button
                                type="primary"
                                // onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </Button>
                        </div>

                    </form>
                )}
            />
        </div>
    )
}
type ContactsType = {
    name: string
}

const Contacts: React.FC<ContactsType> = ({name}) => (
    <React.Fragment>
        <div>
            <h4>Contacts</h4>
            <div className={s.each_field}>
                <label>Facebook: </label>
                <Field name={`${name}.facebook`} component={"input"} type={"text"}
                       placeholder={"Link to your Facebook"}/></div>
            <div className={s.each_field}>
                <label>GitHub: </label>
                <Field name={`${name}.github`} component={"input"} type={"text"} placeholder={"Link to your GitHub"}/>
            </div>
            <div className={s.each_field}>
                <label>Instagram: </label>
                <Field name={`${name}.instagram`} component={"input"} type={"text"}
                       placeholder={"Link to your Instagram"}/></div>
            <div className={s.each_field}>
                <label>Mainpage: </label>
                <Field name={`${name}.mainLink`} component={"input"} type={"text"}
                       placeholder={"Link to your Mainpage"}/></div>
            <div className={s.each_field}>
                <label>Twitter: </label>
                <Field name={`${name}.twitter`} component={"input"} type={"text"} placeholder={"Link to your Twitter"}/>
            </div>
            <div className={s.each_field}>
                <label>VK: </label>
                <Field name={`${name}.vk`} component={"input"} type={"text"} placeholder={"Link to your VK"}/></div>
            <div className={s.each_field}>
                <label>Website: </label>
                <Field name={`${name}.website`} component={"input"} type={"text"} placeholder={"Link to your website"}/>
            </div>
            <div className={s.each_field}>
                <label>Youtube Channel: </label>
                <Field name={`${name}.youtube`} component={"input"} type={"text"}
                       placeholder={"Link to your Youtube Channel"}/></div>
        </div>

    </React.Fragment>
)
