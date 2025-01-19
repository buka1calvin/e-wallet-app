import {jwtDecode} from 'jwt-decode'

const getUserInfo = () => {
  if(typeof window==='undefined'){
    return null;
  }
  const token = localStorage.getItem('token');
  try {
    if(!token){
      return null
    }
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export default getUserInfo;
