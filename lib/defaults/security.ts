/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

export const security = {
  headers: {
    apiKey: { routes: [], values: [] },
    contentLength: { routes: [], values: [] },
    contentType: { routes: [], values: [] },
    custom: [],
  },
  limits: {
    keepAliveTimeout: 0,
    sizeLimit: '0',
  },
};
