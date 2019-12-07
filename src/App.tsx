import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './resources/css/index.css';
import BlogWritePage from './pages/BlogWritePage';
const App: React.FC = () => {
 
  return (
      <div id="app">
        <Router>
          {/* 
          <header>
            <Link to="/">Home</Link>
            <Link to="/">글쓰기</Link>
          </header>
          */}
          <Switch>
            <Route path="/" exact component={BlogWritePage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
