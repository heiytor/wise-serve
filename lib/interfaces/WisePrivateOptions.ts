/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Types from '../types';
import * as Interfaces from '.';

export interface WisePrivateOptions {
  env: 'development' | 'production';
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
    headers: {
      apiKey: Array<string>;
      contentType: Array<string>;
      contentLength: number;
      custom: Array<Record<string, Array<string>>>;
    };
    limits: {
      keepAliveTimeout: number;
      sizeLimit: string;
    };
  };
  errors: {
    default: Types.Server.ServerError;
    invalidApiKey: Types.Server.ServerError;
    invalidContentType: Types.Server.ServerError;
    invalidContentLength: Types.Server.ServerError;
    invalidRoute: Types.Server.ServerError;
    invalidCustomHeader: (
      errors: Array<string>,
    ) => Types.Server.ServerError | Types.Server.ServerError;
  };
  routes: Interfaces.Routes;
  middlewares: Array<Types.Route.RouteHandler>;
}
