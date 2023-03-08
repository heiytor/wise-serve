/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as HTTP from 'http';
import * as Defaults from './defaults';
import * as Errors from './errors';
import * as Interfaces from './interfaces';
import * as Types from './types';
import * as Middlewares from './middlewares';

export class Wise {
  #httpServe: any;

  #httpsServe: any;

  #routes: Interfaces.Routes = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
    ALL: {},
  };

  #middlewares: Array<Types.Route.RouteHandler> = [
    Middlewares.Enhancer.Request,
    (
      req: Interfaces.Request,
      res: Interfaces.Response,
      next: Interfaces.Next,
    ) => {
      const validations = Middlewares.Validate.All(
        req,
        res,
        this.#serveOptions,
      );
      if (validations === 1) return;
      next();
    },
    Middlewares.Enhancer.Response,
  ];

  #serveOptions: Interfaces.WisePrivateOptions = {
    env: 'development',
    protocols: Defaults.protocols,
    security: Defaults.security,
    errors: Defaults.errors,
    routes: this.#routes,
    middlewares: this.#middlewares,
  };

  #handleRequest(request: Interfaces.Request, response: Interfaces.Response) {
    try {
      let route: any = undefined;
      let index = 0;

      /**
       * Iterates in every regex pattern based on request method. I don't think it's too
       * much of a perfomance loss, however, maybe I'll come back here later and refactor this.
       */
      for (const regexPath in this.#routes[
        request.method as Types.Route.RequestMethods
      ]) {
        if (new RegExp(regexPath).test(request.url)) {
          route =
            this.#routes[request.method as Types.Route.RequestMethods][
              regexPath
            ];
          break;
        }
      }

      if (route === undefined) {
        if (!response.headersSent) {
          response.setHeader('Content-Type', 'application/json');
        }
        response.writeHead(this.#serveOptions.errors.invalidRoute.code);
        response.end(
          JSON.stringify(this.#serveOptions.errors.invalidRoute.body),
        );
        return;
      }

      /**
       * In fact, I couldn't think of a way to remove reqquest.parameters from the handler and put
       * inthe request enhancer. I'll be back here in the future, probably.
       */
      request.parameters = {};
      route.parameters.forEach((parameter: string, index: number) => {
        /**
         * When we use req.url.split('/'), index 0 is actually an empty string and the parameter
         * is at future index.
         * .split('?')[0] is to exlude query strings from the parameter
         */
        request.parameters[parameter] = request.url
          .split('/')
          [++index].split('?')[0];
      });
      // Exclude parameter when request.parameter[parameter] === parameter
      request.parameters = Object.fromEntries(
        Object.entries(request.parameters).filter(
          ([key, value]) => key !== value,
        ),
      );

      /**
       * Make a single array with global and local middlewares. Middlewaremust follow this
       * sequence for each request:
       * Request Enhancer -> Security (like limits and cors) ->  Response Enhancer -> Local (like are configured on route)
       */
      const middlewares = [...this.#middlewares, ...route.middlewares];

      /**
       * This function represents a recursive control flow to execute middlewares in sequence.
       * It calls each middleware with the request, response, and a reference to itself.
       * If there are no more middlewares to execute, it calls the route action with the
       * request, response.
       */
      const next = () => {
        const middleware = middlewares[index++];

        if (middleware) {
          middleware(request, response, next);
        } else if (route.action) {
          route.action(request, response);
        }
      };
      // executes the recursive next function
      next();

      return;
    } catch (err) {
      if (this.#serveOptions.env === 'development') console.error(err);

      if (!response.headersSent) {
        response.setHeader('Content-Type', 'application/json');
      }

      response.writeHead(this.#serveOptions.errors.default.code);
      response.end(JSON.stringify(this.#serveOptions.errors.default.body));

      return;
    }
  }

  constructor(private options?: Interfaces.WiseOptions) {
    if (options) this.setOptions(options);
  }

  get getOptions() {
    return this.#serveOptions;
  }

  public setOptions(options: Interfaces.WiseOptions) {
    for (const option in options) {
      if (!(option in this.#serveOptions)) {
        throw new Errors.Parameter.OptionDoesNotExist(option);
      }

      if (option === 'routes') {
        throw new Errors.Parameter.OptionCannotBeChanged(option);
      }
    }

    // TO-DO: make this with less if steatments
    if (options.middlewares) {
      this.#middlewares.push(...options.middlewares);
    }
    if (options.errors) {
      this.#serveOptions.errors = Object.assign(
        {},
        this.#serveOptions.errors,
        options.errors,
      );
    }
    if (options.security?.headers) {
      this.#serveOptions.security.headers = Object.assign(
        {},
        this.#serveOptions.security.headers,
        options.security.headers,
      );
    }
    if (options.security?.limits) {
      this.#serveOptions.security.limits = Object.assign(
        {},
        this.#serveOptions.security.limits,
        options.security.limits,
      );
    }
    if (options.protocols?.http) {
      this.#serveOptions.protocols.http = Object.assign(
        {},
        this.#serveOptions.protocols.http,
        options.protocols.http,
      );
    }
    if (options.protocols?.https) {
      this.#serveOptions.protocols.https = Object.assign(
        {},
        this.#serveOptions.protocols.https,
        options.protocols.https,
      );
    }
    if (options.env) {
      this.#serveOptions.env = options.env;
    }
    return;
  }

  public add(middleware: Types.Route.RouteHandler, name?: string): void {
    if (!middleware) {
      throw new Errors.Parameter.InsufficientFields();
    }

    if (name) {
      Object.defineProperty(middleware, 'name', { value: name });
    }

    this.#middlewares.push(middleware);
    this.#serveOptions.middlewares = this.#middlewares;

    return;
  }

  public route(
    method: Types.Route.RequestMethods,
    directory: string,
    ...actions: Array<Types.Route.RouteHandler>
  ): void {
    if (!method || !directory || !actions) {
      throw new Errors.Parameter.InsufficientFields();
    }

    if (!(method in this.#routes)) {
      throw new Errors.Route.InvalidMethod(method);
    }

    /**
     * "/" | "/..." -> true
     * ... -> false
     */
    if (!/^\/.*/.test(directory)) {
      throw new Errors.Route.InvaliDirectory(directory);
    }

    /**
     * "/users/" -> true
     * "/users" -> false
     */
    if (/^\/.*\/$/.test(directory)) {
      directory = directory.slice(0, -1);
    }

    const middlewares: Array<Types.Route.RouteHandler> = [];
    const action: Types.Route.RouteHandler =
      actions.pop() as Types.Route.RouteHandler;

    for (const h of actions) {
      if (typeof h === 'function') {
        middlewares.push(h);
      } else {
        throw new Errors.Route.InvalidMiddleware();
      }
    }

    const parameters: Array<string> = [];
    /**
     * We saved the directory as a regex pattern, this allows future search for
     * dynamic routes and query strings .
     */
    const routeSegments: Array<string> = [];
    const pathSegments = directory.split('/').slice(1);
    pathSegments.forEach((segment: string) => {
      /**
       * Convert curly brace enclosed directory to regex that matches any string
       * or leave it unchanged.
       */
      if (/^\{.*\}$/.test(segment)) {
        parameters.push(segment.replace(/\{/g, '').replace(/\}/g, ''));
        routeSegments.push('[^/]+');
      } else {
        parameters.push(`${segment}`);
        routeSegments.push(`${segment}`);
      }
    });

    /**
     * \\/?(\\?.*)? is the standard pattern for all urls ending:
     *  1. \\/? -> checks if there any "/" before the query strings (or at the urls ending).
     *  2. ([?][^/]*?)? -> checks if there any query string.
     */
    const pattern = `^\\/${routeSegments.join('\\/')}\\/?([?][^/]*?)?$`;
    // TO-DO: Accept query string in any route directory

    if (this.#routes[method][pattern]) {
      throw new Errors.Route.Conflicting(directory);
    }

    if (method === 'ALL') {
      for (const key in this.#routes) {
        this.#routes[key as Types.Route.RequestMethods][pattern] = {
          directory,
          parameters,
          middlewares,
          action,
        };
      }
      return;
    }
    this.#routes[method][pattern] = {
      directory,
      parameters,
      middlewares,
      action,
    };

    return;
  }

  public start(): void {
    const { http, https } = this.#serveOptions.protocols;
    if (http.enabled === false && https.enabled === false) {
      throw new Errors.Server.NoServerEnabled();
    }
    if (http.port === https.port) {
      throw new Errors.Server.ConflictingPorts();
    }
    if (http.enabled === true) {
      this.#httpServe = HTTP.createServer(
        this.#handleRequest.bind(this) as any,
      );
      this.#httpServe.listen(http.port, () => {
        if (this.#serveOptions.env === 'development') {
          // console.log(this.#serveOptions);
          // console.log(`\nHTTP -> port ${http.port}`);
          // console.log(`\nHTTPS -> port ${https.port}`);
        }
      });
    }
    if (https.enabled === true) {
      // this.#httpsServe = https.createServer(
      //   { cert: https.cert, key: https.key },
      //   this.#handleRequest.bind(this),
      // );
      // this.#httpsServe.listen(https.port, () => {});
    }
    return;
  }
}
