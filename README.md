# React JS Fundamental Course 2020 > 2021 리뉴얼 🌟

### <a href="https://junh0328.github.io/movie_app_2020-2021/#/">gh-page</a>로 결과물 확인하기

<p><img src="./images/result.gif" alt="result"></p>

> changed 를 누르면 redux-devTools로 해당 액션들을 감지하고, 변화된 state 값을 확인할 수 있습니다.

### 2021.04.09 인피니티 스크롤 관련 기능 추가 ✔️

<p><img src="./images/infiniteResult.gif" alt="infiniteResult"></p>

<hr/>

## 🌟 리뉴얼 방향

- 클래스형 컴포넌트를 함수형 컴포넌트로 변경 ✔️
- 리덕스사가를 통한 비동기처리 ✔️
- 스토어를 통한 상태관리 ✔️

<p> 🌟 인피니티 스크롤 기능 추가 여부 파악 ✔️</p>

<p> 🌟 url을 통해 넘겨받는 API를 어떻게 나눠줄 수 있을지 ✔</p>

- 타입스크립트 적용

<hr/>

## 🌟 외부 API를 사용하여 리액트로 데이터 표현하기

<b>외부 URL : https://yts.mx/api/v2/list_movies.json</b>

> 필요한 크롬 확장 프로그램: <a href="https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=ko&hc_location=ufi">JSON VIEWR</a>

> <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko">리덕스 데브툴즈</a>

> 출처: <a href="https://nomadcoders.co/react-fundamentals/lobby"> 니코쌤의 ReactJS로 영화 웹 서비스 만들기 </a>

## 🌟 OPEN API 불러오기

<p>우리가 불러오고자 하는 오픈 API의 데이터 형식은 다음과 같다.</p>

<img src="./images/moviesDataJson.png" alt="moviesDataJson"/>

<br/>

<p>첫 번째로 오픈 데이터 API를 axios 라이브러리르 사용하여 불러올 때 중요한 점은 데이터가 어떤 구조로 들어 있는 지를 확인하는 것이다.</p>

```js
const getMovies = async () => {
    const response = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=30&&sort_by=download_count');
    console.log(response);
  };
```

<p>해당 api 데이터를 받아 콘솔로그로 찍으면 다음과 같은 결과값을 얻을 수 있다. Object 객체 안에 프로퍼티 형식으로 들어있다.</p>

<img src="./images/objectTree.png" alt="objectTree"/>

<p>우리가 접근해야 하는 movies 프로퍼티는 결과적으로 받아오는 data.data.movies 안에 들어있는 배열로 이루어진 객체들이다.</p>

> [0] : {id : 8462 , title, genres, ...}

<p>그에 맞춰 데이터를 불러오기 위해서는 data.data.movies.id, ... 와 같이 불러와야 하므로 구조 분해 할당 문법을 통해 movies 프로퍼티 안에 들어있는 내용을 movies 변수에 담아 가져온다.</p>

```js
   const {data: {data: { movies },},} = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=30&&sort_by=download_count');
```

<p>구조분해할당을 통해 얻어온 movies 객체를 찍으면 우리가 얻고자 하는 배열 형식의 데이터를 얻을 수 있게된다.</p>

> [0] : {id : 8462 , title: ..., genres: ..., ...}

> [1] : {id : 8463 , title: ..., genres: ..., ...}

> [2] : {id : 8464 , title: ..., genres: ..., ...}

> [3] : {id : 8465 , title: ..., genres: ..., ...}

> [4] : {id : 8466 , title: ..., genres: ..., ...}

<p>이 데이터를 기존 reducer에서 intialState로 관리하는 movies : [] 에 <a href="https://developer.mozilla.org/en-US/search?q=Array.prototype">concat</a> 해주면 리듀서를 사용한 데이터를 받아오는 처리를 할 수 있다.</p>

<hr/>

## 🌟 data flow 

