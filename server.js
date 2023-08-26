
//Depedencies
const express = require('express');
const path = require('path');

// initiate express app
const app = express();
const PORT = process.env.PORT || 3001;

//static Middleware
app.use(express.static(path.join(__dirname, 'public')));


// start running the server by listening to the incoming HTTP Request
app.listen(PORT, () => {
  console.log(' Server listening on: http://localhost:' + PORT);
})