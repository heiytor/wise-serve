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
 *  res.code(201).sendJSON({ user })
 * });
 */
export interface Response extends ServerResponse {
  /**
   * Sends a JSON formatted response to the client.
   * @param {object} data - The object to be returned in the response body.
   * @example
   * response.sendJSON({ status: 'success' });
   */
  sendJSON: (data: object) => void;

  /**
   * Sends an HTML formatted response to the client.
   * @param {string} html - The HTML to be returned in the response body.
   * @example
   * response.sendHTML('<h1>My Website!</h1>');
   */
  sendHTML: (html: string) => void;

  /**
   * Sends custom headers to the client.
   * @param {object} headers - The headers to be sent in the response.
   */
  sendHeaders: (headers: Record<string, string>) => Response;

  /**
   * Sets the HTTP status code for the response.
   * @param {number} code - The status code to be set.
   * @example
   * response.code(200);
   */
  code: (code: number) => Response;

  /**
   * TO-DO
   * redirect: um método que redireciona o cliente para outra URL.
   * cookie: um método para definir cookies no cabeçalho da resposta.
   * clearCookie: um método para remover cookies definidos anteriormente no cabeçalho da resposta.
   */
}
