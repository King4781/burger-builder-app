import React, { Component } from "react";
import { connect } from "react-redux";

class Success extends Component {
  transformIngredients() {
    const ingredients = Object.keys(this.props.orderData.ingredients);
    return ingredients.map(ingredient => {
      if (this.props.orderData.ingredients[ingredient]) {
        return (
          <li key={ingredient}>
            {this.props.orderData.ingredients[ingredient] + " " + ingredient}(s)
          </li>
        );
      }
      return null;
    });
  }

  deliveryOrPickup() {
    if (this.props.orderData.formData.deliveryMethod === "delivery") {
      return (
        <h3>
          will be delivery to {this.props.orderData.formData.street} in less
          than a hour.
        </h3>
      );
    } else {
      return <h3>can be pick up within 30 minutes.</h3>;
    }
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <h1 style={{ color: "#28a745" }}>
          Thank you {this.props.orderData.formData.name} for your order.
        </h1>
        <h3>Your delicious burger with...</h3>
        <ul style={{ listStyle: "none", fontSize: "18px", padding: "5px" }}>
          {this.transformIngredients()}
        </ul>
        {this.deliveryOrPickup()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderData: state.order.orders[0]
  };
};

export default connect(mapStateToProps)(Success);
