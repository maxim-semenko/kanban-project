import {combineReducers} from "redux";
import postReducers from "./post/PostReducers";
import commentReducers from "./comment/CommentReducers";
import usersReducers from "./user/UserReducers";
import feedbacksReducers from "./feedback/FeedbackReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataPosts: postReducers,
    dataComments: commentReducers,
    dataUsers: usersReducers,
    dataFeedbacks: feedbacksReducers,
})

export default rootReducers