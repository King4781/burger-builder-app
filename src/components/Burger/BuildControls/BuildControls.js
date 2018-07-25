import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p style={{ color: "white" }}>
      Current Price: <strong>$ {props.price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        remove={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.ableToPurchase}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "LOGIN TO ORDER"}
    </button>
  </div>
);

export default buildControls;
