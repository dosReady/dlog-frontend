import '@fortawesome/fontawesome-free/css/all.css';
import { AppStore } from '@types';
import { observer } from 'mobx-react';
import LoginComp from 'org/dlog/comn/LoginComp';
import { BlogListView, BlogWriteView } from 'org/dlog/view';
import BlogDetailView from 'org/dlog/view/BlogDetailView';
import BlogSrchView from 'org/dlog/view/BlogSrchView';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle  = createGlobalStyle`

body {
  margin: 0;
  font-family: 'NanumGothic';
  user-select: none;
  background-color: #F1F2F4;
}

a {
  font-size:inherit;
  font-weight:inherit;
  text-decoration: none; 
  &:link, &:visited, &:active{ color: inherit; }
}

button {
  text-decoration: none;
  border-color: transparent;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color:white;
  padding:5px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  :hover {
    box-shadow: 1px 1px 2px 0px #0c1217;
  }
}

ul {
  list-style:none;
  padding:0;
}

* {
  box-sizing: border-box;
}


.tui-editor-contents {
  font-size:16px;
  margin-bottom: 100px;
  h1, h2 {
      border-bottom: none;
  }
  h1 {
    font-size: 35px;
  }
  h2 {
    font-size: 32px;
  }
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 27px;
  }
  h5 {
    font-size: 24px;
  }
  h6 {
    font-size: 21px;
  }

  blockquote {
    border-left : 4px solid #2A3D4E;
    border-left: 4px solid #2A3D4E;
    background-color: #E7F3FF;
    padding: 8px 15px;
  }
}

`
@observer
class App extends React.Component<{appStore?:AppStore}, {}> {

  render():JSX.Element {
    return (
      <div>
        <GlobalStyle/>
          <Router>
            <Switch>
              <Route exact path="/" component={BlogListView} />
              <Route exact path="/login" component={LoginComp} />
              <Route exact path="/blog" component={BlogListView} />
              <Route exact path="/blog/write" component={BlogWriteView} />
              <Route exact path="/blog/write/:postid" component={BlogWriteView} />
              <Route exact path="/blog/srch" component={BlogSrchView}/>
              <Route exact path="/blog/:postid" component={BlogDetailView}/>
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App;
