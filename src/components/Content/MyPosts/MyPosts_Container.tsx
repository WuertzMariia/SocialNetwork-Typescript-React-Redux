import {
    InitialStateProfileType
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux_store";


type PropsType = {
    profilePage: InitialStateProfileType
}
let mapStateToProps = (state: AppStateType) => {
    return {
        profilePage: state.profilePage
    }
}
const MyPostsContainer = connect(mapStateToProps, {})(MyPosts);
export default MyPostsContainer;