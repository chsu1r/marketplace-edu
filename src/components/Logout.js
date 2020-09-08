import React from 'react';
import {Button} from 'react-bootstrap';

import { withFirebase } from './Firebase';

const LogOutButton = ({ firebase }) => (
  <Button variant="outline-primary"  type="button" onClick={firebase.doSignOut}>Log Out</Button>
);

export default withFirebase(LogOutButton);