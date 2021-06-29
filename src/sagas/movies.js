import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { movieAPI, movieAPI2 } from '../apis';
import { loadedMovies } from '../hooks';
import { LOAD_MOVIES_FAILURE, LOAD_MOVIES_REQUEST, LOAD_MOVIES_SUCCESS } from '../reducer/movies';

// async function loadMoviesAPI(data) {
//   try {
//     const response = await Promise.allSettled(loadedMovies(data)).then((results) => {
//       results.forEach((result) => console.log('result.value : ', result.value));
//     });
//     console.log('response: ', response);
//   } catch (err) {
//     console.error(err);
//     return;
//   }
// }

async function loadMoviesAPI(data) {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(movieAPI(data));
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}

function* loadMovies(action) {
  const result = yield call(loadMoviesAPI, action.data);
  console.log('saga result: ', result);
  try {
    yield put({
      type: LOAD_MOVIES_SUCCESS,
      data: result,
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
