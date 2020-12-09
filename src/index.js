import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Potato from './Potato'
// ! React Application는 하나의 Component만을 Rendering 해야하기 때문에 다른 컴포넌트 포함 불가. -> App.js 안에 포함시켜야 함
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
