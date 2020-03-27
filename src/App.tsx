import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BlogMainPage from 'pages/blog/BlogMainPage';
import BlogDetailPage from 'pages/blog/BlogDetailPage';
import BlogWritePage from 'pages/blog/BlogWritePage';
import IntroPage from 'pages/intro/IntroPage';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle  = createGlobalStyle`
html, body, #root, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'NanumGothic';
  user-select: none;
  background-color: #f1f3f6;
}

a {
  font-size:inherit;
  font-weight:inherit;
  text-decoration: none; 
  &:link, &:visited, &:active{ color: inherit; }
}
`

const App: React.FC = () => {
 
  return (
    <div id="app">
      <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/intro" component={IntroPage} />
            <Route exact path="/blog" component={BlogMainPage} />
            <Route exact path="/blog/write" component={BlogWritePage} />
            <Route exact path="/blog/write/:postid" component={BlogWritePage} />
            <Route exact path="/blog/:postid" component={BlogDetailPage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
