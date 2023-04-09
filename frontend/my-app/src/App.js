import './App.css';
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./components/pages/guest/NotFoundPage";
import HomePage from "./components/pages/guest/HomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CabinetPage from "./components/pages/user/cabinet/CabinetPage";
import AboutPage from "./components/pages/guest/AboutPage";
import AboutProjectPage from "./components/pages/user/project/AboutProjectPage";
import ProjectBoardPage from "./components/pages/user/project/board/ProjectBoardPage";
import EditCabinetPage from "./components/pages/user/cabinet/EditCabinetPage";
import AllUsersPage from "./components/pages/admin/AllUsersPage";
import AdminProfile from "./components/pages/admin/AdminProfile";
import ProjectLogTimeHistoryPage from "./components/pages/user/project/board/ProjectLogTimeHistoryPage";
import LoginPage from "./components/pages/guest/LoginPage";
import RegisterPage from "./components/pages/guest/RegisterPage";
import ProjectsPage from "./components/pages/user/cabinet/ProjectsPage";
import TicketsPage from "./components/pages/user/cabinet/TicketsPage";
import LogTimesPage from "./components/pages/user/cabinet/LogTimesPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/auth/signin" element={<LoginPage/>}/>
                <Route path="/auth/signup" element={<RegisterPage/>}/>
                <Route path="about" element={<ProtectedRoute><AboutPage/></ProtectedRoute>}/>
                <Route path="/" element={<ProtectedRoute><CabinetPage/></ProtectedRoute>}/>
                <Route path="/projects" element={<ProtectedRoute><ProjectsPage/></ProtectedRoute>}/>
                <Route path="/tickets" element={<ProtectedRoute><TicketsPage/></ProtectedRoute>}/>
                <Route path="/logs" element={<ProtectedRoute><LogTimesPage/></ProtectedRoute>}/>
                <Route path="edit" element={<ProtectedRoute><EditCabinetPage/></ProtectedRoute>}/>
                <Route path="projects/:id" element={<ProtectedRoute><AboutProjectPage/></ProtectedRoute>}/>
                <Route path="projects/:id/board" element={<ProtectedRoute><ProjectBoardPage/></ProtectedRoute>}/>
                <Route path="projects/:id/log-times"
                       element={<ProtectedRoute><ProjectLogTimeHistoryPage/></ProtectedRoute>}/>
                <Route path="administrator" element={<ProtectedRoute><AdminProfile/></ProtectedRoute>}/>
                <Route path="administrator/users" element={<ProtectedRoute><AllUsersPage/></ProtectedRoute>}/>
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