1. 첫 번째로, 화면을 보여주는 view 단에서 useEffect()를 통해 상황을 감지한다. 아무것도 없는 상태일 때, dispatch를 통해 LOAD_MOVIES_REQUEST 액션을 실행한다.

```js
// useEffect에 조건문을 통해 특정한 상황을 정해주지 않았으므로, 해당 어플리케이션이 렌더링될 때 실행시킨다.
useEffect(() => {
    dispatch({
      type: LOAD_MOVIES_REQUEST,
    });
  }, [dispatch]);
```

2. sagas/movies 에서 LOAD_MOVIES_REQUEST 을 감지하는 함수 watchLoadMovies()를 통해 데이터를 불러오는 함수 loadMovies()를 실행한다.

```js
function* watchLoadMovies() {
  yield takeLatest(LOAD_MOVIES_REQUEST, loadMovies);
}

export default function* movieSaga() {
  yield all([fork(watchLoadMovies)]);
}
```

3. loadMovies()를 실행했을 때 실제 작업을 진행하는 loadMoviesAPI()를 실행한 후 결과값을 result에 담는다.

```js
async function loadMoviesAPI() {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count');
    // 여기서 확인
    console.log(`movies 가져와서 구조분해할당으로 담기`);
    console.log(movies);
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}

function* loadMovies() {
  const result = yield call(loadMoviesAPI); // loadMoviesAPI 함수 호출에 의해 return 된 movies 객체
  // 여기서 잘 불러왔는지 확인
  console.log('리턴된 result 출력 :');
  console.log(result);

```

4. 얻어오는 데이터 처리에 따라 LOAD_MOVIES_SUCCESS 또는 LOAD_MOVIES_FAILURE를 발생시키고 그와 함께 data를 전달한다. (에러일 경우 error를 전달)

```js
function* loadMovies() {
  const result = yield call(loadMoviesAPI); // loadMoviesAPI 함수 호출에 의해 return 된 movies 객체
  // 여기서 잘 불러왔는지 확인
  console.log('리턴된 result 출력 :');
  console.log(result);
  try {
    console.log('saga loadMovies start!');
    yield put({
      type: LOAD_MOVIES_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: err.response.data,
    });
  }
}
```

5. 리듀서에서 사가에서 전달받은 액션과, 액션에 담긴 데이터를 실행한다.

```js
const movies = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MOVIES_REQUEST: {
        draft.loadMovieLoading = true;
        draft.loadMovieDone = false;
        break;
      }
      case LOAD_MOVIES_SUCCESS: {
        draft.movies = draft.movies.concat(action.data);  
        // action.data 에는 사가에서 넘겨준 result 값이 담겨있다.
        draft.isLoading = false;  
        // 데이터를 성공적으로 넘겨받을 시, initialStae에서 관리하는 isLoading을 false 로 바꿔준다. 이 조건을 통해 movies를 매핑할 수 있게 된다.
        draft.loadMovieDone = true;
        break;
      }
      case LOAD_MOVIES_FAILURE: {
        draft.loadMovieError = action.error;
        break;
      }
      default:
        return state;
    }
  });
```

6. virtual DOM이 바뀐 state를 감지하여 리렌더링한다.

```js
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
```

<hr/>

## 🌟 주의할 점

1. redux-saga를 처리하는 과정에서 넘겨받은 결과값을 그대로 전달해야 하는데, 서버에서 받은 것처럼 result.data로 처리하면 리듀서에서 concat 할 때 undefined 가 뜰 수 있다.

```js
function* loadMovies() {
  const result = yield call(loadMoviesAPI); 
  try {
    yield put({
      type: LOAD_MOVIES_SUCCESS,
      data: result, // 여기서 result.data로 쓰지 않도록 주의한다.
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: err.response.data,
    });
  }
}
```

