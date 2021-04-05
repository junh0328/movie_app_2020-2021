import React, { useEffect } from 'react';
import './Home.css';
import Movie from '../components/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MOVIES_REQUEST } from '../reducer/movies';

const HomeChanged = () => {
  const { isLoading, loadMovieDone, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIES_REQUEST,
    });
  }, []);

  // useEffect(() => {
  //   if (loadMovieDone) {
  //     console.log(`movies 데이터 출력 : ${movies}`);
  //   }
  // }, [loadMovieDone]);

  return (
    <section className="container">
      {isLoading ? (
        <div>로딩중..</div>
      ) : (
        // <div className="movies">
        //   {movies.map((
        //     movie, // map() : 첫 번째 인자로 컴포넌트를 반환할 함수를 전달한다. movies는 배열이고, 배열의 원소 1개가 movie로 넘어온다.
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
