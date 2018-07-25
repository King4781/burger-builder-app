import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Inputs/Inputs";
import orderForm from "./orderForm";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm,
    formIsValid: false,
    savedDataIsTrue: false
  };

  orderHandler = e => {
    e.preventDefault();

    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      //price should be calculated on the server in a production app
      price: this.props.price,
      formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

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

  inputChangedHandler = (e, inputID) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputID] };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputID] = updatedFormElement;

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formsElementArray = [];

    for (let key in this.state.orderForm) {
      formsElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formsElementArray.map(el => (
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
        ))}
        <Button
          disabled={!this.state.formIsValid}
          type="submit"
          btnType="Success"
        >
          PURCHASE
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Information</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionTypes.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
