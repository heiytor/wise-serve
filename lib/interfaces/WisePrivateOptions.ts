/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Types from '../types';
import * as Interfaces from '.';

/**
 * This interfaces is only used by Wise class, if you are looking for attributes documentation, check
 * WiseOptions interface.
 */

export interface WisePrivateOptions {
  env: 'development' | 'production';
  verbose: number;
  protocols: {
    http: {
      enabled: boolean;
      port: number;
    };
    https: {
      enabled: boolean;
      port: number;
      cert: string;
      key: string;
    };
  };
  security: {
    headers: Types.Security.Headers;
    // custom: Array<Record<string, Array<string>>>; // };
    limits: {
      keepAliveTimeout: number;
      sizeLimit: string;
    };
  };
  errors: {
    default: Types.Server.ErrorResponse;
    invalidApiKey: Types.Server.ErrorResponse;
    invalidContentType: Types.Server.ErrorResponse;
    invalidContentLength: Types.Server.ErrorResponse;
    invalidRoute: Types.Server.ErrorResponse;
    invalidCustomHeader: (
      errors: Array<string>,
    ) => Types.Server.ErrorResponse | Types.Server.ErrorResponse;
  };
  routes: Interfaces.Routes;
  middlewares: Array<Types.Route.RouteHandler>;
}
