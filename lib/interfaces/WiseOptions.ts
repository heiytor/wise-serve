/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Types from '../types';

export interface WiseOptions {
  /**
   * Enviroment that wise will run.
   *
   * UNDER CONSTRUCTION
   */
  env?: 'development' | 'production';
  verbose?: number;
  /**
   * The protocols object contains the configuration for
   * HTTP and HTTPS servers.
   */
  protocols?: {
    /**
     * Configuration for HTTP server.
     */
    http?: {
      /**
       * Turn on/off HTTP server.
       * Default: `true`
       * @type { boolean }
       */
      enabled?: boolean;

      /**
       * Port that the HTTP server will listen.
       * Default: `80`
       * @type { number }
       */
      port?: number;
    };
    /**
     * Configuration for HTTPS server.
     */
    https?: {
      /**
       * Turn on/off HTTPS server.
       * Default: `false`
       * @type { boolean }
       */
      enabled?: boolean;

      /**
       * Port that the HTTPS server will listen.
       * Default: `443`
       * @type { number }
       */
      port?: number;

      /**
       * Path to cert file.
       * @type { string }
       * @example
       * wise.setOptions({
       *  protocols: { https: { cert: 'path/to/cert/file' } },
       * })
       */
      cert?: string;

      /**
       * Path to key file.
       * @example
       * wise.setOptions({
       *  protocols: { https: { key: 'path/to/file/file' } },
       * })
       */
      key?: string;
    };
  };

  /**
   *
   */
  security?: {
    /**
     * Allowed headers.
     */
    headers?: {
      /**
       * An array specifying the allowed `x-api-key` header values.
       *
       * By default, the `x-api-key` header is set to `['*']`, which allows any value for the `x-api-key` header.
       * If you want to restrict the allowed values, you can set this attribute to an array of strings that represent
       * the allowed values for the `x-api-key` header. When a request is received, Wise will verify that the `x-api-key`
       * header is present and contains one of the accepted values.
       *
       * @example
       *
       * // To only allow specific values for the `x-api-key` header:
       * Wise.security.headers.apiKey = ['my-api-key-1', 'my-api-key-2'];
       * @type { Array<string> }
       */
      apiKey?: Array<string>;

      /**
       * An array specifying the allowed `content-type` header values.
       *
       * By default, the `content-type` header is set to `['*']`, which allows any value for the `content-type` header.
       * If you want to restrict the allowed values, you can set this attribute to an array of strings that represent
       * the allowed values for the `content-type` header. When a request is received, Wise will verify that the `content-type`
       * header is present and contains one of the accepted values.
       *
       * @example
       *
       * // To only allow specific values for the `content-type` header:
       * Wise.security.headers.contentType = ['application/json', 'text/plain'];
       *
       * @type { Array<string> }
       */
      contentType?: Array<string>;

      /**
       * By default, the `content-length` header is set to `-1`, which allows any value for the `content-length` header.
       * If you want to restrict the allowed value, you can set this attribute to a number that represent
       * the allowed values for the `content-length` header. When a request is received, Wise will verify that the `content-length`
       * header is present and is less than the accepted value.
       *
       * @example
       *
       * // Only allow `content-length` values of 1000 or less
       * Wise.security.headers.contentLength = 1000;
       *
       * @type { number }
       */
      contentLength?: number;

      /**
       * To set up custom headers, assign an array of key-value pairs to the `custom` property. Each key in the array
       * represents a custom header name, and its corresponding value is an array of accepted values for that header.
       * When a request is received, Wise will verify that the header is present and contains one of the accepted values.
       *
       * @example
       *
       * // To allow any value for the `X-Auth-Risk` header:
       * Wise.security.headers.custom = [{ 'X-Auth-Risk': ['*'] }];
       *
       * // To only allow specific values for the `X-Auth-User` header:
       * Wise.security.headers.custom = [{ 'X-Auth-User': ['admin', 'editor'] }];
       *
       * // To require multiple headers to be present:
       * Wise.security.headers.custom = [
       *   { 'X-Auth-User': ['admin', 'editor'] },
       *   { 'X-Auth-Role': ['admin', 'superuser'] },
       * ];
       *
       * @type { Array<Record<string, Array<string>>> }
       */
      custom?: Array<Record<string, Array<string>>>;
    };
    limits?: {
      keepAliveTimeout?: number;
      sizeLimit?: string;
    };
  };

  /**
   * Wise will attempt to catch all standard server errors and send a JSON response to the requester.
   * You can provide custom objects with a status code and body to define custom error responses.
   * @example
   * {
   *  code: 404, // statusCode as number
   *  body: { status: 'error', errors: [...errors] } // Response body as Record<string, unknown>
   * }
   */
  errors?: {
    /**
     * Response for `unexpected` errors. Default response:
     * @example
     * {
     *  code: 500
     *  body: { status: 'error', errors: ['Unexpected error. Try again later or contact support.'] }
     * }
     */
    default?: Types.Server.ServerError;

    /**
     * Response for invalid `content-type`, set `Wise.security.headers.apiKey = [*]` to avoid this. Default response:
     * @example
     * {
     *  code: 401
     *  body: { status: 'error', errors: ['Invalid x-api-key header.'] }
     * }
     */
    invalidApiKey?: Types.Server.ServerError;

    /**
     * Response for invalid `x-api-key`, set `Wise.security.headers.apiKey = -1` or less to avoid this. Default response:
     * @example
     * {
     *  code: 415
     *  body: { status: 'error', errors: ['Invalid content-type header.'] }
     * }
     */
    invalidContentType?: Types.Server.ServerError;

    /**
     * Response for invalid `content-length`, set `Wise.security.headers.contentLength = -1` or less to avoid this. Default response:
     * @example
     * {
     *  code: 415
     *  body: { status: 'error', errors: ['Invalid content-length header.'] }
     * }
     */
    invalidContentLength?: Types.Server.ServerError;

    /**
     * Response for `routes not found`. Default response:
     * @example
     * {
     *  code: 404
     *  body: { status: 'error', errors: ['Invalid route.'] }
     * }
     */
    invalidRoute?: Types.Server.ServerError;

    /**
     * Response for invalid `custom headers`. Default response:
     * @example
     * {
     *  code: 400,
     *  body: {
     *   status: 'error',
     *   errors: [
     *      `Invalid "${YOUR_CUSTOM_HEADER_1}" header.`,
     *      `Invalid "${YOUR_CUSTOM_HEADER_2}" header.`,
     *      // ...more header errors here
     *   ],
     *  },
     * }
     */
    invalidCustomHeader: (
      errors: Array<string>,
    ) => Types.Server.ServerError | Types.Server.ServerError;
  };

  middlewares?: Array<Types.Route.RouteHandler>;
}
