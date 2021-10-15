import React from 'react';
import 'todomvc-app-css/index.css';
import { Footer, TodoList } from '../components';
import { HashRouter, Route } from 'react-router-dom';

export function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <div className="todoapp">
          <Route path="/:filter?" component={TodoList} />
        </div>
        <Footer />
      </React.Fragment>
    </HashRouter>
  );
}

export default App;
