import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import Task from "../../components/Task";
import TasksFilters from "../../components/TasksFilters";

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
  text-align: center;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: #edf4ff;
  }
`;

@inject("tasksStore", "routerStore", "userStore")
@observer
class TasksPage extends Component {
  componentDidMount() {
    this.props.tasksStore.fetchTasks();
  }

  handleSignOut = () => {
    const { userStore, tasksStore } = this.props;
    userStore.signout();
    tasksStore.resetTasks();
    window.location.hash = "/signin";
  };

  renderTasks = () => {
    const { tasksStore } = this.props;

    if (!tasksStore.tasks.length) {
      return (
        <EmptyTasksPlaceholder>
          No tasks available. Create one?
        </EmptyTasksPlaceholder>
      );
    }

    return tasksStore.tasks.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        naziv={task.naziv}
        proizvodjac={task.proizvodjac}
        tip={task.tip}
        serbr={task.serbr}
        uvjerenje_broj={task.uvjerenje_broj}
        vazi_do={task.vazi_do}
        ispostava={task.ispostava}
      />
    ));
  };

  render() {
    return (
      <TasksWrapper>
        <TasksHeader>
          <Title>Pregled verifikacije vaga</Title>

          <CreateButtonContainer>
            <SignOutIconContainer>
              <IconButton
                onClick={this.handleSignOut}
                placeholder="IZLAZ IZ APLIKACIJE"
              >
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </TasksHeader>

        <TasksFilters />

        <TasksContainer>{this.renderTasks()}</TasksContainer>
      </TasksWrapper>
    );
  }
}

export default TasksPage;
