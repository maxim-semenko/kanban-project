import {combineReducers} from "redux";
import logTimeReducers from "./log-times/LogTimeReducers";
import projectReducer from "./projects/ProjectReducers";
import ticketReducers from "./tickets/TicketReducers";
import usersReducers from "./user/UserReducers";
import projectStatusReducers from "./project-statuses/ProjectStatusReducers";
import dialogReducers from "./dialogs/DialogReducers";
import notificationReducers from "./notifications/NotificationReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataProjects: projectReducer,
    dataLogTimes: logTimeReducers,
    dataProjectStatuses: projectStatusReducers,
    dataTickets: ticketReducers,
    dataUsers: usersReducers,
    dataDialogs: dialogReducers,
    dataNotification: notificationReducers,
})

export default rootReducers