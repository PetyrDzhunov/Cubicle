const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle'
    },

    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://PetyrDzhunov:passwordHere@cubicles.hdzkr.mongodb.net/cubicle?retryWrites=true&w=majority'
    },
};

module.exports = config[process.env.NODE_ENV.trim()]