import { IApiRequest } from './i_api_request';
import { IValidate, IGetJson } from './shared/i_methods';

/**
 * API request model
 *
 * @export
 * @class ApiRequest
 * @implements {IApiRequest}
 * @implements {IValidate}
 * @implements {IGetJson<IApiRequest>}
 */
export class ApiRequest
  implements IApiRequest, IValidate, IGetJson<IApiRequest> {
  private validationErrors: string[] = [];

  constructor(readonly user: string, readonly language: string[]) {}

  /**
   * Validate current model
   *
   * @returns {boolean}
   * @memberof ApiRequest
   */
  isValid(): boolean {
    if (!this.user) {
      this.validationErrors.push('user name is required');
    }
    if (
      !this.language ||
      !Array.isArray(this.language) ||
      !this.language.length
    ) {
      this.validationErrors.push('at least language is required');
    }

    return this.getValidationErrors().length === 0;
  }

  /**
   * Get validation errors
   *
   * @returns {string[]}
   * @memberof ApiRequest
   */
  getValidationErrors(): string[] {
    return this.validationErrors;
  }

  /**
   * Get API request interface
   *
   * @returns {IApiRequest}
   * @memberof ApiRequest
   */
  getJson(): IApiRequest {
    return {
      user: this.user,
      language: this.language
    };
  }
}
