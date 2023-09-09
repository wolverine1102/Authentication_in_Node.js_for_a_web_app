const express = require('express');
const app = express();
app.use(express.json()) // for parsing application/json

const allUsersData = [];

const login = require('./application/login');
login.login(app, allUsersData);

const profile = require('./application/profile');
profile.profile(app, allUsersData);

const people = require('./application/people');
people.people(app, allUsersData);

app.listen(7050, () => console.log('Listening on port 7050...'));

