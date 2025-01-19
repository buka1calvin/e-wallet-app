import axios from "axios";
import Cookies from 'js-cookie'
const customAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
  timeout: 20000,
  headers: {},
});

const handleRequest = async (request: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
    
  }
  return request;
};

const handleResponse = (response: any) => response;
const handleError = async (error: any) => {
  if (error.response && error.response.status === "401") {
    try {
      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        window.location.href = "/sign-in";
        return;
      }
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/users/token`,
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      );
      const newAccessToken = data.newAccessToken;
      localStorage.setItem("token", newAccessToken);
      error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return customAxios(error.config);
    } catch (refreshError) {
        window.location.href='/sign-in'
        return Promise.reject(refreshError)
    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request: any) => handleRequest(request),
  (error: any) => handleError(error)
);
customAxios.interceptors.response.use(
  (response: any) => handleResponse(response),
  (error: any) => handleError(error)
);

export default customAxios;
