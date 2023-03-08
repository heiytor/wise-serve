/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

export type ServerError = {
  /**
   * Status code sent from the server.
   * @example
   * 404
   */
  code: number;

  /**
   * JSON body sent from the server.
   * @example
   * {
   *  "name": "Jonh Doe",
   *  "age": 33
   * }
   */
  body: Record<string, unknown>;
};
