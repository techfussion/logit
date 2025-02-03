import { useData } from '@/context/DataContext';
import apiClient from '@/interceptor/axios.interceptor';

const authorize = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export function useDataOperations() {
  const { state, dispatch } = useData();

  const fetchLogs = async (id?: string) => {
    try {
      dispatch({ type: 'SET_LOGS_LOADING', payload: true });

      const response = await apiClient.get(id ? `/log/${id}` : `/log`, {...authorize});

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

  const fetchReviews = async (id?: string) => {
    try {
      dispatch({ type: 'SET_REVIEWS_LOADING', payload: true });

      const response = await apiClient.get(id ? `/feedback/${id}` : `/feedback`, {...authorize});

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