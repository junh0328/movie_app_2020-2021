import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
// console.log('key 생성: ', process.env.REACT_APP_API);

const Netflix = () => {
  const [movies, setMovies] = useState([]);
  const [orginals, setOriginals] = useState([]);
  const [topRates, setTopRates] = useState([]);
  const [upLoad, setUpLoad] = useState(false);

  useEffect(() => {
    fetchApi();
  }, []);

  const API_KEY = process.env.REACT_APP_API;
  const BASE_URL = `https://api.themoviedb.org/3`;
  const Genre = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const NetFlixOriginals = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`;
  const TopRated = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`;

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
      setOriginals(results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopRated = async () => {
    try {
      const {
        data: { results },
      } = await axios.get(TopRated);
      console.log('load TopRated datas', results);
      setTopRates(results);
    } catch (error) {
      console.error(error);
    }
  };

  // if (upLoad && movies !== []) {
  //   console.log('데이터 들어옴', movies);
  // }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
          {orginals && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {orginals.map((original) => (
                <div key={original.id}>
                  <p>{original.id}</p>
                  <p>{original.name}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${original.backdrop_path}`}
                    alt={original.name}
                    style={{ width: 400, marginRight: 10 }}
                  />
                  {/* <img src={`https://image.tmdb.org/t/p/original/${props.props.poster_path}`} */}
                </div>
              ))}
            </div>
          )}
          <button style={{ marginTop: 20 }} onClick={fetchTopRated}>
            넷플릭스 Top Rated 데이터 불러오기
          </button>
          {topRates && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {topRates.map((topRate) => (
                <div key={topRate.id}>
                  <p>{topRate.id}</p>
                  <p>
                    🌟 {topRate.vote_average}, Count with {topRate.vote_count}
                  </p>

                  <p>{topRate.title}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${topRate.backdrop_path}`}
                    alt={topRate.name}
                    style={{ width: 400, marginRight: 10 }}
                  />
                  {/* <img src={`https://image.tmdb.org/t/p/original/${props.props.poster_path}`} */}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
};

export default Netflix;

/*
 */
