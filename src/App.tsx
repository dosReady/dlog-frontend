import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BlogMainPage from 'pages/blog/BlogMainPage';
const App: React.FC = () => {
 
  return (
      <div id="app">
        <Router>
          <Switch>
            <Route path="/" exact component={BlogMainPage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
