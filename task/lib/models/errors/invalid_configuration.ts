import { IError } from './i_errors';

/**
 * Error throws when request is invalid
 *
 * @export
 * @class InvalidConfiguration
 * @extends {Error}
 * @implements {IError}
 */
export class InvalidConfiguration extends Error implements IError {
  readonly code = 500;
  constructor(message: string) {
    super(message);
  }
}
