import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Select,
  FormControl,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import { inject } from "mobx-react";

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

@inject("tasksStore")
class Task extends Component {
  deleteTask = () => {
    this.props.tasksStore.deleteTask(this.props.id);
  };

  handleStatusChange = (e) => {
    this.props.tasksStore.updateTaskStatus(this.props.id, e.target.value);
  };

  render() {
    const {
      naziv,
      proizvodjac,
      tip,
      serbr,
      uvjerenje_broj,
      vazi_do,
      ispostava,
    } = this.props;

    return (
      <CardContainer>
        <Card>
          <CardContent>
            <CardTitle>{naziv}</CardTitle>
            <CardTitle>{proizvodjac}</CardTitle>
            <CardTitle>{tip}</CardTitle>
            <CardTitle>{serbr}</CardTitle>
            <CardTitle>{uvjerenje_broj}</CardTitle>
            <CardTitle>{vazi_do}</CardTitle>
            <CardTitle>{ispostava}</CardTitle>
          </CardContent>
          <CardActions style={{ padding: "14px" }} disableSpacing>
            <Grid
              justify="space-between" // Add it here :)
              container
            ></Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
  }
}

export default Task;
