import React from 'react';
import c from './Login.module.css';
import {Form, Field} from 'react-final-form';
import {singInLogin, ValuesType} from '../../redux/authReducer';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../redux/redux_store";

type PropsLoginFormType = {
    captchaUrl: string|null,
    onSubmitForm: (value: ValuesType)=> void,
    login_failed: boolean | null
}
export const LoginForm: React.FC<PropsLoginFormType> = (props) => {

    return (
        <Form
            onSubmit={(value: ValuesType) => {
                props.onSubmitForm(value);
            }}

            validate={values => {
                const errors = {}
                // @ts-ignore
                if (!values.login) {
                    // @ts-ignore
                    errors.login = "Required"
                }
                if (!values.password) {
                    // @ts-ignore
                    errors.password = "Required"
                }
                return errors;
            }}
            render={({handleSubmit, form, submitting, pristine, values}) => (
                <form onSubmit={handleSubmit} className={c.transparent}>
                    <div className={c.form_inner}>
                        {/* //  + ' ' + (meta.error && meta.touched ? c.error_style: " ") */}

                        <h3>Sign In</h3>
                        {props.login_failed ?
                            <p className={c.failed_sing_in}>Sign in failed. Wrong E-Mail or password</p> : null}
                        <Field name="login">
                            {({input, meta}) => (
                                <div>
                                    <label>Login</label>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    <input {...input} type="text" placeholder="Login"/>

                                </div>
                            )}
                        </Field>
                        <Field name="password">
                            {({input, meta}) => (
                                <div>
                                    <label>Password</label>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    <input {...input} type="password" placeholder="Password"/>

                                </div>
                            )}
                        </Field>
                        <label>
                            <Field
                                name="remember_me"
                                component="input"
                                type="checkbox"
                                value={true}
                                id={"custom_checkbox"}
                            />{' '}
                            remember me
                        </label>
                        {!!props.captchaUrl && <img className={c.captcha} src={props.captchaUrl}/>}
                        {!!props.captchaUrl &&
                        <Field name="captcha">
                            {({input, meta}) => (
                                <div>
                                    <label>Please enter the captcha code</label>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    <input {...input} type="text" placeholder=""/>

                                </div>
                            )}
                        </Field>}

                        <input name={"submit"} type={"submit"} value={"submit"}/>
                    </div>
                </form>
            )}
        />
    )
}

type PropsType = {
    isAuth: boolean,
    login_failed: boolean| null,
    captchaURL: string | null,
    singInLogin: (values: any) => void
}

const Login: React.FC<PropsType> = (props) => {
    debugger;
    let onSubmitForm = (values: any) => {
        props.singInLogin(values);
    }
    if (props.isAuth) {
        return <Redirect from="/login" to="/profile"/>
    }
    return (
        <div>
            <LoginForm captchaUrl={props.captchaURL} onSubmitForm={onSubmitForm} login_failed={props.login_failed}/>
        </div>
    )
}

let mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.data.isAuth,
    login_failed: state.auth.data.login_failed,
    captchaURL: state.auth.data.captchaURL
})


export default connect(mapStateToProps, {singInLogin})(Login);