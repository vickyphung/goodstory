1. Set up Server/Express app, 
    touch server.js
    npm init -y
    npm i express morgan dotenv mongoose cors axios
    npm i serve-favicon
    At the top of server.js- require the modules, create the Express app, mount morgan (logging middleware) and express.json() (middleware that processes JSON data sent in the AJAX request and adds it to the req.body).
1. Test Express server, node server.js
2. mkdir config routes models controllers
3. Set up MongoDB
    create cluster/project, make sure there's a user and password, allow i.p access from anywhere: 0.0.0.0/0, copy connection string
4. touch .env, MONGO_URI=
5. Set up Mongoose, config/database.js:
6. Require in server.js :
    require('dotenv').config();
    require('./config/database'); 
7.  Create Schema/Model
8.  Create Routes
    HTTP Requests/CRUD routes 
    requires models and controllers/middleware
9.  Add Routes to server.js
   
    1. app.use('/api/users', require('./routes/api/users'));
    --or--
    2. const userRouter = require('./routes/users');
       server.use('/user', userRouter);

10. Controllers - middleware, JWT stuff
11. cors
    in server.js: 
        const cors = require('cors');
        server.use(cors());

JWT
npm i bcrypt (jwtsimple/jsonwebtoken)


Client
create-react-app
npm run build
	  "proxy": "http://localhost:3001"
npm start
npm i axios, dotenv, react-router-dom
index.js - browser router
    import { BrowserRouter } from 'react-router-dom';
app.js - routes
    import { Routes, Route } from 'react-router-dom'
mkdir componenets, pages, utilities

Deploy
heroku
    config vars - .env variables
    buildpack - heroku/nodejs. makes app usable with express. links heroku to express
netlify
    npm run build - in your react app, connect your github to your netlify account, and drag and drop the build folder into your netlify to create the site.
