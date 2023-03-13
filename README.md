<h1 align="center">Wise</h1>

Wise is a NodeJS framework that simplifies the web server building process for developers. It was created with the goal of increasing productivity and streamlining workflows. To ensure speed and efficiency, it is built on top of Node.js http(s). The framework comes with pre-built middleware that handles common errors, security, and performance issues, saving developers time and allowing them to avoid repetitive tasks. With standard error handling and pre-built middleware, Wise provides a standard 404 response, validation of x-api-key, and middleware for decrypting a JWT, making it easy to incorporate these common features into a project.

# <h1 align="center">Getting started</h1>
! **Note: all code above is written using Typescript**
## Installation
NPM:
```bash
npm install wise-serve
```
Yarn:
```bash
yarn add wise-serve
```
## Basic usage:
To import Wise and create a simple HTTP server that responds with a JSON:
```typescript
import wise, { Request, Response } from 'wise-serve';

const app = wise();

app.route('GET', '/', (request: Request, response: Response) => {
  response.json({ working: true })
})

// Without any additional configuration, Wise starts the HTTP server on port 80
app.start()
```

## Configuration
Wise is self configurable, but, you can configure your Wise instance in two ways. The first way is to pass an options object when creating a new instance of the wise class:
```typescript
import wise from 'wise-serve';

const app = wise({
  protocols: {
    http: {
      // Enables HTTP server. this is the default functionality.
      enabled: true,
      // Make the HTTP server listen on port 8080.
      port: 8080
    },
  },
  headers: {
    /**
     * Disables `content-type` validation, this is the default functionality for
     * all headers.
    */
    contentType: {
      routes: [],
      values: [],
    },
    /**
     * Enables 'x-api-key' validation to all routes.
     */
    apiKey: {
      routes: ['*'],
      values: ['4eafe863-894b-49b7-97fb-a3e318892bd4'],
    },
    /**
     * Enables custom header `X-Auth-User` to /admin directory.
     */
    custom: [
      { 'X-Auth-User': {
        routes: ['/admin'],
        values: ['admin'] },
      },
    ]
  },
  cors: {
    // UNDER CONSTRUCTION
  },
  limits: {
    // UNDER CONSTRUCTION
  }
});

/** ...your logic */
```

The second way is to call the setOption method on an existing instance of the wise class:
```typescript
import wise from 'wise-serve';

const app = wise();

app.setOption({ /** configuration object here */ });

/** ...your logic */
```

You can check the full cofiguration object with the documentation [HERE](https://github.com/heiytor/wise-serve/blob/main/lib/interfaces/WiseOptions.ts).

___

## Middlewares
Wise is built around the concept of middlewares, which are functions that execute in the request-response processing pipeline. Currently, Wise does not support Express middlewares, but it provides three ways to add middlewares to your application.

Here's an example middleware function that logs a message and calls the next function in the pipeline:
```typescript
function exampleMiddleware(req: Request, res: Response, next: Next) {
  console.log('This is a middleware!');
  next();
}
```

You can add middlewares that apply to all routes:
```typescript
app.setOptions({ middlewares: [exampleMiddleware, /*...*/] });
```
```typescript
/**
 * wise.add() has an optional second parameter, this parameter might be
 * used to describe your middleware when you start your server.
 */
app.add(exampleMiddleware, 'Middleware that logs a "This is a middleware!".');

```
To add middlewares that only applys to a specific route:
```typescript
app.route('POST', '/', exampleMiddleware, (request: Request, response: Response) => {
  response.senJSON({ working: true })
})
```

When a request is made, Wise will follow this step:
Global middlewares -> local middlewares -> route action.

___

## Errors
Wise comes with built-in error handling to catch common errors and provide appropriate responses. All error messages follow a standard format:
```JSON
{
  "status": "error",
  "errors": [
    // all specifics errors will be here
  ]
}
```

You can customize the error responses by providing your own error object in the errors property of the configuration object. Here's an example:
```typescript
app.setOptions({
  errors: {
    apiKey: {
      // The status code that Wise will sent in the response
      code: 401,
      // The body that Wise will sent in the response
      body: { status: "error", errors: ['Invalid "x-api-key" header.'] }
    }
  }
})
```

You also can check all standard errors [HERE](https://github.com/heiytor/wise-serve/blob/main/lib/defaults/errors.ts).

# <h1 align="center">TO-DO</h1>

- [x] Add a feature to only able security middlewares for designed routes.
- [x] Add custom security headers.
- [ ] Add more security middlewares.
- [ ] Add a CORS section under configuration object.
- [ ] Add compatibility with express middlewares
- [ ] Finish HTTPS server.
- [ ] Finish configurations for limits.
- [ ] Destroy the wise.route() method into smaller methods.

___

License: [LICENSE.TXT](https://github.com/heiytor/wise-serve/blob/main/LICENSE.txt)
