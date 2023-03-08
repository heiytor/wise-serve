/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import { IncomingMessage } from 'http';

/**
 * Interface representing a client request received by a server.
 * This interface extends the Node.js core IncomingMessage interface.
 *
 * @interface Request
 * @extends {IncomingMessage}
 *
 * @example
 * import wise, { Request, Response } from 'wise-serve';
 *
 * const app = wise();
 *
 * app.route('/user/{id}', (req: Request, res: Response) => {
 *  const id = req.params.id;
 *  const userAgent = req.headers['user-agent'];}
 *  // your logic bellow...
 * });
 *
 */
export interface Request extends IncomingMessage {
  /**
   * The full URL of the request.
   * @type `string`
   * @example
   * "localhost:8080"
   */
  host: string | Array<string> | undefined;

  /**
   * The path part of the URL, starting after the first forward slash.
   * @type `string`
   * @example "/user"
   */
  url: string;

  /**
   * The parsed body of the request as a JavaScript object.
   * @type `Record<string, unknown>`
   * @example { username: "john.doe", password: "password123" }
   */
  body: Record<string, unknown>;

  /**
   * The raw body of the request as a string.
   * @type: `string`
   * @example "{ username=john.doe, password=password123 }"
   */
  stringBody: string;

  /**
   * The HTTP method used in the request.
   * @type `string | undefined`
   * @example"GET"
   */
  method: string | undefined;

  /**
   * The headers sent with the request, as an object with keys and values.
   * The keys are the header names and the values are either a string or an array of strings.
   * @type `Record<string, string>`
   * @example
   * {
   *  "Accept": "text/html",
   *  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
   * }
   */
  headers: Record<string, string>;

  /**
   * The query parameters in the request URL, as an object with keys and values.
   * The keys are the parameter names and the values are the parameter values.
   * @type `Record<string, string | Array<string>>`
   * @example
   * {
   *   sort: "desc",
   *   page: "2",
   *   merge: "true",
   * }
   */
  query: Record<string, string | Array<string>>;

  /**
   * The route parameters in the request URL, as an object with keys and values.
   * The keys are the parameter names and the values are the parameter values.
   * @type `Record<string, string>`
   * @example { id: "1234" }
   */
  parameters: Record<string, string>;

  /**
   * The cookies sent with the request, as an object with keys and values.
   * The keys are the cookie names and the values are the cookie values.
   * @type `Record<string, string>`
   * @example { "sessionId": "abc123" }
   */
  cookies: Record<string, string> | undefined;

  /**
   * The IP address of the client that made the request.
   * @type `string | Array<string> | undefined`
   * @example "192.168.1.1"
   */
  ip: string | Array<string> | undefined;

  /**
   * The protocol used in the request (e.g. "http", "https").
   * @type `string | Array<string>`
   * @example "http"
   */
  protocol: string | Array<string> | undefined;

  /**
   * Whether the request was made over SSL/TLS.
   * @type `boolean`
   * @example true
   */
  secure: boolean;
}
