export class UserAlreadyExistException extends Error {
  constructor(username: string) {
    super(`User already exist with username:${username}`);
  }
}