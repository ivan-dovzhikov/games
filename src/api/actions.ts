import { FetchDataThunk, FETCH_TYPES } from './types';
import api from './api';

export const fetchData: FetchDataThunk = () => async (dispatch, getState) => {
  const type = FETCH_TYPES['FETCH_DATA'];

  dispatch({
    type,
    payload: getState().favoriteGames.list,
    meta: {
      status: 'pending',
    },
  });

  const response = await api.requestData();

  if (response.ok && response.data) {
    dispatch({
      type,
      payload: response.data,
      meta: {
        status: 'success',
      },
    });
  } else {
    dispatch({
      type,
      error: response.error,
      meta: {
        status: 'error',
      },
    });
  }
};
