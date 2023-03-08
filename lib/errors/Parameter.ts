/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

export class OptionCannotBeChanged extends Error {
  constructor(private option: string) {
    super(`"${option}" cannot be changed.`, {
      cause: `Invalid change attempt.`,
    });
  }
}

export class OptionDoesNotExist extends Error {
  constructor(private option: string) {
    super(`"${option}" does not exist on Wise options.`, {
      cause: `Invalid configuration attribute.`,
    });
  }
}

export class InsufficientFields extends Error {
  constructor() {
    super('Insufficient fields when trying to call the method.');
  }
}
