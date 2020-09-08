import React from 'react';

const AuthUserContext = React.createContext({ authUser: null, campus: "", updateCampus: (new_campus) => { } });

export default AuthUserContext;