
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

// const cors = require('cors');

const port = process.env.PORT || 3001

// ----------
// Creating the application using express so that it can actually process requests
// ----------

const app = express();

// ----------npm
// BEGINNING OF MIDDLEWARE
// ----------

// Middleware functions (preceded by app.use) are run EVERY time a server receives a request of any type.

app.use(logger('dev')); // this just logs the request to the console (using a package called morgan)
app.use(express.json()); // this turns the body of the request into JSON so that we can actually do stuff with it
// app.use(cors());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); // this uses the favicon package to make sure the react site is showing the right favicon
// app.use(express.static(path.join(__dirname, 'build'))); // this points the react app to the server's "build" folder so it knows where to get the frontend code from.

// ----------
// END OF MIDDLEWARE
// ----------

// ----------
// ROUTES START HERE
// ----------

app.use('/api/users', require('./routes/api/users'));

const userRouter = require('./routes/api/users');
app.use('/user', userRouter);

const blogpostRouter = require('./routes/api/blogpost');
app.use('/blogpost', blogpostRouter);

const commentRouter = require('./routes/api/comment');
app.use('/comments', commentRouter);

const likeRouter = require('./routes/api/like');
app.use('/like', likeRouter);

// const commentRouter = require('./routes/comments');
// app.use('/comment', commentRouter);
// This app.use is a little different because it takes *two* arguments, the first of which is a string. Since it is a string, it knows that it needs to send any request that starts with that string to the file that is put in the second argument slot.

// ----------

// Create Read Update Destroy routes go here (Index, Show, Create, Update, Delete) -- (New and Edit go on the front end (And kind of Index and Show))

// Index and Show on the express server grab the data from the database that's needed and send it to the front end to be rendered there.

// ----------

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });
app.get('/', (req, res) => {
  res.status(200).json({
    message: "HI JERICO"
  });
});
// This is your *default* route. If the route being received does not match any other route that exists on the server, it sends it back information about the frontend React App and renders it to the page. This is why it is put at the very end, because if it does not match anything else, it knows to do this.

// ----------

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

// tells the server that the API is running on to open the port that we specified at the very beginning of the file and run the API on that port.


