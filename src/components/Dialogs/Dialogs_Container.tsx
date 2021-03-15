// import { actioncreatorAddMessage, actioncreatorUpdateTextareaDialog } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../Redirect/withAuthRedirectComponent';
import {AppStateType} from "../../redux/redux_store";



let mapStateToProps = (state: AppStateType) => {
   return {
messagesPage: state.messagesPage
   }
}


   const Dialogs_Container= compose(connect(mapStateToProps, {}),withAuthRedirectComponent)(Dialogs)

// const Dialogs_Container = connect(mapStateToProps, mapDispatchToProps)(Dialogs); 

export default Dialogs_Container;