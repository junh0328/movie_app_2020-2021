import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
console.log('key 생성: ', process.env.REACT_APP_API);

const Netflix = () => {
  const [movies, setMovies] = useState([]);
  const [upLoad, setUpLoad] = useState(false);

  useEffect(() => {
    fetchApi();
  }, []);

  const API_KEY = process.env.REACT_APP_API;
  const BASE_URL = `https://api.themoviedb.org/3`;
  const Genre = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const NetFlixOriginals = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`;

  const fetchApi = async () => {
    try {
      const {
        data: { genres },
      } = await axios.get(Genre);
      setMovies(genres);
      setUpLoad(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNetflixOriginals = async () => {
    try {
      const {
        data: { results },
      } = await axios.get(NetFlixOriginals);
      console.log('load original datas', results);
    } catch (error) {
      console.error(error);
    }
  };

  if (upLoad && movies !== []) {
    console.log('데이터 들어옴', movies);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
      {upLoad && movies !== [] ? (
        <div
          style={{
            display: ' flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            width: '160px',
          }}
        >
          <h2>데이터 로딩 완료</h2>
          {movies.map((movie) => (
            <div key={movie.id}>
              {movie.id}, {movie.name}
            </div>
          ))}
          <button style={{ marginTop: 20 }} onClick={fetchNetflixOriginals}>
            넷플릭스 오리지널 데이터 불러오기
          </button>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
};

export default Netflix;