2. redux-saga를 통해 처리하므로 데이터를 받아올 때까지 기다렸다가 다음 작업을 진행할 수 있도록 js의 generator의 개념을 잘 알고 있어야 한다.
> 사가에서 data를 넘겨주지 않고, 액션 타입인 LOAD_MOVIES_SUCCESS만 보내주고 리듀서에서 임의 함수 getMovies()를 처리할 경우 데이터를 제대로 받아오지 못 한 채로 넘겨줄 수 있다.

```js

// getMovies()의 바뀐 형태, 리덕스-사가 처리과정을 거치기 때문에 call() 함수로 loadMoviesAPI()를 실행한 후 리턴받은 movies를 loadMovies() 함수에서 result로 받아줬다.

async function loadMoviesAPI() {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count');
    // 여기서 확인
    console.log(`movies 가져와서 구조분해할당으로 담기`);
    console.log(movies);
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}
```

<hr/>

## 인피니티 스크롤 사용하여 데이터 무한으로 즐기기 🌟

<p><a href="https://www.google.com/search?q=%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8B%B0+%EC%8A%A4%ED%81%AC%EB%A1%A4&rlz=1C5CHFA_enKR920KR920&sxsrf=ALeKk01wQWM4UypTXz2VZVTZWfLmiCIRug%3A1617946314931&ei=yuZvYOq2OISkmAWj9b6IDw&oq=%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8B%B0+%EC%8A%A4%ED%81%AC%EB%A1%A4&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyAggAMgIIADIGCAAQBRAeOgcIIxCwAxAnUOAMWOAMYPEOaAFwAHgAgAF8iAHvAZIBAzAuMpgBAKABAaoBB2d3cy13aXrIAQHAAQE&sclient=gws-wiz&ved=0ahUKEwjqw_fat_DvAhUEEqYKHaO6D_EQ4dUDCA0&uact=5">인피니티 스크롤</a>을 구글링하면 정말 다양한 예제들을 찾아볼 수 있습니다. 인피니티 스크롤이란 결국 초기 렌더링 속도를 높히기 위해서 처음 페이지를 렌더링할 때 보여주는 게시글 또는 이미지의 개수를 제한하고, 후에 사용자의 요구에 따라 서버에서 해당 데이터를 추가로 불러오는 방식입니다.</p>

<p>이전에 제가 해왔던 방법들 처럼 사용자들에 의해 작성된 데이터를 LOAD_POSTS_REQUEST 와 같이 서버에서 불러오는 것은 별 문제가 되지 않았지만, OPEN API에서 해당 데이터를 불러오는 기술을 구현하기에는 정말 막막했습니다.</p>

```js
axios.get('https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count')
```

<p>와 같이 https://...json? 뒤에 붙는 문자열은, API 문서가 제공하는 쿼리 속성 들입니다. 기본적으로 제공하는 API는 다음과 같습니다.</p>

<p><img src="./images/API.png" alt="API"></p>

<p>저의 전공이 DB 관련이기 때문에, limit 라는 속성을 보고 처음에는 limit=[1,10]와 같이 쿼리를 설정해야겠다고 생각했습니다. limit의 값을 초기에 설정하고, 후에 state를 통해 LOAD_MOVIES_POST 를 실행할 때마다 해당 limit 속성값을 업데이트 하고 싶었지만, 쿼리문에서 유효하지 않은(?) API에서 제공하지 않는 방법이라 초깃 값인 limit=20 으로 반복되었습니다. </p>

<p>그러던 중 page 라는 속성을 발견했는데, limit로 제한한 영화데이터를 페이지 별로 가져올 수 있었습니다. 그래서 이 페이지 값을 useState로 관리하여, 인피니티 스크롤을 통해 LOAD_MOVIES_REQUEST가 실행될 때마다 이 `page` 속성 값을 올려줘 다음 정보를 가져올 수 있도록 구현하였습니다.</p>


```js
axios.get(`https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count&page=${data}`);
```

<p>이처럼 page=${data} 쿼리 문을 통해, dispatch 시에 action과 함께 data로 받아와 위 데이터를 능동적으로 관리할 수 있었습니다.</p>

