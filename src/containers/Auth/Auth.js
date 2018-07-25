import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Inputs/Inputs";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    isSignedUp: true,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const re = /\S+@\S+\.\S+/;
      isValid = re.test(value);
    }

    return isValid;
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignedUp: !prevState.isSignedUp };
    });
  };

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignedUp
    );
  };

  render() {
    const formsElementArray = [];

    for (let key in this.state.controls) {
      formsElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formsElementArray.map(el => (
      <Input
        key={el.id}
        label={el.config.elementConfig.placeholder}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        value={el.config.value}
        changed={e => this.inputChangedHandler(e, el.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div
        className={classes.Auth}
        style={{ background: this.state.isSignedUp ? "#28a745" : "yellow" }}
      >
        {authRedirect}
        <h3>{this.state.isSignedUp ? "SIGNUP" : "LOGIN"}</h3>
        <strong style={{ color: "#dc3545" }}>{errorMessage}</strong>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button style={{ color: "black" }} btnType="Success">
            SUBMIT
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignedUp ? "LOGIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) =>
      dispatch(actions.auth(email, password, isSignedUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
