import { Routes, Route} from "react-router-dom"
import { Login } from "../LoginSign/Login/Login"
import { SignUp } from "../LoginSign/SignUp/SignUp"
import { ThankYou } from "../LoginSign/SignUp/ThankYou"
import { Verify } from "../LoginSign/SignUp/Verify"

export const UnAuthenticatedRoutes = ()=>{
    return(

    <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/thankyou' element={<ThankYou/>}></Route>

        <Route path='/verify/:id' element={<Verify/>}></Route>
        <Route path='*' element={<Login/>}></Route>
    </Routes>
    )
}
