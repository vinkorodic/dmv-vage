<<<<<<< HEAD
import React, { Component, useState } from "react";
=======
import React, { Component } from "react";
>>>>>>> 43046c33a209543fe0f9f5d0b7eb9e994e6b5a1b

import styled from "styled-components";
import { inject } from "mobx-react";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 5,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#edf4ff",
    //theme.palette.action.hover,
  },

  "&:nth-of-type(even)": {
    backgroundColor: "#c0cde0",
  },
}));

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
      odjeljenje,
      opis,
    } = this.props;

    return (
      <StyledTableRow>
        <StyledTableCell>{naziv}</StyledTableCell>
        <StyledTableCell>{proizvodjac}</StyledTableCell>
        <StyledTableCell>{tip}</StyledTableCell>
        <StyledTableCell>{serbr}</StyledTableCell>
        <StyledTableCell>{uvjerenje_broj}</StyledTableCell>
        <StyledTableCell
          sx={{
            backgroundColor: moment().isBefore(vazi_do) ? "green" : "red",
            color: "yellow",
          }}
        >
          {moment(vazi_do).utc().format("DD.MM.YYYY")}
        </StyledTableCell>
        <StyledTableCell>{ispostava}</StyledTableCell>
        <StyledTableCell>{odjeljenje}</StyledTableCell>
        <StyledTableCell>{opis}</StyledTableCell>
      </StyledTableRow>
    );
  }
}

export default Task;