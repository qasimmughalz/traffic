import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AuthenticatedRoutes } from "./Containers/Routes/Authenticated";
import { UnAuthenticatedRoutes } from "./Containers/Routes/UnAuthenticated";

function App() {

    const token = localStorage.getItem('token')
    let userFound = false
    token ? userFound=true : userFound=false

    return (
        <div className="App">
            {userFound ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
        </div>
    );
}

export default App;
