export abstract class IValidationResult {
  abstract get isValid(): boolean;
  abstract set isValid(value: boolean);
  abstract get errors(): string[];
}
