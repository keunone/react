import React from 'react'

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'RoadHog',
  lastName: 'DVA'
};

const element = (
  <h1 style={{color:"#cccccc"}}>
    Hello, {formatName(user)}!
  </h1>
);

export default () => element