import React from 'react';
import { useForm } from "react-hook-form";
import { withFirebase } from './Firebase';
import { Form, Container, Button } from 'react-bootstrap';

class Register extends React.Component {
    render() {
        return (
            <div>
                <h1> Register </h1>
                <RegisterForm />
            </div>
        )
    }
}


const RegisterFormBase = (props) => {
    const onSubmit = data => {
        console.log(data);
        props.firebase
            .doCreateUserWithEmailAndPassword(data.email, data.password)
            .catch(error => {
                this.setState({ error });
            });
    }

    const { register, handleSubmit, errors, watch } = useForm();
    return (
        <Container>
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

        </Container>
    );
}

const RegisterForm = withFirebase(RegisterFormBase);
export default Register;
export { RegisterForm };