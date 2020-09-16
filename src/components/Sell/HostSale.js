import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, Container, Button, Row, Col, Accordion, ButtonGroup, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';
import * as ROUTES from '../../constants/routes';

const HostSale = () => (
    <div>
        <HostSaleForm />
    </div>
)

const HostSaleFormBase = (props) => {
    // enforcing some state onto functional component lol
    const [values, setValues] = useState({ items: [] });

    // adding new item
    const addEmptyItemField = () => {
        var empty_item = { "name": "", "description": "", cost: 0, pay_method: [] };
        setValues({ items: [...values.items, empty_item] });
    }

    // grabbing accordion object
    const getAccordion = () => {
        return (values.items.length > 0) ? (
            <Accordion>
                {getCurrentItemFields()}
            </Accordion>
        ) : <div></div>;
    }

    // listening for name changes to modify accordion card titles
    const onNameChange = (i, new_name) => {
        var new_items = values.items;
        new_items[i].name = new_name;
        setValues({ items: new_items });
    }

    // dynamically creating the item form fields inside the accordion cards.
    const getCurrentItemFields = () => {
        return values.items.map((item, i) =>
            <Card key={i.toString()}>
                <Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
                    {(values.items[i].name === "") ? "New Item" : values.items[i].name}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i.toString()}>
                    <Card.Body>
                        <Form.Group controlId={"ItemName" + i.toString()}>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control name={"items[" + i.toString() + "].item_name"} type="text" placeholder="Item Name" ref={register({ required: true, maxLength: 80 })} defaultValue={item.name} onChange={(e) => onNameChange(i, e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId={"ItemDescription" + i.toString()}>
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control name={"items[" + i.toString() + "].description"} as="textarea" rows="3" placeholder="Item Description" ref={register({ required: true, maxLength: 400 })} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            (Share original item price? Is price negotiable? Special circumstances?)
                    </Form.Text>
                        <Form.Group controlId={"Cost" + i.toString()}>
                            <Form.Label>Cost ($) (0.00 for Free)</Form.Label>
                            <Form.Control name={"items[" + i.toString() + "].cost"} type="number" placeholder="0.00" ref={register({ required: true, min: 0 })} />
                        </Form.Group>
                        <Form.Group controlId={"PayMethod" + i.toString()}>
                            <Form.Label>Pay Method (hold ctrl on desktop to select multiple)</Form.Label>
                            <Form.Control name={"items[" + i.toString() + "].pay_method"} as="select" ref={register({ required: true })} multiple>
                                <option>Venmo</option>
                                <option>Cash</option>
                            </Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }

    // handle the add item click event.
    const handleAddItemClick = event => {
        addEmptyItemField();
    }

    const context = React.useContext(AuthUserContext);

    // POST backend methods. Adding a single item to the db.
    const addItem = async (data) => {
        if (localStorage.getItem("username").length == 0) {
            // blow up
            return;
        }
        const post_data = {
            "username": localStorage.getItem("username"),
            "item_name": data.item_name,
            "item_description": data.description,
            "pay_method": data.pay_method,  // TODO(clhsu) : create pay method enum
            "cost": data.cost,
            "draft": false
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

    // Adding a sale to the db.
    const addSale = async (data) => {
        // var user = getUser(context.authUser.token)  // TODO(clhsu): do this lol
        const post_data = {
            "name": data.sale_name,
            "seller_username": "username",
            "draft": data.draft
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        }

        return fetch(ROUTES.ADD_SALE, requestOptions)
            .then(res => res.json())
            .then((data) => {
            }).catch(console.log)
    }

    // Handle a form submit.
    const onSubmit = data => {
        console.log("Submitted form.");
        // addSale(data);
        // for (var i = 0; i < data.items.length; i++) {
        //     addItem(data.items[i]);
        // }
    }

    const { register, handleSubmit, errors, watch } = useForm();
    return (
        <Container>
            <Row>
                <Col sm="12" md={{ offset: "3", span: "6" }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="SaleName">
                            <Form.Label>Sale Name</Form.Label>
                            <Form.Control name="sale_name" type="text" placeholder="Sale Name" ref={register({ required: true, maxLength: 80 })} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            (e.g. Senior Sale 2021, Fall Move-out Sale)
                        </Form.Text>
                        {getAccordion()}
                        <ButtonGroup aria-label="Sale Add/Save" style={{ marginTop: 20 + 'px' }}>
                            <Button variant="primary" type="submit">
                                Save Draft
                            </Button>
                            <Button variant="primary" onClick={(e) => handleAddItemClick()}>
                                Add Item "+"
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

const HostSaleForm = withRouter(withAuthentication(HostSaleFormBase));
export default HostSale;
export { HostSaleForm, HostSale };