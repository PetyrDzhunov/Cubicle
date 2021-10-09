function errorHandler(err, req, res, next) {
    if (!err) return;

    res.status(500).render('/products', { error: err });
};

module.exports = errorHandler;