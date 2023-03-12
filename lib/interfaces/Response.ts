/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import { ServerResponse } from 'http';

/**
 * Interface representing the response that the server will send.
 * This interface extends the Node.js core ServerRespose interface.
 * @interface Response
 * @extends ServerResponse
 *
 * @example
 * import wise, { Request, Response } from 'wise-serve';
 *
 * const app = wise();
 *
 * app.route('/user/{id}', (req: Request, res: Response) => {
 *  // your logic above...
 *  res.status(201).json({ user })
 * });
 */
export interface Response extends ServerResponse {
  /**
   * Sends a JSON formatted response to the client.
   * @param {object} json - The object to be returned in the response body.
   * @example
   * response.json({ status: 'success' });
   */
  json: (json: object) => void;

  /**
   * Sends an HTML formatted response to the client.
   * @param {string} html - The HTML to be returned in the response body.
   * @example
   * response.html('<h1>My Website!</h1>');
   */
  html: (html: string) => void;

  /**
   * Sends custom headers to the client.
   * @param {object} headers - The headers to be sent in the response.
   * @example
   * response.headers({ 'my-header': 'my-header-value' })
   */
  headers: (headers: Record<string, string>) => Response;

  /**
   * Sets the HTTP status code for the response.
   * @param {number} status - The status code to be set.
   * @example
   * response.status(200);
   */
  status: (status: number) => Response;

  /**
   * TO-DO
   * redirect
   * cookie
   * clearCookie
   */
}
