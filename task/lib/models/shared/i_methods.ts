export interface IValidate {
  isValid(): boolean;
  getValidationErrors(): string[];
}

export interface IGetJson<T> {
  getJson(): T;
}
