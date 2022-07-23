import './App.css';
import {Route, Routes} from "react-router-dom";
import BoardPage from "./components/pages/user/BoardPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import HomePage from "./components/pages/auth/HomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CabinetPage from "./components/pages/user/CabinetPage";
import AboutPage from "./components/pages/AboutPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="board" element={<BoardPage/>}/>
                <Route path="cabinet" element={<ProtectedRoute><CabinetPage/></ProtectedRoute>}/>
                {/*<Route path="/login" element={<SignInModal/>}/>*/}
                {/*<Route path="register" element={<ProtectedRoute><SignUpPage/></ProtectedRoute>}/>*/}
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
