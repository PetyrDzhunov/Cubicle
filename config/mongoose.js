const mongoose = require('mongoose');
const config = require('./config');

module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (err) => console.log(err));
    db.once('open', () => { console.log('Database Connected :)') });
};