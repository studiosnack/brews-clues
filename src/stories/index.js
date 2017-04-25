import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';

import UserMenu from '../components/user-menu';


storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('UserMenu', module)
  .addDecorator(story => (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      {story()}
    </div>
  ))
  .add('logged out', () => (
    <UserMenu
      onLogin={() => {action('login')(); linkTo('UserMenu', 'logged in no photo')()}}
      onLogout={action('logout')}
    />
  ))
  .add('logged in no photo', () => (
    <UserMenu
      user={{name: 'marcos'}}
      onLogin={() => {action('login')(); linkTo('UserMenu', 'logged in no photo')()}}
      onLogout={() => {action('logout')(); linkTo('UserMenu', 'logged out')()}}
    />
  ))
  .add('logged in w/ photo', () => (
    <UserMenu
      user={{name: 'marcos', photoURL: 'https://pbs.twimg.com/profile_images/709915680448102400/e_UrydlL_400x400.jpg'}}
      onLogin={() => {action('login')(); linkTo('UserMenu', 'logged in no photo')()}}
      onLogout={() => {action('logout')(); linkTo('UserMenu', 'logged out')()}}
    />
  ));
