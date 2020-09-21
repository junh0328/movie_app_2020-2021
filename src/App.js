import React from 'react';

/* 
  state는 함수형이 아닌, 클래스형 컴포넌트에서 다루는 개념이다.
  클래스형 컴포넌트가 되기 위해서는 App 클래스가 리액트가 제공하는 Component 클래스를 반드시 상속받아야 한다.
  App 클래스는 함수형이 아닌 클래스형이기 때문에 return문을 사용하여 나타낼 수 없기 때문에, render() 함수를 사용하여
  JSX를 반환하게 된다.
  클래스형 컴포넌트를 사용하는 이유는 오로지 state를 사용하기 위함이다.
*/

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 6000);
  }

  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? 'Loading' : 'We are ready'}</div>;
  }
}

export default App;
