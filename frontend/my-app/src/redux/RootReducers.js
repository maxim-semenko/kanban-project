import {combineReducers} from "redux";
import projectReducers from "./project/ProjectReducers";
import taskReducers from "./task/TaskReducers";
import usersReducers from "./user/UserReducers";
// import feedbacksReducers from "./feedback/FeedbackReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataProjects: projectReducers,
    dataTasks: taskReducers,
    dataUsers: usersReducers,
})

export default rootReducers