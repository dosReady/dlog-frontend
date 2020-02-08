import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './resources/css/index.css';
import BlogWritePage from './pages/blog/BlogWritePage';
import MainPage from './pages/main/MainPage';
import BlogListPage from './pages/blog/BlogListPage';
const App: React.FC = () => {
 
  return (
      <div id="app">
        <Router>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/blog/list" exact component={BlogListPage} />
            <Route path="/blog/write" exact component={BlogWritePage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
