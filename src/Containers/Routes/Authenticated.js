
import { Routes, Route} from "react-router-dom"
import { Dashboard } from "../Pages/Dashboard"
import { PaymentPlans } from "../Pages/PaymentPlan/PaymentPlans"
import { ContactUs } from "../Pages/ContactUs"
import { Profile } from "../Pages/Profile"
import { AddNewSite } from "../Pages/Websites/AddNew"
import { AllSites } from "../Pages/Websites/AllSites"
import { GetScript } from "../Pages/Websites/GetScript"
import { AllSessions } from "../Pages/Websites/AllSessions"
import Replay from "../Pages/Websites/Replay"


export const AuthenticatedRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path='/addnew' element={<AddNewSite/>}></Route>
            <Route path='/allsites' element={<AllSites/>}></Route>
            <Route path='/allsessions' element={<AllSessions/>}></Route>
            <Route path='/replay' element={<Replay/>}></Route>
            <Route path='/paymentplans' exact element={<PaymentPlans/>}></Route>
            <Route path='/profile' exact element={<Profile/>}></Route>
            <Route path="/contactus"exact element={<ContactUs/>}></Route>
            <Route path='/getscript/:domainName' exact element={<GetScript/>}></Route>
            <Route path='/paymentplans/:domain' exact element={<PaymentPlans/>}></Route>
            <Route path='*' element={<Dashboard/>}></Route>
        </Routes>
    )
}