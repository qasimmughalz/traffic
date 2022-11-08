import axios from 'axios';
import { backend } from '../Components/backendURL';
import {
  logoutHandler,
  settingInitialValues,
} from '../Containers/Redux/UserAuth';

// Validate User Token
export const ValidateToken = (currToken) => async (dispatch) => {
  const resp = await axios({
    method: 'POST',
    url: `${backend}/api/login`,
    headers: {
      authorization: `Bearer ${currToken}`,
    },
  })
    .then((res) => {
      console.log(res);
      const checkExpiry = true;

      if (checkExpiry) {
        dispatch(
          settingInitialValues({ userToken: currToken, userLoggedIn: true })
        );
      } else {
        dispatch(logoutHandler());
      }
    })
    .catch((er) => {
      console.log(er);
      dispatch(logoutHandler());
    });
};
