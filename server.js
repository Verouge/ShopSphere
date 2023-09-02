//import neccssary modules
const express = require("express");
const path = require("path");
const routes = require("./routes");
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
//import the session store module, connecting it sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initiate express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // cookie will expire after one day
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  // use Sequelize to store session data
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// use the session middleware
app.use(session(sess));

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
