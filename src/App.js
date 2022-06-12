import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { settingInitialValues } from "./Containers/Redux/UserAuth";
import { AuthenticatedRoutes } from "./Containers/Routes/Authenticated";
import { UnAuthenticatedRoutes } from "./Containers/Routes/UnAuthenticated";

function App() {

    const dispatch = useDispatch()
    const userToken = localStorage.getItem('token')
    const userLoggedIn = !!userToken;

    (userToken &&
        dispatch(settingInitialValues({ userToken, userLoggedIn })))
        const userFound = useSelector(state => state.UserAuth.isLoggedIn)

    return (
        <div className="App">
            {userFound ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
        </div>
    );
}

export default App;
