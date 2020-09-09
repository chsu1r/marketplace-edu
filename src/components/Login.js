import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { RegisterLink } from './Register';
import * as ROUTES from '../constants/routes'; 

const Login = () => (
  <div>
    <h1>Login</h1>
    <LoginForm />
    <RegisterLink />
  </div>
);

const LoginFormBase = (props) => {
  const onSubmit = data => {
    props.firebase
      .doSignInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        props.history.push(ROUTES.HOME);
      })
      .then(() => {
      })
      .catch(console.log);
  }

  const { register, handleSubmit } = useForm();
  return (
    <Container>
      <Row>
        <Col sm="12" md={{ offset: "3" , span : "6"}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="EmailAddress">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" ref={register({ required: true, value: /^[A-Za-z0-9._%+-]+@mit.edu/i, message: 'Only MIT email addresses allowed.' })} />
          <Form.Text className="text-muted">
            Please enter your MIT email address.
                  </Form.Text>
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" ref={register({ required: true })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);
export default Login;
export { LoginForm };