const express = require('express');
const config = require('./config/config');
const app = express();

require('./config/express')(app); // returns a function which we pass our app as a parameter and invoke it 


app.get('/', (req, res) => {
    res.render('home', { layout: false })
})

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`))