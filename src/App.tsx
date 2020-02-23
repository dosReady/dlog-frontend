import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'resources/css/index.css';
import BlogWritePage from 'pages/blog/BlogWritePage';
import BlogListPage from 'pages/blog/BlogListPage';
import BlogPostPage from 'pages/blog/BlogPostPage';
const App: React.FC = () => {
 
  return (
      <div id="app">
        <Router>
          <Switch>
            <Route path="/" exact component={BlogListPage} />
            <Route path="/blog/list" exact component={BlogListPage} />
            <Route path="/blog/post" exact component={BlogPostPage} />
            <Route path="/blog/write" exact component={BlogWritePage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
