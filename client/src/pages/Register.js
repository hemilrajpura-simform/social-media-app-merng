import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/hooks";

const Register = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          type="email"
          placeholder="Email.."
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password.."
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Register;
