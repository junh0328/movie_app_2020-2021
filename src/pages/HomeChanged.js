import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import './Home.css';
import Movie from '../components/Movie';

const HomeChanged = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count');
    setMovies(movies);
    // console.log('무비 데이터 불러오기 성공');
    setIsLoading();
  };

  useEffect(() => {
    getMovies();
    if (movies) {
    }
  }, []);

  const setIsLoading = useCallback(() => {
    setLoading(true);
  }, []);

  return (
    <section className="container">
      {!isLoading ? (
        <div>로딩중..</div>
      ) : (
        <div className="movies">
          {movies.map((
            movie, // map() : 첫 번째 인자로 컴포넌트를 반환할 함수를 전달한다. movies는 배열이고, 배열의 원소 1개가 movie로 넘어온다.
          ) => (
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
      )}
    </section>
  );
};

export default HomeChanged;
