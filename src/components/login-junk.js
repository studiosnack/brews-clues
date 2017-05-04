// @flow

import React from 'react';
import {connect} from 'react-redux';

import AuthButtons from './connected-auth-buttons';


const mapStateToProps = state => ({
  loggedIn: state.auth.status === 'logged in',
  loggingIn: state.auth.status === 'logging in',
  provider: state.auth.provider,
  user: state.auth.user || {},
});


type Props = {
  loggingIn: boolean,
  loggedIn: boolean,
  provider: ?string,
  user: {
    photoURL: ?string,
    displayName: ?string,
  },
};

const SimpleLoginJunk = (props: Props) => {
  const {loggedIn, loggingIn, provider, user} = props;
  return <div>
    { loggedIn && user.photoURL && user.displayName &&
      <UserGreeting photoURL={user.photoURL} displayName={user.displayName} />
    }

    { loggingIn
      ? <span>Opening a popup for {provider} to log in</span>
      : <AuthButtons loggedIn={loggedIn} />
    }
  </div>;
}

const UserGreeting = ({photoURL, displayName}: {photoURL: string, displayName: string}) => (
  <div>
    <p>{displayName}, you logged in!</p>
    <div><img src={photoURL} alt="user avatar" /></div>
  </div>
);


export default connect(
  mapStateToProps,
  // mapStateToProps is a function that receives two arguments:
  // 1) the redux reducer's state
  // 2) the props any parent passed to this component (`ownProps`)
  //
  // here, we use it as a way to hide the redux store from the
  // component. The SimpleLoginJunk component *only* knows about booleans
  // and strings much like UserGreeting only knows bout strings.
  //
  // In an ideal world, have mostly simple components like this that
  // just receive props. Every time i expect to enhance a component
  // with redux store values, i will usually call it Simple_______ and
  // expect it to get wrapped somewhere along the way.
)(SimpleLoginJunk);
