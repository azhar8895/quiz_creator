import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Redirect,
} from 'react-router-dom';
import Theme from "../theme";
import SignIn from '../components/sign-in'
import App from "../App";
import SignUp from "../components/sign-up";
import Home from "../components/home";

const AppRoutes = () => {
    return (
        // <Theme>
            <Router>
                <Routes>
                    {/* <Route exact path="/signUp" component={SignUpPage} /> */}
                    <Route path="/login" element={<SignIn/>} />
                    <Route path="/sign-up" element={<SignUp/>} />
                    <Route path="/home" element={<Home/>} />
                </Routes>
            </Router>
        // </Theme>
    )
}

export default AppRoutes;




