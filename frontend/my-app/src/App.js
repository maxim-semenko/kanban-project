import './App.css';
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage";
import HomePage from "./components/pages/auth/HomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CabinetPage from "./components/pages/user/cabinet/CabinetPage";
import AboutPage from "./components/pages/AboutPage";
import AboutProjectPage from "./components/pages/user/project/AboutProjectPage";
import ProjectBoardPage from "./components/pages/user/project/board/ProjectBoardPage";
import EditCabinetPage from "./components/pages/user/cabinet/EditCabinetPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                {/*<Route path="board" element={<BoardPage/>}/>*/}
                <Route path="cabinet" element={<ProtectedRoute><CabinetPage/></ProtectedRoute>}/>
                <Route path="cabinet/edit" element={<ProtectedRoute><EditCabinetPage/></ProtectedRoute>}/>
                <Route path="project/:id" element={<ProtectedRoute><AboutProjectPage/></ProtectedRoute>}/>
                <Route path="project/:id/board" element={<ProtectedRoute><ProjectBoardPage/></ProtectedRoute>}/>
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
