import React from 'react';
import PropTypes from 'prop-types';

const foodILike = [
  {
    id: 1,
    name: 'Kimchi',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200511_256%2F1589178996296AUE03_JPEG%2F26539734919428977_1255791164.jpg&type=sc960_832',
    rating: 5,
  },
  {
    id: 2,
    name: 'Samgyeopsal',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160920_34%2Fggk1111_1474338043478Icc2m_JPEG%2F%25B0%25ED%25B1%25E2%25B0%25A8%25BC%25BA%25C0%25B0%25B0%25A8_%252810%2529.JPG&type=sc960_832',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Kimchi2',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200511_256%2F1589178996296AUE03_JPEG%2F26539734919428977_1255791164.jpg&type=sc960_832',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Samgyeopsal2',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160920_34%2Fggk1111_1474338043478Icc2m_JPEG%2F%25B0%25ED%25B1%25E2%25B0%25A8%25BC%25BA%25C0%25B0%25B0%25A8_%252810%2529.JPG&type=sc960_832',
    rating: 4.7,
  },
];

function Food({ name, picture, rating }) {
  return (
    <div>
      <h2>I like {name}</h2>
      <h4>{rating}/5.0</h4>
      <img src={picture} alt={name} />
    </div>
  );
}

Food.propTypes = {
  // 인수를 제대로 받아왔는지 console에서 확인하는 방법! PropTypes
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

function App() {
  /*
  dish는 오브젝트로 name을 반환하기 위해 쓰인다.
  현재 진행중이며 돌면서, foodILike 배열 안에 있는 dish.name의 변수들을 반환하는데 사용된다.
  */
  return (
    <div>
      {foodILike.map((dish) => (
        <Food
          key={dish.id}
          name={dish.name}
          picture={dish.image}
          rating={dish.rating}
        />
      ))}
    </div>
  );
}

export default App;
