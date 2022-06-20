import axios from "axios";
import { errorLoading, setGetAllSites } from "./getAllSites";


export const Sites = () => async dispatch => {
    const getToken = localStorage.getItem('token');
    console.log("token", getToken)
    const email = localStorage.getItem('email')
    console.log("email", email)

    await axios({
        method: 'GET',
        url: `https://plugin-nodejs-server.herokuapp.com/api/getSites/${email}`,
        data: {},
        headers: {
            "authorization": `Bearer ${getToken}`
          },
    }).then((res) => {
        console.log("get All SItes Data =========", res)
        dispatch(setGetAllSites(res.data))
    }).catch((e) => {
        console.log("error", e)
        dispatch(errorLoading(e.message))

    })
}