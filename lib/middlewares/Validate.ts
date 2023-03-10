/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Interfaces from '../interfaces';
// import * as Types from '../types';

export class Validate {
  public static ContentType(
    request: Interfaces.Request,
    response: Interfaces.Response,
    next: Interfaces.Next,
    wise: Interfaces.WisePrivateOptions,
  ): void {
    const CONTENT_TYPE_VALIDATOR = wise.security.headers.contentType;
    if (CONTENT_TYPE_VALIDATOR.values.length > 0) {
      if (
        !request.headers['content-type'] ||
        !CONTENT_TYPE_VALIDATOR.values.includes(request.headers['content-type'])
      ) {
        const INVALID_CONTENT_TYPE = wise.errors.invalidContentType;
        response
          .code(INVALID_CONTENT_TYPE.code)
          .sendJSON(INVALID_CONTENT_TYPE.body);

        return;
      }
    }

    next();
    return;
  }

  public static ContentLength(
    request: Interfaces.Request,
    response: Interfaces.Response,
    next: Interfaces.Next,
    wise: Interfaces.WisePrivateOptions,
  ): void {
    const CONTENT_LENGTH_VALIDATOR = wise.security.headers.contentLength;
    if (Number(CONTENT_LENGTH_VALIDATOR.values[0]) >= 1) {
      if (
        Number(request.headers['content-length'] || '0') >
        Number(CONTENT_LENGTH_VALIDATOR.values[0])
      ) {
        const INVALID_CONTENT_LENGTH = wise.errors.invalidContentLength;
        response
          .code(INVALID_CONTENT_LENGTH.code)
          .sendJSON(INVALID_CONTENT_LENGTH.body);
        return;
      }
    }

    next();
    return;
  }

  public static ApiKey(
    request: Interfaces.Request,
    response: Interfaces.Response,
    next: Interfaces.Next,
    wise: Interfaces.WisePrivateOptions,
  ): void {
    const API_KEY_VALIDATOR = wise.security.headers.apiKey;
    if (API_KEY_VALIDATOR.values.length > 0) {
      if (
        !request.headers['x-api-key'] ||
        !API_KEY_VALIDATOR.values.includes(request.headers['x-api-key'])
      ) {
        const INVALID_API_KEY = wise.errors.invalidApiKey;
        response.code(INVALID_API_KEY.code).sendJSON(INVALID_API_KEY.body);

        return;
      }
    }

    next();
    return;
  }

  public static Custom(
    request: Interfaces.Request,
    response: Interfaces.Response,
    next: Interfaces.Next,
    wise: Interfaces.WisePrivateOptions,
  ): void {
    const CUSTOM_HEADERS = wise.security.headers.custom;
    if (CUSTOM_HEADERS.length > 0) {
      /**
       * We make an array with invalid headers, this will let us to return something
       * like this:
       * { errors: [`Invalid ${HEADER_1}`, `Invalid ${HEADER_2}, ...`] }
       */
      const invalidHeaders: Array<string> = [];
      CUSTOM_HEADERS.forEach((header: any) => {
        const [key, values] = Object.entries(header)[0];
        const routes = (values as any).routes;
        const headers = (values as any).values;
        if (
          routes.includes('*') === true ||
          routes.includes(request.url) === true
        ) {
          if (
            !request.headers[key] ||
            !headers.includes(request.headers[key])
          ) {
            invalidHeaders.push(`Invalid "${key}" header.`);
          }
        }
      });
      if (invalidHeaders.length > 0) {
        const error = wise.errors.invalidCustomHeader(invalidHeaders);
        response.code(error.code).sendJSON(error.body);
        return;
      }
    }

    next();
    return;
  }
}
