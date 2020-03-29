import axios from 'axios';

const token = ()=> {
    return localStorage.getItem('user')
  }

  const lang = ()=> {
    return localStorage.getItem('i18nextLng')
  }

  let parsedToken
  if(JSON.parse(token()) !== null) {
    parsedToken = JSON.parse(token()).token
  }
  
export const Axios = axios.create({
    baseURL: `https://staging.luqta.com/jo-${lang()}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
      'Authorization': 'Bearer ' + parsedToken
  }
  });
  