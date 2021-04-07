import React, { useEffect } from 'react';
import './Home.css';
// import Movie from '../components/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MOVIES_REQUEST } from '../reducer/movies';

const HomeChanged = () => {
  const { isLoading, loadMovieDone, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIES_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    if (movies && loadMovieDone) {
      console.log(`완료된 movies 데이터 출력 : ${movies}`);
      console.log(movies);
    }
  }, [movies, loadMovieDone]);

  return (
    <section className="container">
      {isLoading ? (
        <div>로딩중..</div>
      ) : (
        // <div className="movies">
        //   {movies.map((
        //     movie,
        //   ) => (
        //     <Movie
        //       key={movie.id}
        //       id={movie.id}
        //       year={movie.year}
        //       title={movie.title}
        //       summary={movie.summary}
        //       poster={movie.medium_cover_image}
        //       genres={movie.genres}
        //     />
        //   ))}
        // </div>
        <div>로딩 완료!</div>
      )}
    </section>
  );
};

export default HomeChanged;
