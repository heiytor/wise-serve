/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

import { Wise } from './Wise';
import { WiseOptions } from './interfaces';
export { Response, Request, Next, WiseOptions } from './interfaces';
export { ServerError as WiseError } from './types/Server';

export default function wise(options?: WiseOptions): Wise {
  return new Wise(options);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = wise;
}
