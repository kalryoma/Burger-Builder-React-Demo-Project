import React from "react";

import css from "./Input.css";

const input = props => {
  let inputElement = null;
  let classes = [css.InputElement];
  if (!props.valid && props.touched)
    classes.push(css.Invalid);
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={classes.join(" ")}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.join(" ")}
          name={props.name}
          onChange={props.changed}
        >
          {props.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.join(" ")}
          {...props}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={css.Input}>
      <label className={css.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
