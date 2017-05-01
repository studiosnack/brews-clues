// @flow
import React from 'react';

import './user-menu.css';

type User = {
  name?: string,
  photoURL?: string,
};
type UserMenuProps = {
  user?: User,
  onLogin: () => void,
  onLogout: () => void,
};


const UserMenu = ({user, onLogin, onLogout}: UserMenuProps) => {
  return user
    ? <LoggedInMenu user={user} onLogout={onLogout} />
    : <LoggedOutMenu onLogin={onLogin} />;
};

const LoggedOutMenu = ({onLogin}) => {
  return <menu className="user-menu">
    <li className="menu-item"><TextButton onClick={onLogin}>Login (twitter)</TextButton></li>
  </menu>;
}

type LoggedInProps = {
  user: User,
  onLogout: () => void,
};

const LoggedInMenu = ({user, onLogout}: LoggedInProps) => {
  return <menu className="user-menu">
    <li className="menu-item">
      { user.photoURL
        ? <img src={user.photoURL} className="user-icon" />
        : <span className="empty-user-icon" />
      }
    </li>
    <li className="menu-item"><TextButton onClick={onLogout}>Logout ({user.name})</TextButton></li>
  </menu>;
}

const TextButton = ({children, ...rest}) => <button className="text-button" {...rest}>
  {children}
</button>

export default UserMenu;
