import axios from 'axios';
import { backend } from '../../Components/backendURL';
import { errorLoading, setGetAllSites } from './getAllSites';

const getToken = localStorage.getItem('token');
const email = localStorage.getItem('email');

export const Sites = () => async (dispatch) => {
  await axios({
    method: 'GET',
    url: `${backend}/api/getSites/${email}`,
    data: {},
    headers: {
      authorization: `Bearer ${getToken}`,
    },
  })
    .then((res) => {
      localStorage.setItem('allSiteData', JSON.stringify(res.data));
      dispatch(setGetAllSites(res.data));
    })
    .catch((e) => {
      dispatch(errorLoading(e.message));
    });
};
