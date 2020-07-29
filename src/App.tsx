import '@fortawesome/fontawesome-free/css/all.css';
import loadable from '@loadable/component';
import { AppStore } from '@types';
import { inject, observer } from 'mobx-react';
import ErrorBoundaryComp from 'org/dlog/error/ErrorComp';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle  = createGlobalStyle`

* {
  box-sizing: border-box;
}


#root {
  display:flex;
  flex-direction:column;  
  min-height: 100vh;
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
    color:inherit;
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
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; 
   user-select: none;
   background-color: #282d35;
   color:#F3F3F3;
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

const PostListPage = loadable(
  () => import('pages/public/PostListPage'),
)
const PostViewPage = loadable(
  () => import('pages/public/PostViewPage'),
)
const PostWritePage = loadable(
  () => import('pages/admin/PostWritePage'),
)

@inject('appStore') 
@observer
class App extends React.Component<{appStore?: AppStore}, {}> {

  componentDidMount():void {
    // const user = LoginSrvc.getLocalStorage();
    // if(user !== null) {
    //   this.props.appStore?.setUser(user);
    // }
  }

  render():JSX.Element {
    return (
      <>
        <GlobalStyle/>
        <ErrorBoundaryComp>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/write" component={PostListPage} />
              <Route exact path="/detail/:postid" component={PostViewPage} />
              <Route exact path="/" component={PostWritePage} />
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
