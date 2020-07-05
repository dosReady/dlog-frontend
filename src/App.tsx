import '@fortawesome/fontawesome-free/css/all.css';
import { AppStore } from '@types';
import { observer } from 'mobx-react';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';
import { Switch,  BrowserRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import ContentLoader from 'react-content-loader'
import ErrorBoundaryComp from 'org/dlog/error/ErrorComp';
import {ToastContainer} from 'react-toastify';


const GlobalStyle  = createGlobalStyle`

* {
  box-sizing: border-box;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   vertical-align: baseline;
}

a{
    text-decoration: none;
    color: inherit;
    font-size:inherit;
    font-weight:inherit;
    text-decoration: none; 
    &:link, &:visited, &:active{ color: inherit; }
}

input, textarea {
  color: inherit;
  font-size:inherit;
  font-weight:inherit;
  border-style:none;
  outline: none;
}

textarea {
  resize: none;
}

button{
    border: none;
    background-color: transparent;
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

body {
   line-height: 1;
   margin: 0;
   font-family: 'NanumGothic';
   user-select: none;
   background-color: #FFFFFF;
}
ol, ul {
   list-style: none;
}

.tui-editor-contents {
  font-size:16px;
  margin-bottom: 100px;
  h1, h2 {
      padding-top: 10px;
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

`

const LoginPage = loadable(
  () => import('org/dlog/comn/LoginComp'),
  {fallback: <ContentLoader/>}
)

const BlogListPage = loadable(
  () => import('org/dlog/view/BlogListView'),
  {fallback: <ContentLoader/>}
)

const BlogSrchPage = loadable(
  () => import('org/dlog/view/BlogSrchView')
)

const BlogWritePage = loadable(
  () => import('org/dlog/view/BlogWriteView')
)

const BlogDetailPage = loadable(
  () => import('org/dlog/view/BlogDetailView')
)


@observer
class App extends React.Component<{appStore?:AppStore}, {}> {
  render():JSX.Element {
    return (
      <>
        <GlobalStyle/>
        <ErrorBoundaryComp>
          <Router>
            <Switch>
              <Route exact path="/" component={BlogListPage} />
              <Route exact path="/blog" component={BlogListPage} />
              <Route exact path="/blog/write" component={BlogWritePage} />
              <Route exact path="/blog/write/:postid" component={BlogWritePage} />
              <Route exact path="/blog/srch" component={BlogSrchPage}/>
              <Route exact path="/blog/:postid" component={BlogDetailPage}/>
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </Router>
        </ErrorBoundaryComp>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </>
    )
  }
}

export default App;
