// server.js
const express = require("express");
const path = require("path");
const routes = require("./routes");
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

// Import the session store module, connecting it to sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initiate express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Cookie will expire after one day
    maxAge: 24 * 60 * 60 * 1000, // Expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  // Use Sequelize to store session data
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use the session middleware
app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Parse json data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static Middleware from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use routes from './routes'
app.use(routes);

// Synchronize database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});

