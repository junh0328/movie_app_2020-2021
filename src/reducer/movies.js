import produce from 'immer';

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

const movies = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MOVIES_REQUEST: {
        draft.loadMovieLoading = true;
        draft.loadMovieDone = false;
        break;
      }
      case LOAD_MOVIES_SUCCESS: {
        draft.movies = draft.movies.concat(action.data);
        draft.isLoading = false;
        draft.loadMovieDone = true;
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
