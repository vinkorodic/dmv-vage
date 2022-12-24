import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

import "./SignInPage.scss";
import { inject } from "mobx-react";
import ErrorMessage from "../../components/ErrorMessage";

const Heading = styled.h1`
  margin-top: 10;
  width: 80%;
  background-color: #3f51b5;

  color: #edf4ff;
  text-align: center;
`;
const Naslovna = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3f51b5;
  border-radius: 5px;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject("userStore", "routerStore")
class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMesssage: null,
    };
  }

  submit = async () => {
    this.setState({ errorMessage: null });
    const { username, password } = this.state;

    try {
      await this.props.userStore.signin(username, password);
      window.location.hash = "/tasks";
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  goToSignUp = () => {
    window.location.hash = "/signup";
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Naslovna>
            <img src="logoBijeli.png" alt="DMV" style={{ padding: "16px" }} />
            <Heading>
              <div sx={{ height: "50 px" }}>DMV D.O.O.</div>
              <div style={{ fontSize: "24px" }}>Podaci o verifikaciji vaga</div>
            </Heading>
          </Naslovna>

          <h4>Unesi korisničko ime i lozinku!</h4>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Korisnik"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Lozinka"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <hr />
          <div>
            <Button
              style={{ marginBottom: "10px" }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              PRIJAVA
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignInPage;