<p>추가적으로 action.data를 loadMoviesAPI에 보내줬는데 여기서 나오는 action.data가 우리가 업데이트하고 싶은 page의 state 값입니다.</p>

```js
📁 sagas/movies.js

...

function* loadMovies(action) {
  const result = yield call(loadMoviesAPI, action.data); 
  // action { type:LOAD_MOVIES_REQUEST , data: pageNumber} 이므로 action.data 를 통해
  // pageNumber에 접근하고 이 data를 loadMoviesAPI에 넘겨주었습니다.
  try {
    yield put({
      type: LOAD_MOVIES_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: err.response.data,
    });
  }
}
```

<p>useState로 관리한 page를 포함한 페이지단의 코드는 다음과 같습니다.</p>

```js
📁 pages/HomeChanged
...

const [pageNumber, setPageNumber] = useState(1);

const dispatch = useDispatch();

useEffect(() => {
  dispatch({
    type: LOAD_MOVIES_REQUEST,
    data: pageNumber,
  });
  setPageNumber((pageNumber) => pageNumber + 1);
}, [dispatch]);

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log(`pageNumber 업데이트  ${pageNumber}`);
    // 페이지 끝에 도달하면 추가 데이터를 받아온다
    dispatch({
      type: LOAD_MOVIES_REQUEST,
      data: pageNumber,
    });
    setPageNumber((pageNumber) => pageNumber + 1);
  }
};

useEffect(() => {
  // scroll event listener 등록
  window.addEventListener('scroll', handleScroll);
  return () => {
    // scroll event listener 해제
    window.removeEventListener('scroll', handleScroll);
  };
}, [pageNumber, dispatch]);
```

<p>pageNumber의 초기값을 1로 주었고, 처음 아무것도 없는 상태에서 LOAD_MOVIES_REQUESt를 실행한 후, pageNumber를 올려줍니다. 그러면 axios 단에서 다음 페이지에 limit=10 속성과 함께 영화 데이터를 추가적으로 가져올 것입니다.</p>

```js
📁/sagas/movies
...

async function loadMoviesAPI(data) {
  // 3. data 안에는 action.data 즉 useState로 관리하는 pageNumber 가 들어있습니다.
  // 4. 추가적으로 요청이 생길 때마다 1, 2, 3, ... 증가하며 데이터를 페이지 별로 나눠 불러올 수 있습니다.
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(`https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count&page=${data}`);
    return movies;
  } catch (err) {
    console.error(err);
    return;
  }
}

function* loadMovies(action) {
  const result = yield call(loadMoviesAPI, action.data); 
  // 1. action.data에는 dispatch 시에 액션 타입과 같이 보낸 data, 즉 pageNumber 가 들어있습니다.
  // 2. 이를 call loadMoviesAPI를 호출하면서 결과값을 result에 담습니다.
  try {
    yield put({
      type: LOAD_MOVIES_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: err.response.data,
    });
  }
}
```

<hr/>

## 느낀점

### 새로운 기술 공부하기 🌟
<p>항상 강의만 따라하면서 공부를 했기 때문에 알려주지 않는 기술에 대해 도전하는 것이 두렵고 힘들었습니다. 하지만 구글링과 함께 앉은 자리에서도, 자고 일어나서도, 운동하면서도 고민을 계속하면서 '이렇게 해보면 어떨까', '저렇게 해보면 어떨까' 를 반복했는데, 결과적으로 배웠던 내용을 바탕으로 데이터 렌더링에 성공할 수 있었습니다.</p>

### api 알맞게 요리하여 가져오기 🌟
<p>axios를 통해 api에서 불러온 데이터를 구조분해 할당을 통해 필요한 모습으로 가져와 렌더링하는 부분이 매우 재밌었고, 또한 api에 쿼리문을 추가하여 원하는 형식으로 바꿔 가져오는 과정이 흥미로웠습니다.</p>
