import {combineReducers} from "redux";
import projectReducers from "./project/ProjectReducers";
import taskReducers from "./task/TaskReducers";
import usersReducers from "./user/UserReducers";
import projectStatusReducers from "./project-statuses/ProjectStatusReducers";
// import feedbacksReducers from "./feedback/FeedbackReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataProjects: projectReducers,
    dataProjectStatuses: projectStatusReducers,
    dataTasks: taskReducers,
    dataUsers: usersReducers,
})

export default rootReducers