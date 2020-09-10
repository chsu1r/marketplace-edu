import React from 'react';
import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { SellItem } from './SellItem';

const SellPanels = (props) => (
    <Container id="sell-home-container">
        <h1> Sell your stuff!</h1>
        <Row>
            <Card className="mb-4" style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Sell an Item</Card.Title>
                    <Card.Text>
                        <b>Click here to sell an individual item.</b>
                    </Card.Text>
                    <Button variant="primary" onClick={(e) => props.handleButtonClick(e.target.value)} value='sell-item'>
                        Sell an Item
                            </Button>{" "}
                </Card.Body>
            </Card>
            <Card className="mb-4" style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Host a Sale</Card.Title>
                    <Card.Text>
                        <b>Click here to sell multiple items at once (e.g. senior sale, move-out sale)</b>
                    </Card.Text>
                    <Button variant="primary" onClick={(e) => props.handleButtonClick(e.target.value)} value='host-sale'>
                        Host
                        </Button>{" "}
                </Card.Body>
            </Card>
            <Card className="mb-4" style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Post Housing</Card.Title>
                    <Card.Text>
                        <b>Click here to post housing. (e.g. an empty room in your lease, subleases)</b>
                    </Card.Text>
                    <Button variant="primary" onClick={(e) => props.handleButtonClick(e.target.value)} value='post-housing'>
                        Post Housing
                        </Button>{" "}
                </Card.Body>
            </Card>
        </Row>
    </Container>
);

class SellHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: ''
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(page) {
        this.setState({ screen: page });
    }

    render() {
        if (this.state.screen === '') {
            return (<SellPanels handleButtonClick={this.handleButtonClick}/>);
        }
        if (this.state.screen === 'sell-item') {
            return (
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <h1>Sell an Item:</h1>
                        <Button variant="primary" onClick={(e) => this.handleButtonClick(e.target.value)} value=''>Back</Button>
                    </Col>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <SellItem />
                    </Col>
                </Row>
            );
        }
    }
}
export default SellHome;