//import neccssary modules
const express = require("express");
const path = require("path");
const routes = require("./routes");
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

// initiate express app
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// parse json data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve static Middleware from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//use routes from './routes'
app.use(routes);

// change synchronization option to "force:false" before production
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () =>
    console.log(" Server listening on: http://localhost:" + PORT)
  );
});
