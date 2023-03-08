/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

export class Conflicting extends Error {
  constructor(private directory: string) {
    super(
      `Conflicting directory. ${directory} was configured before this attempt.`,
      { cause: 'Directory must be unique' },
    );
  }
}

export class InvalidMethod extends Error {
  constructor(private method: string) {
    super(
      `Invalid request method. method ${method} must be GET,POST,PUT,PATCH,ALL.`,
      { cause: 'Request method must be GET,POST,PUT,PATCH,ALL.' },
    );
  }
}

export class InvalidMiddleware extends Error {
  constructor() {
    super(
      `Invalid middleware. Middleware must be a function with request, response and next.`,
      { cause: 'Middleware must be a function.' },
    );
  }
}

export class InvaliDirectory extends Error {
  constructor(private directory: string) {
    super(
      `Invalid directory. Directory ${directory} must start with "/" (e.g) "/usr"`,
      { cause: 'Directory must start with "/" (e.g) "/usr"' },
    );
  }
}
