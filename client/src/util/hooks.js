import { ValuesOfCorrectTypeRule } from "graphql";
import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    console.log(event.target.values);
    event.preventDefault();
    callback();
  };
  return {
    onChange,
    onSubmit,
    values,
  };
};
