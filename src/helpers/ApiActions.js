import axios from 'axios';
import { backend } from '../Components/backendURL';

let userId = JSON.parse(localStorage.getItem('user-profile'))?.id;

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

// Get Converted Images

export const getConvertedImages = async (email, domainName, feature, token) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${backend}/api/getScript`,
      data: {
        email: email,
        domainName: domainName,
        feature: feature,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.data.script) {
      // Extract Site From Script
      let siteKey = response.data.script
        .split('=')[1]
        .split(',')[0]
        .split(':')[1]
        .replaceAll('"', '')
        .trim();
      console.log('SiteKey', siteKey, 'UserId', userId);
      try {
        const res = await axios({
          method: 'POST',
          url: `${backend}/api/getAltTexts`,
          data: {
            userId: userId,
            siteKey: siteKey,
          },
        });
        console.log(res.data);
        return res.data.altTexts;
      } catch (error) {
        console.log(error);
        return error.response.data.error;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
