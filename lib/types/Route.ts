/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Interfaces from '../interfaces';

export type RouteMap =
  | Record<
      string,
      {
        directory: string;
        parameters: Array<string>;
        middlewares: Array<RouteHandler>;
        action: RouteHandler;
      }
    >
  | Record<string | number | symbol, never>;

export type RouteHandler = (
  request: Interfaces.Request,
  response: Interfaces.Response,
  next: Interfaces.Next,
) => void | Interfaces.Response | Promise<void | Interfaces.Response>;

export type RequestMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'ALL';
