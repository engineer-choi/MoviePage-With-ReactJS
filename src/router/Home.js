import "./Home.css"
import React from "react";
import axios from "axios";
import Movie from "../components/Movie"

// * 출시 방법
// * 1) npm i gh-pages
// * 2) package.JSON에 홈페이지 넣기
// * "homepage" : "https://[깃헙닉네임].github.io/[프로젝트이름] (전부 소문자여야 함)
// * 3) "deploy": "gh-pages -d build",
// *    "predeploy": "npm run build"
// * 위 두 명령어를 package.JSON의 scripts 안에 넣어주기
// * deploy는 build폴더를 upload한다.
// * 이는 npm run build를 실행하면 됨.
// * deploy를 먼저 호출하면 predeploy가 자동적으로 실행된다(이름은 같아야함)

// * 생명주기 - Mounting, Updating, UnMounting
// * Mounting - 생성될 때(페이지가 보여질 때 호출)
// * constructor -> render -> componentDidMount 순서대로 호출됨.

// * Updating - 페이지에서 setState를 호출할 떄
// * render -> componentDidUpdate 순서대로 호출됨

// * UnMounting - 페이지에서 떠날 때 호출됨
// * componentWillUnMount 호출
class Home extends React.Component{
    state = {
      isLoading: true,
      movies: []
    }
    // * state에 변화를 줘서 class의 state를 변경시키도록 강제함.
    // * setState를 호출하면 새로운 state와 render함수가 갱신되는데, 리액트는 충분히 똑똑해서 변화된 부분만 감지하여 적용함(매우 빠른 반응)
    getMovies = async () => { // * async - await을 통해 비동기 처리 가능하다.(await가 끝날때까지 비동기로 기다림)
      const {
        data: {
          data: {
            movies
          }
        }
      } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
      this.setState( {movies, isLoading: false} );
    }
    componentDidMount(){
      this.getMovies();
    }
    render(){
      const { isLoading, movies} = this.state;
      return (
        <section className="container">
          {isLoading ? (
            <div>
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="movies">
              {movies.map(movie => {
                return <Movie 
                key={movie.id} 
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image}
                genres={movie.genres} />
              })}
            </div>
          )}
        </section>
      )
    }
  }
  
export default Home;


// function Food({name, image, rating}){
//   return (
//     <div>
//       <h1>I like {name}</h1>
//       <h4>{rating} / 5.0</h4>
//       <img src= {image} alt={name}></img> {/*** alt는 시각장애인을 위한 것 */}
//     </div>
//   )
// }

// // ! 반드시 이름은 propTypes로 해야 리액트가 확인 가능하다
// // * https://ko.reactjs.org/docs/typechecking-with-proptypes.html 참고
// Food.propTypes = {
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired
// }

// const foodILike = [
//   {
//     id: 1,
//     food: "김치",
//     image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     rating: 4.3
//   },
//   {
//     id: 2,
//     food: "비빔밥",
//     image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     rating: 4.0
//   },
//   {
//     id: 3,
//     food: "삼겹살",
//     image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     rating: 4.9
//   },
//   {
//     id: 4,
//     food: "볶음밥",
//     image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     rating: 4.7
//   }
// ];

// function renderFood(dish){
//   return <Food key={dish.id} name={dish.food} image = {dish.image} rating ={dish.rating}/>
// }

// function App() {
//   return (
//     // 컴포넌트 : HTML을 반환하는 함수
//     // 리액트는 component를 사용해서 HTML처럼 작성하려는 경우에 필요하다.
//     // jsx : javascript와 html의 혼종(리액트만의 개념)
//     // npm i prop-types : 내가 원하는 property를 전달받았는지 확인해주는 것
//     // package.json 에서 "prop-types" 설치되었는지 확인.
//     <div>
//       <h1>Hello</h1>
//       {foodILike.map(renderFood)}
//       {/** 재사용 가능하게 만들어준다.(클래스 느낌)*/}
//     </div>
//   );
// }