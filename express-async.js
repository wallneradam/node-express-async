const
    Route = require('express/lib/router/route'),
    /** @type [] */
    methods = require('methods');

// To detect async functions
const
    AsyncFunction = (async () => {}).constructor;

/**
 * Catch all errors in the given async middleware and send forward with next()
 * @link https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
 * @param {function} afunc
 */
function asyncMiddleware(afunc) {
    return (req, res, next) => {
        Promise
            .resolve(afunc(req, res, next))
            .catch(next);
    };
}

// Convert all async methods to asyncMiddleware
methods.forEach((method) => {
    let origMethod = Route.prototype[method];
    Route.prototype[method] = function(func, ...args) {
        // Convert async functions to async middleware to pass all unhandled errors to next
        if (func instanceof AsyncFunction) func = asyncMiddleware(func);
        origMethod.call(this, func, ...args);
    }
});
