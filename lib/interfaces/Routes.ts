/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Types from '../types';

export interface Routes {
  GET: Types.Route.RouteMap;
  POST: Types.Route.RouteMap;
  PUT: Types.Route.RouteMap;
  PATCH: Types.Route.RouteMap;
  DELETE: Types.Route.RouteMap;
  ALL: Types.Route.RouteMap;
}
