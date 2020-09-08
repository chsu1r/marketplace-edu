import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.update_campus = new_campus => {
                this.setState(state => ({campus : new_campus[0]}));
            }
            this.state = {
                authUser: null,
                campus : "",
                updateCampus : this.update_campus
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({ authUser , campus : "MIT" })
                        // TODO(clhsu): this is hard coded.
                        : this.setState({ authUser: null , campus : ""});
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={ this.state }>
                    <Component {...this.props} switchCampus={this.update_campus}/>
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;