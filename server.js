const express = require('express');
const config = require('./config');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

require('./config/express')(app); // returns a function which we pass our app as a parameter and invoke it 
require('./config/mongoose')(app); // returns a function which we pass our app as a parameter and invoke it 
app.use(routes); // routes-middleware;
app.use(errorHandler);
app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`))