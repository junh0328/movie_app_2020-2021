import produce from 'immer';
import axios from 'axios';

export const initialState = {
  movies: [],
  isLoading: true,

  loadMovieLoading: false,
  loadMovieDone: false,
  loadMovieError: null,
};

export const LOAD_MOVIES_REQUEST = 'LOAD_MOVIES_REQUEST';
export const LOAD_MOVIES_SUCCESS = 'LOAD_MOVIES_SUCCESS';
export const LOAD_MOVIES_FAILURE = 'LOAD_MOVIES_FAILURE';

export const getMovies = async () => {
  const {
    data: {
      data: { movies },
    },
  } = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count');
  console.log(movies);
  return movies;
};

export const FetchingData = getMovies();

const movies = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MOVIES_REQUEST: {
        draft.loadMovieLoading = true;
        draft.loadMovieDone = false;
        break;
      }
      case LOAD_MOVIES_SUCCESS: {
        draft.isLoading = false;
        draft.movies = draft.movies.concat(FetchingData);
        break;
      }
      case LOAD_MOVIES_FAILURE: {
        draft.loadMovieError = action.error;
        break;
      }
      default:
        return state;
    }
  });

export default movies;
