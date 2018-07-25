let orderForm = {
  name: {
    elementType: "input",
    objName: "name",
    elementConfig: {
      type: "text",
      placeholder: "Your Name"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  email: {
    elementType: "input",
    objName: "email",
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
  street: {
    elementType: "input",
    objName: "street",
    elementConfig: {
      type: "text",
      placeholder: "Street Address"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  zipCode: {
    elementType: "input",
    objName: "zipCode",
    elementConfig: {
      type: "text",
      placeholder: "Zip Code"
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5
    },
    valid: false,
    touched: false
  },
  country: {
    elementType: "input",
    objName: "country",
    elementConfig: {
      type: "text",
      placeholder: "Country"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  deliveryMethod: {
    elementType: "select",
    objName: "deliveryMethod",
    elementConfig: {
      placeholder: "Delivery Method",
      options: [
        { value: "pickup", displayValue: "Pickup" },
        { value: "delivery", displayValue: "Delivery" }
      ]
    },
    value: "pickup",
    validation: {},
    valid: true
  }
};

export default orderForm;
