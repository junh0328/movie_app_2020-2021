import React from 'react'
import PropTypes from 'prop-types';

/* 
prop-types 모듈을 이용하여 우리가 받으려는 props의 타입들이 제대로 들어왔는지 확인할 수 있다.
*/

function Food({name, picture, rating}){
return (
    <div>
        <h3>I like {name}</h3>
        <h4>{rating}/5.0</h4>
        <img src ={picture} alt={name}/>
    </div>
    )
}


const foodILike = [
    {
        id :1,
        name: 'Kimchi',
        image: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwww.almanac.com%2Fsites%2Fdefault%2Ffiles%2Fusers%2FAlmanacStaffArchive%2Fkimchi-recipe_0_full_width.jpg&type=b400',
        rating: 5,
    },
    {   
        id :2,
        name: 'Kimchi2',
        image: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwww.almanac.com%2Fsites%2Fdefault%2Ffiles%2Fusers%2FAlmanacStaffArchive%2Fkimchi-recipe_0_full_width.jpg&type=b400',
        rating: 4.9,
    },
    {
        id :3, 
        name: 'Kimchi3',
        image: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwww.almanac.com%2Fsites%2Fdefault%2Ffiles%2Fusers%2FAlmanacStaffArchive%2Fkimchi-recipe_0_full_width.jpg&type=b400',
        rating: 4.8,
    },
    {
        id :4,
        name: 'Kimchi4',
        image: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwww.almanac.com%2Fsites%2Fdefault%2Ffiles%2Fusers%2FAlmanacStaffArchive%2Fkimchi-recipe_0_full_width.jpg&type=b400',
        rating: 4.7,
    },
    {
        id :5,
        name: 'Kimchi5',
        image: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwww.almanac.com%2Fsites%2Fdefault%2Ffiles%2Fusers%2FAlmanacStaffArchive%2Fkimchi-recipe_0_full_width.jpg&type=b400',
        rating: 4.5,
    },
]

function App3(){

    return (        //이름 모를 함수 dish에 FoodILike 배열의 원소를 하나씩 넘겨 받은 다음 그 값을 name props에 전달한다.
    <div>
        {foodILike.map(dish => (
            <Food key ={dish.id} name={dish.name} picture={dish.image} rating={dish.rating}/>
        ))}
    </div>
    )
}

Food.propTypes = {
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
}

export default App3;