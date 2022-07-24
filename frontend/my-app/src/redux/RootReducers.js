import {combineReducers} from "redux";
import projectReducers from "./project/ProjectReducers";
// import commentReducers from "./comment/CommentReducers";
// import usersReducers from "./user/UserReducers";
// import feedbacksReducers from "./feedback/FeedbackReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataProjects: projectReducers,
    // dataComments: commentReducers,
    // dataUsers: usersReducers,
    // dataFeedbacks: feedbacksReducers,
})

export default rootReducers