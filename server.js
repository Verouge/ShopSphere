
//import neccssary modules
const express = require('express');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');


// initiate express app
const app = express();
const PORT = process.env.PORT || 3001;

//serve static Middleware from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// parse json data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes from './routes'
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(' Server listening on: http://localhost:' + PORT));
});