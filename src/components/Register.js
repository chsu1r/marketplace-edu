import React from 'react';
import { useForm } from "react-hook-form";
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { withAuthentication } from './Session';
import * as ROUTES from '../constants/routes'; 

const Register = () => (
    <div>
        <h1> Register </h1>
        <RegisterForm />
    </div>
);

const RegisterFormBase = (props) => {
    const addUser = async (data) => {
        const post_data = {
            "email": data.email,
            "firebase_id_hash": sha256(data.firebase_id),
            "name": data.name,
            "campus": data.campus.size > 1 ? data.campus : [data.campus],
            "year": data.year
        }
        const token = data.token;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(post_data)
        }
        return fetch(ROUTES.ADD_USER, requestOptions)
            .then(res => res.json())
            .then((data) => {
                props.switchCampus(data["message"]["campus"]);
            }).catch(console.log)
    }

    const onSubmit = data => {
        props.firebase
            .doCreateUserWithEmailAndPassword(data.email, data.password)
            .then(authUser => {
                props.firebase.auth.currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                    data.token = idToken
                    data.firebase_id = authUser.user.uid;
                    addUser(data);
                    props.history.push(ROUTES.HOME);
                }).catch(console.log);
            })
            .catch(console.log);
    }

    const { register, handleSubmit, errors, watch } = useForm();
    return (
        <Container>
            <Row>
        <Col sm="12" md={{ offset: "3", span: "6" }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Name" ref={register({ required: true, maxLength: 80 })} />
                </Form.Group>
                <Form.Group controlId="EmailAddress">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" ref={register({ required: true, value: /^[A-Za-z0-9._%+-]+@mit.edu/i, message: 'Only MIT email addresses allowed.' })} />
                    <Form.Text className="text-muted">
                        Please enter your MIT email address.
            </Form.Text>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 8 })} />
                </Form.Group>
                <Form.Group controlId="ConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="password2" type="password" placeholder="Confirm Password" ref={register({
                        validate: (value) => {
                            return value === watch('password'); // value is from password2 and watch will return value from password1
                        }
                    })} />
                </Form.Group>
                <Form.Group controlId="CampusSelect">
                    <Form.Label>Campus</Form.Label>
                    <Form.Control name="campus" as="select" ref={register({ required: true })}>
                        <option>MIT</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="YearSelect">
                    <Form.Label>Year</Form.Label>
                    <Form.Control name="year" as="select" ref={register({ required: true })}>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>G</option>
                    </Form.Control>
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

const RegisterLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
    </p>
  );

const RegisterForm = withRouter(withAuthentication(RegisterFormBase));
export default Register;
export { RegisterForm, RegisterLink };