import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

const test_url = "/api/hello-world";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message : "no message",
    };
  }
  
  componentDidMount() {
    fetch(test_url)
      .then(res => res.json())
      .then((data) => {
        this.setState({message:data["message"]});
      }).catch(console.log)
  }
    render() {
      if (Object.keys(this.state.message).length === 0) return <div>Loading....</div>;
      var message = this.state.message;
      return (
        <Jumbotron id="home-jumbotron">   
          <h1> Welcome to the marketplace! </h1>
          <p>
            This is a marketplace just for college students to buy and sell items, arrange pickup/delivery, and find short-term leases.
            No more spreadsheets and Facebook posts - find everything you need in just a few clicks.
          </p>
          <p>
            <Button href="/login" variant="primary">Sign up today!</Button>{" "}
            <Button href="/marketplace" variant="secondary">View Marketplace </Button>
          </p>
          <p>
            { message }
          </p>
        </Jumbotron>
      )
    }
  }
  export default Home;