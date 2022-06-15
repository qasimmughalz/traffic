
import { Routes, Route} from "react-router-dom"
import { Dashboard } from "../Pages/Dashboard"
import { PaymentPlans } from "../Pages/PaymentPlan/PaymentPlans"
import { Table } from "../Pages/Tables"
import { Users } from "../Pages/Users"

import { AddNewSite } from "../Pages/Websites/AddNew"
import { AllSites } from "../Pages/Websites/AllSites"
import { GetScript } from "../Pages/Websites/GetScript"




export const AuthenticatedRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path='/addnew' element={<AddNewSite/>}></Route>
            <Route path='/allsites' element={<AllSites/>}></Route>
            <Route path='/paymentplans' exact element={<PaymentPlans/>}></Route>
            <Route path='/getscript/:domainName' exact element={<GetScript/>}></Route>
            <Route path='/paymentplans/:domain' exact element={<PaymentPlans/>}></Route>
            <Route path='*' element={<Dashboard/>}></Route>
        </Routes>
    )
}