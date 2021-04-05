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
    <div>
      {!isLoading ? (
        <div>로딩중..</div>
      ) : (
        movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
          ></Movie>
        ))
      )}
    </div>
  );
};

export default HomeChanged;
