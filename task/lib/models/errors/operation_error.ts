import { IError } from './i_errors';

/**
 * Invalid operation
 *
 * @export
 * @class OperationError
 * @extends {Error}
 * @implements {IError}
 */
export class OperationError extends Error implements IError {
  constructor(message: string, readonly code: number) {
    super(message);
  }
}
