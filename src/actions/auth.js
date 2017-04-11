// @flow

// ok, bear with me. There are going to be several action creators here and
// it's because we want to create a really good UI from the outset.

// When somebody arrives at the webapp, firebase will say they have no idea
// who this person is and the best we can say is that the user is a total
// mystery to us. We don't include a payload because there is no payload that
// goes along with this. It's a mystery.
//
// This is the _default_ state of the auth reducer but it can also become the
// state if for whatever reason we kill everyone's session and their auth
// onchange handler _doesn't_ return a user.
export const notAuthed = () => ({
  type: 'AUTH_MYSTERY'
})

// the next thing that will happen is that they will either attempt to login,
// probably with twitter because we have that configured
export const handleLogin = (method: 'twitter') => ({
  type: 'ATTEMPT_LOGIN',
  meta: {
    method,
  },
});

// if that succeeds, we will have an authed user
export const handleUserAuthed = (payload: {}) => ({
  type: 'LOGGED_IN',
  payload,
});

// But it's possible, for whatever reason that they get to the twitter login
// screen and they get cold feet. If that happens then dispatch this action.
// We do get an error object here, btw and it includes a reason for why the
// failure happened
export const loginFailed = (errors: any) => ({
  type: 'LOGIN_FAILURE',
  errors,
})

// After a long brew sesh, people eventually decide to logout.  no payload
// here because we don't really need one, but at some point in the future we
// could use this to track what page a person logs out from or some other
// salient detail if we cared
export const handleLogout = () => ({
  type: 'LOGGED_OUT',
});

