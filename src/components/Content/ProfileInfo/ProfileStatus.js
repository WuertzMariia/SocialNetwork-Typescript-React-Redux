import React from 'react';
import c from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode() {
        this.setState({
            editMode: true
        });
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    handleKey(e) {
        if (e.charCode === 13 || e.keyCode === 13) {

            this.deactivateEditMode();
        }
    }

    updateInputArea(e) {
        this.setState({
            status: e.target.value
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.status != prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (<div className={c.main}>
            {!this.state.editMode ?
                <div><p onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || "Enter your status"}</p>
                </div> :
                <div><p><input onChange={this.updateInputArea.bind(this)} autoFocus="true"
                               onKeyPress={this.handleKey.bind(this)} onBlur={this.deactivateEditMode.bind(this)}
                               type="text" maxlength="300" value={this.state.status}/></p></div>
            }
        </div>)
    }
}

export default ProfileStatus; 