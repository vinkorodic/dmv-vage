import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { inject, observer } from "mobx-react";

import SignInPage from "./pages/signin/SignInPage";

import TasksPage from "./pages/tasks/TasksPage";

@inject("routerStore")
@observer
class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={SignInPage} />
        <Route path="/signin/" component={SignInPage} />
        {/* <Route path="/signup/" component={SignUpPage} /> */}
        <Route exact path="/tasks" component={TasksPage} />
        {/* <Route exact path="/tasks/create" component={CreateTaskPage} /> */}
      </Fragment>
    );
  }
}

export default App;
