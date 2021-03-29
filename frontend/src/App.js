import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/add-todo.component";
import Todo from "./components/todo.component";
import TodoesList from "./components/todoes-list.component";
import Register from "./components/user/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-dark bg-dark">
            <a href="/todoes" className="navbar-brand">
              Todo List
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/todoes"} className="nav-link">
                  Yapilacaklar
                </Link>  
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Ekle
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Kayit Ol
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/todoes"]} component={TodoesList} />
              <Route exact path="/add" component={AddTodo} />
              <Route path="/todoes/:id" component={Todo} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;