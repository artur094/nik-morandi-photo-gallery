export class AppException extends Error {
  constructor(public errorCode: string) {
    super(errorCode);
  }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getValueOrError<T>(
  value: T | null | undefined,
  error = 'ERROR_EXPECTED_MISSING_VALUE'
): T {
  if (value == null) {
    throw new AppException(error);
  }
  return value;
}
