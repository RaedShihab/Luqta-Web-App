import axios from 'axios';

const token = ()=> {
    return localStorage.getItem('user')
  }

  let parsedToken
  if(JSON.parse(token()) !== null) {
    parsedToken = JSON.parse(token()).token
  }
  
export const Axios = axios.create({
    baseURL: 'http://134.122.75.39/jo-ar',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
      'Authorization': 'Bearer ' + parsedToken
  }
  });
  