import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import BlogListComp from 'org/dlog/blog/BlogListComp';
import BlogViewComp from 'org/dlog/blog/BlogViewCmp';
import '@fortawesome/fontawesome-free/css/all.css';
import LoginComp from 'org/dlog/comn/login/LoginComp';

const GlobalStyle  = createGlobalStyle`
html, body, #root, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'Noto Sans', 'Apple SD Gothic Neo', '맑은 고딕', 'Malgun Gothic', '돋움', 'dotum', 'sans-serif';
  user-select: none;
  background-color: #F1F2F4;
}

a {
  font-size:inherit;
  font-weight:inherit;
  text-decoration: none; 
  &:link, &:visited, &:active{ color: inherit; }
}
`

class App extends React.Component {

  render():JSX.Element {
    return (
      <div id="app">
        <GlobalStyle />
          <Router>
            <Switch>
              <Route exact path="/" component={BlogListComp} />
              <Route exact path="/login" component={LoginComp} />
              <Route exact path="/blog" component={BlogListComp} />
              <Route exact path="/blog/:postid" component={BlogViewComp} />
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App;
