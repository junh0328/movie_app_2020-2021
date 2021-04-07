// import axios from 'axios';
import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { LOAD_MOVIES_FAILURE, LOAD_MOVIES_REQUEST, LOAD_MOVIES_SUCCESS } from '../reducer/movies';

// function loadMoviesAPI(data) {
//   return axios.post('api', data);
// }

function* loadMovies() {
  try {
    // const result = yield call(loadMoviesAPI, action.data);
    console.log('saga loadMovies');
    yield delay(1000);
    yield put({
      type: LOAD_MOVIES_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMovies() {
  yield takeLatest(LOAD_MOVIES_REQUEST, loadMovies);
}

export default function* movieSaga() {
  yield all([fork(watchLoadMovies)]);
}
