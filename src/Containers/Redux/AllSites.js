import axios from "axios";
import { backend } from "../../Components/backendURL";
import { errorLoading, setGetAllSites } from "./getAllSites";


export const Sites = () => async dispatch => {
    const getToken = localStorage.getItem('token');
    const email = localStorage.getItem('email')

    await axios({
        method: 'GET',
        url: `${backend}/api/getSites/${email}`,
        data: {},
        headers: {
            "authorization": `Bearer ${getToken}`
          },
    }).then((res) => {
        dispatch(setGetAllSites(res.data))
    }).catch((e) => {
        dispatch(errorLoading(e.message))
    })
}