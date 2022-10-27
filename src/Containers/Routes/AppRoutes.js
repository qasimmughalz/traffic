import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backend } from '../../Components/backendURL';
import { ValidateToken } from '../../helpers/ApiActions';
import { Sites } from '../Redux/AllSites';
import { logoutHandler, settingInitialValues } from '../Redux/UserAuth';
import { AuthenticatedRoutes } from './Authenticated';
import { UnAuthenticatedRoutes } from './UnAuthenticated';
const AppRoutes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userFound = useSelector((state) => state.UserAuth.isLoggedIn);
  const reduxToken = useSelector((state) => state.UserAuth.token);
  const token = localStorage.getItem('token');

  const ValidateToken = async (currToken) => {
    const resp = await axios({
      method: 'POST',
      url: `${backend}/api/login`,
      headers: {
        authorization: `Bearer ${currToken}`,
      },
    })
      .then((res) => {
        setIsLoading(false);
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
        dispatch(logoutHandler());
      });
  };

  if (!token) {
    dispatch(logoutHandler);
  } else {
    ValidateToken(token);
  }

  return <>{token ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}</>;
};

export default AppRoutes;
