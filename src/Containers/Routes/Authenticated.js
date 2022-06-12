
import { Routes, Route} from "react-router-dom"
import { Dashboard } from "../Pages/Dashboard"
import { PaymentPlans } from "../Pages/PaymentPlan/PaymentPlans"
import { Table } from "../Pages/Tables"
import { Users } from "../Pages/Users"

import { AddNewSite } from "../Pages/Websites/AddNew"
import { AllSites } from "../Pages/Websites/AllSites"





export const AuthenticatedRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path='/addnew' element={<AddNewSite/>}></Route>
            <Route path='/allsites' element={<AllSites/>}></Route>
            <Route path='/paymentplans' element={<PaymentPlans/>}></Route>
            <Route path='*' element={<Dashboard/>}></Route>
        </Routes>
    )
}