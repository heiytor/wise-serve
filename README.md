<h1 align="center">Wise</h1>

Wise is a NodeJS framework that is designed to be fast, user-friendly, and easily configurable. It is built on top of Node.js http[s] to ensure speed and efficiency. The framework includes pre-built middleware to handle common errors, security, and performance issues. This allows developers to be more productive and streamline their workflow.

Wise was specifically created to simplify the process of building web servers. With standard error handling and pre-built middleware, developers can save time by avoiding repetitive tasks. For example, Wise provides a standard 404 response, validation of x-api-key, and middleware for decrypting a JWT, making it easy to incorporate these common features into a project.

# <h1 align="center">Usage</h1>
While Wise is not on NPM, you can clone this repository.

## Basic usage
Here's an example of how to use Wise to create a simple HTTP server that responds with a JSON object:
```typescript
import wise, { Request, Response } from 'wise-serve';

const app = wise();

app.route('GET', '/', (request: Request, response: Response) => {
  response.sendJSON({ working: true })
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
    http: { port: 8080 },
  },
  security: {
    headers: {
      // Reject any request without `'content-length': 'application/json'`
      contentType: ['application/json'],
      // Disable 'x-api-key' validation, this is the default functionality
      apiKey: [],
    },
  },
});

/** ...your logic */
```

The second way is to call the setOption method on an existing instance of the wise class:
```typescript
import wise from 'wise-serve';

const app = wise();

app.setOption({
  protocols: {
    http: { port: 8080 },
  },
  security: {
    headers: {
      contentType: ['application/json'],
      apiKey: [],
    },
  },
});

/** ...your logic */
```

You can check the full cofiguration object with the documentation [HERE](https://github.com/heiytor/wise-serve/blob/main/lib/interfaces/WiseOptions.ts).

## Middlewares
Wise is built around the concept of middlewares, which are functions that execute in the request-response processing pipeline. Currently, Wise does not support Express middlewares, but it provides three ways to add middlewares to your application.

Here's an example middleware function that logs a message and calls the next function in the pipeline:
```typescript
function exampleMiddleware(req: Request, res: Response, next: Next) {
  console.log('This is a middleware!');
  next();
}
```
### Global middlewares
You can add global middlewares that apply to all routes in your app. Here are two ways to add global middlewares:
```typescript
app.setOptions({ middlewares: [exampleMiddleware] });
```
```typescript
/**
 * wise.add() has an optional second parameter, this parameter might be
 * used to describe your middleware when you start your server.
 */
app.add(exampleMiddleware, 'exampleMiddleware');
```
### Local middlewares
Local middlewares only applys to a specific route. Here's an example:
```typescript
app.route('POST', '/', exampleMiddleware, (request: Request, response: Response) => {
  response.senJSON({ working: true })
})
```
When a request is made to this route, Wise will execute the global middlewares first, followed by the local middlewares, and finally the route handler function.

It's worth noting that the sequence of middleware execution is important, and can affect the behavior of your application. Therefore, it's important to carefully consider the order in which you add your middleware functions.

## Security
Even though some security features are ok, I want to add some features before I write this section.

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

You can customize error responses by providing your own error object in the errors property of the configuration object. Here's an example:
```typescript
app.setOptions({
  errors: {
    apiKey: {
      // The status code that server will sent in the response
      code: 401,
      // The body that server will sent in the response
      body: { status: "error", errors: ['Invalid "x-api-key" header.'] }
    }
  }
})
```

You also can check all standard errors [HERE](https://github.com/heiytor/wise-serve/blob/main/lib/defaults/errors.ts).

# <h1 align="center">TO-DO</h1>

- [ ] Add more security middlewares.
- [ ] Add a feature to only able security middlewares for designed routes.
- [ ] Add a CORS section under configuration object.
- [ ] Finish HTTPS server.
- [ ] Finish configurations for limitation.
- [ ] Destroy the wise.route() method into smaller methods.
- [ ] I don't know

# <h1 align="center">Disclaimer</h1>
Please note that this framework was created for the sole purpose of being a personal study material, which means that updates will only come based on how much I'm enjoying or learning from this code. I also DO NOT recommend using this framework for anything other than small servers that will be used only for testing.

Anyway, I tried to comment on the source code as much as possible to make it as readable as I could, but I'm still improving my English, so I apologize if there are any spelling errors.

If anyone is interested in the repository and would like to contribute with any bug reports or suggestions for additions, the issues tab is always open for you, and I will be more than happy to respond!

License: [LICENSE.TXT](https://github.com/heiytor/wise-serve/blob/main/LICENSE.txt)
