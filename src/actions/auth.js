// @flow

export type FirebaseUser = {
  uid: string,
  displayName: string | null, // assume this always has a value?
  photoUrl: string | null, //not sure if this is really nullable
  email: string | null, // i opted against collecting this, but we can change
  emailVerified: boolean,
  isAnonymous: boolean,
  providerData: any[],
  apiKey: string,
  appName: string,
  authDomain: string,
  stsTokenManager: {
    apiKey: string,
    refreshToken: string,
    accessToken: string,
    expirationTime: number,
  }
};

export type TwitterCredentials = {
  accessToken: string,
  secret: string,
  provider: string,
  providerId: string,
}

export type AuthPayload = {
  user: FirebaseUser,
  credential: TwitterCredentials,
};

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

// if that succeeds, we will have an authed user. This is the action that
// represents the first (and the only time we will get auth tokens from them
// until they logout and log back in again)
export const authedWithProvider = (payload: AuthPayload) => ({
  type: 'AUTH_SUCCESS',
  payload,
});

// When firebase detects that auth has succeeded, it will always fire this
// action. It happens immediately after auth succeeds
export const userAuthedWithFirebase = (payload: FirebaseUser) => ({
  type: 'AUTH_EXISTING',
  payload,
})

// But it's possible, for whatever reason that they get to the twitter login
// screen and they get cold feet. If that happens then dispatch this action.
// We do get an error object here, btw and it includes a reason for why the
// failure happened.

// It's also possible that the user previously authed with us, but deleted
// their account with us (but not the twitter authorization). Twitter will
// report this as an auth failure, even though it will immediately fire
// AUTH_EXISTING with a fresh user account (we will _not_ get twitter
// credentials as a result and errors will be {}).

export const loginFailed = (errors: {} | {code: string, message: string}) => ({
  type: 'AUTH_FAILURE',
  errors,
})

// After a long brew sesh, people eventually decide to logout.  no payload
// here because we don't really need one, but at some point in the future we
// could use this to track what page a person logs out from or some other
// salient detail if we cared
export const handleLogout = () => ({
  type: 'LOGGED_OUT',
});

// I guess you gotta cover all the bases. It's possible (although i have to
// imagine highly unlikely) that logout could just flat-out fail (i.e. your
// network connection to google dies? i dunno.) anyhow, in that case, we get
// an opaque error object, presumably outlining the actual error.
export const logoutFailed = (error: any) => ({
  type: 'LOGOUT_FAILURE',
  errors: error,
})
