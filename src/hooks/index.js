import axios from 'axios';
import { movieAPI, movieAPI2 } from '../apis';

export async function loadMovieAPI(data) {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(movieAPI(data));
    // console.log('movies:', movies);
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function loadMovieAPI2(data) {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(movieAPI2(data));
    // console.log('movies2:', movies);
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}

// API에 대한 결과값(배열)이 loadedMovies 배열 []에 들어 있음
export const loadedMovies = (data) => [loadMovieAPI(data), loadMovieAPI2(data)];
