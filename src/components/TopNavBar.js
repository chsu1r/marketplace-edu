import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import LogOutButton from './Logout';

import { AuthUserContext } from './Session';

class NavigationAuth extends React.Component {
  render() {
    const { campus } = this.props;
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">Marketplace</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={"/marketplace/" + campus }>Marketplace</Nav.Link>
          <Nav.Link href="/sell" >Sell</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder={"Search " + campus + " Marketplace"} className="mr-sm-2" />
          <Button variant="outline-primary" type="button">Search</Button>
        </Form>
        <LogOutButton />
      </Navbar>
    );
  }
}

const NavigationNonAuth = () => (
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="/">Marketplace</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
  </Navbar>
);

function TopNavBar () {
  const context = React.useContext(AuthUserContext);
  return context.authUser ? <NavigationAuth campus={context.campus} /> : <NavigationNonAuth />
}

export default TopNavBar;