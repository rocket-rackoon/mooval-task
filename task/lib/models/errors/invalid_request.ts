import { IError } from './i_errors';

/**
 * Error throws when request is invalid
 *
 * @export
 * @class InvalidRequest
 * @extends {Error}
 * @implements {IError}
 */
export class InvalidRequest extends Error implements IError {
  readonly code = 400;
  constructor(message: string) {
    super(message);
  }
}
