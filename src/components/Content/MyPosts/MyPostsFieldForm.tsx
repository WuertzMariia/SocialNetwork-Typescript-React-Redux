import React from 'react';
import {Form, Field} from 'react-final-form';

import {addNewPost, PostType} from "../../../redux/profileReducer";
import {connect} from "react-redux";

type MyPostFieldFormType = {
    onSubmitForm: (values:string ) => void
}
const MyPostsFieldForm: React.FC<MyPostFieldFormType> = (props) => {

    return (<div>
        <Form
            onSubmit={(values) => {
                props.onSubmitForm(values.new_post);
            }}
            keepDirtyOnReinitialize
            validate={values => {
                const errors = {}
                if (!values.new_post) {
                    // @ts-ignore
                    errors.new_post = "Required"
                }
                return errors;
            }}
            render={({handleSubmit, form}) => (
                <form onSubmit={(event) => {
                    const promise = handleSubmit(event);
                    promise && promise.then(() => {
                        form.setConfig('keepDirtyOnReinitialize', false);
                        form.reset();
                        form.setConfig('keepDirtyOnReinitialize', true);
                    })
                    return promise;
                }}
                >
                    <div>
                        <Field name="new_post">
                            {({input, meta}) => (
                                <div>
                                    <label></label>
                                    <input {...input} type="text" placeholder="Your new post"/>
                                    {/* {meta.error && meta.touched && <span>{meta.error}</span>} */}
                                </div>
                            )}
                        </Field>
                        <input name={"submit"} type={"submit"} value={"Send"}/>
                    </div>
                </form>
            )}
        />
    </div>)
}
type PropsPostFieldFormType = {
    addNewPost: (values: string) => void
}
class MyPostsFieldFormContainer extends React.Component<PropsPostFieldFormType> {
    onSubmitForm = (values: string) => {
        this.props.addNewPost(values);
    }

    render() {
        return (<div>
            <MyPostsFieldForm onSubmitForm={this.onSubmitForm}/>

        </div>)
    }
}

export default connect(null, {addNewPost})(MyPostsFieldFormContainer);