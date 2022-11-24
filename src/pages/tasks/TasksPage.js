import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Task from "../../components/Task";
import TasksFilters from "../../components/TasksFilters";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
  text-align: center;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutButtonContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: #edf4ff;
  }
`;
const Podnaslov = styled.div`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#434e5e",
    color: "#edf4ff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
    console.log(tasksStore);
    if (!tasksStore.tasks.length) {
      return (
        <EmptyTasksPlaceholder>
          Nema podataka o verifikaciji vaga.
        </EmptyTasksPlaceholder>
      );
    }

    const tasks = tasksStore.tasks.map((task) => (
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
        odjeljenje={task.odjeljenje}
        opis={task.opis}
      />
    ));
    console.log(tasks);
    return tasks;
  };
  renderUser = () => {
    const { userStore } = this.props;
    const imalac = userStore.imalac;
    return imalac;
  };

  render() {
    return (
      <TasksWrapper>
        <TasksHeader>
          <img src="logo.jpg" alt="DMV" width="150" height="80" />
          <div>
            <Title>Pregled verifikacije vaga</Title>
            <Podnaslov>{this.renderUser()}</Podnaslov>
          </div>

          <SignOutButtonContainer>
            <Button
              onClick={this.handleSignOut}
              style={{
                marginBottom: "10px",
                borderRadius: "15px",
                backgroundColor: "#c0cde0",
              }}
              variant="outlined"
              //color="primary"
            >
              ODJAVA
            </Button>
          </SignOutButtonContainer>
        </TasksHeader>

        <TasksFilters />
        <TableContainer
          sx={{
            height: 800,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Naziv</StyledTableCell>
                <StyledTableCell align="left">Proizvođač</StyledTableCell>
                <StyledTableCell align="left">Tip</StyledTableCell>
                <StyledTableCell align="left">Serijski broj</StyledTableCell>
                <StyledTableCell align="left">Uvjerenje broj</StyledTableCell>
                <StyledTableCell align="left">Važi do</StyledTableCell>
                <StyledTableCell align="left"> Ispostava</StyledTableCell>
                <StyledTableCell align="left"> Odjeljenje</StyledTableCell>
                <StyledTableCell align="left"> Opis</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                height: "max-content",
              }}
            >
              {this.renderTasks()}
            </TableBody>
          </Table>
        </TableContainer>
      </TasksWrapper>
    );
  }
}

export default TasksPage;
