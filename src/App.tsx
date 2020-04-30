import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BlogListPage from 'pages/blog/BlogListPage';
import BlogDetailPage from 'pages/blog/BlogDetailPage';
import BlogWritePage from 'pages/blog/BlogWritePage';
import {createGlobalStyle} from 'styled-components';
import TodoListPage from 'pages/todo/TodoListPage';
import LoginPage from 'pages/common/LoginPage';

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
            <Route exact path="/" component={TodoListPage} />
            <Route exact path="/project" component={TodoListPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/blog" component={BlogListPage} />
            <Route exact path="/blog/write" component={BlogWritePage} />
            <Route exact path="/blog/write/:postid" component={BlogWritePage} />
            <Route exact path="/blog/:postid" component={BlogDetailPage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
