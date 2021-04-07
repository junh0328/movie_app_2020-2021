import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

/* 
  state는 함수형이 아닌, 클래스형 컴포넌트에서 다루는 개념이다.
  클래스형 컴포넌트가 되기 위해서는 Home 클래스가 리액트가 제공하는 Component 클래스를 반드시 상속받아야 한다.
  Home 클래스는 함수형이 아닌 클래스형이기 때문에 return문을 사용하여 나타낼 수 없기 때문에, render() 함수를 사용하여
  JSX를 반환하게 된다.
  클래스형 컴포넌트를 사용하는 이유는 오로지 state를 사용하기 위함이다.
*/

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    // 실제 movies가 키값이 들어있는 곳이 data.data.movies 이기 때문에 다음과 같이 나타냈다. const {data:{data:{movies},}} = await.axios.get("url")
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=30&&sort_by=download_count');
    this.setState({ movies, isLoading: false });
    //this.setState({movies: movies}) 의 구조 (state, 구조 분해 할당으로 얻은 영화데이거 있는 변수)였으나 ES6에 따라 대입할 키와 변수 값이 같을 경우 생략하므로 movies만 사용하게 되었다.
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
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
  }
}

export default Home;
