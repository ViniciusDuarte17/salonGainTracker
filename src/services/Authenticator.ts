import * as jwt from "jsonwebtoken";
import { IAuthenticator } from "../ports/Ports";

export class Authenticator implements IAuthenticator {
  private static expiresIn: number = 1200;
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

export interface AuthenticationData {
  id: string;
}
