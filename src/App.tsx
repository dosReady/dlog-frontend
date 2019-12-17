import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './resources/css/index.css';
import BlogWritePage from './pages/blog/BlogWritePage';
import BlogListPage from './pages/blog/BlogListPage';
import PrdMainPage from './pages/PrdMainPage';
import PrdListPage from './pages/PrdListPage';
const App: React.FC = () => {
 
  return (
      <div id="app">
        <Router>
          <Switch>
            <Route path="/" exact component={PrdMainPage} />
            <Route path="/prod" exact component={PrdListPage} />
            <Route path="/blog/write" exact component={BlogWritePage} />
            <Route path="/blog" exact component={BlogListPage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
