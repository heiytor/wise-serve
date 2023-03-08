/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Interfaces from '../interfaces';

/**
 * Enhancer is a class that provides static methods to enhance the Request and Response objects.
 */
export class Enhancer {
  /**
   * A middleware function that enhances the Request objects by adding a useful methods to
   * next actions.
   *
   * @param {Interfaces.Request} request - Request object.
   * @param {Interfaces.Response} response - Response object.
   * @param {Interfaces.Next} next - The callback function that passes control to the next middleware function.
   *
   * @returns {void} Call the next action instead return anything.
   */
  public static Request(
    request: Interfaces.Request,
    response: Interfaces.Response,
    next: Interfaces.Next,
  ): any {
    // reques.body & request.stringBody
    let data = '';
    request.on('data', (chunk) => {
      data += chunk.toString();
    });

    request.on('end', () => {
      try {
        request.stringBody = data;
        request.body = JSON.parse(data);
      } catch (err) {
        request.stringBody = '';
        request.body = {};
      }
      next();
      return response;
    });

    // request.query
    const queryString = request.url.split('/').pop()!.split('?')[1];

    const queryPairs = (queryString ?? '')
      .split('&')
      .map((pair) => pair.split('='));

    request.query = queryPairs.reduce(
      (params: Record<string, string | Array<string>>, [key, value]) => {
        if (value !== undefined && value.includes(',')) {
          params[key] = value.split(',').map(decodeURIComponent);
        } else {
          params[key] = decodeURIComponent(value);
        }
        return params;
      },
      {},
    );

    // request.parameters
    /**
     * In fact, I couldn't think of a way to remove request.parameters from the handler and put
     * in the request enhancer. I'll be back here in the future, probably.
     */

    // request.cookies

    // All above is taken away from headers
    request.host = request.headers.host || undefined;
    request.ip = request.headers['x-forwarded-for'] || undefined;
    request.protocol = request.headers['x-forwarded-proto'] || undefined;
    request.secure = request.protocol === 'https';

    next();
    return;
  }

  /**
   * A middleware function that enhances the Response objects by adding a useful attributes
   * to next actions.
   *
   * @param {Interfaces.Request} request - The Request object.
   * @param {Interfaces.Response} response - The Response object.
   * @param {Interfaces.Next} next - The callback function that passes control to the next middleware function.
   *
   * @returns {void} Call the next action instead return anything.
   */
  public static Response(
    request: Interfaces.Request,
    response: Interfaces.Response,
    next: Interfaces.Next,
  ): any {
    response.sendJSON = function sendJSON(json: object): void {
      if (!response.headersSent) {
        response.setHeader('Content-Type', 'application/json');
      }
      response.end(JSON.stringify(json));

      return;
    };

    response.sendHTML = function sendHTML(html: string): void {
      if (!response.headersSent) {
        response.setHeader('Content-Type', 'text/html');
      }
      response.end(html);

      return;
    };

    response.sendHeaders = function sendHeaders(
      headers: Record<string, string>,
    ): Interfaces.Response {
      for (const header in headers) {
        response.setHeader(header, headers[header]);
      }

      return response;
    };

    response.code = function code(code: number): Interfaces.Response {
      response.statusCode = code;

      return response;
    };

    next();
    return;
  }
}
