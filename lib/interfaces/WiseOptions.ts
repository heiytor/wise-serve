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

  headers: {
    /**
     * An object specifying the allowed values for `x-api-key` header values and which routes will validate this.
     *
     * By default, the `x-api-key` values is set to `[]`, which avoids the validation.
     * If you want to restrict the allowed values, you can set this attribute to an array of strings that represent
     * the allowed values for the `x-api-key` header.
     *
     * `routes` is an array containing wich routes will check the `x-api-key` header. Leave it blank to avoid
     * the verification, set to `['*']` to force all routes to verify or specify wich routes will make this.
     *
     * @example
     *
     * // To force all routes to verify the `x-api-key` and set two values:
     * wise.setOption({
     *  security: {
     *    apiKey: { routes: ['*'], values: ['my-api-key-1', 'my-api-key-2'] },
     *  },
     * });
     *
     * @type { routes: Array<string>; values: Array<string> }
     */
    apiKey?: { routes: Array<string>; values: Array<string> };
    /**
     * An object specifying the allowed values for `content-type` header values and which routes will validate this.
     *
     * By default, the `content-type` values is set to `[]`, which avoids the validation.
     * If you want to restrict the allowed values, you can set this attribute to an array of strings that represent
     * the allowed values for the `content-type` header.
     *
     * `routes` is an array containing wich routes will check the `content-type` header. Leave it blank to avoid
     * the verification, set to `['*']` to force all routes to verify or specify wich routes will make this.
     *
     * @example
     *
     * // To force all routes to verify if the `content-type` is application/json:
     * wise.setOption({
     *  security: {
     *    contentType: { routes: ['*'], values: ['application/json'] },
     *  },
     * });
     *
     * @type { routes: Array<string>; values: Array<string> }
     */
    contentType?: { routes: Array<string>; values: Array<string> };
    /**
     * An object specifying the allowed values for `content-length` header values and which routes will validate this.
     *
     * By default, the `content-length` values is set to `[]`, which avoids the validation.
     * If you want to restrict the allowed values, you can set this attribute to an array with one index that contains
     * the allowed values for the `content-length` header.
     *
     * `routes` is an array containing wich routes will check the `content-length` header. Leave it blank to avoid
     * the verification, set to `['*']` to force all routes to verify or specify wich routes will make this.
     *
     * @example
     *
     * // To force all routes to verify if the `content-length` is less than 1000:
     * wise.setOption({
     *  security: {
     *    contentLength: { routes: ['*'], values: ['1000'] },
     *  },
     * });
     *
     * @type { routes: Array<string>; values: Array<string> }
     */
    contentLength?: { routes: Array<string>; values: Array<string> };
    /**
     * To set up custom headers validation, assign an array of key-value pairs to the `custom` property.
     *
     * Each key in the array represents a custom header name, and its corresponding value is an array of accepted values for that header
     * and wich routes will check this header
     *
     * @example
     *
     * // To only allow specific values for the `X-Auth-User` header for all routes:
     * wise.setOptions({
     *  security: {
     *    headers: {
     *      custom: [
     *        { 'X-Auth-Risk': { routes: ['*'], values: ['3d1685cc-9d80-4641-8b19-c766c8848639'] } }
     *      ]
     *    }
     *  }
     * })
     *
     * // To require multiple headers to be present:
     * wise.setOptions({
     *  security:{
     *    headers: {
     *      custom: [
     *        { 'X-Auth-User': { routes: ['*'],  values: ['admin', 'editor', 'user'] },
     *        { 'X-Auth-Role': { routes: ['admin'], values: ['admin'] },
     *      ],
     *    },
     *  },
     * });
     *
     * @type Array<Record<string, { routes: Array<string>; values: Array<string> }>>
     */
    custom?: Array<Record<string, any>>;
  };

  /**
   *
   */
  // security?: {
  //   /**
  //    * This object represents what headers will be checked when Wise receives a request. You can configure which
  //    * values will be accepted and wich routes will check these values.
  //    */
  //   headers?: {
  //     /**
  //      * An object specifying the allowed values for `x-api-key` header values and which routes will validate this.
  //      *
  //      * By default, the `x-api-key` values is set to `[]`, which avoids the validation.
  //      * If you want to restrict the allowed values, you can set this attribute to an array of strings that represent
  //      * the allowed values for the `x-api-key` header.
  //      *
  //      * `routes` is an array containing wich routes will check the `x-api-key` header. Leave it blank to avoid
  //      * the verification, set to `['*']` to force all routes to verify or specify wich routes will make this.
  //      *
  //      * @example
  //      *
  //      * // To force all routes to verify the `x-api-key` and set two values:
  //      * wise.setOption({
  //      *  security: {
  //      *    apiKey: { routes: ['*'], values: ['my-api-key-1', 'my-api-key-2'] },
  //      *  },
  //      * });
  //      *
  //      * @type { routes: Array<string>; values: Array<string> }
  //      */
  //     apiKey?: { routes: Array<string>; values: Array<string> };

  //     /**
  //      * An object specifying the allowed values for `content-type` header values and which routes will validate this.
  //      *
  //      * By default, the `content-type` values is set to `[]`, which avoids the validation.
  //      * If you want to restrict the allowed values, you can set this attribute to an array of strings that represent
  //      * the allowed values for the `content-type` header.
  //      *
  //      * `routes` is an array containing wich routes will check the `content-type` header. Leave it blank to avoid
  //      * the verification, set to `['*']` to force all routes to verify or specify wich routes will make this.
  //      *
  //      * @example
  //      *
  //      * // To force all routes to verify if the `content-type` is application/json:
  //      * wise.setOption({
  //      *  security: {
  //      *    contentType: { routes: ['*'], values: ['application/json'] },
  //      *  },
  //      * });
  //      *
  //      * @type { routes: Array<string>; values: Array<string> }
  //      */
  //     contentType?: { routes: Array<string>; values: Array<string> };

  //     /**
  //      * An object specifying the allowed values for `content-length` header values and which routes will validate this.
  //      *
  //      * By default, the `content-length` values is set to `[]`, which avoids the validation.
  //      * If you want to restrict the allowed values, you can set this attribute to an array with one index that contains
  //      * the allowed values for the `content-length` header.
  //      *
  //      * `routes` is an array containing wich routes will check the `content-length` header. Leave it blank to avoid
  //      * the verification, set to `['*']` to force all routes to verify or specify wich routes will make this.
  //      *
  //      * @example
  //      *
  //      * // To force all routes to verify if the `content-length` is less than 1000:
  //      * wise.setOption({
  //      *  security: {
  //      *    contentLength: { routes: ['*'], values: ['1000'] },
  //      *  },
  //      * });
  //      *
  //      * @type { routes: Array<string>; values: Array<string> }
  //      */
  //     contentLength?: { routes: Array<string>; values: Array<string> };

  //     /**
  //      * To set up custom headers validation, assign an array of key-value pairs to the `custom` property.
  //      *
  //      * Each key in the array represents a custom header name, and its corresponding value is an array of accepted values for that header
  //      * and wich routes will check this header
  //      *
  //      * @example
  //      *
  //      * // To only allow specific values for the `X-Auth-User` header for all routes:
  //      * wise.setOptions({
  //      *  security: {
  //      *    headers: {
  //      *      custom: [
  //      *        { 'X-Auth-Risk': { routes: ['*'], values: ['3d1685cc-9d80-4641-8b19-c766c8848639'] } }
  //      *      ]
  //      *    }
  //      *  }
  //      * })
  //      *
  //      * // To require multiple headers to be present:
  //      * wise.setOptions({
  //      *  security:{
  //      *    headers: {
  //      *      custom: [
  //      *        { 'X-Auth-User': { routes: ['*'],  values: ['admin', 'editor', 'user'] },
  //      *        { 'X-Auth-Role': { routes: ['admin'], values: ['admin'] },
  //      *      ],
  //      *    },
  //      *  },
  //      * });
  //      *
  //      * @type Array<Record<string, { routes: Array<string>; values: Array<string> }>>
  //      */
  //     custom?: Array<Record<string, any>>;
  //   };

  //   limits?: {
  //     keepAliveTimeout?: number;
  //     sizeLimit?: string;
  //   };
  // };

  /**
   * Wise will attempt to catch all standard server errors and send a JSON response to the requester.
   * You can provide custom objects with a status code and body to define custom errors responses.
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
    default?: Types.Server.ErrorResponse;

    /**
     * Response for invalid `content-type`, set `Wise.security.headers.apiKey = [*]` to avoid this. Default response:
     * @example
     * {
     *  code: 401
     *  body: { status: 'error', errors: ['Invalid x-api-key header.'] }
     * }
     */
    invalidApiKey?: Types.Server.ErrorResponse;

    /**
     * Response for invalid `x-api-key`, set `Wise.security.headers.apiKey = -1` or less to avoid this. Default response:
     * @example
     * {
     *  code: 415
     *  body: { status: 'error', errors: ['Invalid content-type header.'] }
     * }
     */
    invalidContentType?: Types.Server.ErrorResponse;

    /**
     * Response for invalid `content-length`, set `Wise.security.headers.contentLength = -1` or less to avoid this. Default response:
     * @example
     * {
     *  code: 415
     *  body: { status: 'error', errors: ['Invalid content-length header.'] }
     * }
     */
    invalidContentLength?: Types.Server.ErrorResponse;

    /**
     * Response for `routes not found`. Default response:
     * @example
     * {
     *  code: 404
     *  body: { status: 'error', errors: ['Invalid route.'] }
     * }
     */
    invalidRoute?: Types.Server.ErrorResponse;

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
    ) => Types.Server.ErrorResponse | Types.Server.ErrorResponse;
  };

  middlewares?: Array<Types.Route.RouteHandler>;
}
