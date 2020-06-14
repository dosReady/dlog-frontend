import '@fortawesome/fontawesome-free/css/all.css';
import { observer, inject } from 'mobx-react';
import LoginComp from 'org/dlog/comn/LoginComp';
import { BlogListView, BlogWriteView } from 'org/dlog/view';
import BlogDetailView from 'org/dlog/view/BlogDetailView';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { AppStore } from '@types';

const GlobalStyle  = createGlobalStyle<{color:string|undefined}>`
html, body, #root, #app, main {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'Noto Sans', 'Apple SD Gothic Neo', '맑은 고딕', 'Malgun Gothic', '돋움', 'dotum', 'sans-serif';
  user-select: none;
  background-color: ${props => props.color !== undefined ? `${props.color}` : "#fff"};
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
  padding: 0.75rem 0.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
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
  margin-bottom: 10px;
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
@inject('appStore') 
@observer
class App extends React.Component<{appStore?:AppStore}, {}> {

  render():JSX.Element {
    console.log(this.props.appStore?.getColor())
    return (
      <div>
        <GlobalStyle color={this.props.appStore?.getColor()}/>
          <Router>
            <Switch>
              <Route exact path="/" component={BlogListView} />
              <Route exact path="/login" component={LoginComp} />
              <Route exact path="/blog" component={BlogListView} />
              <Route exact path="/blog/write" component={BlogWriteView} />
              <Route exact path="/blog/write/:postid" component={BlogWriteView} />
              <Route exact path="/blog/:postid" component={BlogDetailView} />
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App;
