/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import * as Types from '../types';

export const errors = {
  default: {
    code: 500,
    body: {
      status: 'error',
      errors: ['Unexpected error. Try again later or contact support.'],
    },
  },
  invalidApiKey: {
    code: 401,
    body: { status: 'error', errors: ['Invalid "x-api-key" header.'] },
  },
  invalidContentType: {
    code: 415,
    body: { status: 'error', errors: ['Invalid "content-type" header.'] },
  },
  invalidContentLength: {
    code: 415,
    body: { status: 'error', errors: ['Invalid "content-length" header.'] },
  },
  invalidRoute: {
    code: 404,
    body: { status: 'error', errors: ['Invalid route.'] },
  },
  invalidCustomHeader(errors: Array<string>): Types.Server.ErrorResponse {
    return {
      code: 400,
      body: { status: 'error', errors },
    };
  },
};
