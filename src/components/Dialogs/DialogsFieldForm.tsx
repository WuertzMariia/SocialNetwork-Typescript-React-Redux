import React from 'react';
import {connect} from "react-redux";
import { Form, Field } from 'react-final-form'
import {sendMessage} from "../../redux/dialogsReducer";
import {AppStateType} from "../../redux/redux_store";

type PropsDialogFormType = {
    onButtonsSend: (message: string) => void
}

const DialogForm: React.FC<PropsDialogFormType> = (props) => {
    return (<div>
        <Form

            onSubmit={(values) => props.onButtonsSend(values.message) }
            validate={values => {
           
                const errors = {}
                if (!values.message) {
                    // @ts-ignore
                    errors.message = ''
                }
                return errors
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <label> <Field name="message">
                        {({ input, meta }) => (
                            <div>
                                <label></label>
                                <input {...input} type="text" placeholder="your message" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field >
                    </label> 
                        <button type="submit" disabled={submitting || pristine}>
              Send
            </button>

                    
                </form>
            )}
        />
    </div>)
}

type PropsType = {
    sendMessage: (message: string) => void
}

class DialogsFieldFormContainer extends React.Component<PropsType> {

    onButtonSend = (message:string) => {
        this.props.sendMessage(message);

    }
    render() {
        return (<div>
<DialogForm onButtonsSend={this.onButtonSend}/>
        </div>)
    }

}
let mapStateToProps = (state:AppStateType) => {

}
export default connect(mapStateToProps, {sendMessage})(DialogsFieldFormContainer)