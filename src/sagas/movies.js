import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_MOVIES_FAILURE, LOAD_MOVIES_REQUEST, LOAD_MOVIES_SUCCESS } from '../reducer/movies';

async function loadMoviesAPI() {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count');
    // 여기서 확인
    console.log(`movies 가져와서 구조분해할당으로 담기`);
    console.log(movies);
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}

function* loadMovies() {
  const result = yield call(loadMoviesAPI); // loadMoviesAPI 함수 호출에 의해 return 된 movies 객체
  // 여기서 잘 불러왔는지 확인
  console.log('리턴된 result 출력 :');
  console.log(result);
  try {
    console.log('saga loadMovies start!');
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
