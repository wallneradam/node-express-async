# express-async
Automatically handles unhandled async middleware errors by sending them to next() function.
This way you don't need and you won't forget to try-catch all middlewares for default 
error handling.

## Usage

You need to *require* the module (only) once by application for example in app.js:
```javascript 1.8
require("express-async");
```

## How it works

It modifies Route object of Express, to every middleware which has async prefix 
will be wrapped by asyncMiddleware function. The wrapper creates a Promise, which if 
rejected calls the next function.

More details here: 
https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
