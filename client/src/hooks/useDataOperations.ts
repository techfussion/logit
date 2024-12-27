import { useData } from '@/context/DataContext';
import { REACT_APP_API_BASE } from '@/global/global';
import axios from 'axios';

const authorize = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export function useDataOperations() {
  const { state, dispatch } = useData();

  const fetchLogs = async () => {
    try {
      dispatch({ type: 'SET_LOGS_LOADING', payload: true });

      const response = await axios.get(`${REACT_APP_API_BASE}/log`, {...authorize});

      dispatch({ type: 'SET_LOGS', payload: { items: response.data } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_LOGS_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_LOGS_ERROR', payload: String(error) });
      }
    } finally {
      dispatch({ type: 'SET_LOGS_LOADING', payload: false });
    }
  };

  const fetchReviews = async () => {
    try {
      dispatch({ type: 'SET_REVIEWS_LOADING', payload: true });

      const response = await axios.get(`${REACT_APP_API_BASE}/feedback`, {...authorize});

      dispatch({ type: 'SET_REVIEWS', payload: { items: response.data } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_REVIEWS_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_REVIEWS_ERROR', payload: String(error) });
      }
    } finally {
      dispatch({ type: 'SET_REVIEWS_LOADING', payload: false });
    }
  };

  const clearData = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  return {
    state,
    fetchLogs,
    fetchReviews,
    clearData,
  };
}