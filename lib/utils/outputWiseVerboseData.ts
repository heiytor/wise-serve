/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Interfaces from '../interfaces';
import * as Types from '../types';

function logRouteMap(route: Interfaces.Routes, verbose: number): object {
  const routes: any = {
    GET: verbose === 2 ? {} : [],
    POST: verbose === 2 ? {} : [],
    PUT: verbose === 2 ? {} : [],
    PATCH: verbose === 2 ? {} : [],
    DELETE: verbose === 2 ? {} : [],
    ALL: verbose === 2 ? {} : [],
  };
  for (const method in route) {
    for (const regexPattern in route[method as Types.Route.RequestMethods]) {
      const info = route[method as Types.Route.RequestMethods][regexPattern];
      if (verbose === 2) {
        routes[method][info.directory] = {
          action: info.action,
          middlewares: info.middlewares,
        };
      } else if (verbose === 1) {
        routes[method].push(info.directory);
      }
    }
  }
  return routes;
}

export function outputWiseVerboseData(
  wise: Interfaces.WisePrivateOptions,
): void {
  if (wise.verbose >= 3) {
    console.log(wise);
    return;
  } else if (wise.verbose === 2) {
    console.log({
      env: wise.env,
      protocols: wise.protocols,
      headers: wise.headers,
      errors: wise.errors,
      routes: logRouteMap(wise.routes, wise.verbose),
      midddlewares: wise.middlewares.slice(2),
    });
  } else if (wise.verbose === 1) {
    console.log({
      env: wise.env,
      protocols: wise.protocols,
      headers: wise.headers,
      errors: wise.errors,
      routes: logRouteMap(wise.routes, wise.verbose),
      midddlewares: wise.middlewares.slice(2),
    });
  }
  return;
}
