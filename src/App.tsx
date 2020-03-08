import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BlogMainPage from 'pages/blog/BlogMainPage';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle  = createGlobalStyle`
html, body, #root, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'NanumGothic';
  user-select: none;
}
`

const App: React.FC = () => {
 
  return (
    <div id="app">
      <GlobalStyle />
        <Router>
          <Switch>
            <Route path="/" exact component={BlogMainPage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
