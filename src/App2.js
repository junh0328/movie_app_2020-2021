import React from 'react';

function Food({fav}){
    console.log(fav);
    return <h3>I Like {fav}</h3>
}

function App2() {
    return(
        <div>
            <h1>Hello</h1>
            <Food fav="kimchi"/>
            <Food fav="ramen"/>
            <Food fav="apple"/>
            <Food fav="banana"/>
            <Food fav="pineapple"/>
        </div>
    )
}

export default App2;

/*
<Food fav="kimchi"/>에 있는 fav가 props.fav로 받아져서 출력되게 된다.
*/