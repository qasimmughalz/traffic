import axios from 'axios';
import { backend } from '../Components/backendURL';

// Get User Profile Data
export const getProfile = async (email, token) => {
  await axios({
    method: 'GET',
    url: `${backend}/api/getUser/${email}`,
    data: {},
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      localStorage.setItem('user-profile', JSON.stringify(res.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
