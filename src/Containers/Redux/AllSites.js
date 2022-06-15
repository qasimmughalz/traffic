import axios from "axios";


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
        // console.log("Response Status", res.status)
        
    }).catch((e) => {
        console.log("eror", e)
    })
}