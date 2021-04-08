import React, { useEffect } from 'react';
import './Home.css';
import Movie from '../components/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MOVIES_REQUEST } from '../reducer/movies';

const HomeChanged = () => {
  const { isLoading, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIES_REQUEST,
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (movies) {
  //     console.log('movies 감지');
  //     console.log(movies);
  //   }
  // }, [movies]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log('데이터 불러오기');
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      dispatch({
        type: LOAD_MOVIES_REQUEST,
      });
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <section className="container">
      {isLoading ? (
        <div>로딩중..</div>
      ) : (
        <div className="movies">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
            />
          ))}
        </div>
        // <div>로딩 완료!</div>
      )}
    </section>
  );
};

export default HomeChanged;
