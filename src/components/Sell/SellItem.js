import React from 'react';
import { useForm } from "react-hook-form";
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';
import * as ROUTES from '../../constants/routes'; 

const SellItem = () => (
    <div>
        <SellItemForm />
    </div>
)

const SellItemFormBase = (props) => {
    const context = React.useContext(AuthUserContext);
    const addItem = async (data) => {
        
        // var user = getUser(context.authUser.token)  // TODO(clhsu): do this lol
        const post_data = {
            "username": "username",
            "item_name": data.item_name,
            "item_description": data.description,
            "pay_method": data.pay_method,  // TODO(clhsu) : create pay method enum
            "cost": data.cost
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }

        return fetch(ROUTES.ADD_ITEM, requestOptions)
            .then(res => res.json())
            .then((data) => {
            }).catch(console.log)
    }

    const onSubmit = data => {
        addItem(data);
    }

    const { register, handleSubmit, errors, watch } = useForm();
    return (
        <Container>
            <Row>
                <Col sm="12" md={{ offset: "3", span: "6" }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="ItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control name="item_name" type="text" placeholder="Item Name" ref={register({ required: true, maxLength: 80 })} />
                        </Form.Group>
                        <Form.Group controlId="ItemDescription">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows="3" placeholder="Item Description" ref={register({ required: true, maxLength: 400 })} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            (Share original item price? Is price negotiable? Special circumstances?)
                        </Form.Text>
                        <Form.Group controlId="Cost">
                            <Form.Label>Cost ($) (0.00 for Free)</Form.Label>
                            <Form.Control name="cost" type="number" placeholder="0.00" ref={register({ required: true, min: 0 })} />
                        </Form.Group>
                        <Form.Group controlId="PayMethod">
                            <Form.Label>Pay Method (hold ctrl on desktop to select multiple)</Form.Label>
                            <Form.Control name="pay_method" as="select" ref={register({ required: true })} multiple>
                                <option>Venmo</option>
                                <option>Cash</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Post Item
                        </Button>
                    </Form>
                    </Col>
            </Row>
        </Container>
    );
}

const SellItemForm = withRouter(withAuthentication(SellItemFormBase));
export default SellItem;
export { SellItemForm, SellItem };