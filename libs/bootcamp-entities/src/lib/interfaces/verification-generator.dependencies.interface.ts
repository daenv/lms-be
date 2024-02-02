export interface IVerificaionGeneratorDependencies {
  createVerificationCode(): string;
  getExpirationDate(hoursToVerify: number): Date;
}
