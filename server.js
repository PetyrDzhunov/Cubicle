const express = require('express');
const config = require('./config/config');
const app = express();
const routes = require('./routes');

require('./config/express')(app); // returns a function which we pass our app as a parameter and invoke it 
require('./config/mongoose')(app); // returns a function which we pass our app as a parameter and invoke it 
app.use(routes); // routes-middleware;

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`))