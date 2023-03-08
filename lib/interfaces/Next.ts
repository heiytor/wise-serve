/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

/**
 * You will use Next when you need to type your middlewares next function.
 * @type (err?: Error) => void;
 *
 * @example
 * import wise, { Request, Response, Next } from 'wise-serve';
 *
 * const app = wise();
 *
 * function exampleMiddleware(req: Request, res: Response, next: Next) => {
 *  // your logic...
 * });
 *
 * app.add(exampleMiddleware)
 */
export type Next = (err?: Error) => void;
