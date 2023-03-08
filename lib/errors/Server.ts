/**
 * (c) 2023 Heitor Danilo
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

export class ConflictingPorts extends Error {
  constructor() {
    super(
      `Both HTTP and HTTPS ports are the same. Please change at least one of them to start the server.`,
      {
        cause:
          'wise.#options.protocols.http.port and wise.#options.protocols.https.port properties are both the same.',
      },
    );
  }
}

export class NoServerEnabled extends Error {
  constructor() {
    super(
      'Both HTTP and HTTPS servers are disabled. Please enable at least one of them to start the server.',
      {
        cause:
          'wise.#options.protocols.http.enabled and wise.#options.protocols.https.enabled properties are both false.',
      },
    );
  }
}
