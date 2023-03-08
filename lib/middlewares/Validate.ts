/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Interfaces from '../interfaces';

export class Validate {
  public static All(
    request: Interfaces.Request,
    response: Interfaces.Response,
    wise: Interfaces.WisePrivateOptions,
  ): 1 | 0 {
    // request.headers['content-type']
    if (wise.security.headers.contentType.length > 0) {
      if (
        !request.headers['content-type'] ||
        !wise.security.headers.contentType.includes(
          request.headers['content-type'],
        )
      ) {
        response
          .code(wise.errors.invalidContentType.code)
          .sendJSON(wise.errors.invalidContentType.body);

        return 1;
      }
    }

    // request.headers['content-length']
    if (wise.security.headers.contentLength !== -1) {
      if (
        Number(request.headers['content-length'] || '0') >
        wise.security.headers.contentLength
      ) {
        response
          .code(wise.errors.invalidContentLength.code)
          .sendJSON(wise.errors.invalidContentLength.body);

        return 1;
      }
    }

    // request.headers['x-api-key']
    if (wise.security.headers.apiKey.length > 0) {
      if (
        !request.headers['x-api-key'] ||
        !wise.security.headers.apiKey.includes(request.headers['x-api-key'])
      ) {
        response
          .code(wise.errors.invalidApiKey.code)
          .sendJSON(wise.errors.invalidApiKey.body);

        return 1;
      }
    }

    // custom headers
    if (wise.security.headers.custom.length > 0) {
      /**
       * We make an array with invalid headers, this will let us to return something
       * like this:
       * { errors: [`Invalid ${HEADER_1}`, `Invalid ${HEADER_2}, ...`] }
       */
      const errors: Array<string> = [];

      wise.security.headers.custom.forEach((header) => {
        const [key, values] = Object.entries(header)[0];
        if (!request.headers[key] || !values.includes(request.headers[key])) {
          errors.push(`Invalid "${key}" header.`);
        }
      });

      if (errors.length > 0) {
        const error = wise.errors.invalidCustomHeader(errors);
        response.code(error.code).sendJSON(error.body);

        return 1;
      }
    }

    return 0;
  }
}
