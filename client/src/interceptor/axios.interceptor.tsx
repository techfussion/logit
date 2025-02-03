import axios from 'axios';
import { REACT_APP_API_BASE } from '@/global/global';

const apiClient = axios.create({
  baseURL: REACT_APP_API_BASE,
});

export const setupAxiosInterceptors = (navigate: (url: string) => void) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Check if the error is due to an unauthorized token (401)
      if (error.response?.status === 401) {
        // Clear user session
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');

        // Navigate to unauthorized page
        navigate('/unauthorized');
      }

      return Promise.reject(error);
    }
  );
};

export default apiClient;
