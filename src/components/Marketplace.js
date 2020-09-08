import React from 'react';
import { Col, Card, Button, Row, Container } from 'react-bootstrap';

const test_url = "/api/get-items";

class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    getItems = async () => {
        const { campus } = this.props.match.params;
        if (campus !== "mit" && campus !== "MIT") return {}

        return fetch(test_url)
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data["items"] });
            }).catch(console.log)
    }

    CardView = ({
        name = "Untitled",
        description = "",
        seller_username = "",
        image_url = "holder.js/100px160",
        cost = 0
    }) => (
            <Col xs sm md="4" lg="3">
                <Card className="mb-2" style={{ width: "18rem" }}>
                    <Card.Img style={{ padding: "15px" }} variant="top" src={image_url} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            <b>Description: </b>{description}
                        </Card.Text>
                        <Card.Text>
                            <b>Cost: </b>${cost}
                        </Card.Text>
                        <Button variant="primary">
                            More Details
                    </Button>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Sold by <a href="#">{seller_username}</a></small>
                    </Card.Footer>
                </Card>
            </Col>
        );

    async componentDidMount() {
        this.getItems();
    }

    render() {
        if (Object.keys(this.state.items).length === 0) return <div>Loading....</div>;
        var cards = this.state.items.map((item, _) => <this.CardView key={item.id} name={item.name} description={item.description} seller_username={item.seller_username} cost={item.cost} image_url={item.img_url} />);
        return (
            <div>
                <h1> Marketplace </h1>
                <Container>
                    <Row>
                        {cards}
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Marketplace;