import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { AuthProvider } from "./shared/context/AuthCotext";
import { MainProvider } from "./shared/context/MainContext";

import Cart from "./shared/pages/Cart";
import Login from "./shared/pages/Login";
import Main from "./shared/pages/Main";
import Profile from "./shared/pages/Profile";

import Footer from "./shared/components/Footer";
import NavBar from "./shared/components/NavBar";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <MainProvider>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Main />} exact />
                            <Route path="/cart" exact element={<Cart />} />
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/"
                                element={<Navigate replace to="/" />}
                            />
                        </Routes>
                        <Footer />
                    </MainProvider>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
